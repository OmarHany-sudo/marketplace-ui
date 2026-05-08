export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  condition: 'new' | 'used' | 'like-new';
  rating: number;
  reviewCount: number;
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  location: string;
  description: string;
  isHaggling?: boolean;
  badge?: string;
  postedAt: string;
}

export interface Store {
  id: string;
  name: string;
  avatar: string;
  cover: string;
  rating: number;
  reviewCount: number;
  followers: number;
  productsCount: number;
  location: string;
  description: string;
  joinedDate: string;
  isFollowing: boolean;
  badges: string[];
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  productId?: string;
}

export interface Conversation {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  messages: Message[];
  productPreview?: Product;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories?: string[];
}

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Electronics', icon: 'Smartphone', subcategories: ['Phones', 'Laptops', 'Audio', 'Accessories'] },
  { id: '2', name: 'Fashion', icon: 'Shirt', subcategories: ['Men', 'Women', 'Kids', 'Shoes'] },
  { id: '3', name: 'Home', icon: 'Home', subcategories: ['Furniture', 'Decor', 'Kitchen', 'Lighting'] },
  { id: '4', name: 'Sports', icon: 'Dumbbell', subcategories: ['Gym', 'Outdoor', 'Cycling', 'Running'] },
  { id: '5', name: 'Books', icon: 'BookOpen', subcategories: ['Fiction', 'Non-fiction', 'Educational', 'Comics'] },
  { id: '6', name: 'Gaming', icon: 'Gamepad2', subcategories: ['Consoles', 'Games', 'Accessories', 'PC'] },
  { id: '7', name: 'Automotive', icon: 'Car', subcategories: ['Parts', 'Accessories', 'Tools', 'Care'] },
  { id: '8', name: 'Art', icon: 'Palette', subcategories: ['Paintings', 'Sculptures', 'Prints', 'Digital'] },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'AuraSound Pro Wireless Headphones',
    price: 149,
    originalPrice: 299,
    image: '/product1.jpg',
    images: ['/product1.jpg', '/product1.jpg', '/product1.jpg'],
    category: 'Electronics',
    condition: 'new',
    rating: 4.8,
    reviewCount: 234,
    sellerId: 's1',
    sellerName: "TechVault Store",
    sellerAvatar: '/avatar1.jpg',
    location: 'New York, NY',
    description: 'Premium noise-canceling wireless headphones with 40-hour battery life. Hi-Res Audio certified, comfortable over-ear design with memory foam cushions.',
    isHaggling: true,
    badge: 'BESTSELLER',
    postedAt: '2 hours ago',
  },
  {
    id: 'p2',
    title: 'Minimalist Classic Watch - Silver',
    price: 89,
    originalPrice: 159,
    image: '/product2.jpg',
    images: ['/product2.jpg', '/product2.jpg'],
    category: 'Fashion',
    condition: 'new',
    rating: 4.6,
    reviewCount: 128,
    sellerId: 's2',
    sellerName: "LuxeTime Co.",
    sellerAvatar: '/avatar2.jpg',
    location: 'Los Angeles, CA',
    description: 'Elegant minimalist wristwatch with genuine leather strap. Water resistant up to 30m. Japanese quartz movement.',
    badge: '-44%',
    postedAt: '5 hours ago',
  },
  {
    id: 'p3',
    title: 'Vintage Distressed Denim Jacket',
    price: 65,
    image: '/product3.jpg',
    images: ['/product3.jpg', '/product3.jpg'],
    category: 'Fashion',
    condition: 'used',
    rating: 4.4,
    reviewCount: 89,
    sellerId: 's2',
    sellerName: "RetroFinds",
    sellerAvatar: '/avatar3.jpg',
    location: 'Portland, OR',
    description: 'Authentic vintage denim jacket with distressed details. Perfect patina, unique character. Size M.',
    isHaggling: true,
    postedAt: '1 day ago',
  },
  {
    id: 'p4',
    title: 'SwiftRunner Pro Athletic Shoes',
    price: 119,
    originalPrice: 189,
    image: '/product4.jpg',
    images: ['/product4.jpg', '/product4.jpg'],
    category: 'Sports',
    condition: 'new',
    rating: 4.7,
    reviewCount: 312,
    sellerId: 's3',
    sellerName: "AthleticEdge",
    sellerAvatar: '/avatar1.jpg',
    location: 'Chicago, IL',
    description: 'Professional running shoes with responsive cushioning. Breathable mesh upper, durable rubber outsole. Perfect for marathon training.',
    badge: 'NEW',
    postedAt: '3 hours ago',
  },
  {
    id: 'p5',
    title: 'Cognac Leather Designer Handbag',
    price: 245,
    originalPrice: 450,
    image: '/product5.jpg',
    images: ['/product5.jpg', '/product5.jpg'],
    category: 'Fashion',
    condition: 'new',
    rating: 4.9,
    reviewCount: 67,
    sellerId: 's2',
    sellerName: "Atelier Luxe",
    sellerAvatar: '/avatar2.jpg',
    location: 'Miami, FL',
    description: 'Handcrafted Italian leather tote bag with gold-tone hardware. Spacious interior with multiple compartments. Dust bag included.',
    badge: 'PREMIUM',
    postedAt: '6 hours ago',
  },
  {
    id: 'p6',
    title: 'RGB Mechanical Gaming Keyboard',
    price: 79,
    originalPrice: 129,
    image: '/product6.jpg',
    images: ['/product6.jpg', '/product6.jpg'],
    category: 'Electronics',
    condition: 'new',
    rating: 4.5,
    reviewCount: 445,
    sellerId: 's1',
    sellerName: "TechVault Store",
    sellerAvatar: '/avatar1.jpg',
    location: 'Austin, TX',
    description: 'Hot-swappable mechanical keyboard with PBT keycaps. Custom RGB per-key lighting, USB-C connectivity.',
    isHaggling: true,
    postedAt: '8 hours ago',
  },
  {
    id: 'p7',
    title: 'FitTrack Pro Smart Watch',
    price: 199,
    originalPrice: 349,
    image: '/product7.jpg',
    images: ['/product7.jpg', '/product7.jpg'],
    category: 'Electronics',
    condition: 'new',
    rating: 4.3,
    reviewCount: 178,
    sellerId: 's1',
    sellerName: "TechVault Store",
    sellerAvatar: '/avatar1.jpg',
    location: 'Seattle, WA',
    description: 'Advanced fitness tracker with heart rate monitor, SpO2 sensor, and GPS. 14-day battery life, water resistant to 50m.',
    badge: 'HOT',
    postedAt: '12 hours ago',
  },
  {
    id: 'p8',
    title: 'Aviator Gold-Tone Sunglasses',
    price: 55,
    originalPrice: 120,
    image: '/product8.jpg',
    images: ['/product8.jpg', '/product8.jpg'],
    category: 'Fashion',
    condition: 'like-new',
    rating: 4.6,
    reviewCount: 92,
    sellerId: 's3',
    sellerName: "StyleHouse",
    sellerAvatar: '/avatar3.jpg',
    location: 'San Diego, CA',
    description: 'Classic aviator sunglasses with UV400 protection. Gradient lenses, gold-tone metal frame. Includes case and cleaning cloth.',
    postedAt: '1 day ago',
  },
  {
    id: 'p9',
    title: 'AudioStream Wireless Earbuds',
    price: 69,
    originalPrice: 129,
    image: '/product9.jpg',
    images: ['/product9.jpg', '/product9.jpg'],
    category: 'Electronics',
    condition: 'new',
    rating: 4.4,
    reviewCount: 523,
    sellerId: 's1',
    sellerName: "TechVault Store",
    sellerAvatar: '/avatar1.jpg',
    location: 'Denver, CO',
    description: 'True wireless earbuds with active noise cancellation. 30-hour total battery with case, IPX5 water resistance.',
    badge: '-47%',
    postedAt: '4 hours ago',
  },
];

