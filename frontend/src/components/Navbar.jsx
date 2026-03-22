import logo from '../assets/logo.png'

export default function Navbar() {
  return (
    <div className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-4 sm:gap-6 mb-10 sm:mb-16" style={{ backgroundColor: '#def8fe' }}>
      <img src={logo} alt="Logo" className="h-10 sm:h-14 lg:h-16 w-auto" />
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight" style={{ color: '#1a1a2e' }}>VibePost</h1>
    </div>
  )
}
