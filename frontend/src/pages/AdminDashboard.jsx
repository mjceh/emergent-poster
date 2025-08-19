import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  UserCheck,
  UserX,
  Gift,
  BarChart3,
  Settings,
  Eye
} from 'lucide-react';
import { mockAdminUsers, mockCoupons, mockAnalytics } from '../data/mock';

const AdminDashboard = () => {
  const totalUsers = mockAdminUsers.length;
  const activeUsers = mockAdminUsers.filter(user => user.status === 'active').length;
  const expiredUsers = mockAdminUsers.filter(user => user.status === 'expired').length;
  const totalRevenue = 2450000; // Mock revenue in SYP
  const activeCoupons = mockCoupons.filter(coupon => coupon.status === 'active').length;

  const recentUsers = mockAdminUsers.slice(0, 5);
  const recentActivity = [
    { id: 1, action: 'New user registration', user: 'Ahmed Hassan', time: '2 hours ago', type: 'user' },
    { id: 2, action: 'Payment received', user: 'Fatima Al-Zahra', time: '3 hours ago', type: 'payment' },
    { id: 3, action: 'Coupon redeemed', user: 'Mohammad Ali', time: '5 hours ago', type: 'coupon' },
    { id: 4, action: 'Subscription renewed', user: 'Sara Khalil', time: '1 day ago', type: 'payment' },
    { id: 5, action: 'User blocked', user: 'John Doe', time: '1 day ago', type: 'user' }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user': return <Users className="h-4 w-4 text-blue-500" />;
      case 'payment': return <DollarSign className="h-4 w-4 text-green-500" />;
      case 'coupon': return <Gift className="h-4 w-4 text-purple-500" />;
      default: return <BarChart3 className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor and manage your AutoPost Pro platform</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                +3 new this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeUsers}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((activeUsers / totalUsers) * 100)}% of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expired Users</CardTitle>
              <UserX className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{expiredUsers}</div>
              <p className="text-xs text-muted-foreground">
                Need attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRevenue.toLocaleString()} SYP</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Coupons</CardTitle>
              <Gift className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{activeCoupons}</div>
              <p className="text-xs text-muted-foreground">
                Available for use
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-blue-600" />
                <CardTitle>User Management</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Manage user accounts, subscriptions, and access</p>
              <Link to="/admin/users">
                <Button className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  View Users
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Gift className="h-6 w-6 text-purple-600" />
                <CardTitle>Coupon Management</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Create and manage discount coupons</p>
              <Link to="/admin/coupons">
                <Button className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  Manage Coupons
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Settings className="h-6 w-6 text-gray-600" />
                <CardTitle>System Settings</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Configure platform settings and preferences</p>
              <Button className="w-full" variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.phone}</div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        className={
                          user.status === 'active' 
                            ? 'text-green-600 bg-green-100' 
                            : 'text-red-600 bg-red-100'
                        }
                      >
                        {user.status}
                      </Badge>
                      <div className="text-sm text-gray-600 mt-1">{user.subscription}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link to="/admin/users">
                  <Button variant="outline" className="w-full">
                    View All Users
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <div className="flex-shrink-0">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{activity.action}</div>
                      <div className="text-sm text-gray-600">
                        {activity.user} • {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;