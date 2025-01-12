import { useNavigate } from "react-router-dom"
import { Button } from "./components/ui/button"

function App() {
  const navigate =useNavigate()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-blue-500 to-purple-800">
      <div className="text-center space-y-8">
        <h1 className="text-5xl font-bold text-white">Welcome to GS Admin</h1>
        <p className="text-xl text-gray-200">Your one-stop solution for efficient administration</p>
        <Button onClick={()=>{
          navigate('/dashboard')
        }} className="px-8 py-3 text-lg bg-red-600 hover:bg-red-700 text-white shadow-lg transition-all duration-300 hover:scale-105">
          Get Started
        </Button>
      </div>
    </div>
  )
}

export default App
