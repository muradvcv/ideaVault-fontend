"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

const UiComment = ({ refresh }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [comments, setComments] = useState([]);

  // 🔥 SAFE FETCH (no cascading issue)
  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch("http://localhost:5000/comment");
      const data = await res.json();
      setComments(data);
    };

    fetchComments();
  }, [refresh]);

  // 🔥 DELETE
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/comment/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
      }),
    });

    setComments((prev) => prev.filter((c) => c._id !== id));
  };

  // 🔥 EDIT
  const handleEdit = async (id, oldComment) => {
    const newComment = prompt("Edit comment", oldComment);
    if (!newComment) return;

    await fetch(`http://localhost:5000/comment/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        comment: newComment,
      }),
    });

    setComments((prev) =>
      prev.map((c) =>
        c._id === id ? { ...c, comment: newComment } : c
      )
    );
  };

  return (
    <div className="space-y-4">
      {comments.map((c) => (
        <div key={c._id} className="border p-3 rounded">

          {/* USER */}
          <div className="flex items-center gap-2">
            <Image
              src={c.userImage || "/default-avatar.png"}
              width={35}
              height={35}
              className="rounded-full"
              alt="user"
            />

            <h4 className="font-semibold">{c.userName}</h4>
          </div>

          {/* COMMENT */}
          <p className="ml-10">{c.comment}</p>

          {/* DATE */}
          <p className="text-xs text-gray-400 ml-10">
            {new Date(c.createdAt).toLocaleString()}
          </p>

          {/* OWNER ACTIONS */}
          {user?.email === c.userEmail && (
            <div className="ml-10 mt-2 flex gap-3">
              <button
                onClick={() => handleEdit(c._id, c.comment)}
                className="text-blue-500 text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(c._id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>
          )}

        </div>
      ))}
    </div>
  );
};

export default UiComment;