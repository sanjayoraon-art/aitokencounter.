import { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get('host') || process.env.VERCEL_URL || 'aitokencounter.vercel.app';
  const protocol = headersList.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');
  
  // Format clean base URL without trailing slash or duplicate protocol
  const cleanHost = host.replace(/^https?:\/\//, '');
  const baseUrl = `${protocol}://${cleanHost}`;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
