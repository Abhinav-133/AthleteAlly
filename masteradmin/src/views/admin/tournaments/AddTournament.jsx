import React, { useState } from "react";
import {
  ChevronDownIcon,
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";

// ... (sportsList stays the same)
const sportsList = [
  "Football",
  "Basketball",
  "Tennis",
  "Volleyball",
  "Swimming",
  "Athletics",
  "Badminton",
  "Table Tennis",
  "Cricket",
  "Hockey",
];

export default function AddTournament({ closeModal }) {
  const [formData, setFormData] = useState({
    tournamentName: "",
    date: "",
    venue: "",
    sports: [],
    organisers: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSportToggle = (sport) => {
    setFormData((prevData) => ({
      ...prevData,
      sports: prevData.sports.includes(sport)
        ? prevData.sports.filter((s) => s !== sport)
        : [...prevData.sports, sport],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // You might want to send the data to the server here
    closeModal(); // Close the modal after submission
  };

  return (
    <div className="w-full max-w-md rounded-xl bg-white p-10 shadow-lg">
      <div>
        <TrophyIcon className="mx-auto h-12 w-auto text-blue-600" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-900">
          Tournament Registration
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Let the games begin! Register your tournament now.
        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {/* ... (the rest of your form elements remain unchanged) */}
        <div className="-space-y-px rounded-md shadow-sm">
          <div className="flex items-center rounded-t-md border border-gray-300">
            <TrophyIcon className="ml-3 h-5 w-5 text-gray-400" />
            <input
              id="tournament-name"
              name="tournamentName"
              type="text"
              required
              className="relative block w-full appearance-none rounded-none px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Tournament Name"
              value={formData.tournamentName}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center border border-gray-300">
            <CalendarIcon className="ml-3 h-5 w-5 text-gray-400" />
            <input
              id="date"
              name="date"
              type="date"
              required
              className="relative block w-full appearance-none rounded-none px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center border border-gray-300">
            <MapPinIcon className="ml-3 h-5 w-5 text-gray-400" />
            <input
              id="venue"
              name="venue"
              type="text"
              required
              className="relative block w-full appearance-none rounded-none px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Venue"
              value={formData.venue}
              onChange={handleChange}
            />
          </div>
          <div className="relative">
            <button
              type="button"
              className="relative w-full cursor-default rounded-none border border-gray-300 bg-white text-left focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="flex items-center">
                <span className="ml-3 block truncate">
                  {formData.sports.length > 0
                    ? formData.sports.join(", ")
                    : "Select Sports"}
                </span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </button>
            {isDropdownOpen && (
              <div className="ring-black absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-opacity-5 focus:outline-none sm:text-sm">
                {sportsList.map((sport) => (
                  <div
                    key={sport}
                    className={`${
                      formData.sports.includes(sport)
                        ? "bg-blue-100 text-blue-900"
                        : "text-gray-900"
                    } relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-blue-50`}
                    onClick={() => handleSportToggle(sport)}
                  >
                    {sport}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center rounded-b-md border border-gray-300">
            <UserGroupIcon className="ml-3 h-5 w-5 text-gray-400" />
            <input
              id="organisers"
              name="organisers"
              type="text"
              required
              className="relative block w-full appearance-none rounded-none rounded-b-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Organisers"
              value={formData.organisers}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="border-transparent group relative flex w-full justify-center rounded-md border bg-blue-600 px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <TrophyIcon
                className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                aria-hidden="true"
              />
            </span>
            Register Tournament
          </button>
        </div>
      </form>
      <button
        onClick={closeModal}
        className="mt-4 w-full text-center text-blue-600 hover:text-blue-800"
      >
        Cancel
      </button>
    </div>
  );
}
