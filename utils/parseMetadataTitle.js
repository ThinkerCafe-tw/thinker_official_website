export default function parseMetadataTitle(pageTitle) {
  const siteTitle = 'Thinker Cafe';

  return pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle;
}
