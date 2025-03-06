// Server component that dynamically imports the client component
import { default as dynamicImport } from 'next/dynamic';

// Server-side only props
export const dynamic = 'force-dynamic';

// Do not attempt to SSR this page - defer to client
const ClientProfile = dynamicImport(() => import('./client-page'), { 
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-64">
      <p>Loading profile...</p>
    </div>
  )
});

export default function ProfilePage() {
  return <ClientProfile />;
}