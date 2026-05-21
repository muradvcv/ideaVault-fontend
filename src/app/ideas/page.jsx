"use client";

import AllIdeasCard from "@/components/AllIdeasCard";
import React, { useEffect, useState } from "react";

const AllIdeas = () => {
  const [ideas, setIdeas] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5000/ideas")
      .then((res) => res.json())
      .then((data) => setIdeas(data));
  }, []);

  // Filter Logic
  const filteredIdeas = ideas.filter((idea) => {
    const matchTitle = idea.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" || idea.category === category;

    return matchTitle && matchCategory;
  });

  // Unique Categories
  const categories = [
    "All",
    ...new Set(ideas.map((idea) => idea.category)),
  ];

  return (
    <div className="min-h-[50vh] w-11/12 mx-auto py-8">
      
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-8">
        
        <h1 className="text-3xl font-bold">
          All Ideas
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          
          {/* Search */}
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-xl outline-none w-full sm:w-72 bg-white dark:bg-zinc-900"
          />

          {/* Category Filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-xl outline-none bg-white dark:bg-zinc-900"
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredIdeas.length > 0 ? (
          filteredIdeas.map((idea) => (
            <AllIdeasCard key={idea._id} idea={idea} />
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500">
            No Ideas Found
          </div>
        )}
      </div>
    </div>
  );
};

export default AllIdeas;