import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

const SponsorEngagementPage = () => {
  const [selectedEntity, setSelectedEntity] = useState("");
  const [engagementType, setEngagementType] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showTip, setShowTip] = useState(false);

  const sponsoredEntities = [
    {
      id: 1,
      name: "New York Knicks",
      type: "Team",
      logo: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/knicks-logo-JBPcFGxcWvHwfbVUGi9LS4xSdDwJVt.png",
    },
    {
      id: 2,
      name: "Manchester United",
      type: "Team",
      logo: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/man-utd-logo-5Vn8Qd3OBNTFHUe1POWVqIZmRxpDbg.png",
    },
    {
      id: 3,
      name: "Los Angeles Dodgers",
      type: "Team",
      logo: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/dodgers-logo-5TP8hB3OBNTFHUe1POWVqIZmRxpDbg.png",
    },
    {
      id: 4,
      name: "John Doe",
      type: "Athlete",
      image:
        "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/player1-2wQXCDm1yQEvTHds0fYgxnIgLqQZPm.jpg",
    },
    {
      id: 5,
      name: "Jane Smith",
      type: "Athlete",
      image:
        "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/player2-5Vn8Qd3OBNTFHUe1POWVqIZmRxpDbg.jpg",
    },
    {
      id: 6,
      name: "Mike Johnson",
      type: "Athlete",
      image:
        "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/player3-5TP8hB3OBNTFHUe1POWVqIZmRxpDbg.jpg",
    },
  ];

  const engagementTypes = [
    "Guest Appearance",
    "Commercial Shoot",
    "Social Media Promotion",
    "Charity Event",
    "Product Launch",
  ];

  useEffect(() => {
    const tipTimer = setTimeout(() => setShowTip(true), 3000);
    return () => clearTimeout(tipTimer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log({ selectedEntity, engagementType, message });
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  const renderEntityImage = () => {
    const entity = sponsoredEntities.find((e) => e.name === selectedEntity);
    if (!entity) return null;
    return (
      <div className="mt-4 flex justify-center">
        <img
          src={entity.type === "Team" ? entity.logo : entity.image}
          alt={entity.name}
          className={`h-32 w-32 object-cover ${
            entity.type === "Team" ? "object-contain" : "rounded-full"
          }`}
        />
      </div>
    );
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="w-64 bg-blue-900">
        <Sidebar />
      </div>

      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden transform transition-all hover:scale-105">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-blue-900 mb-6 text-center">
              Sponsor Engagement Form
            </h1>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <label
                    htmlFor="entity"
                    className="block text-sm font-medium text-blue-700"
                  >
                    Select Team/Athlete
                  </label>
                  <select
                    id="entity"
                    value={selectedEntity}
                    onChange={(e) => setSelectedEntity(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    required
                  >
                    <option value="">Select a team or athlete</option>
                    {sponsoredEntities.map((entity) => (
                      <option key={entity.id} value={entity.name}>
                        {entity.name} ({entity.type})
                      </option>
                    ))}
                  </select>
                  {renderEntityImage()}
                </div>

                <div>
                  <label
                    htmlFor="engagementType"
                    className="block text-sm font-medium text-blue-700"
                  >
                    Engagement Type
                  </label>
                  <select
                    id="engagementType"
                    value={engagementType}
                    onChange={(e) => setEngagementType(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    required
                  >
                    <option value="">Select engagement type</option>
                    {engagementTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-blue-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    placeholder="Provide details about your engagement..."
                    required
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    disabled={loading}
                  >
                    {loading ? (
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : null}
                    {loading ? "Submitting..." : "Submit Engagement"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">
                  Engagement Submitted!
                </h2>
                <p className="text-blue-700 mb-4">
                  Your engagement for {engagementType.toLowerCase()} has been
                  sent to {selectedEntity}.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setSelectedEntity("");
                    setEngagementType("");
                    setMessage("");
                  }}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  Submit Another Engagement
                </button>
              </div>
            )}
          </div>
        </div>
        {showTip && (
          <div className="mt-8 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded animate-fade-in-up">
            <p className="font-bold">Tip:</p>
            <p>
              Personalize your message to strengthen your relationship with the
              team or athlete!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SponsorEngagementPage;
