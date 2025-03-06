// This file configures the profile page to skip static generation

export const generateStaticParams = () => {
  // Return an empty array to tell Next.js not to pre-render any versions of this page
  return [];
};

// These export tell Next.js to treat this as a dynamic page
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';