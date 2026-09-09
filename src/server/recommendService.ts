import { GoogleGenerativeAI } from '@google/generative-ai';
import { PRODUCTS } from '../data/products';
import type { AIRecommendation, RecommendationResponse, Product } from '../types';

export interface RecommendInput {
  query: string;
  categoryFilter?: string;
}

/**
 * Intelligent Fallback Matcher:
 * Used when GEMINI_API_KEY is not configured or offline.
 * Extracts intent, budgets, categories, and keywords from the natural language query.
 */
function fallbackKeywordMatcher(query: string, categoryFilter?: string): AIRecommendation[] {
  const lowerQuery = query.toLowerCase().trim();
  const validProducts = PRODUCTS.filter((p: Product) => !categoryFilter || categoryFilter === 'All' || p.category.toLowerCase() === categoryFilter.toLowerCase());

  // Extract budget constraints e.g., "under $500", "below 300", "< 600"
  let maxBudget: number | null = null;
  const budgetMatch = lowerQuery.match(/(?:under|below|less than|budget of|max|\<)\s*\$?(\d+)/i) || lowerQuery.match(/\$(\d+)/i);
  if (budgetMatch && budgetMatch[1]) {
    maxBudget = parseInt(budgetMatch[1], 10);
  }

  // Keywords scoring
  const scores: { product: Product; score: number; reasons: string[] }[] = [];

  for (const product of validProducts) {
    let score = 0;
    const reasons: string[] = [];

    // Check budget
    if (maxBudget !== null) {
      if (product.price <= maxBudget) {
        score += 30;
        reasons.push(`Priced at $${product.price}, which is comfortably within your $${maxBudget} budget.`);
      } else {
        // Exceeds budget significantly
        score -= 50;
      }
    }

    // Category matches
    const catLower = product.category.toLowerCase();
    if (
      (lowerQuery.includes('phone') || lowerQuery.includes('smartphone') || lowerQuery.includes('mobile') || lowerQuery.includes('android') || lowerQuery.includes('ios')) &&
      catLower === 'smartphones'
    ) {
      score += 25;
      reasons.push(`Top-tier smartphone matching your device preference.`);
    }

    if (
      (lowerQuery.includes('laptop') || lowerQuery.includes('computer') || lowerQuery.includes('macbook') || lowerQuery.includes('pc') || lowerQuery.includes('notebook')) &&
      catLower === 'laptops'
    ) {
      score += 25;
      reasons.push(`High-performance laptop matching your productivity requirements.`);
    }

    if (
      (lowerQuery.includes('headphone') || lowerQuery.includes('earbud') || lowerQuery.includes('audio') || lowerQuery.includes('music') || lowerQuery.includes('sound') || lowerQuery.includes('noise')) &&
      catLower === 'audio'
    ) {
      score += 25;
      reasons.push(`Audio gear tailored for clear sound and listening comfort.`);
    }

    if (
      (lowerQuery.includes('watch') || lowerQuery.includes('fitness') || lowerQuery.includes('tracker') || lowerQuery.includes('wearable') || lowerQuery.includes('heart rate')) &&
      catLower === 'wearables'
    ) {
      score += 25;
      reasons.push(`Wearable device equipped for health, fitness, and daily tracking.`);
    }

    if (
      (lowerQuery.includes('tablet') || lowerQuery.includes('ipad') || lowerQuery.includes('drawing') || lowerQuery.includes('reading')) &&
      catLower === 'tablets'
    ) {
      score += 25;
      reasons.push(`Versatile tablet ideal for work, drawing, and media consumption.`);
    }

    // Keyword checks across description and features
    const fullText = `${product.name} ${product.description} ${product.features.join(' ')} ${product.badge || ''}`.toLowerCase();

    const queryTokens = lowerQuery
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(t => t.length > 2 && !['want', 'need', 'give', 'show', 'best', 'good', 'with', 'from', 'this', 'that', 'under', 'below'].includes(t));

    let tokenMatches = 0;
    for (const token of queryTokens) {
      if (fullText.includes(token)) {
        score += 10;
        tokenMatches++;
      }
    }

    if (tokenMatches > 0 && reasons.length === 0) {
      reasons.push(`Matches your focus on ${queryTokens.slice(0, 2).join(' and ')}.`);
    }

    // Special intent keywords
    if (lowerQuery.includes('battery') && fullText.includes('battery')) {
      score += 15;
      reasons.push('Features long battery life suited for all-day use.');
    }
    if ((lowerQuery.includes('noise') || lowerQuery.includes('anc')) && fullText.includes('noise')) {
      score += 20;
      reasons.push('Equipped with Active Noise Cancellation for immersive listening.');
    }
    if ((lowerQuery.includes('game') || lowerQuery.includes('gaming') || lowerQuery.includes('rtx')) && fullText.includes('gaming')) {
      score += 25;
      reasons.push('High-end graphics and cooling engineered specifically for gaming.');
    }
    if ((lowerQuery.includes('light') || lowerQuery.includes('portable') || lowerQuery.includes('travel')) && (fullText.includes('featherlight') || fullText.includes('pocket') || fullText.includes('compact') || fullText.includes('portable'))) {
      score += 15;
      reasons.push('Compact and ultraportable design easy to carry anywhere.');
    }

    if (score > 0) {
      scores.push({
        product,
        score,
        reasons
      });
    }
  }

  // Sort by score descending
  scores.sort((a, b) => b.score - a.score);

  // Take top 4 or top score items
  const topItems = scores.slice(0, 4);

  // If nothing scored high, return top 2 highest rated products matching category
  if (topItems.length === 0) {
    return validProducts
      .slice(0, 3)
      .map((p: Product) => ({
        id: p.id,
        reason: `Popular choice in ${p.category} with a ${p.rating}★ rating.`
      }));
  }

  return topItems.map(item => ({
    id: item.product.id,
    reason: item.reasons.length > 0 ? item.reasons.join(' ') : `Matches your criteria with strong ${item.product.rating}★ user feedback.`
  }));
}