export const STORES: Store[] = [
  {
    id: 's1',
    name: 'TechVault Store',
    avatar: '/avatar1.jpg',
    cover: '/store1.jpg',
    rating: 4.8,
    reviewCount: 1240,
    followers: 8560,
    productsCount: 342,
    location: 'New York, NY',
    description: 'Your premier destination for cutting-edge electronics. We curate the best tech products at unbeatable prices.',
    joinedDate: 'March 2021',
    isFollowing: true,
    badges: ['Top Rated', 'Verified', 'Fast Shipper'],
  },
  {
    id: 's2',
    name: 'Atelier Luxe',
    avatar: '/avatar2.jpg',
    cover: '/store2.jpg',
    rating: 4.9,
    reviewCount: 892,
    followers: 12300,
    productsCount: 189,
    location: 'Miami, FL',
    description: 'Curated fashion and luxury accessories. Bringing you timeless pieces that elevate your everyday style.',
    joinedDate: 'June 2020',
    isFollowing: false,
    badges: ['Premium', 'Trending', 'Exclusive'],
  },
  {
    id: 's3',
    name: 'AthleticEdge',
    avatar: '/avatar3.jpg',
    cover: '/store3.jpg',
    rating: 4.6,
    reviewCount: 2100,
    followers: 5400,
    productsCount: 267,
    location: 'Chicago, IL',
    description: 'Performance sports gear for athletes who demand the best. From gym essentials to outdoor adventures.',
    joinedDate: 'January 2022',
    isFollowing: false,
    badges: ['Active', 'Reliable'],
  },
];

