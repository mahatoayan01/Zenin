import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut,
  ShoppingBag,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Filter,
  CreditCard,
  Phone,
  RefreshCw
} from 'lucide-react';
import { useOwner } from '../context/OwnerContext';
import { restaurantData } from '../data/restaurant';

export function OwnerDashboardPage() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, orders, payments, updateOrderStatus } = useOwner();

  const [statusFilter, setStatusFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'payments'

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/owner-login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  // Metrics
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);
  const pendingOrders = orders.filter((o) => o.orderStatus === 'Pending' || o.orderStatus === 'Preparing').length;
  const completedOrders = orders.filter((o) => o.orderStatus === 'Completed' || o.orderStatus === 'Delivered').length;

  const filteredOrders = orders.filter((ord) => {
    if (statusFilter === 'All') return true;
    return ord.orderStatus === statusFilter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Preparing':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'Completed':
      case 'Delivered':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Cancelled':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      default:
        return 'bg-brand-surface text-brand-cream border-brand-border';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-brand-border pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-brand-accent font-bold">
            ZENZI Cafe &bull; Management Portal
          </span>
          <h1 className="font-serif text-3xl font-extrabold text-brand-cream">
            Owner Dashboard
          </h1>
          <p className="text-xs text-brand-muted mt-1">
            Live order monitoring, status workflow updates & payment history.
          </p>
        </div>

        <button
          onClick={logout}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-card hover:bg-rose-500/20 text-brand-cream hover:text-rose-300 border border-brand-border hover:border-rose-500/40 text-xs font-semibold transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-brand-card border border-brand-border shadow-xl space-y-2">
          <div className="flex items-center justify-between text-brand-muted">
            <span className="text-xs font-medium uppercase tracking-wider">Total Orders</span>
            <div className="w-8 h-8 rounded-lg bg-brand-surface flex items-center justify-center text-brand-accent">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <span className="font-serif text-3xl font-bold text-brand-cream block">
            {totalOrders}
          </span>
          <span className="text-[11px] text-emerald-400 font-medium">
            Demo checkout sync active
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-brand-card border border-brand-border shadow-xl space-y-2">
          <div className="flex items-center justify-between text-brand-muted">
            <span className="text-xs font-medium uppercase tracking-wider">Total Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-brand-surface flex items-center justify-center text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <span className="font-serif text-3xl font-bold text-brand-cream block">
            ₹{totalRevenue.toLocaleString()}
          </span>
          <span className="text-[11px] text-brand-muted">
            Cumulative demo transactions
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-brand-card border border-brand-border shadow-xl space-y-2">
          <div className="flex items-center justify-between text-brand-muted">
            <span className="text-xs font-medium uppercase tracking-wider">Active / Pending</span>
            <div className="w-8 h-8 rounded-lg bg-brand-surface flex items-center justify-center text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <span className="font-serif text-3xl font-bold text-brand-cream block text-amber-400">
            {pendingOrders}
          </span>
          <span className="text-[11px] text-amber-300">
            Requires kitchen prep
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-brand-card border border-brand-border shadow-xl space-y-2">
          <div className="flex items-center justify-between text-brand-muted">
            <span className="text-xs font-medium uppercase tracking-wider">Delivered Orders</span>
            <div className="w-8 h-8 rounded-lg bg-brand-surface flex items-center justify-center text-emerald-400">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <span className="font-serif text-3xl font-bold text-brand-cream block text-emerald-400">
            {completedOrders}
          </span>
          <span className="text-[11px] text-brand-muted">
            Successfully completed
          </span>
        </div>
      </div>

      {/* Main View Tabs (Orders vs Payment History) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'orders'
                  ? 'bg-brand-accent text-brand-dark shadow'
                  : 'bg-brand-card text-brand-muted hover:text-brand-cream'
              }`}
            >
              Online Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'payments'
                  ? 'bg-brand-accent text-brand-dark shadow'
                  : 'bg-brand-card text-brand-muted hover:text-brand-cream'
              }`}
            >
              Payment History ({payments.length})
            </button>
          </div>

          {activeTab === 'orders' && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-xs text-brand-muted flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                Filter:
              </span>
              {['All', 'Pending', 'Preparing', 'Delivered', 'Completed', 'Cancelled'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold border transition-all ${
                    statusFilter === st
                      ? 'bg-brand-surface text-brand-cream border-brand-accent'
                      : 'bg-brand-dark/50 text-brand-muted border-brand-border hover:border-brand-muted'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* TAB 1: ONLINE ORDERS TABLE */}
        {activeTab === 'orders' && (
          <div className="bg-brand-card rounded-2xl border border-brand-border shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-brand-muted">
                <thead className="bg-brand-dark/70 text-brand-cream text-[11px] uppercase tracking-wider font-semibold border-b border-brand-border">
                  <tr>
                    <th className="py-3.5 px-4">Order ID</th>
                    <th className="py-3.5 px-4">Customer</th>
                    <th className="py-3.5 px-4">Type</th>
                    <th className="py-3.5 px-4">Items Summary</th>
                    <th className="py-3.5 px-4">Amount</th>
                    <th className="py-3.5 px-4">Status & Action</th>
                    <th className="py-3.5 px-4">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/40">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-8 text-center text-brand-muted">
                        No orders matching status "{statusFilter}".
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((ord) => (
                      <tr key={ord.orderId} className="hover:bg-brand-surface/40 transition-colors">
                        <td className="py-4 px-4 font-mono font-bold text-brand-accent">
                          {ord.orderId}
                        </td>
                        <td className="py-4 px-4">
                          <span className="block font-bold text-brand-cream">{ord.customerName}</span>
                          <span className="text-[10px] text-brand-muted flex items-center gap-1 mt-0.5">
                            <Phone className="w-2.5 h-2.5" />
                            {ord.customerPhone}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand-surface text-brand-cream border border-brand-border">
                            {ord.orderType}
                          </span>
                        </td>
                        <td className="py-4 px-4 max-w-xs">
                          <div className="text-[11px] text-brand-cream line-clamp-2">
                            {ord.items.map((it) => `${it.quantity}x ${it.name}`).join(', ')}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-serif font-bold text-sm text-brand-cream">
                            ₹{ord.totalAmount}
                          </span>
                          <span className="block text-[10px] text-brand-muted">
                            {ord.paymentMethod}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(
                                ord.orderStatus
                              )}`}
                            >
                              {ord.orderStatus}
                            </span>
                            {/* Live Status Switcher Dropdown */}
                            <select
                              value={ord.orderStatus}
                              onChange={(e) => updateOrderStatus(ord.orderId, e.target.value)}
                              className="bg-brand-dark border border-brand-border text-brand-cream text-[10px] rounded px-1.5 py-1 focus:outline-none focus:border-brand-accent"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Preparing">Preparing</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-[10px] text-brand-muted whitespace-nowrap">
                          {ord.timestamp}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: PAYMENT HISTORY TABLE */}
        {activeTab === 'payments' && (
          <div className="bg-brand-card rounded-2xl border border-brand-border shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-brand-muted">
                <thead className="bg-brand-dark/70 text-brand-cream text-[11px] uppercase tracking-wider font-semibold border-b border-brand-border">
                  <tr>
                    <th className="py-3.5 px-4">Payment ID</th>
                    <th className="py-3.5 px-4">Order ID</th>
                    <th className="py-3.5 px-4">Method</th>
                    <th className="py-3.5 px-4">Amount</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/40">
                  {payments.map((p) => (
                    <tr key={p.paymentId} className="hover:bg-brand-surface/40 transition-colors">
                      <td className="py-4 px-4 font-mono font-bold text-brand-gold">
                        {p.paymentId}
                      </td>
                      <td className="py-4 px-4 font-mono text-brand-accent">
                        {p.orderId}
                      </td>
                      <td className="py-4 px-4 text-brand-cream font-medium">
                        {p.method}
                      </td>
                      <td className="py-4 px-4 font-serif font-bold text-sm text-brand-cream">
                        ₹{p.amount}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            p.status === 'Success'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-[10px] text-brand-muted whitespace-nowrap">
                        {p.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
