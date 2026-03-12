export type PlatformSource = 'X' | 'Reddit' | 'LinkedIn' | 'Hacker News' | 'YouTube';
export type Category = 'Fintech' | 'Ecommerce' | 'Mobility' | 'Food Delivery' | 'SaaS / DevTools' | 'Government Digital Services' | 'EdTech' | 'HealthTech' | 'Banking' | 'Consumer Apps';
export type CompanyType = 'Startup' | 'Growth Stage' | 'Enterprise' | 'Government Service';

export interface Mention {
  id: string;
  username: string;
  platform: PlatformSource;
  content: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  likes: number;
  timestamp: string;
  link: string;
}

export interface PlatformStats {
  source: PlatformSource;
  score: number;
  mentions: number;
  engagement: number;
}

export interface TrendData {
  month: string;
  score: number;
}

export interface Product {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: Category;
  pricingTier: string;
  website: string;
  launchYear: number;
  headquarters: string;
  companyType: CompanyType;
  overallScore: number;
  marketBuzz: number; // volume of mentions
  platformBreakdown: PlatformStats[];
  trendData: TrendData[];
  topPositiveMentions: Mention[];
  topNegativeMentions: Mention[];
  pros: string[];
  cons: string[];
  userSegments: string[];
  trendingTopics: string[];
  sentimentShift30Days: number; // e.g., +5, -12
}

const generateTrendData = (baseScore: number, volatility: number): TrendData[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let currentScore = baseScore;
  return months.map(month => {
    currentScore = Math.max(0, Math.min(100, currentScore + (Math.random() * volatility * 2 - volatility)));
    return { month, score: Math.round(currentScore) };
  });
};

const generateMentions = (productName: string, sentiment: 'positive' | 'negative', count: number): Mention[] => {
  const platforms: PlatformSource[] = ['X', 'Reddit', 'LinkedIn', 'Hacker News', 'YouTube'];
  const positiveTemplates = [
    `{product} is still the most reliable in India. UI is simple but it just works.`,
    `Really impressed with {product}'s latest update. Game changer for the Indian market.`,
    `Switched to {product} last month and haven't looked back. Highly recommend!`,
    `The customer support at {product} is surprisingly good for an Indian startup.`,
    `{product} is building the future of digital India. Proud of this team.`
  ];
  const negativeTemplates = [
    `{product} servers are down AGAIN. 2026 and we still deal with this.`,
    `The new {product} pricing is ridiculous. Moving to a competitor.`,
    `UX of {product} has gone downhill since the last update. Too cluttered.`,
    `Customer service for {product} is non-existent. Been waiting 3 days for a reply.`,
    `Why does {product} need so many permissions? Uninstalling.`
  ];

  return Array.from({ length: count }).map((_, i) => {
    const template = sentiment === 'positive' 
      ? positiveTemplates[Math.floor(Math.random() * positiveTemplates.length)]
      : negativeTemplates[Math.floor(Math.random() * negativeTemplates.length)];
    
    return {
      id: `${productName.toLowerCase()}-${sentiment}-${i}`,
      username: `@user${Math.floor(Math.random() * 10000)}`,
      platform: platforms[Math.floor(Math.random() * platforms.length)],
      content: template.replace('{product}', productName),
      sentiment,
      likes: Math.floor(Math.random() * 500) + 10,
      timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      link: '#'
    };
  });
};

