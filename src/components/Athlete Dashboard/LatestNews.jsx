"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown, ExternalLink, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
];

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
    <div className="flex-grow text-white/80">{article.description}</div>
    <div className="flex justify-between items-center mt-4">
      <button className="text-blue-400 hover:text-blue-300 flex items-center">
        <Link
          to={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          Read more
          <span>
            <ExternalLink className="ml-2 h-4 w-4" />
          </span>
        </Link>
      </button>
    </div>
  </motion.div>
);

export default function LatestNews() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [newsArticles, setNewsArticles] = useState([]);
  const [newsUrl, setNewsUrl] = useState("");

  const filteredNews = newsArticles.filter(
    (article) =>
      (activeCategory === "All" || article.category === activeCategory) &&
      (article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getLast7DaysNews = () => {
    const today = new Date();
    const last7Days = new Date(today);
    last7Days.setDate(today.getDate() - 7);

    const formattedFromDate = last7Days.toISOString().split("T")[0];
    const url = `https://newsapi.org/v2/everything?q=Sports&from=${formattedFromDate}&sortBy=popularity&sources=the-times-of-india,ndtv,the-hindu&apiKey=${
      import.meta.env.VITE_NEWSAPI_KEY
    }`;
    setNewsUrl(url);
  };

  const fetchNews = async () => {
    let response = await fetch(newsUrl);
    response = await response.json();
    setNewsArticles(response.articles);
  };

  useEffect(() => {
    fetchNews();
  }, [newsUrl]);

  useEffect(() => {
    getLast7DaysNews();
  }, []);
  return (
    <div className="min-h-screen bg-white-600 text-gray-800 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Latest Sports News
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 bg-white p-4 rounded shadow-lg">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-200 text-gray-800 border-gray-300 pl-10 p-2 rounded w-full"
          />
         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
        </div>

        <div className="flex space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-md text-white ${
                activeCategory === category ? "bg-white/20" : "bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)] overflow-y-auto">
        {filteredNews.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
        {filteredNews.length === 0 && (
          <p className="text-center text-white/60 mt-8">
            No news articles found matching your criteria.
          </p>
        )}
      </div>
    </div>
  );
}
