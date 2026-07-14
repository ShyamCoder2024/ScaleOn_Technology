import { build } from 'vite';

import { verifyPrerenderedOutput } from './verify-prerender.mjs';

try {
  await build();
  await verifyPrerenderedOutput();

  // Server-rendered dependencies can leave handles open after Vite has
  // finished writing the build. Vercel waits for those handles indefinitely,
  // so exit only after both the build and its HTML verification have passed.
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
