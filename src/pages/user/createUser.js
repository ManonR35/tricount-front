import React, { useState } from "react";
import axios from "axios";

function CreateUser() {
  const [user, setUser] = useState([""]);

  // This function is called when the form is submitted
  // It calls the API to create a new user
  async function handleSubmit() {
    await axios.post(`http://127.0.0.1:3001/user`, {
      name: user.name,
      email: user.email,
    });
  }

  return (
    <div>
      <form className="max-w-xs mx-auto">
        <input
          type="email"
          placeholder="Adresse mail"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        ></input>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        ></input>
        <button
          className="my-2 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          onClick={handleSubmit}
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default CreateUser;
