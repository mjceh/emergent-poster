import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  AlertCircle, 
  Plus,
  Facebook,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { mockAnalytics, mockPosts, subscriptionPlans } from '../data/mock';

const Dashboard = ({ user }) => {
  const [timeRange, setTimeRange] = useState('7d');

  const userPlan = subscriptionPlans.find(plan => plan.id === user.subscription.plan);
  const subscriptionExpiry = new Date(user.subscription.expiryDate);
  const daysUntilExpiry = Math.ceil((subscriptionExpiry - new Date()) / (1000 * 60 * 60 * 24));

  // Calculate usage percentages
  const todayPosts = 8; // Mock data
  const postsProgress = userPlan?.limits.postsPerDay > 0 ? (todayPosts / userPlan.limits.postsPerDay) * 100 : 0;
  const accountsProgress = (user.linkedAccounts.length / userPlan?.limits.linkedAccounts) * 100;

  const recentPosts = mockPosts.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}!</p>
        </div>

        {/* Subscription Status */}
        {user.subscription.status === 'pending_payment' && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-orange-600 mr-3" />
                <div className="flex-1">
                  <p className="font-medium text-orange-800">Payment Pending</p>
                  <p className="text-sm text-orange-600">
                    Complete your payment to activate your {userPlan?.name} subscription
                  </p>
                </div>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  Complete Payment
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAnalytics.totalPosts}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((mockAnalytics.successfulPosts / mockAnalytics.totalPosts) * 100)}%
              </div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Engagement</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAnalytics.totalEngagement}</div>
              <p className="text-xs text-muted-foreground">
                +18% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Groups</CardTitle>
              <Facebook className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                3 new this week
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Usage Overview */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Usage Overview</CardTitle>
              <CardDescription>Your current plan limits and usage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Posts Today</span>
                  <span className="text-sm text-gray-600">
                    {todayPosts} / {userPlan?.limits.postsPerDay > 0 ? userPlan.limits.postsPerDay : '∞'}
                  </span>
                </div>
                <Progress value={postsProgress} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Linked Accounts</span>
                  <span className="text-sm text-gray-600">
                    {user.linkedAccounts.length} / {userPlan?.limits.linkedAccounts}
                  </span>
                </div>
                <Progress value={accountsProgress} className="h-2" />
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{userPlan?.name} Plan</p>
                    <p className="text-sm text-gray-600">
                      {daysUntilExpiry > 0 ? `Expires in ${daysUntilExpiry} days` : 'Expired'}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Upgrade Plan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Create New Post
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Facebook className="mr-2 h-4 w-4" />
                Link Facebook Account
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Find New Groups
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Posts
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
            <CardDescription>Your latest posting activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    {post.status === 'success' && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {post.status === 'pending' && (
                      <Clock className="h-5 w-5 text-yellow-500" />
                    )}
                    {post.status === 'failed' && (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{post.content}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span>{post.groups.length} groups</span>
                      <span>{post.accounts[0]}</span>
                      <span>{new Date(post.scheduledAt).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <Badge 
                      variant={
                        post.status === 'success' ? 'default' : 
                        post.status === 'pending' ? 'secondary' : 'destructive'
                      }
                    >
                      {post.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;