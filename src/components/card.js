import { useState, useEffect } from "react";
import axios from "axios";

function Card({ expense }) {
  const [users, setUsers] = useState([]);
  const [payer, setPayer] = useState([]);

  const amountPerUser = expense.amount / (expense.users.length + 1);

  useEffect(() => {
    // get the user's list of expenses
    async function getUsers() {
      try {
        const response = await axios.get(
          `http://localhost:3001/expense/${expense.expenseId}/users`
        );
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    // Get the user that paid for the expense
    async function getPayer() {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/${expense.paidBy}`
        );
        setPayer(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getPayer();
    getUsers();
  }, []);

  function formatDate(date) {
    const day = date.getDate();
    const month = new Intl.DateTimeFormat("fr-FR", { month: "long" }).format(
      date
    );
    const year = date.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;

    return formattedDate;
  }

  return (
    <li className="bg-white rounded-lg shadow-md p-4 mb-4">
      <p className="text-gray-700 text-lg font-bold">{expense.amount} €</p>
      <p className="text-gray-500">{expense.category}</p>
      {payer && <p className="text-gray-500">{payer.name}</p>}
      <p className="text-gray-500">{formatDate(new Date(expense.createdAt))}</p>
      <ul className="mt-4">
        {users.length > 0 &&
          users.map((user, index) => (
            <li key={index} className="flex items-center">
              <p className="text-gray-700">{user.name}</p>
              <p className="text-gray-700">{amountPerUser.toFixed(2)} €</p>
            </li>
          ))}
      </ul>
    </li>
  );
}

export default Card;
