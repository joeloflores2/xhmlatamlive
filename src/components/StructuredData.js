import { config } from '../config/index.js';
import { facilities } from '../data/campus.js';
import { site } from '../data/site.js';

/**
 * Schema.org (JSON-LD). Solo datos proporcionados: sin coordenadas, sin logo
 * oficial, sin redes inexistentes. Person/Event se agregarán cuando existan datos.
 */
export function structuredData(page, { title, description, canonical }) {
  const base = config().siteUrl;
  const orgId = `${base}/#organizacion`;
  const siteId = `${base}/#sitio`;
  const a = site.address;
  const sameAs = Object.values(site.social).filter(Boolean);

  const organization = {
    '@type': 'SportsOrganization',
    '@id': orgId,
    name: site.name,
    alternateName: site.brand,
    url: `${base}/`,
    slogan: site.tagline,
    description: site.seo.defaultDescription,
    sport: 'Fútbol',
    image: `${base}${site.seo.ogImage}`,
    telephone: site.contact.phoneE164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${a.street}, ${a.neighborhood}`,
      addressLocality: a.city,
      addressRegion: a.state,
      postalCode: a.postalCode,
      addressCountry: a.countryCode,
    },
    areaServed: ['México', 'Latinoamérica'],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: site.contact.phoneE164,
      contactType: 'información general',
      availableLanguage: ['es'],
    },
    ...(sameAs.length ? { sameAs } : {}),
    ...(site.contact.email ? { email: site.contact.email } : {}),
  };

  const website = {
    '@type': 'WebSite',
    '@id': siteId,
    url: `${base}/`,
    name: site.brand,
    alternateName: site.name,
    inLanguage: site.locale,
    publisher: { '@id': orgId },
  };

  const webpage = {
    '@type': page.schemaType || 'WebPage',
    '@id': `${canonical}#pagina`,
    url: canonical,
    name: title,
    description,
    inLanguage: site.locale,
    isPartOf: { '@id': siteId },
    about: { '@id': orgId },
  };

  const graph = [organization, website, webpage];

  if (page.path !== '/') {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${base}/` },
        { '@type': 'ListItem', position: 2, name: page.crumb || page.title, item: canonical },
      ],
    });
  }

  if (page.path === '/' || page.path === '/campus/') {
    graph.push({
      '@type': 'SportsActivityLocation',
      '@id': `${base}/#campus`,
      name: `Campus ${site.name} — ${site.campus.name}`,
      description: 'Campus deportivo y de formación de futbolistas en desarrollo en Aguascalientes, México.',
      url: `${base}/campus/`,
      hasMap: config().mapUrl,
      address: {
        '@type': 'PostalAddress',
        addressLocality: site.campus.city,
        addressRegion: site.address.state,
        addressCountry: site.address.countryCode,
      },
      amenityFeature: facilities.map((f) => ({
        '@type': 'LocationFeatureSpecification',
        name: `${f.count ? `${f.count} ` : ''}${f.title}`,
        value: true,
      })),
      parentOrganization: { '@id': orgId },
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
