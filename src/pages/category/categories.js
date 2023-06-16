import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // This function gets all of the categories from the database and sets the categories state variable to the result.
    function getCategories() {
      try {
        axios.get("http://localhost:3001/category").then((response) => {
          setCategories(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    }

    getCategories();
  }, []);

  // This function deletes a category from the database and removes it from the categories state variable.
  function handleDelete(id) {
    axios.delete(`http://localhost:3001/category/${id}`).then((response) => {
      setCategories(
        categories.filter((category) => category.categoryId !== id)
      );
    });
  }

  return (
    <div className="my-4">
      <div>
        <h1 className="text-xl font-bold">Liste des catégories</h1>
      </div>
      <div>
        <ul className="grid grid-cols-3 gap-4">
          {categories.length > 0 &&
            categories.map((category, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded shadow-md">
                <p className="text-gray-500">{category.name}</p>
                <button
                  onClick={() => handleDelete(category.categoryId)}
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
