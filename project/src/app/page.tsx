export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          RPF Enterprise Application
        </h1>
        <p className="mt-4 text-center text-gray-600">
          Environmental Services Management Platform
        </p>
        <div className="mt-8 space-y-4">
          <a 
            href="/login" 
            className="block w-full py-2 px-4 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md"
          >
            Sign In
          </a>
          <a 
            href="/dashboard" 
            className="block w-full py-2 px-4 text-center bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md"
          >
            Demo Login
          </a>
        </div>
      </div>
    </div>
  );
}