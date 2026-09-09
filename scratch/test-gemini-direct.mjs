import dotenv from 'dotenv';
dotenv.config();

import { getRecommendations } from '../src/server/recommendService.ts';

async function testDirect() {
  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim());
  console.log('HAS GEMINI_API_KEY IN ENV:', hasKey);
  console.log('GEMINI_MODEL:', process.env.GEMINI_MODEL);

  const res = await getRecommendations({ query: 'I want a phone under $500' });
  console.log('\n--- RESULT ---');
  console.log('isMock:', res.isMock);
  console.log('model:', res.model);
  console.log('message:', res.message);
  console.log('recommendedProductIds:', res.recommendedProductIds);
  console.log('recommendations:', JSON.stringify(res.recommendations, null, 2));
}

testDirect();
