import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../components/input";

function CreateExpense() {
  const [expense, setExpense] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [expenseUsers, setExpenseUsers] = useState([]);

  useEffect(() => {
    // This function get all users from the database and set into the state
    function getUser() {
      axios.get(`http://127.0.0.1:3001/user`).then((response) => {
        setUsers(response.data);
      });
    }

    // This function get all categories from the database and set into the state
    function getCategories() {
      axios.get(`http://127.0.0.1:3001/category`).then((response) => {
        setCategories(response.data);
      });
    }

    getUser();
    getCategories();
  }, []);

  // This function is called when the user click on the submit button
  // It send a post request to the server with the expense data
  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    console.log(expense);
    try {
      const response = await axios.post(`http://127.0.0.1:3001/expense`, {
        amount: expense.amount,
        paidBy: expense.paidBy,
        categoryId: expense.categoryId,
        users: expenseUsers,
      });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  // This function is called when the user click on a checkbox
  // It add or remove the user from the expenseUsers state
  function handleCkeckboxChange(e) {
    if (e.target.checked) {
      setExpenseUsers([...expenseUsers, e.target.value]);
    } else {
      setExpenseUsers(expenseUsers.filter((user) => user !== e.target.value));
    }
  }

  return (
    <div>
      <h1>Création d'une dépense</h1>
      <form className="max-w-xs mx-auto" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount"></label>
          <Input
            id="amount"
            type="number"
            placeholder="Amount"
            onChange={(e) =>
              setExpense({ ...expense, amount: +e.target.value })
            }
          />
        </div>
        <label htmlFor="payer">Payeur :</label>
        <select
          id="payer"
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
          onChange={(e) => setExpense({ ...expense, paidBy: +e.target.value })}
        >
          {users &&
            users.map((user, index) => (
              <option key={index} value={user.userId}>
                {user.name}
              </option>
            ))}
        </select>
        <div>
          <label htmlFor="category">Catégorie :</label>
          <select
            id="category"
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
            onChange={(e) => {
              console.log(e.target.value);
              setExpense({ ...expense, categoryId: +e.target.value });
            }}
          >
            <option value="">Choisir une catégorie</option>
            {categories &&
              categories.map((category, index) => (
                <option key={index} value={category.categoryId}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <p>Qui doit rembourser :</p>
          {users &&
            users.map((user, index) => (
              <div key={index}>
                <label htmlFor="users">{user.name}</label>
                <input
                  type="checkbox"
                  id="users"
                  name={user}
                  value={user.userId}
                  onChange={handleCkeckboxChange}
                />
              </div>
            ))}
        </div>
        <button className="my-2 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default CreateExpense;
