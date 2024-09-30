'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ShoppingCart } from 'lucide-react'

const sportsGear = [
  { id: 1, name: "Pro Swimming Goggles", sport: "Swimming", type: "Accessories", price: 29.99, image: "https://imgs.search.brave.com/Ts_7rC8N_NWDqLp4u0w-vEneaJxYa8IfVLh2Ae6s4PM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bW9zLmNtcy5mdXR1/cmVjZG4ubmV0L2lV/aDZuTFI3allIZWZH/eWh6UW1KOC0zMjAt/ODAuanBn" },
  { id: 2, name: "Running Shoes", sport: "Running", type: "Footwear", price: 129.99, image: "https://imgs.search.brave.com/NJVumZGCQRmzFvMrrvHdZDLoRs1dtLwRnnxOyyhfJx0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4Lzc1LzE4LzIz/LzM2MF9GXzg3NTE4/MjM5OF9yTDZvYVM1/dWhqQkQ0Wnh5cWdU/elduN3dxd0lrTE55/cC5qcGc" },
  { id: 3, name: "Carbon Fiber Tennis Racket", sport: "Tennis", type: "Equipment", price: 199.99, image: "https://imgs.search.brave.com/yHT8FqQw2JlAQBAO_mhfb8Q0HsPqW9OsHOCPFZmt5P8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFobVJSTHlFN0wu/anBn" },
  { id: 4, name: "Compression Running Shorts", sport: "Running", type: "Apparel", price: 49.99, image: "https://imgs.search.brave.com/WNO2QRBCc5c4Qo_IOP0TMrHvQxrNPPvOhcG3S3kU0oM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFmMlNLbFF3YUwu/anBn" },
  { id: 5, name: "Professional Basketball", sport: "Basketball", type: "Equipment", price: 39.99, image: "https://imgs.search.brave.com/qvJGQ7YN4ujQg7X_b35auhs4oMPZXRIoPACnrXGGX_A/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAwLzAwLzcxLzEw/LzM2MF9GXzcxMTA4/MV9Xdm5KeVU5V0JM/VWVnQkxWZmdoRE4y/WVpqRnVRNWIuanBn" },
  { id: 6, name: "Yoga Mat", sport: "Yoga", type: "Accessories", price: 24.99, image: "https://imgs.search.brave.com/ypiYzIiaIyRevmT1pLkd-gqBT9VtfZpasPwKcvbZEo0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dGhld2lyZWN1dHRl/ci5jb20vd3AtY29u/dGVudC9tZWRpYS8y/MDI0LzA3L3lvZ2Et/bWF0LTIwNDhweC0x/NjYxLmpwZz9hdXRv/PXdlYnAmcXVhbGl0/eT03NSZ3aWR0aD0x/MDI0" },
  { id: 7, name: "Weightlifting Gloves", sport: "Weightlifting", type: "Accessories", price: 19.99, image: "https://imgs.search.brave.com/vLx_evEPjSBplT-bTRuiMe9Wt2QBUX7ZtROlNey92lE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tcnhw/cm9kdWN0cy5jb20v/Y2RuL3Nob3AvZmls/ZXMvMjYyMy1CTEst/V2VpZmd0LUxpZnRp/bmctTmVvcHJlbmUt/R2xvdmVzLUJsYWNr/LVJlZC1CbHVlLUdy/b3VwLmpwZz92PTE3/MDkzMTQ5ODkmd2lk/dGg9NTMz" },
  { id: 8, name: "Soccer Cleats", sport: "Soccer", type: "Footwear", price: 89.99, image: "https://imgs.search.brave.com/3d9ebBKleyvrL6seYno-ouKNlV43p7hlFtQMoTVdRwk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTcz/MjQyMjc2L3Bob3Rv/L3NvY2Nlci1jbGVh/dHMuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPWdLN1licHFS/TUREVmR4bTkycHkw/Z2NNZWptQ2FZaDEt/OElzeWZ0WWN4TGs9" },
]

const sports = ["All", "Swimming", "Running", "Tennis", "Basketball", "Yoga", "Weightlifting", "Soccer"]
const gearTypes = ["All", "Accessories", "Footwear", "Equipment", "Apparel"]

export default function SportsGear() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSport, setSelectedSport] = useState("All")
  const [selectedType, setSelectedType] = useState("All")
  const [isEditing, setIsEditing] = useState(false)

  const filteredGear = sportsGear.filter(item => 
    (selectedSport === "All" || item.sport === selectedSport) &&
    (selectedType === "All" || item.type === selectedType) &&
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-600 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Sports Gear</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        {isEditing && (
          <div className="w-full md:w-1/3 relative">
            <input
              type="text"
              placeholder="Search gear..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800 text-white border-gray-700 pl-10 p-2 rounded"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        )}
        
        <div className="flex gap-4">
          <select onChange={(e) => setSelectedSport(e.target.value)} className="bg-gray-800 text-white border-gray-700 p-2 rounded">
            <option value="All">Select Sport</option>
            {sports.map(sport => (
              <option key={sport} value={sport}>{sport}</option>
            ))}
          </select>
          
          <select onChange={(e) => setSelectedType(e.target.value)} className="bg-gray-800 text-white border-gray-700 p-2 rounded">
            <option value="All">Select Type</option>
            {gearTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredGear.length === 0 ? (
        <p className="text-center text-gray-400 mt-8">No sports gear found matching your criteria.</p>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredGear.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-gray-800 rounded overflow-hidden shadow-lg">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-lg mb-2">{item.name}</h2>
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded">{item.sport}</span>
                    <span className="border border-gray-600 text-gray-300 px-2 py-1 rounded">{item.type}</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-400">${item.price.toFixed(2)}</p>
                </div>
                <div className="p-4 pt-0">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded flex items-center justify-center">
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}