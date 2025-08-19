import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';
import { ArrowLeft, Phone, KeyRound, User, CreditCard } from 'lucide-react';
import { mockUser, subscriptionPlans, paymentMethods } from '../data/mock';

const Register = ({ onLogin }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
    otp: '',
    selectedPlan: 'pro',
    paymentMethod: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!formData.phone || !formData.name) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      toast({
        title: "OTP Sent",
        description: `Verification code sent to ${formData.phone}`,
      });
    }, 1000);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!formData.otp) {
      toast({
        title: "Error",
        description: "Please enter the OTP code",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1000);
  };

  const handleCompleteRegistration = async (e) => {
    e.preventDefault();
    if (!formData.paymentMethod) {
      toast({
        title: "Error",
        description: "Please select a payment method",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      
      const newUser = {
        ...mockUser,
        name: formData.name,
        phone: formData.phone,
        subscription: {
          plan: formData.selectedPlan,
          expiryDate: '2025-08-15',
          status: 'pending_payment'
        }
      };

      onLogin(newUser, false);
      navigate('/dashboard');
      
      toast({
        title: "Registration Successful!",
        description: "Your account has been created. Complete payment to activate your subscription.",
      });
    }, 1000);
  };

  const selectedPlanData = subscriptionPlans.find(plan => plan.id === formData.selectedPlan);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Link to="/" className="flex items-center text-indigo-600 hover:text-indigo-800 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <Card className="border-none shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
            <CardDescription>
              {step === 1 && 'Enter your details to get started'}
              {step === 2 && 'Verify your phone number'}
              {step === 3 && 'Choose your plan and payment method'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+963 XXX XXX XXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Verification Code'}
                </Button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={formData.otp}
                      onChange={(e) => setFormData({...formData, otp: e.target.value})}
                      className="pl-10"
                      maxLength={6}
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Code sent to {formData.phone}. Use any 6-digit code for demo.
                  </p>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify Code'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setStep(1)} 
                  className="w-full"
                >
                  Change Details
                </Button>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleCompleteRegistration} className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Choose Your Plan</Label>
                  <div className="grid md:grid-cols-3 gap-4 mt-3">
                    {subscriptionPlans.map((plan) => (
                      <Card 
                        key={plan.id}
                        className={`cursor-pointer border-2 transition-all ${
                          formData.selectedPlan === plan.id 
                            ? 'border-indigo-500 ring-2 ring-indigo-200' 
                            : 'border-gray-200 hover:border-indigo-300'
                        }`}
                        onClick={() => setFormData({...formData, selectedPlan: plan.id})}
                      >
                        <CardHeader className="text-center pb-2">
                          <CardTitle className="text-lg">{plan.name}</CardTitle>
                          {plan.popular && <Badge className="mx-auto">Popular</Badge>}
                          <div className="text-2xl font-bold text-indigo-600">{plan.price}</div>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Payment Method</Label>
                  <div className="grid md:grid-cols-3 gap-4 mt-3">
                    {paymentMethods.map((method) => (
                      <Card 
                        key={method.id}
                        className={`cursor-pointer border-2 transition-all ${
                          formData.paymentMethod === method.id 
                            ? 'border-indigo-500 ring-2 ring-indigo-200' 
                            : 'border-gray-200 hover:border-indigo-300'
                        }`}
                        onClick={() => setFormData({...formData, paymentMethod: method.id})}
                      >
                        <CardHeader className="text-center">
                          <CardTitle className="text-lg">{method.name}</CardTitle>
                          <CardDescription>{method.description}</CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Order Summary</h4>
                  <div className="flex justify-between">
                    <span>{selectedPlanData?.name} Plan</span>
                    <span>{selectedPlanData?.price}</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    Payment will be manually confirmed by our team after transfer.
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Complete Registration'}
                </Button>
              </form>
            )}
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;