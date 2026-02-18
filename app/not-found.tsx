export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-center">
        <h1 className="text-6xl font-black text-white mb-4">404</h1>
        <p className="text-xl text-gray-400 mb-8">Page not found</p>
        <a href="/" className="text-cyan-400 hover:text-cyan-300 font-semibold">
          Go back home
        </a>
      </div>
    </div>
  )
}
