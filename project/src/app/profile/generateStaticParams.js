// This file prevents Next.js from statically generating the profile page

export async function generateStaticParams() {
  // Return an empty array to tell Next.js not to pre-render any versions of this page
  return [];
}