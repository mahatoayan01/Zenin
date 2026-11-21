import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  Clock,
  MapPin,
  UtensilsCrossed,
  Tag,
  Calendar,
  Users,
  ChevronDown,
  ChevronUp,
  Instagram,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Coffee,
  Heart
} from 'lucide-react';
import { restaurantData, isRestaurantOpen } from '../data/restaurant';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from '../components/ImageWithFallback';

export function Home() {
  const { info, hours, offers, menu, gallery, instagramPosts, faqs, reviews } = restaurantData;
  const { addToCart } = useCart();
  const [openStatus] = useState(() => isRestaurantOpen());
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState(null);

  // Table booking state
  const [booking, setBooking] = useState({
    name: '',
    phone: '',
    guests: '2 Guests',
    date: '',
    time: '19:30',
    specialRequest: ''
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const popularDishes = menu.filter((d) => d.popular).slice(0, 6);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSubmitted(true);

    // Create prefilled WhatsApp reservation message
    const message = encodeURIComponent(
      `Hello ${info.name}! Table Reservation Request:\n` +
      `Name: ${booking.name}\n` +
      `Phone: ${booking.phone}\n` +
      `Guests: ${booking.guests}\n` +
      `Date: ${booking.date || 'Today'}\n` +
      `Time: ${booking.time}\n` +
      `Requests: ${booking.specialRequest || 'None'}`
    );
    const waUrl = `https://wa.me/${info.whatsappNumber}?text=${message}`;
    
    // Open WhatsApp in new tab after showing success
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 800);
  };

  const copyCoupon = (code) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      alert(`Coupon code "${code}" copied to clipboard!`);
    }
  };

  return (
    <div className="space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden -mt-20 pt-20">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={info.heroImage.path}
            alt={info.heroImage.alt}
            className="w-full h-full object-cover filter brightness-[0.38] scale-105 transform motion-safe:animate-pulse"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-transparent to-brand-dark/80" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 space-y-8">
          {/* Rating & Real-time Status Badge */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 p-1.5 px-4 rounded-full bg-brand-charcoal/80 border border-brand-border/80 backdrop-blur-md shadow-2xl">
            <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{info.rating.toFixed(1)}</span>
              <span className="text-brand-muted font-normal">
                ({info.reviewCount.toLocaleString()} Google Reviews)
              </span>
            </div>
            <span className="text-brand-muted text-xs">&bull;</span>
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <span
                className={`w-2 h-2 rounded-full ${
                  openStatus.isOpen ? 'bg-emerald-400 animate-ping' : 'bg-rose-400'
                }`}
              />
              <span className={openStatus.isOpen ? 'text-emerald-400' : 'text-rose-400'}>
                {openStatus.isOpen ? 'Open Now' : 'Closed'}
              </span>
              <span className="text-brand-muted font-normal">
                ({openStatus.statusText})
              </span>
            </div>
          </div>

          {/* Restaurant Title & Subtitle */}
          <div className="space-y-4">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold text-brand-cream tracking-tight leading-tight">
              {info.name}
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-xl text-brand-gold/90 font-medium font-serif italic">
              "Authentic North Indian curries, sizzling Mughlai kebabs, and relaxing cafe moments in Pune."
            </p>
            <p className="max-w-xl mx-auto text-xs sm:text-sm text-brand-muted leading-relaxed">
              {info.street}, {info.area}, {info.city}
            </p>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/menu"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-accent hover:bg-brand-accentHover text-brand-dark font-bold text-base shadow-xl shadow-brand-accent/20 hover:scale-105 active:scale-95 transition-all"
            >
              <UtensilsCrossed className="w-5 h-5" />
              <span>Order Online Now</span>
            </Link>
            <a
              href="#book-table"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-card hover:bg-brand-surface border border-brand-border text-brand-cream font-semibold text-base shadow-lg hover:border-brand-accent transition-all"
            >
              <Calendar className="w-5 h-5 text-brand-accent" />
              <span>Reserve a Table</span>
            </a>
          </div>

          {/* Quick Features Row */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-xs text-brand-muted">
            <div className="p-3 rounded-xl bg-brand-card/40 border border-brand-border/40 backdrop-blur-sm">
              <span className="block font-bold text-brand-cream text-sm">₹₹ (Budget Friendly)</span>
              <span>₹800 for two</span>
            </div>
            <div className="p-3 rounded-xl bg-brand-card/40 border border-brand-border/40 backdrop-blur-sm">
              <span className="block font-bold text-brand-cream text-sm">Multi-Cuisine</span>
              <span>North Indian & Chinese</span>
            </div>
            <div className="p-3 rounded-xl bg-brand-card/40 border border-brand-border/40 backdrop-blur-sm">
              <span className="block font-bold text-brand-cream text-sm">Outdoor & Indoor</span>
              <span>Patio seating available</span>
            </div>
            <div className="p-3 rounded-xl bg-brand-card/40 border border-brand-border/40 backdrop-blur-sm">
              <span className="block font-bold text-brand-cream text-sm">Delivery Available</span>
              <span>Doorstep orders</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT CAFE & RESTAURANT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-card border border-brand-border text-xs text-brand-accent font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About ZENZI Pune</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-cream leading-tight">
              A Warm Haven for Foodies, Families & Coffee Lovers
            </h2>
            <p className="text-brand-muted leading-relaxed text-sm sm:text-base">
              {info.description}
            </p>
            <p className="text-brand-muted leading-relaxed text-sm">
              Located conveniently in Sangamvadi along Dhole Patil Road, near Hotel Quality Inn Mint, ZENZI combines the best of traditional North Indian culinary craft with modern cafe comfort. From our famous Chicken Handi and rich Paneer gravies to sizzling Schezwan platters and frothy iced cold coffee, every recipe is prepared fresh to order.
            </p>

            {/* Service Tags */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {info.serviceOptions.map((opt, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-medium text-brand-cream">
                  <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                  <span>{opt}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                to="/location"
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-accent hover:text-brand-gold transition-colors"
              >
                <span>Find Us on Map</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Visual Showcase Collage */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="h-64 rounded-2xl overflow-hidden border border-brand-border shadow-xl">
                <ImageWithFallback
                  src={gallery[0].image.path}
                  alt={gallery[0].image.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="h-44 rounded-2xl overflow-hidden border border-brand-border shadow-xl">
                <ImageWithFallback
                  src={gallery[1].image.path}
                  alt={gallery[1].image.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="h-44 rounded-2xl overflow-hidden border border-brand-border shadow-xl">
                <ImageWithFallback
                  src={gallery[3].image.path}
                  alt={gallery[3].image.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="h-64 rounded-2xl overflow-hidden border border-brand-border shadow-xl">
                <ImageWithFallback
                  src={gallery[4].image.path}
                  alt={gallery[4].image.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROMOTIONAL OFFERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-card border border-brand-border text-xs text-brand-accent font-semibold uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5" />
            <span>Special Deals & Savings</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-cream">
            Featured Deals & Combos
          </h2>
          <p className="text-brand-muted text-sm">
            Save on your dine-in reservations and doorstep takeaway orders with exclusive ZENZI offers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="relative p-6 rounded-2xl bg-brand-card border border-brand-border hover:border-brand-accent/50 shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-accent/20 text-brand-accent border border-brand-accent/30">
                    {offer.badge}
                  </span>
                  <span className="text-xs font-bold text-emerald-400">
                    {offer.discountPercent}% Savings
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-cream group-hover:text-brand-gold transition-colors">
                  {offer.title}
                </h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  {offer.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-brand-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-brand-muted block">Promo Code</span>
                  <span className="font-mono font-bold text-sm text-brand-accent">{offer.code}</span>
                </div>
                <button
                  onClick={() => copyCoupon(offer.code)}
                  className="px-3 py-1.5 rounded-full bg-brand-surface hover:bg-brand-accent hover:text-brand-dark text-xs font-semibold text-brand-cream transition-all border border-brand-border"
                >
                  Copy Code
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. POPULAR DISHES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-card border border-brand-border text-xs text-brand-accent font-semibold uppercase tracking-wider">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-cream">
              Popular Dishes from Our Kitchen
            </h2>
            <p className="text-brand-muted text-sm">
              Handpicked customer favorites prepared with authentic spice blends and premium ingredients.
            </p>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-card hover:bg-brand-surface border border-brand-border text-brand-cream text-sm font-semibold hover:border-brand-accent transition-all shrink-0"
          >
            <span>View Full Menu ({menu.length} Dishes)</span>
            <ArrowRight className="w-4 h-4 text-brand-accent" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularDishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-brand-card rounded-2xl overflow-hidden border border-brand-border hover:border-brand-accent/40 shadow-xl transition-all flex flex-col group"
            >
              {/* Dish Image */}
              <div className="relative h-48 overflow-hidden bg-brand-surface">
                <ImageWithFallback
                  src={dish.image.path}
                  alt={dish.image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  width="400"
                  height="200"
                />
                {/* Veg/Non-veg indicator badge */}
                <div className="absolute top-3 left-3 bg-brand-dark/90 backdrop-blur-md px-2 py-1 rounded-md border border-brand-border flex items-center gap-1.5 shadow">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      dish.veg ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                  />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-cream">
                    {dish.veg ? 'Veg' : 'Non-Veg'}
                  </span>
                </div>
                {/* Popular Pill */}
                <span className="absolute top-3 right-3 bg-brand-accent text-brand-dark font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow">
                  Popular
                </span>
              </div>

              {/* Dish Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif font-bold text-lg text-brand-cream group-hover:text-brand-gold transition-colors">
                      {dish.name}
                    </h3>
                    <span className="font-serif font-bold text-lg text-brand-accent shrink-0">
                      ₹{dish.price}
                    </span>
                  </div>
                  <p className="text-xs text-brand-muted leading-relaxed line-clamp-2">
                    {dish.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-brand-border flex items-center justify-between">
                  <span className="text-[11px] text-brand-muted capitalize">
                    {dish.category}
                  </span>
                  <button
                    onClick={() => addToCart(dish, 1)}
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-brand-surface hover:bg-brand-accent hover:text-brand-dark text-brand-cream text-xs font-semibold border border-brand-border transition-all"
                  >
                    <span>+ Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. AMBIANCE & GALLERY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-card border border-brand-border text-xs text-brand-accent font-semibold uppercase tracking-wider">
            <Coffee className="w-3.5 h-3.5" />
            <span>Google Maps Verified Photos</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-cream">
            Experience the ZENZI Atmosphere
          </h2>
          <p className="text-brand-muted text-sm">
            Explore our welcoming indoor dining hall, relaxing open-air patio, and cozy seating arrangements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedGalleryImg(item)}
              className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer bg-brand-surface border border-brand-border shadow-xl"
            >
              <ImageWithFallback
                src={item.image.path}
                alt={item.image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                width="400"
                height="300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <h4 className="font-serif font-bold text-base text-brand-cream group-hover:text-brand-gold transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-brand-muted line-clamp-1">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal preview when image is clicked */}
        {selectedGalleryImg && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedGalleryImg(null)}
          >
            <div
              className="relative max-w-3xl w-full bg-brand-card rounded-2xl overflow-hidden border border-brand-border p-4 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedGalleryImg(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-brand-dark/80 text-brand-cream hover:text-brand-accent transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
              <div className="max-h-[70vh] overflow-hidden rounded-xl">
                <ImageWithFallback
                  src={selectedGalleryImg.image.path}
                  alt={selectedGalleryImg.image.alt}
                  className="w-full h-full object-contain mx-auto"
                />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-brand-cream">
                  {selectedGalleryImg.title}
                </h3>
                <p className="text-xs text-brand-muted mt-1">
                  {selectedGalleryImg.caption}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 6. OPERATING HOURS & LIVE STATUS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-card border border-brand-border rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-border text-xs text-brand-accent font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>Operating Schedule</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-cream">
                We're Serving All 7 Days
              </h2>
              <p className="text-brand-muted text-sm leading-relaxed">
                Enjoy continuous lunch, evening cafe refreshments, and hearty late dinners from 11:30 AM right through 11:30 PM.
              </p>

              <div className="p-4 rounded-xl bg-brand-surface border border-brand-border flex items-center gap-4">
                <span
                  className={`w-4 h-4 rounded-full shrink-0 ${
                    openStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
                  }`}
                />
                <div>
                  <h4 className="text-sm font-bold text-brand-cream">
                    {openStatus.isOpen ? 'Currently Open' : 'Currently Closed'}
                  </h4>
                  <p className="text-xs text-brand-muted">
                    {openStatus.statusText}
                  </p>
                </div>
              </div>
            </div>

            {/* Daily Hours Table */}
            <div className="space-y-2 bg-brand-dark/70 p-4 sm:p-6 rounded-2xl border border-brand-border">
              {hours.map((h, i) => {
                const isToday =
                  ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][
                    new Date().getDay()
                  ] === h.day;

                return (
                  <div
                    key={i}
                    className={`flex items-center justify-between py-2 px-3 rounded-lg text-xs font-medium ${
                      isToday
                        ? 'bg-brand-accent/15 border border-brand-accent/40 text-brand-cream font-bold'
                        : 'text-brand-muted hover:text-brand-cream'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {h.day}
                      {isToday && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-accent text-brand-dark uppercase font-extrabold">
                          Today
                        </span>
                      )}
                    </span>
                    <span className={isToday ? 'text-brand-accent font-bold' : ''}>
                      {h.opens} – {h.closes}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 7. TABLE BOOKING FORM */}
      <section id="book-table" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="bg-gradient-to-br from-brand-card via-brand-surface to-brand-card border border-brand-border rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-card border border-brand-border text-xs text-brand-accent font-semibold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>Instant Confirmation</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-cream">
              Book Your Table at ZENZI
            </h2>
            <p className="text-brand-muted text-sm">
              Reserve your spot in advance for hassle-free dining. We confirm instantly via WhatsApp.
            </p>
          </div>

          {bookingSubmitted ? (
            <div className="p-8 text-center space-y-4 bg-brand-dark/70 rounded-2xl border border-brand-accent/40">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-brand-cream">
                Reservation Request Prepared!
              </h3>
              <p className="text-xs text-brand-muted max-w-md mx-auto">
                Opening WhatsApp to finalize your booking for {booking.name} ({booking.guests}) on {booking.date || 'Today'} at {booking.time}.
              </p>
              <button
                onClick={() => setBookingSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-full bg-brand-surface hover:bg-brand-card text-brand-cream text-xs font-semibold border border-brand-border"
              >
                Book Another Table
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-cream mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={booking.name}
                    onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-3 rounded-xl bg-brand-dark/80 border border-brand-border text-brand-cream placeholder-brand-muted/50 text-sm focus:outline-none focus:border-brand-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-cream mb-1.5">
                    Mobile / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={booking.phone}
                    onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                    placeholder="+91 98231 XXXXX"
                    className="w-full px-4 py-3 rounded-xl bg-brand-dark/80 border border-brand-border text-brand-cream placeholder-brand-muted/50 text-sm focus:outline-none focus:border-brand-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-cream mb-1.5">
                    Number of Guests
                  </label>
                  <select
                    value={booking.guests}
                    onChange={(e) => setBooking({ ...booking, guests: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-brand-dark/80 border border-brand-border text-brand-cream text-sm focus:outline-none focus:border-brand-accent"
                  >
                    <option value="1 Guest">1 Guest</option>
                    <option value="2 Guests">2 Guests</option>
                    <option value="3-4 Guests">3-4 Guests</option>
                    <option value="5-8 Guests">5-8 Guests</option>
                    <option value="9+ Guests (Party)">9+ Guests (Party)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-cream mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    value={booking.date}
                    onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-brand-dark/80 border border-brand-border text-brand-cream text-sm focus:outline-none focus:border-brand-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-cream mb-1.5">
                    Time Slot
                  </label>
                  <select
                    value={booking.time}
                    onChange={(e) => setBooking({ ...booking, time: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-brand-dark/80 border border-brand-border text-brand-cream text-sm focus:outline-none focus:border-brand-accent"
                  >
                    <option value="12:00 PM">12:00 PM (Lunch)</option>
                    <option value="13:00 PM">01:00 PM (Lunch)</option>
                    <option value="14:00 PM">02:00 PM (Lunch)</option>
                    <option value="17:00 PM">05:00 PM (Cafe)</option>
                    <option value="19:30 PM">07:30 PM (Dinner)</option>
                    <option value="20:30 PM">08:30 PM (Dinner)</option>
                    <option value="21:30 PM">09:30 PM (Dinner)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-cream mb-1.5">
                  Special Request (Optional)
                </label>
                <input
                  type="text"
                  value={booking.specialRequest}
                  onChange={(e) => setBooking({ ...booking, specialRequest: e.target.value })}
                  placeholder="e.g. Birthday celebration, outdoor table preference"
                  className="w-full px-4 py-3 rounded-xl bg-brand-dark/80 border border-brand-border text-brand-cream placeholder-brand-muted/50 text-sm focus:outline-none focus:border-brand-accent"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-brand-dark font-bold text-base shadow-xl transition-all"
              >
                Confirm Table via WhatsApp
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 8. INSTAGRAM GRID SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-card border border-brand-border text-xs text-brand-accent font-semibold uppercase tracking-wider">
              <Instagram className="w-3.5 h-3.5" />
              <span>Social Feed</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-brand-cream">
              Follow @zenzicafepune
            </h2>
            <p className="text-brand-muted text-xs sm:text-sm">
              Tag us in your food snaps and cafe stories in Pune!
            </p>
          </div>
          <a
            href={info.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-card hover:bg-brand-surface border border-brand-border text-xs font-semibold text-brand-cream hover:border-brand-accent transition-all"
          >
            <Instagram className="w-4 h-4 text-brand-accent" />
            <span>Follow on Instagram</span>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative h-48 rounded-2xl overflow-hidden bg-brand-surface border border-brand-border block shadow-md"
            >
              <ImageWithFallback
                src={post.image.path}
                alt={post.image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                width="200"
                height="200"
              />
              <div className="absolute inset-0 bg-brand-dark/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center space-y-2">
                <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
                <span className="text-xs font-bold text-brand-cream">
                  {post.likes} Likes
                </span>
                <p className="text-[10px] text-brand-muted line-clamp-2">
                  {post.caption}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 9. REAL CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-card border border-brand-border text-xs text-amber-400 font-semibold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>5-Star Rated on Google Maps</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-cream">
            Loved by Pune Food Enthusiasts
          </h2>
          <p className="text-brand-muted text-sm">
            Real customer impressions directly from our 1,100+ reviews on Google Maps & dining directories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-brand-card border border-brand-border shadow-xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-brand-muted">{rev.date}</span>
                </div>
                <p className="text-xs text-brand-cream leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-brand-border flex items-center justify-between text-xs">
                <div>
                  <span className="block font-bold text-brand-cream">{rev.author}</span>
                  <span className="text-[10px] text-brand-muted">{rev.source}</span>
                </div>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. FAQ ACCORDION */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
          <h2 className="font-serif text-3xl font-bold text-brand-cream">
            Frequently Asked Questions
          </h2>
          <p className="text-brand-muted text-xs sm:text-sm">
            Everything you need to know before ordering or visiting ZENZI Restaurant Cafe.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = activeFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-xl bg-brand-card border border-brand-border overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 text-sm font-semibold text-brand-cream hover:text-brand-accent transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-brand-accent shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-brand-muted shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-brand-muted leading-relaxed border-t border-brand-border/40 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
