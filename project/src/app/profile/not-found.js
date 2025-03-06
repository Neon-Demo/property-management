export default function ProfileNotFound() {
  return (
    <div>
      <h1>Profile Not Found</h1>
      <p>This is a fallback for the profile page to prevent static generation.</p>
    </div>
  );
}

// This is an empty paths array, telling Next.js not to pre-render this route
export async function generateStaticParams() {
  return [];
}