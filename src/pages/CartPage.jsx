import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  CreditCard,
  Smartphone,
  Banknote,
  Tag,
  Clock,
  MapPin
} from 'lucide-react';
import { restaurantData } from '../data/restaurant';
import { useCart } from '../context/CartContext';
import { useOwner } from '../context/OwnerContext';
import { ImageWithFallback } from '../components/ImageWithFallback';

export function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, subtotal } = useCart();
  const { addOrder } = useOwner();

  const [orderType, setOrderType] = useState('Delivery'); // 'Delivery' | 'Pickup'
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI' | 'Card' | 'Cash'
  const [placedOrder, setPlacedOrder] = useState(null);

  // Apply Coupon
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    const offer = restaurantData.offers.find((o) => o.code === code);

    if (offer) {
      setAppliedCoupon(offer);
    } else {
      setCouponError('Invalid promo code. Try ZENZI20');
    }
  };

  // Calculations
  const discountAmount = appliedCoupon
    ? Math.round((subtotal * appliedCoupon.discountPercent) / 100)
    : 0;
  const deliveryFee = orderType === 'Delivery' ? (subtotal > 500 ? 0 : 40) : 0;
  const totalAmount = Math.max(0, subtotal - discountAmount + deliveryFee);

  // Checkout submission
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    const newOrder = {
      orderId,
      customerName: customer.name || 'Demo Customer',
      customerPhone: customer.phone || '+91 98231 00000',
      customerAddress:
        orderType === 'Delivery'
          ? customer.address || 'Sangamvadi, Pune'
          : 'Self Pickup Counter (ZENZI Cafe)',
      orderType,
      items: cart.map((item) => ({
        name: item.dish.name,
        quantity: item.quantity,
        price: item.dish.price
      })),
      subtotal,
      discount: discountAmount,
      deliveryFee,
      totalAmount,
      paymentMethod:
        paymentMethod === 'UPI'
          ? 'UPI (Demo Payment)'
          : paymentMethod === 'Card'
          ? 'Card (Demo Payment)'
          : 'Cash on Delivery',
      paymentStatus: paymentMethod === 'Cash' ? 'Pending' : 'Paid (Demo)',
      orderStatus: 'Pending',
      timestamp
    };

    // Save order through context (which persists to localStorage and merges into owner dashboard)
    addOrder(newOrder);

    // Set confirmation view and clear cart
    setPlacedOrder(newOrder);
    clearCart();
  };

  // 1. ORDER CONFIRMATION SCREEN
  if (placedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8 animate-fadeIn">
        <div className="p-8 sm:p-12 rounded-3xl bg-brand-card border border-brand-accent/40 shadow-2xl space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-accent font-bold">
              Order Confirmed &bull; {placedOrder.orderId}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-cream">
              Thank You, {placedOrder.customerName}!
            </h1>
            <p className="text-xs sm:text-sm text-brand-muted max-w-md mx-auto">
              Your demo order has been placed successfully and synced directly to the Owner Dashboard.
            </p>
          </div>

          {/* Demo Disclaimer Alert */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-left text-xs text-amber-300 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Demo Notice</strong>
              <span>
                This was an interactive sales demonstration. No real money was charged, and your order was recorded in localStorage.
              </span>
            </div>
          </div>

          {/* Order Summary Receipt */}
          <div className="bg-brand-dark/70 rounded-2xl p-6 text-left border border-brand-border space-y-4 text-xs">
            <div className="flex justify-between border-b border-brand-border/60 pb-3">
              <span className="text-brand-muted">Order Type:</span>
              <span className="font-bold text-brand-cream">{placedOrder.orderType}</span>
            </div>
            <div className="flex justify-between border-b border-brand-border/60 pb-3">
              <span className="text-brand-muted">Estimated Prep Time:</span>
              <span className="font-bold text-brand-accent">25 – 35 Mins</span>
            </div>
            <div className="space-y-2 border-b border-brand-border/60 pb-3">
              <span className="text-brand-muted block font-semibold">Items Ordered:</span>
              {placedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-brand-cream">
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm font-bold pt-1">
              <span className="text-brand-cream">Total Amount:</span>
              <span className="text-brand-accent">₹{placedOrder.totalAmount}</span>
            </div>
          </div>

          {/* CTA actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/owner"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-brand-accent hover:bg-brand-accentHover text-brand-dark font-bold text-xs shadow-lg transition-all"
            >
              View in Owner Dashboard
            </Link>
            <Link
              to="/menu"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-brand-surface hover:bg-brand-card text-brand-cream border border-brand-border font-semibold text-xs transition-all"
            >
              Order More Dishes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. EMPTY CART VIEW
  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-brand-card border border-brand-border flex items-center justify-center mx-auto text-brand-muted">
          <ShoppingBag className="w-10 h-10 text-brand-muted" />
        </div>
        <div className="space-y-2">
          <h2 className="font-serif text-3xl font-bold text-brand-cream">
            Your Cart is Empty
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted max-w-sm mx-auto">
            You haven't added any delicious dishes from ZENZI yet. Explore our menu to start your order!
          </p>
        </div>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-accent hover:bg-brand-accentHover text-brand-dark font-bold text-sm shadow-xl transition-all"
        >
          <span>Browse Food Menu</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  // 3. MAIN CHECKOUT VIEW
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="space-y-2">
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-cream">
          Checkout & Order
        </h1>
        <p className="text-brand-muted text-xs sm:text-sm">
          Review your items, choose delivery or pickup, and complete demo checkout.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Cart Items & Customer Form (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Cart Items List */}
          <div className="bg-brand-card rounded-2xl border border-brand-border p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-brand-border pb-4">
              <h3 className="font-serif font-bold text-lg text-brand-cream">
                Cart Items ({cart.length})
              </h3>
              <button
                onClick={clearCart}
                className="text-xs text-rose-400 hover:text-rose-300 font-medium transition-colors"
              >
                Clear Cart
              </button>
            </div>

            <div className="divide-y divide-brand-border/50">
              {cart.map((item) => (
                <div key={item.dish.id} className="py-4 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-brand-surface shrink-0 border border-brand-border">
                    <ImageWithFallback
                      src={item.dish.image.path}
                      alt={item.dish.image.alt}
                      className="w-full h-full object-cover"
                      width="64"
                      height="64"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-sm text-brand-cream truncate">
                      {item.dish.name}
                    </h4>
                    <span className="text-xs text-brand-accent font-semibold">
                      ₹{item.dish.price} each
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 bg-brand-surface border border-brand-border rounded-full px-2 py-1">
                    <button
                      onClick={() => updateQuantity(item.dish.id, item.quantity - 1)}
                      className="p-1 rounded-full text-brand-cream hover:bg-brand-card transition-colors"
                      aria-label="Decrease"
                    >
                      <Minus className="w-3 h-3 text-brand-accent" />
                    </button>
                    <span className="text-xs font-bold text-brand-cream px-1.5">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.dish.id, item.quantity + 1)}
                      className="p-1 rounded-full text-brand-cream hover:bg-brand-card transition-colors"
                      aria-label="Increase"
                    >
                      <Plus className="w-3 h-3 text-brand-accent" />
                    </button>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="block font-bold text-sm text-brand-cream">
                      ₹{item.dish.price * item.quantity}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.dish.id)}
                      className="text-brand-muted hover:text-rose-400 p-1 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery vs Pickup Selector */}
          <div className="bg-brand-card rounded-2xl border border-brand-border p-6 shadow-xl space-y-4">
            <h3 className="font-serif font-bold text-lg text-brand-cream">
              Delivery or Pickup Choice
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setOrderType('Delivery')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  orderType === 'Delivery'
                    ? 'border-brand-accent bg-brand-accent/10 text-brand-cream'
                    : 'border-brand-border bg-brand-dark/50 text-brand-muted hover:text-brand-cream'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-brand-accent" />
                  <span className="font-bold text-sm">Home Delivery</span>
                </div>
                <p className="text-[11px] text-brand-muted">
                  Freshly prepared & delivered right to your door in Pune.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('Pickup')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  orderType === 'Pickup'
                    ? 'border-brand-accent bg-brand-accent/10 text-brand-cream'
                    : 'border-brand-border bg-brand-dark/50 text-brand-muted hover:text-brand-cream'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-brand-accent" />
                  <span className="font-bold text-sm">Self Pickup</span>
                </div>
                <p className="text-[11px] text-brand-muted">
                  Ready in 20 mins at ZENZI Cafe counter, Sangamvadi.
                </p>
              </button>
            </div>

            {/* Customer Details Form */}
            <div className="pt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-cream mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-dark/80 border border-brand-border text-brand-cream text-xs focus:outline-none focus:border-brand-accent placeholder-brand-muted/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-cream mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="+91 98231 XXXXX"
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-dark/80 border border-brand-border text-brand-cream text-xs focus:outline-none focus:border-brand-accent placeholder-brand-muted/50"
                  />
                </div>
              </div>

              {orderType === 'Delivery' && (
                <div>
                  <label className="block text-xs font-semibold text-brand-cream mb-1">
                    Delivery Address in Pune *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    placeholder="Flat/House no, Building, Street, Landmark"
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-dark/80 border border-brand-border text-brand-cream text-xs focus:outline-none focus:border-brand-accent placeholder-brand-muted/50"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-brand-cream mb-1">
                  Kitchen Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={customer.notes}
                  onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                  placeholder="e.g. Less spicy, extra green chutney, cutlery required"
                  className="w-full px-4 py-2.5 rounded-xl bg-brand-dark/80 border border-brand-border text-brand-cream text-xs focus:outline-none focus:border-brand-accent placeholder-brand-muted/50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Bill Summary & Demo Payment (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Promo Code Box */}
          <div className="bg-brand-card rounded-2xl border border-brand-border p-5 shadow-xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-muted flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-brand-accent" />
              <span>Promo Voucher</span>
            </h4>
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter ZENZI20"
                className="flex-1 px-3.5 py-2 rounded-xl bg-brand-dark/80 border border-brand-border text-brand-cream uppercase text-xs focus:outline-none focus:border-brand-accent placeholder-brand-muted/50 font-mono"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-brand-surface hover:bg-brand-accent hover:text-brand-dark text-brand-cream text-xs font-bold border border-brand-border transition-all"
              >
                Apply
              </button>
            </form>
            {appliedCoupon && (
              <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Code "{appliedCoupon.code}" applied! ({appliedCoupon.discountPercent}% Off)</span>
              </p>
            )}
            {couponError && <p className="text-xs text-rose-400">{couponError}</p>}
          </div>

          {/* Payment & Bill Summary */}
          <div className="bg-brand-card rounded-2xl border border-brand-border p-6 shadow-xl space-y-6">
            <h3 className="font-serif font-bold text-lg text-brand-cream border-b border-brand-border pb-3">
              Bill Summary
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-brand-muted">
                <span>Items Subtotal:</span>
                <span className="text-brand-cream font-medium">₹{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Promo Discount:</span>
                  <span>- ₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-brand-muted">
                <span>Delivery Charges:</span>
                <span className="text-brand-cream font-medium">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-400 font-semibold">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              <div className="pt-3 border-t border-brand-border flex justify-between text-base font-bold text-brand-cream">
                <span>To Pay:</span>
                <span className="text-brand-accent font-serif text-lg">
                  ₹{totalAmount}
                </span>
              </div>
            </div>

            {/* DEMO Payment Method Selection */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-muted">
                Select Demo Payment Method
              </h4>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left text-xs transition-all ${
                    paymentMethod === 'UPI'
                      ? 'border-brand-accent bg-brand-accent/10 text-brand-cream'
                      : 'border-brand-border bg-brand-dark/40 text-brand-muted hover:text-brand-cream'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-brand-accent shrink-0" />
                  <div>
                    <span className="font-bold block">UPI (Google Pay / PhonePe / Paytm)</span>
                    <span className="text-[10px] text-brand-muted">Instant UI simulation</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Card')}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left text-xs transition-all ${
                    paymentMethod === 'Card'
                      ? 'border-brand-accent bg-brand-accent/10 text-brand-cream'
                      : 'border-brand-border bg-brand-dark/40 text-brand-muted hover:text-brand-cream'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-brand-accent shrink-0" />
                  <div>
                    <span className="font-bold block">Credit / Debit Card</span>
                    <span className="text-[10px] text-brand-muted">Visa, MasterCard, Rupay</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Cash')}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left text-xs transition-all ${
                    paymentMethod === 'Cash'
                      ? 'border-brand-accent bg-brand-accent/10 text-brand-cream'
                      : 'border-brand-border bg-brand-dark/40 text-brand-muted hover:text-brand-cream'
                  }`}
                >
                  <Banknote className="w-4 h-4 text-brand-accent shrink-0" />
                  <div>
                    <span className="font-bold block">Cash on Delivery / Pickup</span>
                    <span className="text-[10px] text-brand-muted">Pay in cash upon delivery</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Prominent Demo Notice */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Demo Payment Notice:</strong> No real money is charged. This is an interactive demo for the restaurant owner.
              </span>
            </div>

            {/* Place Order CTA */}
            <button
              onClick={handlePlaceOrder}
              className="w-full py-4 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-brand-dark font-extrabold text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Place Demo Order (₹{totalAmount})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
