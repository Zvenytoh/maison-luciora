import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';

const origin = process.env.LUCIORA_PREVIEW_URL ?? 'http://127.0.0.1:4321';
const routes = ['/', '/collection/', '/collection/le-soleil/', '/collection/l-etoile/', '/collection/la-lune/', '/collection/la-force/', '/collection/le-monde/', '/maison/', '/contact/', '/404.html'];
const widths = [375, 430, 768, 1024, 1280, 1440, 1920];
const browser = await chromium.launch();
const context = await browser.newContext({ reducedMotion: 'reduce' });
const page = await context.newPage();
const failures = [];
const checks = [];
page.on('pageerror', error => failures.push({ type: 'script', message: error.message }));
await mkdir('qa/screenshots', { recursive: true });

for (const width of widths) {
  await page.setViewportSize({ width, height: 1000 });
  for (const route of routes) {
    const response = await page.goto(origin + route, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(async () => {
      // Scroll naturally so lazy images below the fold are checked and captured too.
      for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight) {
        window.scrollTo(0, y);
        await new Promise(resolve => setTimeout(resolve, 40));
      }
      await Promise.all(Array.from(document.images).filter(img => img.getClientRects().length).map(img => img.decode().catch(() => undefined)));
      window.scrollTo(0, 0);
    });
    const data = await page.evaluate(() => {
      const width = document.documentElement.clientWidth;
      return {
        overflow: document.documentElement.scrollWidth > width + 1,
        overflowingElements: Array.from(document.querySelectorAll('main *')).filter(el => { const r = el.getBoundingClientRect(); return r.width > 0 && (r.right > width + 1 || r.left < -1); }).slice(0,8).map(el => ({ tag: el.tagName, class: el.getAttribute('class') })),
        h1: document.querySelectorAll('h1').length,
        canonical: !!document.querySelector('link[rel="canonical"]'),
        description: !!document.querySelector('meta[name="description"]')?.getAttribute('content'),
        images: Array.from(document.images).filter(img => img.complete && img.naturalWidth === 0).map(img => img.src)
      };
    });
    checks.push({ route, width, status: response.status(), ...data });
    if (data.overflow || data.h1 !== 1 || data.images.length || !data.canonical || !data.description || response.status() >= 500) failures.push({ type: 'page', route, width, ...data });
    if (width === 375 || width === 768 || width === 1440 || width === 1920) {
      const slug = route === '/' ? 'accueil' : route.replaceAll('/', '-').replaceAll('.html','');
      await page.screenshot({ path: `qa/screenshots/${slug}-${width}.png`, fullPage: true });
    }
  }
  console.log(`Responsive: ${width}px — ${routes.length} pages vérifiées`);
}

for (const width of [375, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  for (const route of ['/', '/collection/', '/collection/le-soleil/', '/maison/', '/contact/']) {
    await page.goto(origin + route, { waitUntil: 'networkidle' });
    const result = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
    const violations = result.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }));
    if (violations.length) failures.push({ type: 'accessibility', width, route, violations });
  }
  console.log(`Accessibilité: ${width}px — 5 pages analysées`);
}

await page.setViewportSize({ width: 375, height: 812 });
await page.goto(origin);
await page.getByRole('button', { name: /Menu/ }).click();
if (!(await page.locator('#mobile-menu').evaluate(el => el.open))) failures.push({ type: 'menu', message: 'Le menu ne s’ouvre pas' });
if (await page.locator('#mobile-menu').evaluate(el => el.scrollWidth > el.clientWidth + 1)) failures.push({ type: 'menu', message: 'Le menu déborde horizontalement' });
await page.screenshot({ path: 'qa/screenshots/menu-mobile.png' });
await page.keyboard.press('Escape');
if (await page.locator('#mobile-menu').evaluate(el => el.open)) failures.push({ type: 'menu', message: 'Échap ne ferme pas le menu' });
if (await page.getByRole('button', { name: /Menu/ }).getAttribute('aria-expanded') !== 'false') failures.push({ type: 'menu', message: 'aria-expanded reste actif' });
await page.getByRole('button', { name: /Menu/ }).click();
await page.getByRole('navigation', { name: 'Navigation mobile' }).getByRole('link', { name: /Collection/ }).click();
await page.waitForURL('**/collection/');
await page.getByRole('link', { name: 'Découvrir Le Soleil', exact: true }).click();
await page.waitForURL('**/collection/le-soleil/');
await page.locator('.artwork-navigation a').last().click();
if (page.url().includes('le-soleil')) failures.push({ type: 'navigation', message: 'La navigation entre œuvres n’a pas changé de page' });
await page.goto(origin + '/contact/');
if (await page.locator('a[href^="mailto:"]').getAttribute('href') !== 'mailto:bonjour@maisonluciora.fr') failures.push({ type: 'contact' });

await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(origin + '/#intentions', { waitUntil: 'networkidle' });
await page.locator('[data-intention="l-etoile"]').first().focus();
if (await page.locator('[data-preview-artwork="l-etoile"]').getAttribute('hidden') !== null) failures.push({ type: 'intention', message: 'Le focus clavier ne révèle pas l’œuvre' });

const noJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 900 } });
const staticPage = await noJS.newPage();
await staticPage.goto(origin);
if (!(await staticPage.locator('h1').isVisible())) failures.push({ type: 'no-js' });
await staticPage.getByRole('link', { name: 'Découvrir la collection', exact: true }).click();
await staticPage.waitForURL('**/collection/');
await noJS.close();
await writeFile('qa/verification.json', JSON.stringify({ checks, failures, date: new Date().toISOString() }, null, 2));
await browser.close();
console.log(JSON.stringify({ responsiveChecks: checks.length, accessibilityChecks: 10, failures }, null, 2));
process.exitCode = failures.length ? 1 : 0;
