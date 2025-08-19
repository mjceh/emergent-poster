import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Eye,
  ThumbsUp,
  MessageCircle,
  Share2
} from 'lucide-react';
import { mockAnalytics, mockPosts } from '../data/mock';

const Reports = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [filter, setFilter] = useState('all');

  const filteredPosts = mockPosts.filter(post => {
    if (filter === 'all') return true;
    return post.status === filter;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600">Track your posting performance and engagement</p>
          </div>
          <div className="flex space-x-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">24 Hours</SelectItem>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="90d">90 Days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAnalytics.totalPosts}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {Math.round((mockAnalytics.successfulPosts / mockAnalytics.totalPosts) * 100)}%
              </div>
              <p className="text-xs text-muted-foreground">
                {mockAnalytics.successfulPosts} successful posts
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Engagement</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{mockAnalytics.totalEngagement}</div>
              <p className="text-xs text-muted-foreground">
                +18% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Failed Posts</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{mockAnalytics.failedPosts}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((mockAnalytics.failedPosts / mockAnalytics.totalPosts) * 100)}% of total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Performance Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Weekly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnalytics.weeklyStats.map((stat, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-12 text-sm font-medium">{stat.day}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="text-sm">Posts: {stat.posts}</div>
                      <div className="text-sm text-green-600">Success: {stat.success}</div>
                      <div className="text-sm text-red-600">Failed: {stat.posts - stat.success}</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(stat.success / stat.posts) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    {Math.round((stat.success / stat.posts) * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Groups */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Groups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalytics.topPerformingGroups.map((group, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{group.name}</div>
                      <div className="text-sm text-gray-600">{group.posts} posts</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-blue-600">{group.engagement}</div>
                      <div className="text-sm text-gray-600">engagement</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Engagement Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <ThumbsUp className="h-5 w-5 text-blue-600 mr-2" />
                    <span>Likes</span>
                  </div>
                  <div className="font-bold">1,840</div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <MessageCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Comments</span>
                  </div>
                  <div className="font-bold">650</div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <Share2 className="h-5 w-5 text-purple-600 mr-2" />
                    <span>Shares</span>
                  </div>
                  <div className="font-bold">350</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Post History */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Post History</CardTitle>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Posts</SelectItem>
                  <SelectItem value="success">Successful</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div key={post.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    {getStatusIcon(post.status)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{post.content}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span>{post.groups.join(', ')}</span>
                      <span>•</span>
                      <span>{post.accounts[0]}</span>
                      <span>•</span>
                      <span>{new Date(post.scheduledAt).toLocaleString()}</span>
                    </div>
                    {post.error && (
                      <p className="text-sm text-red-600 mt-1">{post.error}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {post.engagement && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <ThumbsUp className="h-3 w-3" />
                        <span>{post.engagement.likes}</span>
                        <MessageCircle className="h-3 w-3" />
                        <span>{post.engagement.comments}</span>
                        <Share2 className="h-3 w-3" />
                        <span>{post.engagement.shares}</span>
                      </div>
                    )}
                    <Badge className={getStatusColor(post.status)}>
                      {post.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
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

export default Reports;