import React, { useState, useMemo } from 'react';
import { Search, ShoppingBag, Plus, Minus, Check } from 'lucide-react';
import { restaurantData } from '../data/restaurant';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from '../components/ImageWithFallback';

export function MenuPage() {
  const { menu, categories } = restaurantData;
  const { cart, addToCart, updateQuantity } = useCart();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState('all'); // 'all' | 'veg' | 'non-veg'

  const filteredDishes = useMemo(() => {
    return menu.filter((dish) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'All' || dish.category === selectedCategory;

      // Search query filter
      const matchesSearch =
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Diet filter
      let matchesDiet = true;
      if (dietFilter === 'veg') matchesDiet = dish.veg === true;
      if (dietFilter === 'non-veg') matchesDiet = dish.veg === false;

      return matchesCategory && matchesSearch && matchesDiet;
    });
  }, [menu, selectedCategory, searchQuery, dietFilter]);

  const getCartQuantity = (dishId) => {
    const item = cart.find((i) => i.dish.id === dishId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-brand-cream">
          ZENZI Cafe & Dining Menu
        </h1>
        <p className="text-brand-muted text-xs sm:text-sm">
          Explore authentic North Indian specialties, tandoor starters, sizzling Chinese wok dishes, and artisan cafe brews.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="space-y-6">
        {/* Search & Diet Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, gravies, noodles..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-brand-card border border-brand-border text-brand-cream text-xs sm:text-sm focus:outline-none focus:border-brand-accent placeholder-brand-muted/60"
            />
          </div>

          {/* Diet filters: All / Veg / Non-Veg */}
          <div className="flex items-center gap-2 p-1 rounded-full bg-brand-card border border-brand-border text-xs">
            <button
              onClick={() => setDietFilter('all')}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
                dietFilter === 'all'
                  ? 'bg-brand-accent text-brand-dark shadow'
                  : 'text-brand-muted hover:text-brand-cream'
              }`}
            >
              All Items ({menu.length})
            </button>
            <button
              onClick={() => setDietFilter('veg')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold transition-all ${
                dietFilter === 'veg'
                  ? 'bg-emerald-500 text-brand-dark shadow'
                  : 'text-brand-muted hover:text-brand-cream'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Veg Only</span>
            </button>
            <button
              onClick={() => setDietFilter('non-veg')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold transition-all ${
                dietFilter === 'non-veg'
                  ? 'bg-rose-500 text-white shadow'
                  : 'text-brand-muted hover:text-brand-cream'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-300" />
              <span>Non-Veg Only</span>
            </button>
          </div>
        </div>

        {/* Category Scroll Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? 'bg-brand-accent text-brand-dark border-brand-accent shadow-md'
                  : 'bg-brand-card text-brand-cream border-brand-border hover:border-brand-accent/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Dishes Grid */}
      {filteredDishes.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-brand-card border border-brand-border space-y-3">
          <p className="text-brand-cream font-serif text-lg font-bold">
            No dishes found matching your criteria.
          </p>
          <p className="text-xs text-brand-muted">
            Try adjusting your search query or selecting a different category.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              setDietFilter('all');
            }}
            className="mt-3 px-5 py-2 rounded-full bg-brand-accent text-brand-dark text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map((dish) => {
            const qty = getCartQuantity(dish.id);

            return (
              <div
                key={dish.id}
                className="bg-brand-card rounded-2xl overflow-hidden border border-brand-border hover:border-brand-accent/40 shadow-xl transition-all flex flex-col justify-between group"
              >
                {/* Dish Media */}
                <div>
                  <div className="relative h-48 overflow-hidden bg-brand-surface">
                    <ImageWithFallback
                      src={dish.image.path}
                      alt={dish.image.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      width="400"
                      height="200"
                    />
                    {/* Veg Tag */}
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

                    {dish.popular && (
                      <span className="absolute top-3 right-3 bg-brand-accent text-brand-dark font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow">
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif font-bold text-lg text-brand-cream group-hover:text-brand-gold transition-colors">
                        {dish.name}
                      </h3>
                      <span className="font-serif font-bold text-lg text-brand-accent shrink-0">
                        ₹{dish.price}
                      </span>
                    </div>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      {dish.description}
                    </p>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between">
                    <span className="text-[11px] text-brand-muted capitalize">
                      {dish.category}
                    </span>

                    {qty > 0 ? (
                      <div className="flex items-center gap-2 bg-brand-surface border border-brand-accent/50 rounded-full px-2 py-1">
                        <button
                          onClick={() => updateQuantity(dish.id, qty - 1)}
                          className="p-1 rounded-full text-brand-cream hover:bg-brand-card transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5 text-brand-accent" />
                        </button>
                        <span className="text-xs font-bold text-brand-cream px-1">
                          {qty}
                        </span>
                        <button
                          onClick={() => updateQuantity(dish.id, qty + 1)}
                          className="p-1 rounded-full text-brand-cream hover:bg-brand-card transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5 text-brand-accent" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(dish, 1)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-surface hover:bg-brand-accent hover:text-brand-dark text-brand-cream text-xs font-bold border border-brand-border transition-all"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-brand-accent group-hover:text-brand-dark" />
                        <span>Add to Cart</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
