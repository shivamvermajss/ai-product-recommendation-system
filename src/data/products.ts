import type { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Pixel Nova 8A Smartphone',
    category: 'Smartphones',
    price: 449,
    rating: 4.6,
    reviewsCount: 382,
    description: 'Crisp 6.1" OLED display with Google Tensor G3 intelligence, all-day adaptive battery, and studio-grade computational photography.',
    features: ['6.1" OLED 90Hz', '128GB Storage', 'Tensor G3 Chip', 'Titan M2 Security', 'IP67 Water Resistant'],
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    badge: 'Under $500 Pick'
  },
  {
    id: 'prod-002',
    name: 'Apex Ultra 15 Pro Laptop',
    category: 'Laptops',
    price: 1499,
    rating: 4.9,
    reviewsCount: 512,
    description: 'High-performance powerhouse engineered for developers and creators. Features M3-class 12-core silicon, 32GB RAM, and 18-hour battery endurance.',
    features: ['15.3" Liquid Retina', '32GB Unified RAM', '1TB NVMe SSD', '18h Battery Life', 'M3 Pro Architecture'],
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    badge: 'Editor Choice'
  },
  {
    id: 'prod-003',
    name: 'AeroBook Air 13 Ultraportable',
    category: 'Laptops',
    price: 899,
    rating: 4.7,
    reviewsCount: 290,
    description: 'Featherlight 2.7 lb laptop with a fanless silent design, stunning 2.5K edge-to-edge display, and rapid USB-C 65W charging.',
    features: ['13.6" 2.5K Screen', '16GB RAM', '512GB SSD', 'Fanless Silent Design', 'All-Day Battery'],
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular'
  },
  {
    id: 'prod-004',
    name: 'SoundWave ANC-900 Pro Headphones',
    category: 'Audio',
    price: 279,
    rating: 4.8,
    reviewsCount: 640,
    description: 'Industry-leading Active Noise Cancellation with dual spatial audio drivers, plush memory foam earcups, and 40 hours of playtime.',
    features: ['Hybrid Active ANC', '40mm Titanium Drivers', '40hr Battery Life', 'Multipoint Bluetooth 5.3', 'LDAC Hi-Res Audio'],
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    badge: 'Top Rated'
  },
  {
    id: 'prod-005',
    name: 'EchoPulse Mini Wireless Earbuds',
    category: 'Audio',
    price: 79,
    rating: 4.4,
    reviewsCount: 410,
    description: 'Compact pocket-sized wireless earbuds with crystal-clear call quality, deep bass, IPX5 sweat resistance, and 28-hour total case battery.',
    features: ['IPX5 Sweatproof', '28h Playback Case', 'Bluetooth 5.3', 'Touch Controls', 'Dual Mic ENC'],
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    badge: 'Budget Friendly'
  },
  {
    id: 'prod-006',
    name: 'Vanguard Chrono Smartwatch Ultra',
    category: 'Wearables',
    price: 249,
    rating: 4.7,
    reviewsCount: 315,
    description: 'Titanium bezel smartwatch with continuous ECG, blood oxygen tracking, dual-band GPS, 50m water resistance, and 7-day battery.',
    features: ['Sapphire Glass & Titanium', 'Dual-frequency GPS', 'ECG & SpO2 Monitor', '7-Day Battery', '5ATM Waterproof'],
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    badge: 'Fitness Essential'
  },
  {
    id: 'prod-007',
    name: 'PulseBand Active Fitness Tracker',
    category: 'Wearables',
    price: 59,
    rating: 4.3,
    reviewsCount: 220,
    description: 'Sleek, lightweight fitness band with heart rate tracking, sleep cycle analysis, 30+ sport modes, and 14-day battery life.',
    features: ['1.47" AMOLED Display', 'Heart & Sleep Tracking', '14-Day Battery', 'Swim-proof 50M', '30+ Workout Modes'],
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Value'
  },
  {
    id: 'prod-008',
    name: 'Nexus Pro Max Flagship Smartphone',
    category: 'Smartphones',
    price: 999,
    rating: 4.8,
    reviewsCount: 890,
    description: 'Ultimate flagship device boasting a 200MP periscope telephoto camera, Snapdragon 8 Gen 3 speed, 120Hz dynamic AMOLED, and titanium frame.',
    features: ['6.8" Dynamic AMOLED 2X', '200MP Quad Camera', 'Snapdragon 8 Gen 3', '5000mAh + 45W Fast Charge', 'S-Pen Support'],
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    badge: 'Premium Flagship'
  },
  {
    id: 'prod-009',
    name: 'PocketLite 5G Budget Smartphone',
    category: 'Smartphones',
    price: 299,
    rating: 4.2,
    reviewsCount: 180,
    description: 'Sub-$300 5G smartphone delivering reliable daily performance, 50MP AI camera, 5000mAh battery, and a smooth 90Hz display.',
    features: ['5G Connectivity', '6.5" 90Hz Display', '5000mAh Big Battery', '50MP Dual Camera', 'Expandable MicroSD'],
    image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80',
    badge: 'Under $300'
  },
  {
    id: 'prod-010',
    name: 'TabCanvas Pro 11 Tablet',
    category: 'Tablets',
    price: 649,
    rating: 4.7,
    reviewsCount: 340,
    description: 'Versatile digital canvas with 120Hz ProMotion stylus support, quad speakers, 8-core processor, and seamless desktop multitasking mode.',
    features: ['11" 120Hz Liquid Retina', 'Stylus & Magnetic Keyboard Support', 'Quad Stereo Speakers', '256GB Storage', '10h Battery Life'],
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    badge: 'Creativity Choice'
  },
  {
    id: 'prod-011',
    name: 'ZenPad Lite 10.1 Student Tablet',
    category: 'Tablets',
    price: 199,
    rating: 4.3,
    reviewsCount: 165,
    description: 'Affordable 10-inch Full HD tablet perfect for e-learning, streaming videos, casual gaming, and reading ebooks with blue-light filter.',
    features: ['10.1" 1080p IPS Screen', '64GB Storage + SD Slot', 'Dual Speakers', 'Parental Controls', 'Eye Comfort Mode'],
    image: 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&w=800&q=80',
    badge: 'Student Deal'
  },
  {
    id: 'prod-012',
    name: 'ThunderDock 12-in-1 Dual 4K Hub',
    category: 'Accessories',
    price: 129,
    rating: 4.6,
    reviewsCount: 275,
    description: 'Comprehensive aluminum workstation dock with dual HDMI 4K@60Hz, 100W Power Delivery, Gigabit Ethernet, and high-speed SD card slots.',
    features: ['Dual 4K@60Hz HDMI', '100W USB-C PD Charging', 'Gigabit RJ45 Ethernet', '3x USB 3.2 Gen 2', 'SD/TF Card Reader'],
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=800&q=80',
    badge: 'Productivity'
  },
  {
    id: 'prod-013',
    name: 'VoltStream 65W GaN Fast Charger',
    category: 'Accessories',
    price: 39,
    rating: 4.8,
    reviewsCount: 520,
    description: 'Pocket-sized Gallium Nitride (GaN) fast charger capable of simultaneously powering your laptop, tablet, and smartphone at high speed.',
    features: ['65W Total Output', '2x USB-C + 1x USB-A', 'GaN III Technology', 'Foldable US/EU Prongs', 'Multi-Device Protection'],
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    badge: 'Everyday Carry'
  },
  {
    id: 'prod-014',
    name: 'Titan Gaming Beast RTX 4070 Laptop',
    category: 'Laptops',
    price: 1799,
    rating: 4.8,
    reviewsCount: 430,
    description: 'Uncompromised gaming and rendering powerhouse with NVIDIA GeForce RTX 4070, Intel Core i9 14th Gen, and 240Hz QHD display.',
    features: ['16" QHD 240Hz G-Sync', 'GeForce RTX 4070 8GB', 'Intel Core i9-14900HX', '32GB DDR5 RAM', 'Vapor Chamber Cooling'],
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
    badge: 'Gaming Flagship'
  }
];

export const CATEGORIES = ['All', 'Smartphones', 'Laptops', 'Audio', 'Wearables', 'Tablets', 'Accessories'] as const;
