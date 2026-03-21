import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-start">
      <Navbar />
      <HomePage />
    </div>
  )
}

export default App
