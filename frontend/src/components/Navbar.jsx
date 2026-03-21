import logo from '../assets/logo.png'

export default function Navbar() {
  return (
    <div className="w-full bg-gray-900 px-6 py-4 flex items-center gap-6 mb-16">
      <img src={logo} alt="Logo" className="h-16 w-auto" />
      <h1 className="text-4xl font-bold tracking-tight text-white">PhotoStory</h1>
    </div>
  )
}
