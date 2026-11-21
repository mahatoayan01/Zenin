import React, { createContext, useContext, useState, useEffect } from 'react';
import { restaurantData } from '../data/restaurant';

const OwnerContext = createContext(null);

export function OwnerProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem('zenzi_owner_logged_in') === 'true';
    } catch (e) {
      console.error('Failed checking auth state', e);
      return false;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const stored = localStorage.getItem('zenzi_orders');
      if (stored) {
        return JSON.parse(stored);
      }
      // Initial seed from restaurantData
      return restaurantData.sampleOrders;
    } catch (e) {
      console.error('Failed loading orders', e);
      return restaurantData.sampleOrders;
    }
  });

  const [payments, setPayments] = useState(() => {
    try {
      const stored = localStorage.getItem('zenzi_payments');
      if (stored) {
        return JSON.parse(stored);
      }
      return restaurantData.samplePayments;
    } catch (e) {
      console.error('Failed loading payments', e);
      return restaurantData.samplePayments;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('zenzi_owner_logged_in', isAuthenticated ? 'true' : 'false');
    } catch (e) {
      console.error('Failed persisting auth state', e);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    try {
      localStorage.setItem('zenzi_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed persisting orders', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('zenzi_payments', JSON.stringify(payments));
    } catch (e) {
      console.error('Failed persisting payments', e);
    }
  }, [payments]);

  const login = (username, password) => {
    if (
      username.trim() === restaurantData.credentials.username &&
      password.trim() === restaurantData.credentials.password
    ) {
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials. Use owner / demo123' };
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const addOrder = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);

    // Also register corresponding payment
    const newPayment = {
      paymentId: `PAY-${Math.floor(1000 + Math.random() * 9000)}`,
      orderId: newOrder.orderId,
      method: newOrder.paymentMethod,
      amount: newOrder.totalAmount,
      status: newOrder.paymentMethod.includes('Cash') ? 'Pending' : 'Success',
      date: newOrder.timestamp
    };
    setPayments(prev => [newPayment, ...prev]);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(ord => (ord.orderId === orderId ? { ...ord, orderStatus: newStatus } : ord))
    );
  };

  return (
    <OwnerContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        orders,
        payments,
        addOrder,
        updateOrderStatus
      }}
    >
      {children}
    </OwnerContext.Provider>
  );
}

export function useOwner() {
  const context = useContext(OwnerContext);
  if (!context) {
    throw new Error('useOwner must be used within an OwnerProvider');
  }
  return context;
}
