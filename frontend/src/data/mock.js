// Mock data for auto-post SaaS platform

export const subscriptionPlans = [
  {
    id: 'basic',
    name: 'Basic',
    price: '15,000 SYP',
    duration: 'monthly',
    features: [
      'Up to 5 posts per day',
      'Link 2 Facebook accounts',
      'Join 10 groups maximum',
      'Basic content library',
      'Email support'
    ],
    limits: {
      postsPerDay: 5,
      linkedAccounts: 2,
      maxGroups: 10
    }
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '35,000 SYP',
    duration: 'monthly',
    popular: true,
    features: [
      'Up to 25 posts per day',
      'Link 5 Facebook accounts',
      'Join 50 groups maximum',
      'Advanced content library',
      'Scheduling features',
      'Priority support'
    ],
    limits: {
      postsPerDay: 25,
      linkedAccounts: 5,
      maxGroups: 50
    }
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '60,000 SYP',
    duration: 'monthly',
    features: [
      'Unlimited posts per day',
      'Link 15 Facebook accounts',
      'Join unlimited groups',
      'Full content library access',
      'Advanced analytics',
      'Custom scheduling',
      'WhatsApp support',
      'API access'
    ],
    limits: {
      postsPerDay: -1, // unlimited
      linkedAccounts: 15,
      maxGroups: -1 // unlimited
    }
  }
];

export const paymentMethods = [
  {
    id: 'mtn',
    name: 'MTN Cash',
    icon: 'smartphone',
    description: 'Pay using MTN mobile wallet'
  },
  {
    id: 'syriatel',
    name: 'Syriatel Cash',
    icon: 'phone',
    description: 'Pay using Syriatel mobile wallet'
  },
  {
    id: 'coupon',
    name: 'Coupon Code',
    icon: 'gift',
    description: 'Redeem a coupon code'
  }
];

export const mockUser = {
  id: 'user_123',
  phone: '+963988123456',
  name: 'Ahmed Hassan',
  email: 'ahmed@example.com',
  subscription: {
    plan: 'pro',
    expiryDate: '2025-08-15',
    status: 'active'
  },
  linkedAccounts: [
    {
      id: 'fb_1',
      name: 'Ahmed Hassan',
      profilePic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      status: 'active'
    },
    {
      id: 'fb_2',
      name: 'Business Page',
      profilePic: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
      status: 'active'
    }
  ]
};

export const mockGroups = [
  {
    id: 'group_1',
    name: 'Damascus Business Network',
    members: 15420,
    type: 'Business',
    activity: 'High',
    lastPost: '2 hours ago',
    joined: true
  },
  {
    id: 'group_2',
    name: 'Syrian Entrepreneurs',
    members: 8950,
    type: 'Business',
    activity: 'Medium',
    lastPost: '5 hours ago',
    joined: true
  },
  {
    id: 'group_3',
    name: 'Aleppo Local Community',
    members: 12300,
    type: 'Community',
    activity: 'High',
    lastPost: '1 hour ago',
    joined: false
  },
  {
    id: 'group_4',
    name: 'Tech Startups Syria',
    members: 3400,
    type: 'Technology',
    activity: 'Low',
    lastPost: '1 day ago',
    joined: true
  }
];

export const mockContent = [
  {
    id: 'content_1',
    type: 'text',
    title: 'Business Promotion Post',
    content: 'Exciting news! Our new service is now available across Syria. Contact us for more details and special offers.',
    createdAt: '2025-01-08',
    usageCount: 12
  },
  {
    id: 'content_2',
    type: 'image',
    title: 'Product Showcase',
    content: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    description: 'Professional product image for posts',
    createdAt: '2025-01-07',
    usageCount: 8
  },
  {
    id: 'content_3',
    type: 'video',
    title: 'Company Introduction',
    content: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    description: 'Company introduction video',
    createdAt: '2025-01-06',
    usageCount: 15
  }
];

export const mockPosts = [
  {
    id: 'post_1',
    content: 'Exciting news! Our new service is now available.',
    groups: ['Damascus Business Network', 'Syrian Entrepreneurs'],
    accounts: ['Ahmed Hassan'],
    status: 'success',
    scheduledAt: '2025-01-08T10:00:00',
    postedAt: '2025-01-08T10:02:00',
    engagement: { likes: 45, comments: 12, shares: 8 }
  },
  {
    id: 'post_2',
    content: 'Check out our latest product update!',
    groups: ['Tech Startups Syria'],
    accounts: ['Business Page'],
    status: 'pending',
    scheduledAt: '2025-01-08T14:00:00'
  },
  {
    id: 'post_3',
    content: 'Join our workshop this weekend.',
    groups: ['Damascus Business Network'],
    accounts: ['Ahmed Hassan'],
    status: 'failed',
    scheduledAt: '2025-01-07T16:00:00',
    error: 'Group posting limit reached'
  }
];

export const mockAnalytics = {
  totalPosts: 127,
  successfulPosts: 115,
  failedPosts: 12,
  totalEngagement: 2840,
  topPerformingGroups: [
    { name: 'Damascus Business Network', posts: 45, engagement: 1250 },
    { name: 'Syrian Entrepreneurs', posts: 32, engagement: 890 },
    { name: 'Tech Startups Syria', posts: 28, engagement: 540 }
  ],
  weeklyStats: [
    { day: 'Mon', posts: 8, success: 7 },
    { day: 'Tue', posts: 12, success: 11 },
    { day: 'Wed', posts: 15, success: 14 },
    { day: 'Thu', posts: 18, success: 16 },
    { day: 'Fri', posts: 22, success: 20 },
    { day: 'Sat', posts: 10, success: 9 },
    { day: 'Sun', posts: 6, success: 6 }
  ]
};

export const mockCoupons = [
  {
    id: 'coupon_1',
    code: 'WELCOME2025',
    discount: '50%',
    validUntil: '2025-02-28',
    usageCount: 45,
    maxUsage: 100,
    status: 'active'
  },
  {
    id: 'coupon_2',
    code: 'PREMIUM20',
    discount: '20%',
    validUntil: '2025-01-31',
    usageCount: 12,
    maxUsage: 50,
    status: 'active'
  }
];

export const mockAdminUsers = [
  {
    id: 'user_1',
    phone: '+963988123456',
    name: 'Ahmed Hassan',
    subscription: 'pro',
    status: 'active',
    joinedAt: '2024-12-15',
    lastActive: '2025-01-08',
    totalPosts: 127
  },
  {
    id: 'user_2',
    phone: '+963987654321',
    name: 'Fatima Al-Zahra',
    subscription: 'basic',
    status: 'active',
    joinedAt: '2025-01-02',
    lastActive: '2025-01-08',
    totalPosts: 23
  },
  {
    id: 'user_3',
    phone: '+963976543210',
    name: 'Mohammad Ali',
    subscription: 'premium',
    status: 'expired',
    joinedAt: '2024-11-20',
    lastActive: '2025-01-05',
    totalPosts: 89
  }
];