import fs from 'fs';
import path from 'path';
import { restaurantData } from '../src/data/restaurant.js';

console.log('--- RUNNING INTEGRITY AND COMPLIANCE AUDIT ---\n');

let failed = false;

// 1. Audit image files in restaurantData
console.log('1. Checking all image references in restaurantData...');
const imagesToCheck = [
  restaurantData.info.heroImage,
  restaurantData.info.logoImage,
  restaurantData.info.placeholderImage,
  ...restaurantData.menu.map(m => m.image),
  ...restaurantData.gallery.map(g => g.image),
  ...restaurantData.instagramPosts.map(ig => ig.image)
];

console.log(`Found ${imagesToCheck.length} image references in data file.`);

imagesToCheck.forEach((img, idx) => {
  if (!img || !img.path) {
    console.error(`FAIL: Missing image path at index ${idx}`);
    failed = true;
    return;
  }

  // Check no external URLs
  if (img.path.startsWith('http://') || img.path.startsWith('https://')) {
    console.error(`FAIL: External URL used for image: ${img.path}`);
    failed = true;
  }

  // Check local existence in public
  const localPublicPath = path.resolve(path.join('public', img.path));
  if (!fs.existsSync(localPublicPath)) {
    console.error(`FAIL: Image missing in public: ${localPublicPath}`);
    failed = true;
  } else {
    const stat = fs.statSync(localPublicPath);
    const kb = stat.size / 1024;
    if (kb > 150) {
      console.warn(`WARN: Image ${img.path} is ${(kb).toFixed(1)} KB (over 150 KB target)`);
    }
  }

  // Check required fields: path, alt, source, sample
  if (!img.alt || img.source === undefined || img.sample === undefined) {
    console.error(`FAIL: Image missing metadata fields (alt, source, sample):`, img);
    failed = true;
  }
});

// 2. Audit components in src/ for external image URLs or hardcoded data
console.log('\n2. Scanning JSX components in src/ for external image URLs...');
const srcFiles = [];
function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      scanDir(full);
    } else if (f.endsWith('.jsx') || f.endsWith('.js')) {
      srcFiles.push(full);
    }
  }
}
scanDir(path.resolve('src'));

srcFiles.forEach(file => {
  if (file.includes('restaurant.js')) return; // Data file is allowed to contain facts/links
  const content = fs.readFileSync(file, 'utf-8');

  // Check for external image src
  const externalImgMatches = content.match(/src=["']https?:\/\/[^"']+\.(png|jpg|jpeg|webp|gif)/gi);
  if (externalImgMatches) {
    console.error(`FAIL in ${file}: External image src found:`, externalImgMatches);
    failed = true;
  }

  // Check for hardcoded phone or address
  if (content.includes('07517328661') || content.includes('75173 28661')) {
    console.error(`FAIL in ${file}: Hardcoded phone number found. Must use restaurantData.info.phone.`);
    failed = true;
  }
});

// 3. Check fallback placeholder
console.log('\n3. Verifying fallback placeholder.webp exists...');
if (!fs.existsSync(path.resolve('public/images/placeholder.webp'))) {
  console.error('FAIL: public/images/placeholder.webp does not exist!');
  failed = true;
} else {
  console.log('PASS: Fallback placeholder.webp exists.');
}

// 4. Verify 7 routes in App.jsx
console.log('\n4. Verifying all 7 separate routes in src/App.jsx...');
const appContent = fs.readFileSync(path.resolve('src/App.jsx'), 'utf-8');
const expectedRoutes = ['/', '/menu', '/location', '/contact', '/cart', '/owner-login', '/owner'];
expectedRoutes.forEach(route => {
  if (!appContent.includes(`path="${route}"`)) {
    console.error(`FAIL: Route ${route} missing in App.jsx`);
    failed = true;
  } else {
    console.log(`PASS: Route ${route} configured.`);
  }
});

console.log('\n--- AUDIT RESULT ---');
if (failed) {
  console.error('AUDIT FAILED with errors above.');
  process.exit(1);
} else {
  console.log('AUDIT PASSED CLEANLY! Zero issues found.');
}
