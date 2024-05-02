import React, { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Card } from "./components/Card";
import axios from "axios";

const App = () => {
  const [movies,setMovies] = useState([]);
  const [search,setSearch] = useState("");

  const handleSearch = async (e) => {
    if (e.key === "Enter"){
      try {
        if(search === ""){
          fetchMovies()
          return 0
        }
        const { data } = await axios.get(`http://localhost:8000/query/${search}`)
        setMovies(data?.data);
      } catch (error) {
        alert("Something went wrong!")
      }
    }
  }

  const fetchMovies = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/all")
      setMovies(data?.data);
    } catch (error) {
      alert("Something went wrong!")
    }
  }

  useEffect(()=>{
    fetchMovies()
  },[])
  return (
    <div className="w-full min-h-screen bg-[#fafafa]" onKeyDown={handleSearch}>
      <Navbar search={search} setSearch={setSearch} />
      <div className="mt-5 w-full mx-auto flex flex-wrap justify-evenly gap-3 md:gap-1 lg:gap-8">
        {movies.length > 0 ? movies.map((item) => {
          return <Card src={item?.poster} title={item?.title} plot={item?.plot} directors={item?.directors} />;
        }):<span className="loading loading-bars loading-lg"></span>}
      </div>
    </div>
  );
};

export default App;
