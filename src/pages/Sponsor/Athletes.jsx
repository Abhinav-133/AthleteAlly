import React from "react";
import Sidebar from "./Sidebar";

const AthletesPage = () => {
  const athletes = [
    {
      name: "John Doe",
      sport: "Basketball",
      team: "New York Knicks",
      image:
        "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/player1-2wQXCDm1yQEvTHds0fYgxnIgLqQZPm.jpg",
      stats: {
        points: 25.3,
        rebounds: 10.1,
        assists: 5.7,
      },
      sponsors: [
        {
          name: "Nike",
          logo: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/nike-logo-JBPcFGxcWvHwfbVUGi9LS4xSdDwJVt.png",
        },
        {
          name: "Gatorade",
          logo: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/gatorade-logo-wCqSGQxw9SRYYWy2OKoXhHlpTxtHRa.png",
        },
        {
          name: "Beats by Dre",
          logo: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/beats-logo-ZBPcOuZKbQ1cj8nZYIQxXVXgLHOeNk.png",
        },
      ],
    },
    {
      name: "Jane Smith",
      sport: "Soccer",
      team: "Manchester United",
      image:
        "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/player2-5Vn8Qd3OBNTFHUe1POWVqIZmRxpDbg.jpg",
      stats: {
        goals: 18,
        assists: 12,
        cleanSheets: 5,
      },
      sponsors: [
        {
          name: "Adidas",
          logo: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/adidas-logo-kxTHJwpTzEOtCGrbYBxTNnR4LS3Dve.png",
        },
        {
          name: "Pepsi",
          logo: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/pepsi-logo-zBocFe3Y1oHWMLdMZ5XgKgfzYBCpxn.png",
        },
        {
          name: "Samsung",
          logo: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/samsung-logo-6VxQCrvzh9LDg8VtNGfgAjfwLSDKPa.png",
        },
      ],
    },
    {
      name: "Mike Johnson",
      sport: "Tennis",
      team: "ATP Tour",
      image:
        "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/player3-5TP8hB3OBNTFHUe1POWVqIZmRxpDbg.jpg",
      stats: {
        grandSlams: 3,
        winPercentage: 78.5,
        ranking: 4,
      },
      sponsors: [
        {
          name: "Wilson",
          logo: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/wilson-logo-zBocFe3Y1oHWMLdMZ5XgKgfzYBCpxn.png",
        },
        {
          name: "Rolex",
          logo: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/rolex-logo-kxTHJwpTzEOtCGrbYBxTNnR4LS3Dve.png",
        },
        {
          name: "Emirates",
          logo: "https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/emirates-logo-JBPcFGxcWvHwfbVUGi9LS4xSdDwJVt.png",
        },
      ],
    },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar space */}
      <div className="w-64 fixed">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 ml-64">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
            Featured Athletes
          </h1>

          {/* Grid for athlete cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {athletes.map((athlete, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="md:flex">
                  <div className="md:flex-shrink-0">
                    <img
                      className="h-48 w-full object-cover md:w-48"
                      src={athlete.image}
                      alt={athlete.name}
                    />
                  </div>
                  <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
                      {athlete.sport}
                    </div>
                    <h2 className="mt-1 text-3xl font-bold text-blue-900">
                      {athlete.name}
                    </h2>
                    <p className="mt-2 text-blue-700">{athlete.team}</p>
                  </div>
                </div>

                <div className="px-8 py-6 bg-blue-50">
                  <h3 className="text-2xl font-bold text-blue-900 mb-4">
                    Stats
                  </h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {Object.entries(athlete.stats).map(
                      ([key, value], statIndex) => (
                        <div
                          key={statIndex}
                          className="bg-white p-4 rounded-lg shadow"
                        >
                          <p className="text-3xl font-bold text-blue-600">
                            {value}
                          </p>
                          <p className="text-sm text-blue-700 capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="px-8 py-6">
                  <h3 className="text-2xl font-bold text-blue-900 mb-4">
                    Sponsors
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {athlete.sponsors.map((sponsor, sponsorIndex) => (
                      <div
                        key={sponsorIndex}
                        className="bg-blue-50 p-4 rounded-lg flex items-center justify-center shadow"
                      >
                        <img
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className="max-h-12 w-auto"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AthletesPage;
