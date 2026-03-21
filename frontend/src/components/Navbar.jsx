import logo from '../assets/logo.png'

export default function Navbar() {
  return (
    <div className="w-full px-6 py-4 flex items-center gap-6 mb-16" style={{ backgroundColor: '#def8fe' }}>
      <img src={logo} alt="Logo" className="h-16 w-auto" />
      <h1 className="text-4xl font-bold tracking-tight" style={{ color: '#1a1a2e' }}>PhotoStory</h1>
    </div>
  )
}
