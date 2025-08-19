import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Groups from './pages/Groups';
import Content from './pages/Content';
import Reports from './pages/Reports';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminCoupons from './pages/AdminCoupons';
import { mockUser } from './data/mock';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and check for saved auth
    const savedUser = localStorage.getItem('user');
    const savedAdmin = localStorage.getItem('isAdmin');
    
    setTimeout(() => {
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      if (savedAdmin) {
        setIsAdmin(JSON.parse(savedAdmin));
      }
      setLoading(false);
    }, 500);
  }, []);

  const handleLogin = (userData, adminStatus = false) => {
    setUser(userData);
    setIsAdmin(adminStatus);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isAdmin', JSON.stringify(adminStatus));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/" 
            element={
              <Layout user={user} onLogout={handleLogout}>
                <Landing />
              </Layout>
            } 
          />
          <Route 
            path="/login" 
            element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} 
          />
          <Route 
            path="/register" 
            element={user ? <Navigate to="/dashboard" /> : <Register onLogin={handleLogin} />} 
          />

          {/* Protected User Routes */}
          <Route 
            path="/dashboard" 
            element={
              user && !isAdmin ? (
                <Layout user={user} onLogout={handleLogout}>
                  <Dashboard user={user} />
                </Layout>
              ) : (
                <Navigate to={user ? "/admin" : "/login"} />
              )
            } 
          />
          <Route 
            path="/groups" 
            element={
              user && !isAdmin ? (
                <Layout user={user} onLogout={handleLogout}>
                  <Groups />
                </Layout>
              ) : (
                <Navigate to={user ? "/admin" : "/login"} />
              )
            } 
          />
          <Route 
            path="/content" 
            element={
              user && !isAdmin ? (
                <Layout user={user} onLogout={handleLogout}>
                  <Content />
                </Layout>
              ) : (
                <Navigate to={user ? "/admin" : "/login"} />
              )
            } 
          />
          <Route 
            path="/reports" 
            element={
              user && !isAdmin ? (
                <Layout user={user} onLogout={handleLogout}>
                  <Reports />
                </Layout>
              ) : (
                <Navigate to={user ? "/admin" : "/login"} />
              )
            } 
          />

          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              user && isAdmin ? (
                <Layout user={user} onLogout={handleLogout}>
                  <AdminDashboard />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              user && isAdmin ? (
                <Layout user={user} onLogout={handleLogout}>
                  <AdminUsers />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/admin/coupons" 
            element={
              user && isAdmin ? (
                <Layout user={user} onLogout={handleLogout}>
                  <AdminCoupons />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            } 
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;