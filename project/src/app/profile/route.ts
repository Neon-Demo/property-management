export const dynamic = 'force-dynamic';

// This file ensures the profile page is not statically generated
export const GET = async () => {
  return new Response('Dynamic route', { status: 200 });
};