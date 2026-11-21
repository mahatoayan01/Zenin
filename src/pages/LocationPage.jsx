import React from 'react';
import { MapPin, Navigation, Clock, Phone, ExternalLink, ShieldCheck } from 'lucide-react';
import { restaurantData, isRestaurantOpen } from '../data/restaurant';

export function LocationPage() {
  const { info, hours } = restaurantData;
  const openStatus = isRestaurantOpen();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-card border border-brand-border text-xs text-brand-accent font-semibold uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5" />
          <span>Sangamvadi, Pune</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-brand-cream">
          Find ZENZI Restaurant Cafe
        </h1>
        <p className="text-brand-muted text-xs sm:text-sm">
          Conveniently located near Hotel Quality Inn Mint on Dhole Patil Road, with outdoor patio & comfortable indoor dining.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Col 1: Details & Hours */}
        <div className="space-y-6">
          {/* Address Box */}
          <div className="p-6 rounded-2xl bg-brand-card border border-brand-border space-y-4 shadow-xl">
            <h3 className="font-serif text-lg font-bold text-brand-cream flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-accent" />
              <span>Full Address</span>
            </h3>
            <p className="text-xs sm:text-sm text-brand-cream leading-relaxed">
              {info.address}
            </p>
            <div className="pt-2 text-xs text-brand-muted space-y-1 border-t border-brand-border">
              <p><strong className="text-brand-cream">Landmarks:</strong> Next to Hotel Quality Inn Mint, behind Desai House</p>
              <p><strong className="text-brand-cream">Locality:</strong> {info.area}, {info.city}</p>
            </div>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={info.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-brand-dark font-bold text-xs shadow-lg transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Driving Directions</span>
              </a>
              <a
                href={info.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-surface hover:bg-brand-card text-brand-cream border border-brand-border font-semibold text-xs transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5 text-brand-accent" />
                <span>View on Google Maps</span>
              </a>
            </div>
          </div>

          {/* Timing Box */}
          <div className="p-6 rounded-2xl bg-brand-card border border-brand-border space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-brand-cream flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-accent" />
                <span>Hours</span>
              </h3>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                  openStatus.isOpen
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                }`}
              >
                {openStatus.isOpen ? 'Open Now' : 'Closed'}
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              {hours.map((h, i) => (
                <div key={i} className="flex justify-between py-1 border-b border-brand-border/40 text-brand-muted">
                  <span className="text-brand-cream font-medium">{h.day}</span>
                  <span className="text-brand-accent">{h.opens} – {h.closes}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Col 2 & 3: Interactive Google Maps Iframe */}
        <div className="lg:col-span-2 h-[550px] rounded-3xl overflow-hidden border border-brand-border shadow-2xl relative bg-brand-card">
          <iframe
            title="ZENZI Restaurant Cafe Google Maps"
            src={info.embedMapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full filter invert-[0.9] hue-rotate-180 contrast-125"
          />
          {/* Overlay Pill with Map Notice */}
          <div className="absolute top-4 left-4 bg-brand-dark/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-brand-border shadow-lg flex items-center gap-2 text-xs">
            <MapPin className="w-4 h-4 text-brand-accent" />
            <span className="font-bold text-brand-cream">{info.name}</span>
            <span className="text-brand-muted hidden sm:inline">&bull; Sangamvadi, Pune</span>
          </div>
        </div>
      </div>
    </div>
  );
}