const createProduct = (
  name: string, 
  category: Category, 
  companyType: CompanyType, 
  baseScore: number, 
  buzz: number,
  customPros: string[] = [],
  customCons: string[] = [],
  customTopics: string[] = []
): Product => {
  const volatility = companyType === 'Startup' ? 15 : companyType === 'Government Service' ? 20 : 5;
  
  return {
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`,
    description: `Leading ${category.toLowerCase()} platform in India.`,
    category,
    pricingTier: companyType === 'Government Service' ? 'Free' : 'Freemium / Paid',
    website: `https://${name.toLowerCase().replace(/\s+/g, '')}.in`,
    launchYear: 2010 + Math.floor(Math.random() * 12),
    headquarters: ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Chennai', 'Hyderabad'][Math.floor(Math.random() * 5)],
    companyType,
    overallScore: baseScore,
    marketBuzz: buzz,
    platformBreakdown: [
      { source: 'X' as PlatformSource, score: Math.max(0, Math.min(100, baseScore + (Math.random() * 20 - 10))), mentions: Math.floor(buzz * 0.4), engagement: Math.floor(buzz * 4.5) },
      { source: 'Reddit' as PlatformSource, score: Math.max(0, Math.min(100, baseScore - 10 + (Math.random() * 15 - 7.5))), mentions: Math.floor(buzz * 0.2), engagement: Math.floor(buzz * 2.1) },
      { source: 'LinkedIn' as PlatformSource, score: Math.max(0, Math.min(100, baseScore + 15 + (Math.random() * 10 - 5))), mentions: Math.floor(buzz * 0.25), engagement: Math.floor(buzz * 3.2) },
      { source: 'Hacker News' as PlatformSource, score: Math.max(0, Math.min(100, baseScore - 5 + (Math.random() * 20 - 10))), mentions: Math.floor(buzz * 0.05), engagement: Math.floor(buzz * 0.8) },
      { source: 'YouTube' as PlatformSource, score: Math.max(0, Math.min(100, baseScore + 5 + (Math.random() * 15 - 7.5))), mentions: Math.floor(buzz * 0.1), engagement: Math.floor(buzz * 5.5) },
    ].map(p => ({ ...p, score: Math.round(p.score) })),
    trendData: generateTrendData(baseScore, volatility),
    topPositiveMentions: generateMentions(name, 'positive', 5),
    topNegativeMentions: generateMentions(name, 'negative', 5),
    pros: customPros.length ? customPros : ['Easy to use', 'Good for Indian market', 'Reliable'],
    cons: customCons.length ? customCons : ['Customer support', 'Occasional bugs', 'Pricing changes'],
    userSegments: ['Individuals', 'Small Businesses', 'Enterprises'],
    trendingTopics: customTopics.length ? customTopics : ['New UI Update', 'Pricing', 'Server Uptime'],
    sentimentShift30Days: Math.round((Math.random() * 30) - 15)
  };
};

