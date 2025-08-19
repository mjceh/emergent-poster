import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { CheckCircle, Zap, Shield, Users, BarChart3, Clock, Star, ArrowRight } from 'lucide-react';
import { subscriptionPlans } from '../data/mock';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Automate Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"> Facebook Posts </span>
            Like a Pro
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Schedule, manage, and automate your Facebook group posting without browser extensions. 
            Reach thousands of potential customers with our powerful SaaS platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link to="/register">
              <Button size="lg" className="px-8 py-3 text-lg">
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                Watch Demo
              </Button>
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-green-500" />
              <span>1000+ Active Users</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              <span>50,000+ Posts Automated</span>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-500" />
              <span>4.8/5 Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help Syrian businesses grow their online presence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Multi-Account Management</CardTitle>
                <CardDescription>
                  Connect multiple Facebook accounts and manage them all from one dashboard
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Smart Group Targeting</CardTitle>
                <CardDescription>
                  Find and join relevant Facebook groups with advanced filtering and analytics
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Advanced Scheduling</CardTitle>
                <CardDescription>
                  Schedule posts for optimal engagement times across different groups
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Detailed Analytics</CardTitle>
                <CardDescription>
                  Track performance with comprehensive reports and engagement metrics
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Secure & Reliable</CardTitle>
                <CardDescription>
                  Bank-level security with 99.9% uptime guarantee for your peace of mind
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Content Library</CardTitle>
                <CardDescription>
                  Store and reuse your best-performing content for consistent messaging
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your business needs. All plans include our core features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan) => (
              <Card key={plan.id} className={`relative border-none shadow-lg hover:shadow-xl transition-all ${plan.popular ? 'ring-2 ring-indigo-500 scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-indigo-600 text-white px-3 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-indigo-600 my-4">
                    {plan.price}
                    <span className="text-base font-normal text-gray-500">/{plan.duration}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/register" className="w-full block">
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Convenient Payment Options</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">MTN</div>
                <p className="text-gray-600">MTN Cash</p>
              </div>
            </div>
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">Syriatel</div>
                <p className="text-gray-600">Syriatel Cash</p>
              </div>
            </div>
            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">Coupon</div>
                <p className="text-gray-600">Coupon Codes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Social Media Strategy?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of Syrian businesses already growing with AutoPost Pro
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="px-8 py-3 text-lg">
                Start Your Free Trial
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-indigo-600">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">AutoPost Pro</h3>
              <p className="text-gray-400">
                The leading automation platform for Syrian businesses on social media.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/features" className="hover:text-white">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/demo" className="hover:text-white">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><a href="https://wa.me/963964850485" className="hover:text-white">WhatsApp Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Phone: 0964850485</li>
                <li>Support available 24/7</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AutoPost Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;