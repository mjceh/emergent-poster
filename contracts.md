# AutoPost Pro - API Contracts & Integration Plan

## Overview
This document outlines the API contracts and backend integration plan for the AutoPost Pro SaaS platform.

## Current Status: Frontend Complete with Mock Data ✅

### Features Implemented:
- ✅ Beautiful, responsive landing page with pricing
- ✅ Phone number + OTP authentication system
- ✅ User dashboard with analytics
- ✅ Group management interface
- ✅ Content library management
- ✅ Reports and analytics pages
- ✅ Complete admin panel (users, coupons, analytics)
- ✅ Multi-role authentication (user/admin)
- ✅ Professional Syrian business-focused design

## Mock Data Currently Used

### Authentication Mock
- **File:** `/src/data/mock.js`
- **Data:** `mockUser` object with user profile, subscription, linked accounts
- **Demo Credentials:**
  - User: `+963988123456` / any 6-digit OTP
  - Admin: `+963999000000` / any 6-digit OTP

### Business Data Mocked
- **Subscription Plans:** 3 tiers (Basic, Pro, Premium) with Syrian pricing
- **Facebook Groups:** Sample Syrian business groups with engagement metrics
- **Content Library:** Text/image/video content templates
- **Analytics:** Post performance, engagement stats, success rates
- **Admin Data:** User management, coupon system, revenue tracking

## Required API Endpoints

### 1. Authentication APIs
```
POST /api/auth/send-otp
- Body: { phone: string }
- Response: { message: string, success: boolean }

POST /api/auth/verify-otp
- Body: { phone: string, otp: string }
- Response: { token: string, user: UserObject, isAdmin: boolean }

POST /api/auth/logout
- Headers: { Authorization: Bearer token }
- Response: { success: boolean }
```

### 2. User Management APIs
```
GET /api/user/profile
- Headers: { Authorization: Bearer token }
- Response: { user: UserObject, subscription: SubscriptionObject }

PUT /api/user/profile
- Body: { name?: string, email?: string }
- Response: { user: UserObject }

GET /api/user/subscription
- Response: { subscription: SubscriptionObject, usage: UsageObject }
```

### 3. Facebook Integration APIs
```
POST /api/facebook/link-account
- Body: { accessToken: string }
- Response: { account: FacebookAccountObject }

GET /api/facebook/accounts
- Response: { accounts: FacebookAccountObject[] }

DELETE /api/facebook/accounts/:id
- Response: { success: boolean }

GET /api/facebook/groups
- Query: { accountId?: string, search?: string, filter?: string }
- Response: { groups: FacebookGroupObject[] }

POST /api/facebook/join-group
- Body: { groupId: string, accountId: string }
- Response: { success: boolean }
```

### 4. Content Management APIs
```
GET /api/content
- Query: { type?: string, search?: string }
- Response: { content: ContentObject[] }

POST /api/content
- Body: { type: string, title: string, content: string, description?: string }
- Response: { content: ContentObject }

PUT /api/content/:id
- Body: { title?: string, content?: string, description?: string }
- Response: { content: ContentObject }

DELETE /api/content/:id
- Response: { success: boolean }
```

### 5. Posting APIs
```
POST /api/posts
- Body: { content: string, groups: string[], accounts: string[], scheduledAt?: Date }
- Response: { post: PostObject }

GET /api/posts
- Query: { status?: string, limit?: number, offset?: number }
- Response: { posts: PostObject[], total: number }

GET /api/posts/analytics
- Query: { timeRange?: string }
- Response: { analytics: AnalyticsObject }
```

### 6. Payment & Subscription APIs
```
POST /api/payments/initiate
- Body: { planId: string, paymentMethod: string }
- Response: { paymentId: string, instructions: PaymentInstructionsObject }

POST /api/payments/confirm
- Body: { paymentId: string, transactionRef: string }
- Response: { success: boolean }

GET /api/coupons/validate/:code
- Response: { valid: boolean, discount: string, coupon?: CouponObject }

POST /api/coupons/redeem
- Body: { code: string, planId: string }
- Response: { success: boolean, subscription: SubscriptionObject }
```

