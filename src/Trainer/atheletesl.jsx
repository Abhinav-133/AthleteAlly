import React from "react"
import { Search, ChevronDown, ArrowUpDown } from "lucide-react"

const AthleteCard = ({ name, sport, age, level, image }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
    <img src={image} alt={name} className="w-24 h-24 rounded-full object-cover mb-4" />
    <h3 className="text-xl font-semibold mb-2">{name}</h3>
    <p className="text-gray-600 mb-2">{sport}</p>
    <p className="text-gray-600 mb-2">Age: {age}</p>
    <p className="text-blue-600 font-medium">{level}</p>
  </div>
)

export default function AthletesListPage() {
  const athletes = [
    { name: "John Doe", sport: "Basketball", age: 22, level: "Professional", image: "/placeholder.svg?height=96&width=96" },
    { name: "Jane Smith", sport: "Tennis", age: 19, level: "Amateur", image: "/placeholder.svg?height=96&width=96" },
    { name: "Mike Johnson", sport: "Swimming", age: 25, level: "Olympic", image: "/placeholder.svg?height=96&width=96" },
    { name: "Emily Brown", sport: "Gymnastics", age: 17, level: "Junior", image: "/placeholder.svg?height=96&width=96" },
    { name: "Alex Lee", sport: "Soccer", age: 23, level: "Professional", image: "/placeholder.svg?height=96&width=96" },
    { name: "Sarah Wilson", sport: "Track & Field", age: 21, level: "Collegiate", image: "/placeholder.svg?height=96&width=96" },
    { name: "Chris Taylor", sport: "Baseball", age: 26, level: "Professional", image: "/placeholder.svg?height=96&width=96" },
    { name: "Lisa Chen", sport: "Volleyball", age: 20, level: "Collegiate", image: "/placeholder.svg?height=96&width=96" },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Athletes</h1>

        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="relative mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search athletes..."
              className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <div className="flex space-x-4">
            <button className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center">
              Sport
              <ChevronDown size={20} className="ml-2" />
            </button>
            <button className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center">
              Level
              <ChevronDown size={20} className="ml-2" />
            </button>
            <button className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center">
              Sort
              <ArrowUpDown size={20} className="ml-2" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {athletes.map((athlete, index) => (
            <AthleteCard key={index} {...athlete} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            >
              Previous
            </a>
            <a
              href="#"
              className="px-3 py-2 border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            >
              1
            </a>
            <a
              href="#"
              className="px-3 py-2 border-t border-b border-gray-300 bg-blue-600 text-white hover:bg-blue-700"
            >
              2
            </a>
            <a
              href="#"
              className="px-3 py-2 border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            >
              3
            </a>
            <a
              href="#"
              className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            >
              Next
            </a>
          </nav>
        </div>
      </main>
    </div>
  )
}