/**
 * Executes AI-powered product recommendation with Google Gemini API and strict catalogue bounds.
 */
export async function getRecommendations(input: RecommendInput): Promise<RecommendationResponse> {
  const { query, categoryFilter } = input;

  if (!query || query.trim().length === 0) {
    return {
      recommendations: [],
      recommendedProductIds: [],
      query: '',
      message: 'Please enter a product preference or search prompt.'
    };
  }

  const apiKey = process.env.GEMINI_API_KEY || '';
  const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

  // Filter products by optional category constraint
  const catalogSubset = PRODUCTS.filter((p: Product) => !categoryFilter || categoryFilter === 'All' || p.category.toLowerCase() === categoryFilter.toLowerCase());

  // Compact catalog summary for token efficiency & zero hallucination
  const catalogPromptData = catalogSubset.map((p: Product) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    price: p.price,
    rating: p.rating,
    features: p.features,
    description: p.description
  }));

  // If no Gemini API Key is provided, use smart local fallback
  if (!apiKey || apiKey.trim() === '' || apiKey === 'your_gemini_api_key_here') {
    const fallbackResults = fallbackKeywordMatcher(query, categoryFilter);
    return {
      recommendations: fallbackResults,
      recommendedProductIds: fallbackResults.map(r => r.id),
      isMock: true,
      query,
      message: 'Running in Smart Demo Mode (GEMINI_API_KEY not configured in .env). Recommendations computed using semantic intent parsing.'
    };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: modelName,
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.2
      },
      systemInstruction: `You are an expert e-commerce shopping recommendation AI.
Your task is to analyze the user's natural language preference and recommend matching products STRICTLY from the provided JSON product catalog.

CRITICAL CONSTRAINTS:
1. You MUST ONLY recommend products whose "id" exists in the provided catalog.
2. DO NOT invent, hallucinate, or recommend any external products not in the catalog.
3. If no product matches the user's criteria (e.g. price is too low, or non-existent category), return an empty recommendations array.
4. Select between 1 to 5 best matching products, ordered by relevance.
5. Provide a personalized 1-2 sentence "reason" for each product explaining specifically how it satisfies the user's request (e.g. budget, features, use-case).

OUTPUT FORMAT:
You must respond with valid JSON adhering strictly to this schema:
{
  "recommendedProductIds": ["prod-001", "prod-002"],
  "recommendations": [
    {
      "id": "prod-001",
      "reason": "Clear explanation connecting the product features to the user's query."
    }
  ]
}`
    });

    const userPrompt = `Product Catalog:
${JSON.stringify(catalogPromptData, null, 2)}

User Preference Query:
"${query}"

${categoryFilter && categoryFilter !== 'All' ? `Current Category Filter: ${categoryFilter}` : ''}

Please analyze the query against the catalog and return your recommendations in the specified JSON format.`;

    const result = await model.generateContent(userPrompt);
    const responseText = result.response.text();

    if (!responseText) {
      throw new Error('Received empty response from Gemini API');
    }

    const parsed = JSON.parse(responseText) as {
      recommendations?: AIRecommendation[];
      recommendedProductIds?: string[];
    };

    let rawRecommendations = Array.isArray(parsed.recommendations) ? parsed.recommendations : [];

    // If recommendedProductIds was returned without full recommendations array, normalize it
    if (rawRecommendations.length === 0 && Array.isArray(parsed.recommendedProductIds)) {
      rawRecommendations = parsed.recommendedProductIds.map(id => ({
        id,
        reason: 'Recommended based on your query requirements.'
      }));
    }

    // STRICT VALIDATION: Filter against actual known product IDs to guarantee zero hallucinated items
    const validProductMap = new Map(PRODUCTS.map((p: Product) => [p.id, p]));
    const validatedRecommendations: AIRecommendation[] = [];

    for (const rec of rawRecommendations) {
      if (rec && typeof rec.id === 'string' && validProductMap.has(rec.id)) {
        validatedRecommendations.push({
          id: rec.id,
          reason: typeof rec.reason === 'string' && rec.reason.trim() ? rec.reason.trim() : 'Recommended based on your preferences.'
        });
      }
    }

    return {
      recommendations: validatedRecommendations,
      recommendedProductIds: validatedRecommendations.map(r => r.id),
      isMock: false,
      query,
      model: modelName
    };
  } catch (error: any) {
    console.error('Gemini Recommendation API Error:', error);
    // Gracefully degrade to semantic fallback if API error (e.g. invalid key, quota exceeded, network)
    const fallbackResults = fallbackKeywordMatcher(query, categoryFilter);
    return {
      recommendations: fallbackResults,
      recommendedProductIds: fallbackResults.map(r => r.id),
      isMock: true,
      query,
      message: `Gemini API notice (${error?.message || 'Check API key or quota'}). Showing semantic fallback recommendations.`
    };
  }
}
