import http from 'http';
import { preview } from 'vite';
import { restaurantData } from '../src/data/restaurant.js';

async function runTests() {
  console.log('Starting Vite preview server on 127.0.0.1:4173...');
  const server = await preview({
    preview: {
      port: 4173,
      host: '127.0.0.1'
    }
  });

  const checkUrl = (urlPath) => {
    return new Promise((resolve) => {
      const fullUrl = `http://127.0.0.1:4173${urlPath}`;
      http.get(fullUrl, (res) => {
        let data = [];
        res.on('data', chunk => data.push(chunk));
        res.on('end', () => {
          resolve({ status: res.statusCode, length: Buffer.concat(data).length });
        });
      }).on('error', (err) => {
        resolve({ status: 500, error: err.message });
      });
    });
  };

  const imagesToCheck = [
    restaurantData.info.heroImage.path,
    restaurantData.info.logoImage.path,
    restaurantData.info.placeholderImage.path,
    ...restaurantData.menu.map(m => m.image.path),
    ...restaurantData.gallery.map(g => g.image.path),
    ...restaurantData.instagramPosts.map(ig => ig.image.path)
  ];

  console.log('\nTesting base HTML & routes...');
  const indexRes = await checkUrl('/');
  console.log(`GET / -> HTTP ${indexRes.status} (${indexRes.length} bytes)`);
  if (indexRes.status !== 200) {
    console.error('FAIL: index.html returned non-200');
    process.exit(1);
  }

  console.log(`\nTesting all ${imagesToCheck.length} static images from server...`);
  let imgErrors = 0;
  for (const imgPath of imagesToCheck) {
    const res = await checkUrl(imgPath);
    if (res.status !== 200 || res.length === 0) {
      console.error(`FAIL: ${imgPath} returned HTTP ${res.status}`);
      imgErrors++;
    } else {
      console.log(`PASS: ${imgPath} -> HTTP 200 (${res.length} bytes)`);
    }
  }

  console.log('\n--- SERVER INTEGRITY TEST SUMMARY ---');
  if (imgErrors > 0) {
    console.error(`FAILED with ${imgErrors} broken images!`);
    server.httpServer.close();
    process.exit(1);
  } else {
    console.log('ALL ROUTES AND ASSETS VERIFIED WITH HTTP 200 OK!');
  }

  server.httpServer.close();
  process.exit(0);
}

runTests().catch(err => {
  console.error('Server test error:', err);
  process.exit(1);
});
