import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../components/input";

function CreateCategory() {
  const [category, setCategory] = useState([""]);
  const [users, setUsers] = useState([""]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:3001/user`).then((response) => {
      setUsers(response.data);
    });
  }, []);

  function handleSubmit() {
    axios.post(`http://127.0.0.1:3001/category`, {
      name: category.name,
      email: category.email,
    });
  }

  return (
    <div>
      <form className="max-w-xs mx-auto" onSubmit={(e) => e.preventDefault()}>
        <Input
          type="text"
          placeholder="Name"
          value=""
          onChange={(e) => setCategory({ ...category, name: e.target.value })}
        />
        {/* <select
          type="text"
          placeholder="User name"
          onChange={(e) => setCategoryId({ ...category, userId: e.target.value })}
        >
          {users &&
            users.map((user, index) => (
              <option
                key={index}
                value={user.userId}
              >
                {user.name}
              </option>
            ))}
        </select> */}
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

export default CreateCategory;
