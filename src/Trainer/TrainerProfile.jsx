import React from "react"
import { Edit, Star, Calendar, Users, Award, ChevronRight } from "lucide-react"

const ProfileSection = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <h2 className="text-2xl font-semibold mb-4 text-gray-900">{title}</h2>
    {children}
  </div>
)

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
    {icon}
    <div className="ml-4">
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  </div>
)

export default function TrainerProfilePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Trainer Profile</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Edit size={20} className="mr-2" />
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ProfileSection title="Personal Information">
              <div className="flex flex-col items-center">
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Trainer"
                  className="w-48 h-48 rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Sarah Johnson</h3>
                <p className="text-gray-600 mb-2">Fitness & Nutrition Specialist</p>
                <div className="flex items-center text-yellow-500 mb-2">
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <span className="ml-2 text-gray-600">(4.9)</span>
                </div>
                <p className="text-gray-600">10 years experience</p>
              </div>
            </ProfileSection>

            <ProfileSection title="Contact Information">
              <div className="space-y-2">
                <p><strong>Email:</strong> sarah.johnson@example.com</p>
                <p><strong>Phone:</strong> (555) 123-4567</p>
                <p><strong>Location:</strong> New York, NY</p>
              </div>
            </ProfileSection>
          </div>

          <div className="lg:col-span-2">
            <ProfileSection title="About Me">
              <p className="text-gray-700">
                I'm a passionate fitness and nutrition specialist with over a decade of experience helping clients
                achieve their health and wellness goals. My approach combines personalized workout plans, nutrition
                guidance, and motivational coaching to ensure long-lasting results. Whether you're looking to lose
                weight, build muscle, or improve your overall fitness, I'm here to guide you every step of the way.
              </p>
            </ProfileSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <StatCard icon={<Calendar className="text-blue-600" size={24} />} title="Sessions" value="1,234" />
              <StatCard icon={<Users className="text-blue-600" size={24} />} title="Clients" value="89" />
              <StatCard icon={<Award className="text-blue-600" size={24} />} title="Certifications" value="7" />
            </div>

            <ProfileSection title="Specializations">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Weight Loss</li>
                <li>Strength Training</li>
                <li>Nutrition Planning</li>
                <li>HIIT Workouts</li>
                <li>Injury Rehabilitation</li>
              </ul>
            </ProfileSection>

            <ProfileSection title="Certifications">
              <ul className="space-y-4">
                <li className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Certified Personal Trainer (CPT)</p>
                    <p className="text-sm text-gray-600">National Academy of Sports Medicine</p>
                  </div>
                  <ChevronRight className="text-gray-400" size={20} />
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Certified Nutrition Specialist (CNS)</p>
                    <p className="text-sm text-gray-600">Board for Certification of Nutrition Specialists</p>
                  </div>
                  <ChevronRight className="text-gray-400" size={20} />
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Corrective Exercise Specialist (CES)</p>
                    <p className="text-sm text-gray-600">National Academy of Sports Medicine</p>
                  </div>
                  <ChevronRight className="text-gray-400" size={20} />
                </li>
              </ul>
            </ProfileSection>

            <ProfileSection title="Client Testimonials">
              <div className="space-y-4">
                <blockquote className="italic text-gray-700 border-l-4 border-blue-600 pl-4">
                  "Sarah is an amazing trainer! Her personalized approach and constant encouragement helped me lose 30
                  pounds and feel better than ever. Highly recommended!"
                  <footer className="text-sm text-gray-600 mt-2">- Emily R.</footer>
                </blockquote>
                <blockquote className="italic text-gray-700 border-l-4 border-blue-600 pl-4">
                  "Working with Sarah has been life-changing. Her nutrition advice and workout plans are top-notch. I've
                  gained muscle, improved my diet, and feel more confident than ever."
                  <footer className="text-sm text-gray-600 mt-2">- Michael T.</footer>
                </blockquote>
              </div>
            </ProfileSection>
          </div>
        </div>
      </main>
    </div>
  )
}