import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // This function gets all the users from the database and stores them in the state
    function getUsers() {
      try {
        axios.get("http://localhost:3001/user").then((response) => {
          setUsers(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    }

    getUsers();
  }, []);

  // This function deletes a user from the database and updates the state
  function handleDelete(id) {
    axios.delete(`http://localhost:3001/user/${id}`).then((response) => {
      console.log("Catégorie supprimée");
      setUsers(users.filter((user) => user.userId !== id));
    });
  }

  return (
    <div className="my-4">
      <div>
        <h1 className="text-xl font-bold">Liste des utilisateurs</h1>
      </div>
      <div>
        <ul className="grid grid-cols-3 gap-4">
          {users.length > 0 &&
            users.map((user, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded shadow-md">
                <p className="text-gray-500">{user.name}</p>
                <button
                  onClick={() => handleDelete(user.userId)}
                  type="button"
                  className="mt-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded shadow-md hover:bg-red-700 focus:bg-red-700 focus:outline-none focus:ring-0 active:bg-red-800 transition duration-150 ease-in-out"
                >
                  Supprimer
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