export const products: Product[] = [
  // Fintech
  createProduct('Zerodha', 'Fintech', 'Enterprise', 88, 15000, ['Low brokerage', 'Kite UI is excellent', 'Reliable tech'], ['Customer support can be slow', 'Occasional glitches on high volatility days'], ['Kite 3.0', 'Direct Mutual Funds', 'Options Trading']),
  createProduct('Razorpay', 'Fintech', 'Enterprise', 85, 12000, ['Developer friendly APIs', 'High success rate', 'Great dashboard'], ['Strict onboarding', 'High pricing for startups'], ['Payment Gateway', 'RazorpayX', 'International Payments']),
  createProduct('Paytm', 'Fintech', 'Enterprise', 65, 25000, ['Ubiquitous', 'All-in-one app'], ['Cluttered UI', 'Regulatory issues', 'Too many notifications'], ['RBI Guidelines', 'Soundbox', 'Wallet']),
  createProduct('PhonePe', 'Fintech', 'Enterprise', 78, 22000, ['Fast UPI', 'Clean UI', 'Good rewards initially'], ['Insurance spam', 'Platform fees'], ['UPI Lite', 'Wealth Management', 'SmartSpeaker']),
  createProduct('BharatPe', 'Fintech', 'Growth Stage', 60, 8000, ['Zero fee QR', 'Easy loans for merchants'], ['Management controversies', 'Aggressive sales'], ['Merchant Loans', 'PostPe', 'Swipe Machine']),
  createProduct('Groww', 'Fintech', 'Growth Stage', 82, 10000, ['Beginner friendly', 'Zero AMC', 'Clean UI'], ['Advanced charts missing', 'Customer support'], ['Mutual Funds', 'US Stocks', 'F&O']),
  createProduct('CRED', 'Fintech', 'Growth Stage', 70, 18000, ['Great design', 'Smooth experience', 'Good rewards for high spenders'], ['Rewards devaluation', 'Confusing UI sometimes', 'Data privacy concerns'], ['CRED UPI', 'CRED Garage', 'Coins value']),

  // Consumer Apps
  createProduct('Swiggy', 'Food Delivery', 'Enterprise', 75, 20000, ['Instamart is fast', 'Good restaurant coverage', 'Swiggy One'], ['High platform fees', 'Surge pricing', 'Customer support bots'], ['Instamart', 'Platform Fee', 'Dineout']),
  createProduct('Zomato', 'Food Delivery', 'Enterprise', 76, 21000, ['Great UI/UX', 'Blinkit integration', 'Funny marketing'], ['High delivery charges', 'Restaurant prices inflated'], ['Blinkit', 'Gold Membership', 'Profitability']),
  createProduct('Ola', 'Mobility', 'Enterprise', 55, 15000, ['Wide availability', 'Ola Electric integration'], ['Driver cancellations', 'Poor car conditions', 'Surge pricing'], ['Ola Electric', 'Prime Plus', 'Driver Issues']),
  createProduct('Uber India', 'Mobility', 'Enterprise', 68, 16000, ['Better car quality', 'Global app standard'], ['High surge pricing', 'Driver cancellations'], ['Uber Moto', 'Intercity', 'Wait times']),
  createProduct('Dunzo', 'Food Delivery', 'Startup', 45, 5000, ['Pioneered quick commerce', 'Good for custom tasks'], ['Operations scaling down', 'Delayed deliveries recently'], ['Funding issues', 'Reliance acquisition', 'Service areas']),
  createProduct('Zepto', 'Food Delivery', 'Growth Stage', 80, 12000, ['Consistently 10 mins', 'Good fresh produce', 'Clean app'], ['Limited coverage', 'High delivery fee on small orders'], ['Quick Commerce', 'Zepto Pass', 'Fresh Groceries']),

  // SaaS
  createProduct('Zoho', 'SaaS / DevTools', 'Enterprise', 89, 14000, ['Incredible value', 'Massive suite of apps', 'Privacy focused'], ['UI feels dated', 'Steep learning curve for some apps'], ['Zoho One', 'Bootstrapped', 'Data Privacy']),
  createProduct('Freshworks', 'SaaS / DevTools', 'Enterprise', 82, 11000, ['Easy to set up', 'Good UI', 'Affordable for SMBs'], ['Enterprise features lacking', 'Support can be slow'], ['Freshdesk', 'AI Features', 'Nasdaq Listing']),
  createProduct('Postman', 'SaaS / DevTools', 'Enterprise', 92, 18000, ['Industry standard', 'Great collaborative features', 'Easy to use'], ['Getting bloated', 'Pricing changes'], ['API Testing', 'Workspaces', 'v10 Release']),
  createProduct('BrowserStack', 'SaaS / DevTools', 'Enterprise', 85, 9000, ['Huge device coverage', 'Reliable infrastructure'], ['Expensive', 'Sometimes slow on real devices'], ['Automated Testing', 'Real Devices', 'Appium']),
  createProduct('Chargebee', 'SaaS / DevTools', 'Growth Stage', 80, 6000, ['Handles complex billing', 'Good integrations'], ['Complex setup', 'Expensive for early stage'], ['Subscription Management', 'RevRec', 'B2B SaaS']),

  // Government Digital Platforms
  createProduct('UPI', 'Government Digital Services', 'Government Service', 95, 50000, ['Revolutionary', 'Instant', 'Zero cost for users'], ['Occasional bank server downtime', 'Transaction limits'], ['NPCI', 'Global Expansion', 'UPI Lite']),
  createProduct('Aadhaar', 'Government Digital Services', 'Government Service', 70, 30000, ['Universal identity', 'Enables direct benefit transfer'], ['Privacy concerns', 'Biometric failures', 'Linking mandates'], ['UIDAI', 'Data Privacy', 'e-KYC']),
  createProduct('DigiLocker', 'Government Digital Services', 'Government Service', 85, 15000, ['Very convenient', 'Legally valid documents', 'Saves carrying physical copies'], ['UI is basic', 'Sometimes documents fail to fetch'], ['Driving License', 'Mark sheets', 'Digital India']),
  createProduct('CoWIN', 'Government Digital Services', 'Government Service', 88, 20000, ['Scaled incredibly well', 'Easy certificate download'], ['Initial slot booking chaos', 'OTP issues sometimes'], ['Vaccination', 'Digital Certificate', 'Open API']),
  createProduct('IRCTC', 'Government Digital Services', 'Government Service', 40, 40000, ['Massive scale', 'Monopoly'], ['Terrible UI', 'Crashes during Tatkal', 'Captchas are annoying'], ['Tatkal Booking', 'Server Downtime', 'Vande Bharat']),
  createProduct('ONDC', 'Government Digital Services', 'Government Service', 75, 18000, ['Democratizing e-commerce', 'Lower prices for consumers'], ['Delivery logistics still patchy', 'App experience varies'], ['Food Delivery', 'Network Participants', 'Discounts']),
  createProduct('GST Portal', 'Government Digital Services', 'Government Service', 50, 12000, ['Centralized system'], ['Frequent crashes on deadline days', 'Complex UI', 'Slow loading'], ['Tax Filing', 'Server Issues', 'Compliance']),
  createProduct('FASTag', 'Government Digital Services', 'Government Service', 82, 14000, ['Saves time at tolls', 'Cashless'], ['Double deduction issues', 'Scanner failures at some plazas'], ['NHAI', 'KYC Updates', 'Toll Plaza']),

  // EdTech
  createProduct('BYJU’S', 'EdTech', 'Enterprise', 30, 25000, ['Good content library', 'Tablet learning'], ['Aggressive sales tactics', 'Financial troubles', 'Toxic work culture'], ['Layoffs', 'Debt', 'Sales Practices']),
  createProduct('Unacademy', 'EdTech', 'Enterprise', 65, 15000, ['Top educators', 'Good app experience'], ['High pricing', 'Frequent strategy changes'], ['UPSC', 'Layoffs', 'Offline Centers']),
  createProduct('PhysicsWallah', 'EdTech', 'Growth Stage', 88, 20000, ['Extremely affordable', 'Great teacher connection', 'Profitable'], ['App can be buggy', 'Scaling too fast into offline'], ['Alakh Pandey', 'Affordability', 'Vidyapeeth']),
  createProduct('Vedantu', 'EdTech', 'Growth Stage', 60, 8000, ['Good live classes', 'Interactive whiteboard'], ['High pricing', 'Aggressive marketing'], ['Live Learning', 'K-12', 'Acquisitions']),

  // Ecommerce
  createProduct('Flipkart', 'Ecommerce', 'Enterprise', 72, 22000, ['Big Billion Days', 'Good logistics in tier 2/3'], ['Customer service declining', 'Fake products issue'], ['BBD Sale', 'Walmart', 'Grocery']),
  createProduct('Myntra', 'Ecommerce', 'Enterprise', 80, 15000, ['Great fashion selection', 'Easy returns'], ['Convenience fee', 'App becoming bloated with videos'], ['EORS Sale', 'Fashion', 'Return Policy']),
  createProduct('Meesho', 'Ecommerce', 'Growth Stage', 75, 18000, ['Very affordable', 'Great for tier 2/3/4 cities'], ['Quality issues', 'Slow delivery'], ['Zero Commission', 'Resellers', 'Tier 2 India']),
  createProduct('Nykaa', 'Ecommerce', 'Enterprise', 82, 12000, ['Authentic beauty products', 'Great variety'], ['Stock issues', 'High pricing sometimes'], ['Beauty', 'Pink Friday Sale', 'Offline Stores']),

  // HealthTech
  createProduct('Practo', 'HealthTech', 'Enterprise', 68, 8000, ['Easy doctor discovery', 'Online consultations'], ['Fake reviews issue', 'High fees for doctors'], ['Teleconsultation', 'Clinic Management', 'Medicine Delivery']),
  createProduct('1mg', 'HealthTech', 'Enterprise', 80, 10000, ['Reliable medicine delivery', 'Good lab tests'], ['Delivery can be slow sometimes', 'Tata Neu integration issues'], ['Tata Neu', 'Lab Tests', 'Discounts']),
  createProduct('Pharmeasy', 'HealthTech', 'Enterprise', 65, 9000, ['Good discounts', 'Wide coverage'], ['Financial struggles', 'Delayed deliveries'], ['Funding', 'Diagnostics', 'Debt']),

  // Mobility
  createProduct('Rapido', 'Mobility', 'Growth Stage', 78, 12000, ['Cheap', 'Fast in traffic'], ['Safety concerns', 'Regulatory issues in some states'], ['Bike Taxi', 'Auto', 'SaaS Model']),
  createProduct('Bounce', 'Mobility', 'Startup', 55, 4000, ['Convenient for short trips'], ['Poor scooter maintenance', 'Availability issues'], ['EV Transition', 'Hardware', 'Pricing']),
  createProduct('Yulu', 'Mobility', 'Startup', 70, 5000, ['Eco-friendly', 'Good for last mile'], ['Limited to specific zones', 'App glitches'], ['Miracle', 'Delivery Partners', 'Battery Swapping']),
];

