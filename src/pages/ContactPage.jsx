import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Send, Instagram, CheckCircle2 } from 'lucide-react';
import { restaurantData } from '../data/restaurant';

export function ContactPage() {
  const { info } = restaurantData;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const waMsg = encodeURIComponent(
      `Hello ${info.name}! Contact Form Message:\n` +
      `From: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Subject: ${formData.subject}\n` +
      `Message: ${formData.message}`
    );
    const waUrl = `https://wa.me/${info.whatsappNumber}?text=${waMsg}`;

    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-brand-cream">
          Get in Touch with ZENZI
        </h1>
        <p className="text-brand-muted text-xs sm:text-sm">
          Have a question about large party bookings, catering, doorstep delivery, or dietary preferences? We're here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Info & Channels */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone Card */}
            <div className="p-6 rounded-2xl bg-brand-card border border-brand-border shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center text-brand-accent">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-brand-cream">Direct Phone</h3>
              <p className="text-xs text-brand-muted">Call our reception desk for inquiries</p>
              <a
                href={info.phoneDial}
                className="block text-sm font-bold text-brand-accent hover:text-brand-gold transition-colors pt-1"
              >
                {info.phone}
              </a>
            </div>

            {/* WhatsApp Card */}
            <div className="p-6 rounded-2xl bg-brand-card border border-brand-border shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center text-emerald-400">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-brand-cream">WhatsApp Chat</h3>
              <p className="text-xs text-brand-muted">Instant response & table bookings</p>
              <a
                href={info.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors pt-1"
              >
                Chat on WhatsApp
              </a>
            </div>

            {/* Email Card (Placeholder) */}
            <div className="p-6 rounded-2xl bg-brand-card border border-brand-border shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center text-brand-gold">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-brand-cream">Email</h3>
              <p className="text-xs text-brand-muted">Formal inquiries & feedback</p>
              <span className="block text-xs font-mono text-brand-muted/80 pt-1">
                {info.email}
              </span>
            </div>

            {/* Instagram Card */}
            <div className="p-6 rounded-2xl bg-brand-card border border-brand-border shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center text-rose-400">
                <Instagram className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-brand-cream">Instagram</h3>
              <p className="text-xs text-brand-muted">Follow our daily stories & dishes</p>
              <a
                href={info.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs font-bold text-rose-400 hover:text-rose-300 transition-colors pt-1"
              >
                {info.socialLinks.instagramHandle}
              </a>
            </div>
          </div>

          {/* Address Summary */}
          <div className="p-6 rounded-2xl bg-brand-card border border-brand-border shadow-xl space-y-3">
            <h3 className="font-serif text-base font-bold text-brand-cream flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-accent" />
              <span>Restaurant Location</span>
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              {info.address}
            </p>
          </div>
        </div>

        {/* WhatsApp Contact Form (No Backend) */}
        <div className="p-8 sm:p-10 rounded-3xl bg-brand-card border border-brand-border shadow-2xl space-y-6">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-brand-cream">
              Send Us a Message
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Fill out the form below. When you click Send, it will open WhatsApp with your prefilled inquiry directly connected to our team.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-3 bg-brand-dark/80 rounded-2xl border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="font-serif text-xl font-bold text-brand-cream">
                Message Prepared!
              </h4>
              <p className="text-xs text-brand-muted">
                Opening WhatsApp to connect with ZENZI Restaurant Cafe...
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 px-5 py-2 rounded-full bg-brand-surface text-brand-cream text-xs font-semibold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-brand-cream mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sneha Patel"
                  className="w-full px-4 py-3 rounded-xl bg-brand-dark/80 border border-brand-border text-brand-cream placeholder-brand-muted/50 text-sm focus:outline-none focus:border-brand-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-cream mb-1.5">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98231 XXXXX"
                  className="w-full px-4 py-3 rounded-xl bg-brand-dark/80 border border-brand-border text-brand-cream placeholder-brand-muted/50 text-sm focus:outline-none focus:border-brand-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-cream mb-1.5">
                  Topic / Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-brand-dark/80 border border-brand-border text-brand-cream text-sm focus:outline-none focus:border-brand-accent"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Table Reservation">Table Reservation</option>
                  <option value="Home Delivery Order">Home Delivery Order</option>
                  <option value="Birthday / Party Celebration">Birthday / Party Celebration</option>
                  <option value="Feedback / Compliment">Feedback / Compliment</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-cream mb-1.5">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your message, dietary inquiry, or party details..."
                  className="w-full px-4 py-3 rounded-xl bg-brand-dark/80 border border-brand-border text-brand-cream placeholder-brand-muted/50 text-sm focus:outline-none focus:border-brand-accent"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-brand-dark font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Send Message via WhatsApp</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