export const CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    userId: 's1',
    userName: 'TechVault Store',
    userAvatar: '/avatar1.jpg',
    lastMessage: 'Yes, we have the headphones in stock! Would you like me to reserve a pair?',
    timestamp: '2 min ago',
    unread: 2,
    messages: [
      { id: 'm1', senderId: 'user', content: 'Hi, are the AuraSound headphones still available?', timestamp: '10:30 AM' },
      { id: 'm2', senderId: 's1', content: 'Yes, we have the headphones in stock! Would you like me to reserve a pair?', timestamp: '10:32 AM' },
    ],
    productPreview: PRODUCTS[0],
  },
  {
    id: 'c2',
    userId: 's2',
    userName: 'Atelier Luxe',
    userAvatar: '/avatar2.jpg',
    lastMessage: 'The leather handbag comes with a dust bag and authenticity card.',
    timestamp: '1 hour ago',
    unread: 0,
    messages: [
      { id: 'm3', senderId: 'user', content: 'Does the cognac bag include the dust bag?', timestamp: '9:15 AM' },
      { id: 'm4', senderId: 's2', content: 'The leather handbag comes with a dust bag and authenticity card.', timestamp: '9:20 AM' },
    ],
    productPreview: PRODUCTS[4],
  },
  {
    id: 'c3',
    userId: 's3',
    userName: 'AthleticEdge',
    userAvatar: '/avatar3.jpg',
    lastMessage: 'Shipping takes 2-3 business days to your location.',
    timestamp: 'Yesterday',
    unread: 1,
    messages: [
      { id: 'm5', senderId: 'user', content: 'How long does shipping take?', timestamp: 'Yesterday' },
      { id: 'm6', senderId: 's3', content: 'Shipping takes 2-3 business days to your location.', timestamp: 'Yesterday' },
    ],
  },
];

export const REVIEWS = [
  { id: 'r1', userName: 'Sarah M.', avatar: '/avatar2.jpg', rating: 5, text: 'Amazing quality! Exactly as described. Fast shipping too.', date: '2 days ago' },
  { id: 'r2', userName: 'James K.', avatar: '/avatar1.jpg', rating: 4, text: 'Great product, packaging could be better. Overall happy.', date: '1 week ago' },
  { id: 'r3', userName: 'Emily R.', avatar: '/avatar2.jpg', rating: 5, text: 'Love it! Will definitely buy from this seller again.', date: '2 weeks ago' },
];

export const PROMO_BANNERS = [
  { id: 'b1', image: '/banner1.jpg', title: 'Free Shipping', subtitle: 'On orders over $50' },
  { id: 'b2', image: '/banner2.jpg', title: 'Spring Sale', subtitle: 'Up to 50% off' },
  { id: 'b3', image: '/banner3.jpg', title: 'New Arrivals', subtitle: 'Shop the latest trends' },
];

export const DELIVERY_OPTIONS = [
  { id: 'd1', name: 'Standard Shipping', price: 5.99, estimated: '3-5 business days' },
  { id: 'd2', name: 'Express Shipping', price: 12.99, estimated: '1-2 business days' },
  { id: 'd3', name: 'Free Pickup', price: 0, estimated: 'Same day' },
];