// Add some specific edge cases as requested
const irctc = products.find(p => p.name === 'IRCTC');
if (irctc) {
  irctc.sentimentShift30Days = -25;
  irctc.topNegativeMentions.unshift({
    id: 'irctc-viral-1',
    username: '@traveler_ind',
    platform: 'X',
    content: 'IRCTC booking still crashes during Tatkal. 2026 and we still deal with this. Absolute nightmare.',
    sentiment: 'negative',
    likes: 15400,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    link: '#'
  });
}

const ondc = products.find(p => p.name === 'ONDC');
if (ondc) {
  ondc.sentimentShift30Days = +18;
  ondc.topPositiveMentions.unshift({
    id: 'ondc-viral-1',
    username: '@tech_optimist',
    platform: 'LinkedIn',
    content: 'Just ordered lunch via ONDC. 30% cheaper than Swiggy/Zomato. The open network protocol is truly democratizing Indian e-commerce!',
    sentiment: 'positive',
    likes: 3200,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    link: '#'
  });
}

const byjus = products.find(p => p.name === 'BYJU’S');
if (byjus) {
  byjus.sentimentShift30Days = -15;
}

const zerodha = products.find(p => p.name === 'Zerodha');
if (zerodha) {
  zerodha.sentimentShift30Days = +5;
}

export const viralConversations: Mention[] = [
  irctc?.topNegativeMentions[0],
  ondc?.topPositiveMentions[0],
  {
    id: 'viral-3',
    username: '@dev_india',
    platform: 'Hacker News',
    content: 'Zoho quietly crossing $1B in revenue while remaining bootstrapped is the most underrated story in Indian SaaS.',
    sentiment: 'positive',
    likes: 850,
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    link: '#'
  },
  {
    id: 'viral-4',
    username: '@fintech_watcher',
    platform: 'X',
    content: 'Paytm\'s new UI update is polarizing. Some love the clean look, others can\'t find the basic recharge button anymore.',
    sentiment: 'neutral',
    likes: 4200,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    link: '#'
  }
].filter(Boolean) as Mention[];

export const trendingProducts = [...products].sort((a, b) => Math.abs(b.sentimentShift30Days) - Math.abs(a.sentimentShift30Days)).slice(0, 5);
