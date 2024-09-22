'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ChevronDown, ExternalLink, Calendar } from 'lucide-react'

const newsArticles = [
  { id: 1, title: "Virat Kohli's Century Leads India to Victory", category: "Cricket", date: "2023-08-15", content: "In a thrilling match against Australia, Virat Kohli's masterful century propelled India to a decisive victory, further cementing his status as one of cricket's greatest batsmen." },
  { id: 2, title: "PV Sindhu Clinches Gold at BWF World Championships", category: "Badminton", date: "2023-08-14", content: "Indian shuttler PV Sindhu showcased her exceptional skills and determination, securing a gold medal at the BWF World Championships and bringing glory to the nation." },
  { id: 3, title: "Neeraj Chopra Breaks Own Javelin Throw Record", category: "Athletics", date: "2023-08-13", content: "Olympic gold medalist Neeraj Chopra has once again made headlines by breaking his own national record in javelin throw, setting a new benchmark for Indian athletics." },
  { id: 4, title: "Indian Hockey Team Qualifies for Olympics", category: "Hockey", date: "2023-08-12", content: "The Indian men's hockey team has secured their spot in the upcoming Olympics with a series of impressive performances in the qualifying tournament." },
  { id: 5, title: "Mary Kom Announces Comeback for Asian Games", category: "Boxing", date: "2023-08-11", content: "Legendary boxer Mary Kom has announced her intention to come out of retirement to represent India in the upcoming Asian Games, inspiring a new generation of athletes." },
  { id: 6, title: "Sania Mirza to Coach Rising Tennis Stars", category: "Tennis", date: "2023-08-10", content: "Former tennis champion Sania Mirza has taken on a new role as a coach, aiming to nurture and develop the next generation of Indian tennis talent." },
]

const categories = ["All", "Cricket", "Badminton", "Athletics", "Hockey", "Boxing", "Tennis"]

const NewsCard = ({ article }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-gray-800 text-white border-gray-700 p-7 rounded"
  >
    <div className="mb-2">
      <h2 className="text-xl text-white">{article.title}</h2>
      <div className="flex items-center mt-2 text-white/60">
        <Calendar className="mr-2 h-4 w-4" />
        {article.date}
      </div>
    </div>
    <div className="flex-grow text-white/80">{article.content}</div>
    <div className="flex justify-between items-center mt-4">
      <span className="bg-orange-500 text-white px-2 py-1 rounded">{article.category}</span>
      <button className="text-blue-400 hover:text-blue-300 flex items-center">
        Read more <ExternalLink className="ml-2 h-4 w-4" />
      </button>
    </div>
  </motion.div>
)

export default function LatestNews() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredNews = newsArticles.filter(article => 
    (activeCategory === "All" || article.category === activeCategory) &&
    (article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     article.content.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-gray-600 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Latest Sports News</h1>
      
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/10 text-white border border-white/20 pl-10 pr-3 py-2 rounded"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
        </div>
        
        <div className="flex space-x-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-md text-white ${activeCategory === category ? 'bg-white/20' : 'bg-white/10'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)] overflow-y-auto">
        {filteredNews.map(article => (
          <NewsCard key={article.id} article={article} />
        ))}
        {filteredNews.length === 0 && (
          <p className="text-center text-white/60 mt-8">No news articles found matching your criteria.</p>
        )}
      </div>
    </div>
  )
}
