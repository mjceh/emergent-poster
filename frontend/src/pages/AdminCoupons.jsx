import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
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
  Plus, 
  Gift, 
  Edit, 
  Trash2, 
  Copy,
  Calendar,
  Users,
  Percent
} from 'lucide-react';
import { mockCoupons } from '../data/mock';
import { useToast } from '../hooks/use-toast';

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState(mockCoupons);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount: '',
    validUntil: '',
    maxUsage: '',
    description: ''
  });
  const { toast } = useToast();

  const handleCreateCoupon = () => {
    if (!newCoupon.code || !newCoupon.discount || !newCoupon.validUntil || !newCoupon.maxUsage) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const coupon = {
      id: `coupon_${Date.now()}`,
      code: newCoupon.code.toUpperCase(),
      discount: newCoupon.discount,
      validUntil: newCoupon.validUntil,
      maxUsage: parseInt(newCoupon.maxUsage),
      usageCount: 0,
      status: 'active'
    };

    setCoupons([coupon, ...coupons]);
    setNewCoupon({ code: '', discount: '', validUntil: '', maxUsage: '', description: '' });
    setIsCreateOpen(false);

    toast({
      title: "Success",
      description: "Coupon created successfully!",
    });
  };

  const handleDeleteCoupon = (id) => {
    setCoupons(coupons.filter(c => c.id !== id));
    toast({
      title: "Deleted",
      description: "Coupon deleted successfully!",
    });
  };

  const handleToggleStatus = (id) => {
    setCoupons(coupons.map(coupon => 
      coupon.id === id 
        ? { ...coupon, status: coupon.status === 'active' ? 'expired' : 'active' }
        : coupon
    ));
    toast({
      title: "Status Updated",
      description: "Coupon status changed successfully!",
    });
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied",
      description: "Coupon code copied to clipboard!",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'expired': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const generateCouponCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewCoupon({ ...newCoupon, code: result });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Coupon Management</h1>
            <p className="text-gray-600">Create and manage discount coupons</p>
          </div>
          
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Coupon
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Create New Coupon</DialogTitle>
                <DialogDescription>
                  Create a new discount coupon for users
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="code">Coupon Code</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="code"
                      value={newCoupon.code}
                      onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})}
                      placeholder="Enter coupon code"
                      className="flex-1"
                    />
                    <Button type="button" variant="outline" onClick={generateCouponCode}>
                      Generate
                    </Button>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="discount">Discount</Label>
                  <Input
                    id="discount"
                    value={newCoupon.discount}
                    onChange={(e) => setNewCoupon({...newCoupon, discount: e.target.value})}
                    placeholder="e.g., 20% or 5000 SYP"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="validUntil">Valid Until</Label>
                  <Input
                    id="validUntil"
                    type="date"
                    value={newCoupon.validUntil}
                    onChange={(e) => setNewCoupon({...newCoupon, validUntil: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="maxUsage">Maximum Usage</Label>
                  <Input
                    id="maxUsage"
                    type="number"
                    value={newCoupon.maxUsage}
                    onChange={(e) => setNewCoupon({...newCoupon, maxUsage: e.target.value})}
                    placeholder="e.g., 100"
                    min="1"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateCoupon}>Create Coupon</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Coupons</CardTitle>
              <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{coupons.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Coupons</CardTitle>
              <Gift className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {coupons.filter(c => c.status === 'active').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {coupons.reduce((sum, c) => sum + c.usageCount, 0)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expired Coupons</CardTitle>
              <Calendar className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {coupons.filter(c => c.status === 'expired').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coupons List */}
        <Card>
          <CardHeader>
            <CardTitle>Coupons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {coupons.map((coupon) => (
                <div key={coupon.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Gift className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-lg">{coupon.code}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyCode(coupon.code)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="text-sm text-gray-600">
                        {coupon.discount} discount • Valid until {new Date(coupon.validUntil).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {coupon.usageCount} / {coupon.maxUsage} used
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(coupon.usageCount / coupon.maxUsage) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <Badge className={getStatusColor(coupon.status)}>
                      {coupon.status}
                    </Badge>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleStatus(coupon.id)}
                      >
                        {coupon.status === 'active' ? (
                          <Calendar className="h-4 w-4" />
                        ) : (
                          <Gift className="h-4 w-4" />
                        )}
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCoupon(coupon.id)}
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

        {coupons.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No coupons found</h3>
              <p className="text-gray-600 mb-4">
                Create your first coupon to offer discounts to users.
              </p>
              <Button onClick={() => setIsCreateOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Coupon
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminCoupons;