import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc, query, where, getDocs, collection, writeBatch, addDoc, arrayUnion } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

export default function TeamRegisterPage() {
  const [userUid, setUserUid] = useState("");
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([]);
  const [tournamentId, setTournamentId] = useState(""); 
  const [tournamentName, setTournamentName] = useState("");
  const [teamSize, setTeamSize] = useState(0); 
  const [warning, setWarning] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const uid = sessionStorage.getItem("userUid");
    const storedTournamentId = sessionStorage.getItem("tournamentID");

    if (!uid) {
      navigate('/login'); 
    } else {
      setUserUid(uid);
      setTournamentId(storedTournamentId);
      
      const fetchTournamentDetails = async (id) => {
        const tournamentRef = doc(db, "tournaments", id);
        const tournamentSnap = await getDoc(tournamentRef);
        if (tournamentSnap.exists()) {
          const tournamentData = tournamentSnap.data();
          const requiredTeamSize = tournamentData.teamSize; 
          const name = tournamentData.name; 
          setTeamSize(requiredTeamSize);
          setTournamentName(name); 
          const initialMembers = Array.from({ length: requiredTeamSize }, () => ({ name: "", athleteId: "" }));
          setMembers(initialMembers);
        } else {
          console.log("No such tournament!");
        }
      };

      if (storedTournamentId) {
        fetchTournamentDetails(storedTournamentId);
      }
    }
  }, [navigate]);

  const handleChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index] = {
      ...updatedMembers[index],
      [field]: value,
    };
    setMembers(updatedMembers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWarning(""); 

    const athleteIds = members.map(member => member.athleteId);
    const nonExistentIds = [];
    const batch = writeBatch(db); 
  
    for (const athleteId of athleteIds) {
      const athleteQuery = query(
        collection(db, "athletes"),
        where("enroll", "==", athleteId)
      );
  
      const athleteSnap = await getDocs(athleteQuery);
      if (athleteSnap.empty) {
        nonExistentIds.push(athleteId); 
      } else {
        athleteSnap.forEach((doc) => {
          batch.update(doc.ref, {
            registeredTournaments: arrayUnion(tournamentId)
          });
        });
      }
    }
  
    if (nonExistentIds.length > 0) {
      setWarning(`The following athlete IDs do not exist: ${nonExistentIds.join(", ")}`);
      return; 
    }
  
    try {
      const teamRef = await addDoc(collection(db, "teams"), {
        teamName,
        teamLeader: userUid,  
        members,
        tournamentId,
        tournamentName,
        createdBy: userUid,
      });
  
      await batch.commit();
      console.log("Team and athletes successfully registered.");
      navigate("/athlete-dashboard"); 
    } catch (error) {
      console.error("Error registering team and updating athletes: ", error);
      setWarning("An error occurred during registration.");
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-10">
      <h1 className="text-5xl font-semibold mb-8 text-center text-gray-700">Team Registration</h1>
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-600">{tournamentName}</h2> 
      {warning && <div className="text-red-500 mb-4">{warning}</div>}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl border border-gray-200">
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-500">Team Name</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="block w-full bg-gray-50 border border-gray-300 rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <h2 className="text-xl font-semibold mb-4 text-gray-600">Team Members</h2>
        {members.map((member, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-500">Member {index + 1} Name</label>
              <input
                type="text"
                value={member.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
                className="block w-full bg-gray-50 border border-gray-300 rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-500">Member {index + 1} Athlete ID</label>
              <input
                type="text"
                value={member.athleteId}
                onChange={(e) => handleChange(index, 'athleteId', e.target.value)}
                className="block w-full bg-gray-50 border border-gray-300 rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        ))}
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow-md">
          Register Team
        </button>
      </form>
    </div>
  );
}