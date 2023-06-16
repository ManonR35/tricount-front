import Card from "../components/card";
import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [expenses, setExpenses] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  let filteredExpenses = !selectedUser
    ? expenses
    : expenses.filter((expense) => expense.paidBy === selectedUser);

  useEffect(() => {
    // This function get all expenses from the database
    function getExpenses() {
      try {
        axios.get("http://localhost:3001/expense").then((response) => {
          setExpenses(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    }

    // This function get all users from the database
    function getUsers() {
      try {
        axios.get("http://localhost:3001/user").then((response) => {
          setUsers(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    }

    getExpenses();
    getUsers();
  }, []);

  // This function handle the change of the select
  // When a user is selected, the expenses are filtered
  function handleChange(e) {
    setSelectedUser(e.target.value);
    console.log(selectedUser);
  }

  return (
    <div>
      <div className="font-semibold text-lg">Liste des dépenses</div>
      <div>
        <div>Filter par utilisateur</div>
        <select
          className="form-select appearance-none
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding bg-no-repeat
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          onChange={handleChange}
        >
          {users &&
            users.map((user, index) => (
              <option key={index} value={user.userId}>
                {user.name}
              </option>
            ))}
        </select>
      </div>
      {selectedUser && (
        <div>
          <div>
            <div>Total payé</div>
            <div>Valeur dynamique</div>
          </div>
          <div>
            <div>Total dû</div>
            <div>valeur dynamique</div>
          </div>
        </div>
      )}

      <div>
        <ul className="grid grid-cols-3 gap-4">
          {filteredExpenses.length > 0 &&
            filteredExpenses.map((expense, index) => (
              <Card key={expense.expenseId} expense={expense} />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
