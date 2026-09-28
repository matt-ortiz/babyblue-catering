// Base-path aware links. Locally and on babybluecatering.com the base is "/";
// on the GitHub Pages preview it's "/babyblue-catering/". Write internal links
// as root-relative paths ("/about/") and pass them through href().
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const href = (path: string) => (path.startsWith('/') ? base + path : path);

/** Absolute URL including the base path, e.g. for structured data. */
export const absolute = (path: string) => new URL(href(path), import.meta.env.SITE).href;

/** True for any build that isn't the production domain (e.g. the github.io preview). */
export const isPreview = !import.meta.env.SITE?.includes('babybluecatering.com');
