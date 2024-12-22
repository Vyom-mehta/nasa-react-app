import Main_Component from "./Components/Main_Component.jsx";
import SideBar from "./Components/SideBar.jsx";
import Footer from "./Components/Footer.jsx";

import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  function handleToggleModal() {
    setShowModal(!showModal);
  }

  useEffect(() => {
    async function Fetch_Data_Frm_Api() {
      const API_KEY = import.meta.env.VITE_NASA_API_KEY;

      const url = "https://api.nasa.gov/planetary/apod" + `?api_key=${API_KEY}`;

      const today = new Date().toDateString();
      const localKey = `API-${today}`;
      //If data exists, it is retrieved using localStorage.getItem() and parsed with JSON.parse() used  to convert it back to a JavaScript object. This avoids making a redundant network call.When retrieving the data from localStorage, you'll need to deserialize it to convert the string back into its original data structure. This is done using JSON.parse().
      if (localStorage.getItem(localKey)) {
        const api_data_ls = JSON.parse(localStorage.getItem(localKey));
        setData(api_data_ls);
        console.log("FECTHED FROM CACHE TODAY  ");
        return;
      }
      /* Purpose of localStorage.clear(): It clears the entire localStorage when there is no cached data for today (i.e., no data associated with the localKey).
      
      Reasoning: This ensures that any old or irrelevant data from previous days (or other contexts) is removed. This approach keeps localStorage clean and ensures only today's API data is stored.  */
      localStorage.clear();

      try {
        const response = await fetch(url);
        const Api_Data = await response.json();
        //The localStorage.setItem() method is used to store the data as a string after serializing it with JSON.stringify().Serialization ensures that your data can be stored in a format localStorage understands and later retrieved.
        localStorage.setItem(localKey, JSON.stringify(Api_Data));
        setData(Api_Data); // Update state with API data
        console.log("FECTHED FROM API TODAY ");
      } catch (error) {
        console.log(error);
      }
    }

    Fetch_Data_Frm_Api();
  }, []);

  return (
    <>
      {data ? (
        <Main_Component data = {data} />
      ) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}

      {showModal && <SideBar data = {data}  handleToggleModal={handleToggleModal} />}

      {data && (
        <Footer  data = {data} handleToggleModal={handleToggleModal} />
      )}
    </>
  );
}

export default App;
