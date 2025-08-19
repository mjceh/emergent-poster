import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { 
  Search, 
  Filter, 
  MoreHorizontal,
  UserCheck,
  UserX,
  Ban,
  Eye,
  Edit,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { mockAdminUsers } from '../data/mock';
import { useToast } from '../hooks/use-toast';

const AdminUsers = () => {
  const [users, setUsers] = useState(mockAdminUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const { toast } = useToast();

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesFilter = filter === 'all' || user.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleStatusChange = (userId, newStatus) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    toast({
      title: "Status Updated",
      description: `User status changed to ${newStatus}`,
    });
  };

  const handleBlockUser = (userId) => {
    handleStatusChange(userId, 'blocked');
  };

  const handleActivateUser = (userId) => {
    handleStatusChange(userId, 'active');
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "User Deleted",
      description: "User has been permanently deleted",
      variant: "destructive",
    });
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsViewOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'expired': return 'text-yellow-600 bg-yellow-100';
      case 'blocked': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSubscriptionColor = (plan) => {
    switch (plan) {
      case 'premium': return 'text-purple-600 bg-purple-100';
      case 'pro': return 'text-blue-600 bg-blue-100';
      case 'basic': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage user accounts and subscriptions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {users.filter(u => u.status === 'active').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expired Users</CardTitle>
              <UserX className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {users.filter(u => u.status === 'expired').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blocked Users</CardTitle>
              <Ban className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {users.filter(u => u.status === 'blocked').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Users ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.phone}</div>
                      <div className="text-xs text-gray-500">
                        Joined: {new Date(user.joinedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <Badge className={getSubscriptionColor(user.subscription)}>
                        {user.subscription}
                      </Badge>
                      <div className="text-xs text-gray-500 mt-1">
                        {user.totalPosts} posts
                      </div>
                    </div>

                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewUser(user)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      {user.status === 'active' ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBlockUser(user.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleActivateUser(user.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <UserCheck className="h-4 w-4" />
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* View User Dialog */}
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>
                View and manage user information
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <p className="text-sm text-gray-600">{selectedUser.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <p className="text-sm text-gray-600">{selectedUser.phone}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Subscription</label>
                    <Badge className={getSubscriptionColor(selectedUser.subscription)}>
                      {selectedUser.subscription}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <Badge className={getStatusColor(selectedUser.status)}>
                      {selectedUser.status}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Join Date</label>
                    <p className="text-sm text-gray-600">
                      {new Date(selectedUser.joinedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Last Active</label>
                    <p className="text-sm text-gray-600">
                      {new Date(selectedUser.lastActive).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Total Posts</label>
                  <p className="text-sm text-gray-600">{selectedUser.totalPosts}</p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewOpen(false)}>
                Close
              </Button>
              {selectedUser?.status === 'active' ? (
                <Button 
                  onClick={() => {
                    handleBlockUser(selectedUser.id);
                    setIsViewOpen(false);
                  }}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Block User
                </Button>
              ) : (
                <Button 
                  onClick={() => {
                    handleActivateUser(selectedUser.id);
                    setIsViewOpen(false);
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Activate User
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminUsers;