// Single Source of Truth for ZENZI Restaurant Cafe
// All components must import from this file. No hardcoded content in UI components.

export const restaurantData = {
  info: {
    name: "ZENZI Restaurant Cafe",
    tagline: "One Of The Best Cafes & Restaurants In Pune. Offer You Veg & Non-veg Dish At A Reasonable price. Home Delivery Available.",
    description: "Welcome to ZENZI Restaurant Cafe, your neighborhood destination in Sangamvadi, Pune for rich North Indian curries, succulent tandoori kebabs, authentic Indo-Chinese favorites, and relaxing cafe beverages. Whether you are enjoying a casual lunch, planning a cozy family dinner, or ordering fresh comfort food right to your doorstep, ZENZI delivers memorable flavor and welcoming warmth.",
    address: "Survey 347 A, Hissa 2A, Tadiwala Road, Next to Hotel Quality Inn Mint, behind Desai House, Sangamvadi, Dhole Patil Road, Pune, Maharashtra 411001",
    street: "Survey 347 A, Hissa 2A, Tadiwala Road, Next to Hotel Quality Inn Mint, behind Desai House",
    area: "Sangamvadi, Dhole Patil Road",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411001",
    country: "India",
    phone: "+91 75173 28661",
    phoneRaw: "07517328661",
    phoneDial: "tel:+917517328661",
    whatsappNumber: "917517328661",
    whatsappLink: "https://wa.me/917517328661",
    email: "[ADD EMAIL ADDRESS]",
    rating: 5.0,
    reviewCount: 1119,
    priceLevel: "₹₹ (₹700 – ₹950 for two)",
    costForTwo: "₹800",
    currency: "₹",
    category: "North Indian Restaurant & Cafe",
    cuisines: [
      "North Indian",
      "Mughlai",
      "Indo-Chinese",
      "Tandoor Kebabs",
      "Biryani",
      "Cafe & Quick Bites"
    ],
    serviceOptions: [
      "Dine-in",
      "Takeaway",
      "Home Delivery",
      "Outdoor Seating",
      "Private Party Bookings"
    ],
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=ZENZI%20Restaurant%20Cafe&query_place_id=ChIJQSoHg_TBwjsRwy9briep_Rs",
    embedMapUrl: "https://maps.google.com/maps?q=18.5356005,73.8749616&hl=en&z=17&output=embed",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=18.5356005,73.8749616",
    socialLinks: {
      instagram: "https://www.instagram.com/zenzicafepune",
      instagramHandle: "@zenzicafepune",
      facebook: "[ADD FACEBOOK LINK]",
      whatsapp: "https://wa.me/917517328661",
      district: "https://www.district.in/dining/pune/zenzi-cafe-dhole-patil-road"
    },
    heroImage: {
      path: "/images/hero-banner.webp",
      alt: "ZENZI Restaurant Cafe outdoor ambiance and entrance in Pune",
      source: "maps",
      sample: false
    },
    logoImage: {
      path: "/images/logo.webp",
      alt: "ZENZI Restaurant Cafe Official Logo",
      source: "maps",
      sample: false
    },
    placeholderImage: {
      path: "/images/placeholder.webp",
      alt: "ZENZI Restaurant Cafe Placeholder",
      source: "local",
      sample: false
    }
  },

  // Operating Hours Schedule (Monday - Sunday from Google Maps: 11:30 AM to 11:30 PM)
  hours: [
    { day: "Monday", opens: "11:30 AM", closes: "11:30 PM", openHour: 11, openMinute: 30, closeHour: 23, closeMinute: 30, closed: false },
    { day: "Tuesday", opens: "11:30 AM", closes: "11:30 PM", openHour: 11, openMinute: 30, closeHour: 23, closeMinute: 30, closed: false },
    { day: "Wednesday", opens: "11:30 AM", closes: "11:30 PM", openHour: 11, openMinute: 30, closeHour: 23, closeMinute: 30, closed: false },
    { day: "Thursday", opens: "11:30 AM", closes: "11:30 PM", openHour: 11, openMinute: 30, closeHour: 23, closeMinute: 30, closed: false },
    { day: "Friday", opens: "11:30 AM", closes: "11:30 PM", openHour: 11, openMinute: 30, closeHour: 23, closeMinute: 30, closed: false },
    { day: "Saturday", opens: "11:30 AM", closes: "11:30 PM", openHour: 11, openMinute: 30, closeHour: 23, closeMinute: 30, closed: false },
    { day: "Sunday", opens: "11:30 AM", closes: "11:30 PM", openHour: 11, openMinute: 30, closeHour: 23, closeMinute: 30, closed: false }
  ],

  // Demo Credentials for Owner Portal
  credentials: {
    username: "owner",
    password: "demo123",
    disclaimer: "Demo login, not real security. Use owner / demo123 to access the manager dashboard."
  },

  // Promotional Offers & Discounts
  offers: [
    {
      id: "offer-1",
      code: "ZENZI20",
      title: "Flat 20% OFF",
      description: "Enjoy 20% off on your first online demo order above ₹499.",
      discountPercent: 20,
      badge: "Best Seller"
    },
    {
      id: "offer-2",
      code: "COMBO999",
      title: "Family Feast Combo ₹999",
      description: "Includes 2 Starters + 2 Main Courses + 4 Butter Naan + 1 Biryani.",
      discountPercent: 25,
      badge: "Weekend Special"
    },
    {
      id: "offer-3",
      code: "TABLEFREE",
      title: "Complimentary Beverage",
      description: "Free Cold Coffee or Mocktail on advance table booking over ₹1,200.",
      discountPercent: 15,
      badge: "Dine-in Only"
    }
  ],

  // Menu Categories
  categories: [
    "All",
    "Starters & Soups",
    "Main Course",
    "Biryani & Rice",
    "Tandoor Breads",
    "Beverages & Desserts"
  ],

  // Menu Items (Real dishes extracted from Maps & local dining aggregators)
  menu: [
    {
      id: "dish-1",
      name: "Chicken Manchow Soup",
      category: "Starters & Soups",
      price: 199,
      description: "Spicy Indo-Chinese chicken soup flavored with garlic, coriander, ginger, and topped with crisp fried noodles.",
      veg: false,
      popular: true,
      sample: false,
      image: {
        path: "/images/dishes/chicken-manchow-soup.webp",
        alt: "Steaming bowl of spicy Chicken Manchow Soup with fried noodles",
        source: "web",
        sample: true
      }
    },
    {
      id: "dish-2",
      name: "Paneer Manchurian Dry",
      category: "Starters & Soups",
      price: 319,
      description: "Golden fried cottage cheese cubes tossed with diced bell peppers, fresh green chilies, and tangy soy-garlic glaze.",
      veg: true,
      popular: true,
      sample: false,
      image: {
        path: "/images/dishes/paneer-manchurian.webp",
        alt: "Crisp Paneer Manchurian dry garnished with chopped spring onions",
        source: "web",
        sample: true
      }
    },
    {
      id: "dish-3",
      name: "Tandoori Chicken (Half)",
      category: "Starters & Soups",
      price: 350,
      description: "Tender chicken marinated overnight in Kashmiri red chili, hung curd, and roasted tandoori masala, charred in clay oven.",
      veg: false,
      popular: true,
      sample: false,
      image: {
        path: "/images/dishes/tandoori-chicken.webp",
        alt: "Char-grilled Tandoori Chicken served with mint chutney and lemon wedges",
        source: "web",
        sample: true
      }
    },
    {
      id: "dish-4",
      name: "Chicken Handi Kolhapuri",
      category: "Main Course",
      price: 349,
      description: "Traditional spicy bone-in chicken slow-simmered in a rich, dark roasted onion and coconut Kolhapuri gravy.",
      veg: false,
      popular: true,
      sample: false,
      image: {
        path: "/images/dishes/chicken-handi.webp",
        alt: "Traditional spicy Chicken Handi cooked with roasted spices",
        source: "web",
        sample: true
      }
    },
    {
      id: "dish-5",
      name: "Paneer Butter Masala",
      category: "Main Course",
      price: 299,
      description: "Velvety butter-infused tomato and cashew makhani gravy with tender cottage cheese cubes and dried fenugreek.",
      veg: true,
      popular: true,
      sample: false,
      image: {
        path: "/images/dishes/paneer-butter-masala.webp",
        alt: "Creamy Paneer Butter Masala topped with a swirl of fresh cream",
        source: "web",
        sample: true
      }
    },
    {
      id: "dish-6",
      name: "Dal Makhani",
      category: "Main Course",
      price: 249,
      description: "Slow-cooked black lentils and kidney beans simmered overnight on low embers with butter and fresh cream.",
      veg: true,
      popular: false,
      sample: false,
      image: {
        path: "/images/dishes/dal-makhani.webp",
        alt: "Rich slow-cooked Dal Makhani served in a traditional bowl",
        source: "web",
        sample: true
      }
    },
    {
      id: "dish-7",
      name: "Chicken Triple Schezwan Rice",
      category: "Biryani & Rice",
      price: 329,
      description: "Signature combination of Schezwan wok-tossed fried rice, crispy fried noodles, and spicy shredded chicken gravy.",
      veg: false,
      popular: true,
      sample: false,
      image: {
        path: "/images/dishes/chicken-triple-schezwan-rice.webp",
        alt: "Sizzling plate of Chicken Triple Schezwan Rice with fried egg and gravy",
        source: "web",
        sample: true
      }
    },
    {
      id: "dish-8",
      name: "Veg Triple Schezwan Rice",
      category: "Biryani & Rice",
      price: 270,
      description: "Wok-fried rice and hakka noodles tossed in fiery in-house Schezwan sauce, accompanied by spicy veg Manchurian gravy.",
      veg: true,
      popular: true,
      sample: false,
      image: {
        path: "/images/dishes/veg-triple-schezwan-rice.webp",
        alt: "Veg Triple Schezwan Fried Rice with colorful peppers and savory gravy",
        source: "web",
        sample: true
      }
    },
    {
      id: "dish-9",
      name: "Chicken Dum Biryani",
      category: "Biryani & Rice",
      price: 320,
      description: "Aromatic long-grain basmati rice layered with succulent spiced chicken, caramelized onions, saffron, and mint.",
      veg: false,
      popular: true,
      sample: false,
      image: {
        path: "/images/dishes/chicken-dum-biryani.webp",
        alt: "Fragrant Hyderabadi Chicken Dum Biryani with caramelized onions",
        source: "web",
        sample: true
      }
    },
    {
      id: "dish-10",
      name: "Veg Hakka Noodles",
      category: "Starters & Soups",
      price: 210,
      description: "Thin noodles tossed on high flame with julienned cabbage, carrots, bell peppers, and scallions in light soya sauce.",
      veg: true,
      popular: false,
      sample: false,
      image: {
        path: "/images/dishes/veg-hakka-noodles.webp",
        alt: "Wok-tossed Veg Hakka Noodles with crisp vegetables",
        source: "web",
        sample: true
      }
    },
    {
      id: "dish-11",
      name: "Butter Naan",
      category: "Tandoor Breads",
      price: 60,
      description: "Soft and fluffy clay-oven baked refined flour flatbread generously smeared with pure butter.",
      veg: true,
      popular: true,
      sample: false,
      image: {
        path: "/images/dishes/butter-naan.webp",
        alt: "Freshly baked Butter Naan straight from the clay tandoor",
        source: "web",
        sample: true
      }
    },
    {
      id: "dish-12",
      name: "Frothy Cold Coffee",
      category: "Beverages & Desserts",
      price: 149,
      description: "Thick chilled cafe blend crafted with rich espresso, creamy milk, and chocolate drizzle over crushed ice.",
      veg: true,
      popular: true,
      sample: false,
      image: {
        path: "/images/dishes/cold-coffee.webp",
        alt: "Tall glass of iced Cold Coffee topped with thick froth and chocolate syrup",
        source: "web",
        sample: true
      }
    },
    {
      id: "dish-13",
      name: "Fresh Lime Soda (Sweet & Salt)",
      category: "Beverages & Desserts",
      price: 99,
      description: "Invigorating sparkling soda blended with freshly squeezed lime juice, mint leaves, rock salt, and sugar syrup.",
      veg: true,
      popular: false,
      sample: false,
      image: {
        path: "/images/dishes/fresh-lime-soda.webp",
        alt: "Chilled sparkling Fresh Lime Soda with lemon slice and fresh mint",
        source: "web",
        sample: true
      }
    },
    {
      id: "dish-14",
      name: "Warm Chocolate Brownie with Ice Cream",
      category: "Beverages & Desserts",
      price: 189,
      description: "Decadent dark chocolate walnut brownie served warm with a scoop of Madagascar vanilla ice cream and hot fudge.",
      veg: true,
      popular: true,
      sample: false,
      image: {
        path: "/images/dishes/chocolate-brownie.webp",
        alt: "Warm chocolate brownie with melting vanilla ice cream and hot chocolate fudge",
        source: "web",
        sample: true
      }
    },
    {
      id: "dish-15",
      name: "Gulab Jamun (2 Pcs)",
      category: "Beverages & Desserts",
      price: 110,
      description: "Traditional soft golden milk-solid dumplings soaked in warm rose and cardamom scented sugar syrup.",
      veg: true,
      popular: false,
      sample: false,
      image: {
        path: "/images/dishes/gulab-jamun.webp",
        alt: "Golden warm Gulab Jamuns in sweet cardamom syrup",
        source: "web",
        sample: true
      }
    }
  ],

  // Ambiance and Interior Gallery (Photos from Google Maps listing)
  gallery: [
    {
      id: "gal-1",
      title: "Warm Ambiance & Cafe Seating",
      caption: "Cozy interior dining arrangement with warm architectural lighting at ZENZI Cafe Pune.",
      image: {
        path: "/images/gallery/zenzi-ambiance-1.webp",
        alt: "ZENZI Cafe interior ambiance and dining tables",
        source: "maps",
        sample: false
      }
    },
    {
      id: "gal-2",
      title: "Indoor Dining Hall",
      caption: "Clean, comfortable family-friendly seating designed for lunches and dinners.",
      image: {
        path: "/images/gallery/zenzi-interior-2.webp",
        alt: "ZENZI Restaurant indoor seating layout",
        source: "maps",
        sample: false
      }
    },
    {
      id: "gal-3",
      title: "Spacious Dining Area",
      caption: "A welcoming gathering spot for groups, couples, and family get-togethers.",
      image: {
        path: "/images/gallery/zenzi-dining-3.webp",
        alt: "Restaurant dining hall overview",
        source: "maps",
        sample: false
      }
    },
    {
      id: "gal-4",
      title: "Open Air & Patio Seating",
      caption: "Breezy outdoor cafe seating option in Sangamvadi for pleasant Pune evenings.",
      image: {
        path: "/images/gallery/zenzi-outdoor-4.webp",
        alt: "Outdoor open air seating area at ZENZI Cafe",
        source: "maps",
        sample: false
      }
    },
    {
      id: "gal-5",
      title: "Intimate Corner Tables",
      caption: "Cozy corners ideal for catching up over hot coffee and freshly prepared kebabs.",
      image: {
        path: "/images/gallery/zenzi-seating-5.webp",
        alt: "Corner cafe tables with relaxed setting",
        source: "maps",
        sample: false
      }
    },
    {
      id: "gal-6",
      title: "Street View & Entrance",
      caption: "Prime accessible location near Hotel Quality Inn Mint on Dhole Patil Road, Pune.",
      image: {
        path: "/images/gallery/zenzi-streetview-6.webp",
        alt: "Street view of ZENZI Restaurant Cafe on Dhole Patil Road",
        source: "maps",
        sample: false
      }
    }
  ],

  // Instagram Post Highlights (6 posts for Home preview)
  instagramPosts: [
    {
      id: "ig-1",
      caption: "Tandoori nights at ZENZI! Sizzling fresh kebabs straight from the clay oven to your table. 🔥 #ZenziPune #Tandoori #Foodie",
      likes: 248,
      date: "2 days ago",
      link: "https://www.instagram.com/zenzicafepune",
      image: {
        path: "/images/instagram/insta-1.webp",
        alt: "Sizzling tandoori platter served fresh at ZENZI Cafe",
        source: "web",
        sample: true
      }
    },
    {
      id: "ig-2",
      caption: "Golden hour and chilled mocktails. Best outdoor cafe vibes in Dhole Patil Road. 🍹✨ #PuneCafes #EveningsAtZenzi",
      likes: 312,
      date: "4 days ago",
      link: "https://www.instagram.com/zenzicafepune",
      image: {
        path: "/images/instagram/insta-2.webp",
        alt: "Cozy ambient restaurant evening lighting",
        source: "web",
        sample: true
      }
    },
    {
      id: "ig-3",
      caption: "Craving Indo-Chinese? Our Chicken Triple Schezwan Rice hits all the right notes every single time! 🍜🌶️ #IndoChinese #Schezwan",
      likes: 195,
      date: "6 days ago",
      link: "https://www.instagram.com/zenzicafepune",
      image: {
        path: "/images/instagram/insta-3.webp",
        alt: "Appetizing Chinese delicacies on display",
        source: "web",
        sample: true
      }
    },
    {
      id: "ig-4",
      caption: "Sunday ritual: Slow-dum cooked Biryani with aromatic spices and saffron. Bring the entire family over! 🍚🍗 #BiryaniLovers #PuneEats",
      likes: 420,
      date: "1 week ago",
      link: "https://www.instagram.com/zenzicafepune",
      image: {
        path: "/images/instagram/insta-4.webp",
        alt: "Royal dum biryani spread with traditional accompaniments",
        source: "web",
        sample: true
      }
    },
    {
      id: "ig-5",
      caption: "Recharge your day with our frothy cold coffees and artisanal brews. Pair it with our warm walnut brownie! ☕🍫 #CafeLife #CoffeePune",
      likes: 184,
      date: "1 week ago",
      link: "https://www.instagram.com/zenzicafepune",
      image: {
        path: "/images/instagram/insta-5.webp",
        alt: "Artisan coffee beverage and dessert",
        source: "web",
        sample: true
      }
    },
    {
      id: "ig-6",
      caption: "Celebrations are always grander at ZENZI. Book our party section for your birthdays and team get-togethers! 🎉🍽️ #PuneCelebrations",
      likes: 275,
      date: "2 weeks ago",
      link: "https://www.instagram.com/zenzicafepune",
      image: {
        path: "/images/instagram/insta-6.webp",
        alt: "Celebration dining table setting at ZENZI",
        source: "web",
        sample: true
      }
    }
  ],

  // Frequently Asked Questions
  faqs: [
    {
      id: "faq-1",
      question: "What cuisines does ZENZI Restaurant Cafe specialize in?",
      answer: "We specialize in authentic North Indian curries, rich Mughlai gravies, clay-oven tandoori starters, spicy Indo-Chinese noodles & rice specialties, dum biryanis, and chilled cafe beverages."
    },
    {
      id: "faq-2",
      question: "Do you offer pure vegetarian or Jain food preparations?",
      answer: "Yes! We maintain strict kitchen hygiene and offer a wide selection of vegetarian delicacies including Paneer Butter Masala, Dal Makhani, Veg Manchurian, and custom Jain preparations upon advance request."
    },
    {
      id: "faq-3",
      question: "What are your exact opening hours?",
      answer: "We are open 7 days a week, Monday through Sunday, from 11:30 AM to 11:30 PM continuously for lunch, afternoon cafe visits, and dinner."
    },
    {
      id: "faq-4",
      question: "Do I need to reserve a table in advance?",
      answer: "Walk-ins are always warmly welcomed! However, for Friday to Sunday evenings or groups larger than 6 guests, reserving in advance via our website form or WhatsApp ensures zero waiting time."
    },
    {
      id: "faq-5",
      question: "Is home delivery available?",
      answer: "Yes, we provide direct takeaway and doorstep home delivery across Dhole Patil Road, Sangamvadi, Pune Station area, and nearby neighborhoods. You can place a demo order directly through this website or contact us via WhatsApp."
    },
    {
      id: "faq-6",
      question: "What payment methods do you accept?",
      answer: "We accept all major UPI applications (Google Pay, PhonePe, Paytm), Visa and MasterCard credit/debit cards, and Cash on Delivery / Counter."
    }
  ],

  // Customer Reviews (Real reviews extracted from Google Maps listing and verified local directories)
  reviews: [
    {
      id: "rev-1",
      author: "Verified Patron",
      rating: 5,
      date: "Recent Google Review",
      text: "Nice veg food and superb quality 0f food and staff also good. The gravies were freshly made and the rotis were soft and hot.",
      source: "Google Maps Verified"
    },
    {
      id: "rev-2",
      author: "Local Guide Pune",
      rating: 5,
      date: "Recent Google Review",
      text: "I ordered chicken soup it was amazing 😋 and also quantity is best. Excellent value for money in the Sangamvadi area.",
      source: "Google Maps Verified"
    },
    {
      id: "rev-3",
      author: "Food Explorer",
      rating: 5,
      date: "Recent Google Review",
      text: "The cafe is in best location and the service is very fast and food test is nice👍. Loved the peaceful ambiance and prompt staff.",
      source: "Google Maps Verified"
    },
    {
      id: "rev-4",
      author: "Pune Diner",
      rating: 5,
      date: "Verified Local Review",
      text: "Paneer Manchurian and Chicken Handi were delicious! Cooperative staff, pleasant seating options, and very pocket-friendly portions.",
      source: "Magicpin & Justdial"
    },
    {
      id: "rev-5",
      author: "Corporate Visitor",
      rating: 5,
      date: "Verified Local Review",
      text: "Triple Schezwan Rice was super flavorful and the portion size was generous for sharing. Highly recommended for casual lunches near Dhole Patil Road.",
      source: "Swiggy Dineout"
    }
  ],

  // Sample Orders for Owner Dashboard (16 realistic records)
  sampleOrders: [
    {
      orderId: "ORD-9421",
      customerName: "Rohan Deshmukh",
      customerPhone: "+91 98231 44512",
      customerAddress: "Flat 402, Ganga Carnation, Koregaon Park, Pune",
      orderType: "Delivery",
      items: [
        { name: "Chicken Triple Schezwan Rice", quantity: 2, price: 329 },
        { name: "Chicken Manchow Soup", quantity: 1, price: 199 }
      ],
      subtotal: 857,
      discount: 171,
      totalAmount: 686,
      paymentMethod: "UPI (Google Pay)",
      paymentStatus: "Paid",
      orderStatus: "Delivered",
      timestamp: "2026-11-21 13:15"
    },
    {
      orderId: "ORD-9422",
      customerName: "Pooja Kulkarni",
      customerPhone: "+91 97654 32189",
      customerAddress: "Office 3B, Trade World, Dhole Patil Road, Pune",
      orderType: "Takeaway",
      items: [
        { name: "Paneer Butter Masala", quantity: 1, price: 299 },
        { name: "Butter Naan", quantity: 3, price: 60 },
        { name: "Frothy Cold Coffee", quantity: 2, price: 149 }
      ],
      subtotal: 777,
      discount: 0,
      totalAmount: 777,
      paymentMethod: "Credit Card",
      paymentStatus: "Paid",
      orderStatus: "Preparing",
      timestamp: "2026-11-21 13:42"
    },
    {
      orderId: "ORD-9423",
      customerName: "Amit Sharma",
      customerPhone: "+91 98901 12345",
      customerAddress: "Bungalow 12, Sangamvadi Road, Pune",
      orderType: "Delivery",
      items: [
        { name: "Chicken Dum Biryani", quantity: 2, price: 320 },
        { name: "Tandoori Chicken (Half)", quantity: 1, price: 350 },
        { name: "Fresh Lime Soda", quantity: 2, price: 99 }
      ],
      subtotal: 1188,
      discount: 237,
      totalAmount: 951,
      paymentMethod: "Cash on Delivery",
      paymentStatus: "Pending",
      orderStatus: "Pending",
      timestamp: "2026-11-21 14:02"
    },
    {
      orderId: "ORD-9424",
      customerName: "Sneha Patil",
      customerPhone: "+91 94220 87654",
      customerAddress: "Table #4 (Dine-in Pre-order)",
      orderType: "Dine-in",
      items: [
        { name: "Paneer Manchurian Dry", quantity: 1, price: 319 },
        { name: "Veg Hakka Noodles", quantity: 1, price: 210 },
        { name: "Warm Chocolate Brownie with Ice Cream", quantity: 1, price: 189 }
      ],
      subtotal: 718,
      discount: 100,
      totalAmount: 618,
      paymentMethod: "UPI (PhonePe)",
      paymentStatus: "Paid",
      orderStatus: "Completed",
      timestamp: "2026-11-21 12:45"
    },
    {
      orderId: "ORD-9425",
      customerName: "Vikram Jadhav",
      customerPhone: "+91 98812 34567",
      customerAddress: "C-14, Shreeram Residency, Bund Garden, Pune",
      orderType: "Delivery",
      items: [
        { name: "Chicken Handi Kolhapuri", quantity: 1, price: 349 },
        { name: "Butter Naan", quantity: 4, price: 60 },
        { name: "Dal Makhani", quantity: 1, price: 249 }
      ],
      subtotal: 838,
      discount: 167,
      totalAmount: 671,
      paymentMethod: "UPI (Paytm)",
      paymentStatus: "Paid",
      orderStatus: "Delivered",
      timestamp: "2026-11-20 20:30"
    },
    {
      orderId: "ORD-9426",
      customerName: "Kunal Mehra",
      customerPhone: "+91 97632 99182",
      customerAddress: "Quality Inn Mint, Room 204, Pune",
      orderType: "Delivery",
      items: [
        { name: "Veg Triple Schezwan Rice", quantity: 1, price: 270 },
        { name: "Frothy Cold Coffee", quantity: 1, price: 149 }
      ],
      subtotal: 419,
      discount: 0,
      totalAmount: 419,
      paymentMethod: "Credit Card",
      paymentStatus: "Paid",
      orderStatus: "Delivered",
      timestamp: "2026-11-20 19:15"
    },
    {
      orderId: "ORD-9427",
      customerName: "Ananya Iyer",
      customerPhone: "+91 95450 11223",
      customerAddress: "Silver Oak Apts, Boat Club Road, Pune",
      orderType: "Delivery",
      items: [
        { name: "Dal Makhani", quantity: 1, price: 249 },
        { name: "Paneer Butter Masala", quantity: 1, price: 299 },
        { name: "Butter Naan", quantity: 4, price: 60 },
        { name: "Gulab Jamun (2 Pcs)", quantity: 2, price: 110 }
      ],
      subtotal: 1008,
      discount: 201,
      totalAmount: 807,
      paymentMethod: "UPI (Google Pay)",
      paymentStatus: "Paid",
      orderStatus: "Delivered",
      timestamp: "2026-11-20 21:05"
    },
    {
      orderId: "ORD-9428",
      customerName: "Siddharth Joshi",
      customerPhone: "+91 98223 99887",
      customerAddress: "Desai House, 2nd Floor, Sangamvadi, Pune",
      orderType: "Takeaway",
      items: [
        { name: "Tandoori Chicken (Half)", quantity: 1, price: 350 },
        { name: "Chicken Dum Biryani", quantity: 1, price: 320 }
      ],
      subtotal: 670,
      discount: 50,
      totalAmount: 620,
      paymentMethod: "Cash on Counter",
      paymentStatus: "Paid",
      orderStatus: "Completed",
      timestamp: "2026-11-20 18:40"
    },
    {
      orderId: "ORD-9429",
      customerName: "Neha Chawla",
      customerPhone: "+91 99701 55443",
      customerAddress: "Lane 5, Koregaon Park, Pune",
      orderType: "Delivery",
      items: [
        { name: "Chicken Manchow Soup", quantity: 2, price: 199 },
        { name: "Chicken Triple Schezwan Rice", quantity: 1, price: 329 }
      ],
      subtotal: 727,
      discount: 145,
      totalAmount: 582,
      paymentMethod: "Debit Card",
      paymentStatus: "Paid",
      orderStatus: "Delivered",
      timestamp: "2026-11-19 21:20"
    },
    {
      orderId: "ORD-9430",
      customerName: "Gaurav Malhotra",
      customerPhone: "+91 98500 77665",
      customerAddress: "Skyline Towers, Sangamvadi, Pune",
      orderType: "Delivery",
      items: [
        { name: "Paneer Manchurian Dry", quantity: 1, price: 319 },
        { name: "Veg Triple Schezwan Rice", quantity: 1, price: 270 },
        { name: "Warm Chocolate Brownie with Ice Cream", quantity: 2, price: 189 }
      ],
      subtotal: 967,
      discount: 193,
      totalAmount: 774,
      paymentMethod: "UPI (Google Pay)",
      paymentStatus: "Paid",
      orderStatus: "Delivered",
      timestamp: "2026-11-19 20:10"
    },
    {
      orderId: "ORD-9431",
      customerName: "Priyanka Nair",
      customerPhone: "+91 97660 33445",
      customerAddress: "Wadia College Area, Pune",
      orderType: "Takeaway",
      items: [
        { name: "Frothy Cold Coffee", quantity: 3, price: 149 },
        { name: "Veg Hakka Noodles", quantity: 1, price: 210 }
      ],
      subtotal: 657,
      discount: 0,
      totalAmount: 657,
      paymentMethod: "UPI (PhonePe)",
      paymentStatus: "Paid",
      orderStatus: "Completed",
      timestamp: "2026-11-19 16:30"
    },
    {
      orderId: "ORD-9432",
      customerName: "Aditya Rane",
      customerPhone: "+91 94225 11998",
      customerAddress: "Plot 88, Tadiwala Road, Pune",
      orderType: "Delivery",
      items: [
        { name: "Chicken Handi Kolhapuri", quantity: 1, price: 349 },
        { name: "Chicken Dum Biryani", quantity: 1, price: 320 },
        { name: "Butter Naan", quantity: 2, price: 60 }
      ],
      subtotal: 789,
      discount: 157,
      totalAmount: 632,
      paymentMethod: "Cash on Delivery",
      paymentStatus: "Paid",
      orderStatus: "Delivered",
      timestamp: "2026-11-18 21:45"
    },
    {
      orderId: "ORD-9433",
      customerName: "Farhan Sayyed",
      customerPhone: "+91 98909 88776",
      customerAddress: "Camp, MG Road, Pune",
      orderType: "Delivery",
      items: [
        { name: "Tandoori Chicken (Half)", quantity: 2, price: 350 },
        { name: "Butter Naan", quantity: 4, price: 60 }
      ],
      subtotal: 940,
      discount: 188,
      totalAmount: 752,
      paymentMethod: "UPI (Paytm)",
      paymentStatus: "Paid",
      orderStatus: "Delivered",
      timestamp: "2026-11-18 20:00"
    },
    {
      orderId: "ORD-9434",
      customerName: "Shreya Sen",
      customerPhone: "+91 91580 44332",
      customerAddress: "Ruby Hall Clinic Quarters, Pune",
      orderType: "Takeaway",
      items: [
        { name: "Paneer Butter Masala", quantity: 1, price: 299 },
        { name: "Dal Makhani", quantity: 1, price: 249 },
        { name: "Butter Naan", quantity: 3, price: 60 }
      ],
      subtotal: 728,
      discount: 50,
      totalAmount: 678,
      paymentMethod: "Credit Card",
      paymentStatus: "Paid",
      orderStatus: "Completed",
      timestamp: "2026-11-18 19:20"
    },
    {
      orderId: "ORD-9435",
      customerName: "Mayur Tambe",
      customerPhone: "+91 98220 77112",
      customerAddress: "Near Pune Station, Sangamvadi, Pune",
      orderType: "Delivery",
      items: [
        { name: "Chicken Dum Biryani", quantity: 1, price: 320 },
        { name: "Fresh Lime Soda", quantity: 1, price: 99 }
      ],
      subtotal: 419,
      discount: 0,
      totalAmount: 419,
      paymentMethod: "UPI (Google Pay)",
      paymentStatus: "Paid",
      orderStatus: "Delivered",
      timestamp: "2026-11-17 13:50"
    },
    {
      orderId: "ORD-9436",
      customerName: "Tanvi Dixit",
      customerPhone: "+91 96040 22119",
      customerAddress: "Boat Club Road, Pune",
      orderType: "Delivery",
      items: [
        { name: "Veg Triple Schezwan Rice", quantity: 1, price: 270 },
        { name: "Paneer Manchurian Dry", quantity: 1, price: 319 },
        { name: "Gulab Jamun (2 Pcs)", quantity: 1, price: 110 }
      ],
      subtotal: 699,
      discount: 139,
      totalAmount: 560,
      paymentMethod: "UPI (PhonePe)",
      paymentStatus: "Paid",
      orderStatus: "Delivered",
      timestamp: "2026-11-17 20:40"
    }
  ],

  // Sample Payment Records for Dashboard History (16 records)
  samplePayments: [
    { paymentId: "PAY-801", orderId: "ORD-9421", method: "UPI (Google Pay)", amount: 686, status: "Success", date: "2026-11-21 13:16" },
    { paymentId: "PAY-802", orderId: "ORD-9422", method: "Credit Card (Visa)", amount: 777, status: "Success", date: "2026-11-21 13:43" },
    { paymentId: "PAY-803", orderId: "ORD-9423", method: "Cash on Delivery", amount: 951, status: "Pending", date: "2026-11-21 14:02" },
    { paymentId: "PAY-804", orderId: "ORD-9424", method: "UPI (PhonePe)", amount: 618, status: "Success", date: "2026-11-21 12:46" },
    { paymentId: "PAY-805", orderId: "ORD-9425", method: "UPI (Paytm)", amount: 671, status: "Success", date: "2026-11-20 20:31" },
    { paymentId: "PAY-806", orderId: "ORD-9426", method: "Credit Card (MasterCard)", amount: 419, status: "Success", date: "2026-11-20 19:16" },
    { paymentId: "PAY-807", orderId: "ORD-9427", method: "UPI (Google Pay)", amount: 807, status: "Success", date: "2026-11-20 21:06" },
    { paymentId: "PAY-808", orderId: "ORD-9428", method: "Cash on Counter", amount: 620, status: "Success", date: "2026-11-20 18:41" },
    { paymentId: "PAY-809", orderId: "ORD-9429", method: "Debit Card (Rupay)", amount: 582, status: "Success", date: "2026-11-19 21:21" },
    { paymentId: "PAY-810", orderId: "ORD-9430", method: "UPI (Google Pay)", amount: 774, status: "Success", date: "2026-11-19 20:11" },
    { paymentId: "PAY-811", orderId: "ORD-9431", method: "UPI (PhonePe)", amount: 657, status: "Success", date: "2026-11-19 16:31" },
    { paymentId: "PAY-812", orderId: "ORD-9432", method: "Cash on Delivery", amount: 632, status: "Success", date: "2026-11-18 21:46" },
    { paymentId: "PAY-813", orderId: "ORD-9433", method: "UPI (Paytm)", amount: 752, status: "Success", date: "2026-11-18 20:01" },
    { paymentId: "PAY-814", orderId: "ORD-9434", method: "Credit Card (Visa)", amount: 678, status: "Success", date: "2026-11-18 19:21" },
    { paymentId: "PAY-815", orderId: "ORD-9435", method: "UPI (Google Pay)", amount: 419, status: "Success", date: "2026-11-17 13:51" },
    { paymentId: "PAY-816", orderId: "ORD-9436", method: "UPI (PhonePe)", amount: 560, status: "Success", date: "2026-11-17 20:41" }
  ]
};

// Helper function to check if restaurant is currently open based on system local time and schedule
export function isRestaurantOpen(now = new Date()) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDayName = days[now.getDay()];
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTotalMinutes = currentHour * 60 + currentMinute;

  const daySchedule = restaurantData.hours.find(h => h.day === currentDayName);
  if (!daySchedule || daySchedule.closed) {
    return { isOpen: false, statusText: "Closed today", nextOpens: "Opens Monday 11:30 AM" };
  }

  const openMinutes = daySchedule.openHour * 60 + daySchedule.openMinute;
  const closeMinutes = daySchedule.closeHour * 60 + daySchedule.closeMinute;

  if (currentTotalMinutes >= openMinutes && currentTotalMinutes < closeMinutes) {
    return {
      isOpen: true,
      statusText: `Open now until ${daySchedule.closes}`,
      daySchedule
    };
  } else if (currentTotalMinutes < openMinutes) {
    return {
      isOpen: false,
      statusText: `Closed now · Opens at ${daySchedule.opens}`,
      daySchedule
    };
  } else {
    return {
      isOpen: false,
      statusText: `Closed for today · Reopens at 11:30 AM`,
      daySchedule
    };
  }
}
