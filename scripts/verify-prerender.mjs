import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export function assertPrerenderedHtml(html, outputName = 'dist/index.html') {
  const rootStart = html.indexOf('<div id="root">');
  const bodyEnd = html.indexOf('</body>', rootStart);

  if (rootStart === -1 || bodyEnd === -1) {
    throw new Error(`Pre-render verification failed: ${outputName} has no #root container.`);
  }

  const rootHtml = html.slice(rootStart, bodyEnd);
  const requiredContent = [
    '<h1',
    'We Build the Tools That Build Your Growth.',
    'Scaleon Technologies',
    'Frequently Asked',
  ];

  const missingContent = requiredContent.filter((content) => !rootHtml.includes(content));

  if (missingContent.length > 0) {
    throw new Error(
      `Pre-render verification failed: missing crawlable homepage content: ${missingContent.join(', ')}`,
    );
  }
}

export async function verifyPrerenderedOutput() {
  const outputPath = resolve(process.cwd(), 'dist/index.html');
  const html = await readFile(outputPath, 'utf8');

  assertPrerenderedHtml(html);

  console.log('Pre-render verification passed: crawlable homepage HTML is present in dist/index.html.');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await verifyPrerenderedOutput();
}
