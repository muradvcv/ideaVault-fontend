"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

const MyInterAction = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [comments, setComments] = useState([]);

  const loadMyComments = async () => {
    if (!user?.email) return;

    const res = await fetch("http://localhost:5000/comment");
    const data = await res.json();

    const myComments = data.filter(
      (c) => c.userEmail === user.email
    );

    setComments(myComments);
  };

  
  useEffect(() => {
    const email = user?.email;

    if (!email) return;

    const fetchData = async () => {
      await loadMyComments();
    };

    fetchData();
  }, [user]);

  return (
    <div className="min-h-[50vh] w-10/12 mx-auto py-5">

      <h2 className="text-xl font-semibold mb-4">
        Total comments ({comments.length})
      </h2>

     
      <button
        onClick={loadMyComments}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Your comments
      </button>

      <div className="space-y-3 mt-4">
        {comments.map((c) => (
          <div key={c._id} className="border border-cyan-300 p-3 rounded-2xl">
            <p>{c.comment}</p>

            <p className="text-xs text-gray-400 mt-1">
              {new Date(c.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default MyInterAction;