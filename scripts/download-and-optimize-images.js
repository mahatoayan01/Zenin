import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import sharp from 'sharp';

const imagesDir = path.resolve('public/images');
const dishesDir = path.join(imagesDir, 'dishes');
const galleryDir = path.join(imagesDir, 'gallery');
const instaDir = path.join(imagesDir, 'instagram');

[imagesDir, dishesDir, galleryDir, instaDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Helper to fetch buffer
function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(downloadBuffer(res.headers.location));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error(`Timeout downloading ${url}`));
    });
  });
}

async function processImage(url, destPath, maxWidth = 1200) {
  try {
    const buffer = await downloadBuffer(url);
    await sharp(buffer)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality: 80, effort: 4 })
      .toFile(destPath);
    const stat = fs.statSync(destPath);
    console.log(`Saved: ${path.basename(destPath)} (${(stat.size / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error(`Error processing ${destPath} from ${url}:`, err.message);
  }
}

// Create fallback placeholder
async function createPlaceholder() {
  const svg = `
  <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#1A2026"/>
    <rect x="20" y="20" width="560" height="360" rx="16" fill="#222A32" stroke="#E6A15C" stroke-width="2" stroke-dasharray="6 6"/>
    <circle cx="300" cy="170" r="50" fill="#2B3540"/>
    <path d="M280 170 C280 150, 320 150, 320 170 C320 190, 280 190, 280 170 Z" fill="#E6A15C"/>
    <text x="300" y="250" font-family="sans-serif" font-size="22" font-weight="bold" fill="#FDFBF7" text-anchor="middle">ZENZI Restaurant Cafe</text>
    <text x="300" y="280" font-family="sans-serif" font-size="14" fill="#94A3B8" text-anchor="middle">Delicious Moments in Every Dish</text>
  </svg>`;
  await sharp(Buffer.from(svg))
    .webp({ quality: 90 })
    .toFile(path.join(imagesDir, 'placeholder.webp'));
  console.log('Created placeholder.webp');
}

const tasks = [
  // 1. Google Maps Listing Images
  {
    url: 'https://lh4.googleusercontent.com/-0HugWGzH-x8/AAAAAAAAAAI/AAAAAAAAAAA/nfsj8dJ0bas/s1200/photo.jpg',
    dest: path.join(imagesDir, 'logo.webp'),
    width: 600
  },
  {
    url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLftfM3sxb732YexxtSUTZKAIJ6MvWbPHd7wcFWDN_DgKOBJ1pDCfTBvRZkghawCSTFewIfS5syK1FPRNNyWVYy7LuGZA6QGXBzNVCGq-nAq40bfelZXEq8rUkdUxM7vt6fgIvc5=w1200',
    dest: path.join(imagesDir, 'hero-banner.webp'),
    width: 1200
  },
  {
    url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLei7Q6QhukNv-W3FTUTE8W8hbp-f9TmxSZ9zsNGZTyVOfl9kvwqLHNO2j8X2vEchJ05HK0u24nHp9izvoH10UQbYz0iw3XfSHWaOtng1heS9FZjIFXboDVh9t0Bz-dEmfAoFeF09A=w1200',
    dest: path.join(galleryDir, 'zenzi-ambiance-1.webp'),
    width: 1200
  },
  {
    url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLd4o9v_TVH76ziuIz57IJ7kOqyQtE2RbxNxitwnlWUcOrdCYEJxGN7cRSsvvb3I8APYOkWzX4hW1kVBUbmMILrYZEM-d321s_EPTY99CJpMiHz7RiaIpJl45HNRart8e5OG2WS8pQ=w1200',
    dest: path.join(galleryDir, 'zenzi-interior-2.webp'),
    width: 1200
  },
  {
    url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLdHfT6e2hITyWip5CpUqJt1-YtFFIhJfvKlcMQPt-PXQkzCP1QNA2OGeBEBgDew0ipb1GTvPXK4e3vDeFq7b5awrgIckUr34S12Np_Ip2psVh6pJJp2l0bw1N-Drqk-NQd7j0LtaBvkqXM=w1200',
    dest: path.join(galleryDir, 'zenzi-dining-3.webp'),
    width: 1200
  },
  {
    url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLeaZVx5gt6GCzLSo7qg-T2JL385eX4mqDDeeDuUCGlVKRAMNDK_n2haRTSEen8TYl8XYc8HELnjZhMLSiDeikcf5DYp2U6pRfGzdoK3ebZluLaYnhakY7oDH6prLm40xRsoOfk=w1200',
    dest: path.join(galleryDir, 'zenzi-outdoor-4.webp'),
    width: 1200
  },
  {
    url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLeYRboxjKcwsLW3qUdpLh1iupZyxpep84fvUvNOHxZ9sMAfTSu5Jk_LRHtAd7ogTg-mFIVmmlWJHgopCtBG1fhekZKgU12jLdYanBfZ8nwOaaOiw9KErnW5TGXtOkxL_EX39wWMYw=w1200',
    dest: path.join(galleryDir, 'zenzi-seating-5.webp'),
    width: 1200
  },
  {
    url: 'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=eTYI7nf1QM3hkXq8DdJ9HQ&cb_client=search.gws-prod.grass&w=1200&h=800&yaw=167.28873&pitch=0&thumbfov=100',
    dest: path.join(galleryDir, 'zenzi-streetview-6.webp'),
    width: 1200
  },

  // 2. Exact Matching Dish Images (Web-sourced Unsplash high-res food photography)
  {
    url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1000&auto=format&fit=crop',
    dest: path.join(dishesDir, 'chicken-manchow-soup.webp'),
    width: 800
  },
  {
    url: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=1000&auto=format&fit=crop',
    dest: path.join(dishesDir, 'paneer-manchurian.webp'),
    width: 800
  },
  {
    url: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1000&auto=format&fit=crop',
    dest: path.join(dishesDir, 'chicken-handi.webp'),
    width: 800
  },
  {
    url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=1000&auto=format&fit=crop',
    dest: path.join(dishesDir, 'veg-triple-schezwan-rice.webp'),
    width: 800
  },
  {
    url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1000&auto=format&fit=crop',
    dest: path.join(dishesDir, 'chicken-triple-schezwan-rice.webp'),
    width: 800
  },
  {
    url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1000&auto=format&fit=crop',
    dest: path.join(dishesDir, 'dal-makhani.webp'),
    width: 800
  },
  {
    url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1000&auto=format&fit=crop',
    dest: path.join(dishesDir, 'paneer-butter-masala.webp'),
    width: 800
  },
  {
    url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?q=80&w=1000&auto=format&fit=crop',
    dest: path.join(dishesDir, 'tandoori-chicken.webp'),
    width: 800
  },
  {
    url: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=1000&auto=format&fit=crop',
    dest: path.join(dishesDir, 'butter-naan.webp'),
    width: 800
  },
  {
    url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1000&auto=format&fit=crop',
    dest: path.join(dishesDir, 'veg-hakka-noodles.webp'),
    width: 800
  },
  {
    url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=1000&auto=format&fit=crop',
    dest: path.join(dishesDir, 'chicken-dum-biryani.webp'),
    width: 800
  },
  {
    url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1000&auto=format&fit=crop',
    dest: path.join(dishesDir, 'cold-coffee.webp'),
    width: 800
  },
  {
    url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1000&auto=format&fit=crop',
    dest: path.join(dishesDir, 'fresh-lime-soda.webp'),
    width: 800
  },
  {
    url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1000&auto=format&fit=crop',
    dest: path.join(dishesDir, 'chocolate-brownie.webp'),
    width: 800
  },
  {
    url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1000&auto=format&fit=crop',
    dest: path.join(dishesDir, 'gulab-jamun.webp'),
    width: 800
  },

  // 3. Instagram Posts (6 posts)
  {
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop',
    dest: path.join(instaDir, 'insta-1.webp'),
    width: 800
  },
  {
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
    dest: path.join(instaDir, 'insta-2.webp'),
    width: 800
  },
  {
    url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=800&auto=format&fit=crop',
    dest: path.join(instaDir, 'insta-3.webp'),
    width: 800
  },
  {
    url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&auto=format&fit=crop',
    dest: path.join(instaDir, 'insta-4.webp'),
    width: 800
  },
  {
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
    dest: path.join(instaDir, 'insta-5.webp'),
    width: 800
  },
  {
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
    dest: path.join(instaDir, 'insta-6.webp'),
    width: 800
  }
];

async function run() {
  await createPlaceholder();
  for (const t of tasks) {
    await processImage(t.url, t.dest, t.width);
  }
  console.log('All image processing complete!');
}

run();
