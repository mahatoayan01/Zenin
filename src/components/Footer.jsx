import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, Clock, Star, Heart, ArrowUpRight } from 'lucide-react';
import { restaurantData } from '../data/restaurant';
import { ImageWithFallback } from './ImageWithFallback';

export function Footer() {
  const { info, hours } = restaurantData;

  return (
    <footer className="bg-brand-charcoal border-t border-brand-border mt-20 pt-16 pb-12 text-brand-muted text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-brand-accent/60 bg-brand-card">
              <ImageWithFallback
                src={info.logoImage.path}
                alt={info.logoImage.alt}
                className="w-full h-full object-cover"
                width="40"
                height="40"
              />
            </div>
            <div>
              <span className="block font-serif text-xl font-bold text-brand-cream tracking-wide">
                ZENZI
              </span>
              <span className="block text-[10px] tracking-widest uppercase text-brand-accent font-semibold">
                Restaurant &bull; Cafe
              </span>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-brand-muted">
            {info.tagline}
          </p>
          <div className="flex items-center gap-2 pt-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="ml-1 text-sm font-bold text-brand-cream">{info.rating.toFixed(1)}</span>
            </div>
            <span className="text-xs text-brand-muted">({info.reviewCount.toLocaleString()} Google Reviews)</span>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="text-brand-cream font-serif font-semibold text-base mb-4 tracking-wide">
            Explore
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link to="/" className="hover:text-brand-accent transition-colors">
                Home & Overview
              </Link>
            </li>
            <li>
              <Link to="/menu" className="hover:text-brand-accent transition-colors">
                Food & Cafe Menu
              </Link>
            </li>
            <li>
              <Link to="/location" className="hover:text-brand-accent transition-colors">
                Location & Google Maps
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-brand-accent transition-colors">
                Contact & Table Inquiries
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-brand-accent transition-colors">
                Cart & Demo Checkout
              </Link>
            </li>
            <li>
              <Link to="/owner-login" className="text-brand-gold/90 hover:text-brand-gold transition-colors font-medium">
                Owner Portal (Demo Login)
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Hours & Timing */}
        <div>
          <h4 className="text-brand-cream font-serif font-semibold text-base mb-4 tracking-wide flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-accent" />
            Operating Hours
          </h4>
          <p className="text-xs text-brand-muted mb-2">
            Serving fresh lunches, evening cafe snacks & dinner daily:
          </p>
          <div className="bg-brand-dark/60 p-3 rounded-lg border border-brand-border text-xs space-y-1.5">
            <div className="flex justify-between font-medium text-brand-cream">
              <span>Monday – Sunday:</span>
              <span className="text-brand-accent">11:30 AM – 11:30 PM</span>
            </div>
            <p className="text-[11px] text-brand-muted pt-1">
              Dine-in, Takeaway & Home Delivery
            </p>
          </div>
        </div>

        {/* Col 4: Contact & Socials */}
        <div className="space-y-3">
          <h4 className="text-brand-cream font-serif font-semibold text-base mb-4 tracking-wide">
            Visit & Connect
          </h4>
          <div className="flex items-start gap-2 text-xs">
            <MapPin className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
            <span>{info.street}, {info.city} – {info.pincode}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Phone className="w-4 h-4 text-brand-accent shrink-0" />
            <a href={info.phoneDial} className="hover:text-brand-accent transition-colors font-medium text-brand-cream">
              {info.phone}
            </a>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <a href={info.whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300 transition-colors text-emerald-400 font-medium">
              WhatsApp Us
            </a>
          </div>

          <div className="pt-3 flex flex-wrap gap-2">
            <a
              href={info.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-card hover:bg-brand-surface text-brand-cream text-xs border border-brand-border transition-colors"
            >
              <span>Instagram</span>
              <ArrowUpRight className="w-3 h-3 text-brand-accent" />
            </a>
            <a
              href={info.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-card hover:bg-brand-surface text-brand-cream text-xs border border-brand-border transition-colors"
            >
              <span>Google Maps</span>
              <ArrowUpRight className="w-3 h-3 text-brand-accent" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-brand-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p>
          &copy; {new Date().getFullYear()} {info.name}. All rights reserved. Interactive Demo Website.
        </p>
        <div className="flex items-center gap-4 text-brand-muted">
          <span>Pune, Maharashtra</span>
          <span>&bull;</span>
          <Link to="/owner-login" className="hover:text-brand-gold transition-colors">
            Demo Dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
}
