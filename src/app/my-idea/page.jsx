"use client";

import AllIdeasCard from "@/components/AllIdeasCard";
import { authClient } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MyIdea = () => {

  const { data: session } = authClient.useSession();

  const [ideas, setIdeas] = useState([]);

  const [editingIdea, setEditingIdea] = useState(null);

  const [title, setTitle] = useState("");

  const [category, setCategory] = useState("");

  const [shortDescription, setShortDescription] = useState("");



  useEffect(() => {

    if (session?.user?.email) {

      fetch(
        `${process.env.SERVER_URL}/my-ideas?email=${session.user.email}`
      )
        .then((res) => res.json())
        .then((data) => setIdeas(data));
    }

  }, [session]);



  const handleDelete = async (id) => {

    const confirmDelete = confirm("Are you sure delete this idea?");

    if (!confirmDelete) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.deletedCount > 0) {

      const remaining = ideas.filter((idea) => idea._id !== id);

      setIdeas(remaining);

      toast.success("Idea Deleted Successfully");
    }
  };



  const handleEditClick = (idea) => {

    setEditingIdea(idea);

    setTitle(idea.title);

    setCategory(idea.category);

    setShortDescription(idea.shortDescription);
  };


  const handleUpdate = async (e) => {

    e.preventDefault();

    if (!editingIdea) return;

    const updatedIdea = {
      title,
      category,
      shortDescription,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${editingIdea?._id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedIdea),
      }
    );

    const data = await res.json();

    if (data.modifiedCount > 0) {

      const updatedIdeas = ideas.map((idea) => {

        if (idea._id === editingIdea._id) {

          return {
            ...idea,
            ...updatedIdea,
          };
        }

        return idea;
      });

      setIdeas(updatedIdeas);

      setEditingIdea(null);

      toast.success("Idea Updated Successfully");
    }
  };

  return (
    <div className="w-11/12 mx-auto py-10 min-h-[50vh]">

      <h1 className="text-3xl font-bold mb-8">
        My Ideas
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {
          ideas.map((idea) => (

            <div
              key={idea._id}
              className="space-y-3"
            >

              <AllIdeasCard idea={idea} />

              <div className="flex gap-3">

                <button
                  onClick={() => handleEditClick(idea)}
                  className="px-4 py-2 rounded-xl bg-blue-500 text-white w-full"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(idea._id)}
                  className="px-4 py-2 rounded-xl bg-red-500 text-white w-full"
                >
                  Delete
                </button>

              </div>

            </div>
          ))
        }

      </div>



      {
        editingIdea && (

          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl w-full max-w-md">

              <h2 className="text-2xl font-bold mb-5">
                Update Idea
              </h2>

              <form
                onSubmit={handleUpdate}
                className="space-y-4"
              >

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="w-full border p-3 rounded-xl"
                />

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border p-3 rounded-xl"
                >
                  <option>Tech</option>
                  <option>Health</option>
                  <option>AI</option>
                  <option>Education</option>
                  <option>Finance</option>
                </select>

                <textarea
                  value={shortDescription}
                  onChange={(e) =>
                    setShortDescription(e.target.value)
                  }
                  placeholder="Short Description"
                  rows={3}
                  className="w-full border p-3 rounded-xl"
                />

                <div className="flex gap-3">

                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-xl w-full"
                  >
                    Update
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditingIdea(null)}
                    className="bg-red-500 text-white px-4 py-2 rounded-xl w-full"
                  >
                    Cancel
                  </button>

                </div>

              </form>

            </div>

          </div>
        )
      }

    </div>
  );
};

export default MyIdea;