### 7. Admin APIs
```
GET /api/admin/users
- Query: { search?: string, status?: string, limit?: number, offset?: number }
- Response: { users: UserObject[], total: number }

PUT /api/admin/users/:id
- Body: { status?: string, subscription?: string }
- Response: { user: UserObject }

GET /api/admin/analytics
- Response: { analytics: AdminAnalyticsObject }

POST /api/admin/coupons
- Body: { code: string, discount: string, validUntil: Date, maxUsage: number }
- Response: { coupon: CouponObject }

GET /api/admin/coupons
- Response: { coupons: CouponObject[] }
```

## Database Schema Requirements

### Users Collection
```javascript
{
  _id: ObjectId,
  phone: String (unique),
  name: String,
  email: String (optional),
  isAdmin: Boolean (default: false),
  subscription: {
    plan: String, // 'basic', 'pro', 'premium'
    status: String, // 'active', 'expired', 'pending_payment'
    expiryDate: Date,
    createdAt: Date
  },
  linkedAccounts: [FacebookAccountObject],
  createdAt: Date,
  lastActive: Date
}
```

### Posts Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  content: String,
  type: String, // 'text', 'image', 'video'
  mediaUrl: String (optional),
  groups: [String], // Facebook group IDs
  accounts: [String], // Facebook account IDs  
  status: String, // 'pending', 'posted', 'failed'
  scheduledAt: Date,
  postedAt: Date (optional),
  engagement: {
    likes: Number,
    comments: Number, 
    shares: Number
  },
  error: String (optional),
  createdAt: Date
}
```

### Content Library Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  type: String, // 'text', 'image', 'video'
  title: String,
  content: String, // text content or URL
  description: String (optional),
  usageCount: Number (default: 0),
  createdAt: Date
}
```

### Coupons Collection
```javascript
{
  _id: ObjectId,
  code: String (unique),
  discount: String, // '20%' or '5000 SYP'
  validUntil: Date,
  maxUsage: Number,
  usageCount: Number (default: 0),
  status: String, // 'active', 'expired'
  createdAt: Date
}
```

## Integration Steps

### Phase 1: Authentication & User Management
1. Implement OTP SMS service integration
2. JWT token-based authentication
3. User profile management
4. Session management with Redis (optional)

### Phase 2: Payment System
1. Manual payment confirmation system
2. Syrian payment methods integration (MTN Cash, Syriatel Cash)
3. Coupon system implementation
4. Subscription management and tracking

### Phase 3: Facebook Integration
1. Facebook Graph API integration for account linking
2. Group discovery and management
3. Posting automation system
4. Engagement tracking

### Phase 4: Content & Analytics
1. Content library CRUD operations
2. Post scheduling system with queue
3. Analytics data collection
4. Reporting system with real-time updates

### Phase 5: Admin Features
1. User management system
2. Payment confirmation workflow
3. Analytics dashboard with real data
4. System monitoring and logs

## Security Considerations
- JWT token expiration and refresh
- Rate limiting on OTP requests
- Facebook API security and token management
- Input validation and sanitization
- Admin role protection
- Payment verification security

## Performance Optimizations
- Database indexing on frequently queried fields
- Caching for analytics data
- Background job processing for posts
- Image optimization and CDN usage
- API response pagination

## External Services Required
1. **SMS Service:** For OTP delivery (Twilio, or local Syrian SMS provider)
2. **Facebook Graph API:** For social media integration
3. **File Storage:** AWS S3 or similar for media content
4. **Queue Service:** Redis or similar for post scheduling
5. **Monitoring:** Application logging and error tracking

## Current Frontend Integration Points
All frontend components are ready and expect the above API responses. The mock data structure matches exactly what the backend should return, making integration seamless.