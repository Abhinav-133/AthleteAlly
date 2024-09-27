import { useState, React } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside className="w-64 bg-gray-800 p-6 space-y-6">
      <SidebarSection
        title="Dashboard"
        items={[
          { name: "Overview", onClick: () => handleDashboardClick("Overview") },
          {
            name: "Analytics",
            onClick: () => handleDashboardClick("Analytics"),
          },
          { name: "Reports", onClick: () => handleDashboardClick("Reports") },
        ]}
      />
      <SidebarSection
        title="Sponsorships"
        items={[
          {
            name: "Current Deals",
            onClick: () => handleSponsorshipsClick("Current Deals"),
          },
          {
            name: "Opportunities",
            onClick: () => handleSponsorshipsClick("Opportunities"),
          },
          {
            name: "History",
            onClick: () => handleSponsorshipsClick("History"),
          },
        ]}
      />
      <SidebarSection
        title="Events"
        items={[
          {
            name: "Upcoming",
            onClick: () => navigate("/sponsor/upcoming-events"),
          },
          {
            name: "Past Events",
            onClick: () => navigate("/sponsor/past-events"),
          },
        ]}
      />
      <SidebarSection
        title="Account"
        items={[
          { name: "Profile", onClick: () => handleAccountClick("Profile") },
          { name: "Billing", onClick: () => handleAccountClick("Billing") },
          { name: "Settings", onClick: () => handleAccountClick("Settings") },
        ]}
      />
    </aside>
  );
}

function SidebarSection({ title, items }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <button
        className="flex items-center justify-between w-full text-left font-semibold mb-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={index}
              className="text-gray-300 hover:text-white cursor-pointer"
              onClick={item.onClick}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Sidebar;
