"use client";

import AllIdeasCard from "@/components/AllIdeasCard";
import React, { useEffect, useState } from "react";

const AllIdeas = () => {
  const [ideas, setIdeas] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas`)
      .then((res) => res.json())
      .then((data) => setIdeas(data));
  }, []);

  // Filter Logic
  const filteredIdeas = ideas.filter((idea) => {
    const matchTitle = idea.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || idea.category === category;
    return matchTitle && matchCategory;
  });

  // Unique Categories
  const categories = ["All", ...new Set(ideas.map((idea) => idea.category))];

  return (
    <div className="min-h-[50vh] w-11/12 mx-auto py-10">

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">
          All Ideas
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
          Explore, search and filter all submitted ideas
        </p>
        <div className="mt-3 h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600" />
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-cyan-400/40 dark:bg-zinc-900 outline-none focus:ring-2 focus:ring-cyan-400 transition text-sm shadow-sm"
          />
        </div>

        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full sm:w-52 px-4 py-2.5 rounded-xl border border-cyan-400/40 dark:bg-zinc-900 outline-none focus:ring-2 focus:ring-cyan-400 transition text-sm shadow-sm cursor-pointer"
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Result Count Badge */}
      <div className="mb-6 flex items-center gap-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Showing
        </span>
        <span className="px-3 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-500 text-sm font-semibold">
          {filteredIdeas.length} ideas
        </span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredIdeas.length > 0 ? (
          filteredIdeas.map((idea) => (
            <AllIdeasCard key={idea._id} idea={idea} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-400">
            <span className="text-5xl mb-4">💡</span>
            <p className="text-lg font-medium">No Ideas Found</p>
            <p className="text-sm mt-1">Try a different search or category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllIdeas;