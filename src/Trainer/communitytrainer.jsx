import React from "react"
import { Search, MessageCircle, ThumbsUp, Share2, Send } from "lucide-react"

const PostCard = ({ author, avatar, time, content, likes, comments, shares }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <div className="flex items-center mb-4">
      <img src={avatar} alt={author} className="w-12 h-12 rounded-full mr-4" />
      <div>
        <h3 className="font-semibold text-lg">{author}</h3>
        <p className="text-gray-500 text-sm">{time}</p>
      </div>
    </div>
    <p className="text-gray-700 mb-4">{content}</p>
    <div className="flex justify-between items-center text-gray-500">
      <button className="flex items-center hover:text-blue-600">
        <ThumbsUp size={20} className="mr-1" />
        {likes}
      </button>
      <button className="flex items-center hover:text-blue-600">
        <MessageCircle size={20} className="mr-1" />
        {comments}
      </button>
      <button className="flex items-center hover:text-blue-600">
        <Share2 size={20} className="mr-1" />
        {shares}
      </button>
    </div>
  </div>
)

const CommunityEvent = ({ title, date, attendees }) => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-4">
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <p className="text-gray-600 mb-2">{date}</p>
    <p className="text-sm text-gray-500">{attendees} attendees</p>
  </div>
)

export default function CommunityPage() {
  const posts = [
    {
      author: "Sarah Johnson",
      avatar: "/placeholder.svg?height=48&width=48",
      time: "2 hours ago",
      content: "Just finished an amazing HIIT session with my group class. Everyone pushed their limits today! 💪 #FitnessMotivation",
      likes: 24,
      comments: 5,
      shares: 2
    },
    {
      author: "Mike Williams",
      avatar: "/placeholder.svg?height=48&width=48",
      time: "Yesterday",
      content: "Excited to announce my new nutrition workshop series starting next month. Who's interested in learning about clean eating and meal prep? 🥗🍎",
      likes: 56,
      comments: 12,
      shares: 8
    },
    {
      author: "Emily Brown",
      avatar: "/placeholder.svg?height=48&width=48",
      time: "3 days ago",
      content: "Congratulations to my client John for completing his first marathon! Months of hard work and dedication paid off. So proud! 🏃‍♂️🏅",
      likes: 89,
      comments: 15,
      shares: 7
    }
  ]

  const events = [
    { title: "Summer Fitness Challenge", date: "Starts June 1st", attendees: 45 },
    { title: "Nutrition Seminar", date: "May 15th, 2pm", attendees: 30 },
    { title: "Yoga in the Park", date: "Every Sunday, 9am", attendees: 20 }
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Trainer Community</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center mb-4">
                  <img src="/placeholder.svg?height=40&width=40" alt="Your Avatar" className="w-10 h-10 rounded-full mr-4" />
                  <input
                    type="text"
                    placeholder="Share something with the community..."
                    className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                    <Send size={20} className="mr-2" />
                    Post
                  </button>
                </div>
              </div>
            </div>

            {posts.map((post, index) => (
              <PostCard key={index} {...post} />
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
              {events.map((event, index) => (
                <CommunityEvent key={index} {...event} />
              ))}
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4">
                View All Events
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Find Trainers</h2>
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search trainers..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
              <button className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                Advanced Search
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}