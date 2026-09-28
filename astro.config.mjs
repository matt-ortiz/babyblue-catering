// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Old WordPress URLs → new homes. Astro emits a static redirect page for each
// (meta refresh + canonical), which is the GitHub Pages–friendly way to 301.
const redirects = {
  '/sample-page': '/',
  '/home': '/',
  '/contact-us': '/contact/',
  '/consultation-form': '/contact/',
  '/about-babyblue': '/about/',
  '/jacob-ritenour': '/about/',
  '/families': '/about/',
  '/tutorials-recipes': '/',
  '/special-event-catering': '/wedding-event-catering/',
  '/corporate-events': '/corporate-catering/',
  '/the-babyblue-classic-experience': '/hors-d-oeuvre-party/',
  '/the-babyblue-interactive-experience': '/hors-d-oeuvre-party/',
  // Individual client menus now live on their service page
  '/dan-and-dawns-menu': '/family-style-experience/',
  '/robert-and-kristie-chandler-2': '/romantic-dinner-for-two/',
  '/john-v-and-joannas-romantic-dinner-menu': '/romantic-dinner-for-two/',
  '/jon-and-elianas-elegant-buffet-experience-menu': '/elegant-buffet-experience/',
  '/sashi-and-monicas-elegant-buffet-experience-menu': '/elegant-buffet-experience/',
  '/brian-and-kates-elegant-buffet-experience-menu': '/elegant-buffet-experience/',
  '/smith-party-menu': '/invisible-chef-service/',
  '/fitzgerald-family-menu': '/in-home-dinner-party/',
  '/dennis-and-jeris-dinner-party-menu': '/in-home-dinner-party/',
  '/aaron-and-jennifers-dessert-party-menu': '/dessert-and-wine-party/',
  '/scott-and-emma-jones-in-home-sushi-party-menu': '/in-home-sushi-party/',
  '/jack-and-pams-babyblue-interactive-menu': '/hors-d-oeuvre-party/',
  '/jeff-and-janets-babyblue-classic-menu': '/hors-d-oeuvre-party/',
};

// SITE_URL / BASE_PATH let the same code build for the github.io preview
// (https://matt-ortiz.github.io + /babyblue-catering) and for production
// (https://babybluecatering.com + /). Defaults are production.
const site = process.env.SITE_URL || 'https://babybluecatering.com';
const base = process.env.BASE_PATH || '/';
const withBase = (path) => base.replace(/\/$/, '') + path;

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  // Avoid clashing with other local Astro projects on the default 4321.
  server: { port: 4400 },
  redirects: Object.fromEntries(Object.entries(redirects).map(([from, to]) => [from, withBase(to)])),
  build: {
    // Small site — inlining CSS removes the render-blocking stylesheet request.
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      filter: (page) => !['/thank-you/', '/photo-shot-list/'].some((p) => page.includes(p)),
    }),
  ],
  image: {
    responsiveStyles: true,
  },
});
