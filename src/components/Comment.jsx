"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import UiComment from "./UiComment";

const Comment = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [comments, setComments] = useState([]);

  // 🔥 POST COMMENT
  const handleComment = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const comment = Object.fromEntries(formData.entries());

    const commentPayload = {
      comment: comment.comment,
      userName: user?.name,
      userEmail: user?.email,
      userImage: user?.image,
      ideaTitle: user?.title, 
      createdAt: new Date(),
    };

    await fetch("http://localhost:5000/comment", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(commentPayload),
    });

    e.target.reset();

    // 🔥 instant update UI
    setComments((prev) => [commentPayload, ...prev]);
  };

  return (
    <div className="my-8 shadow rounded-md p-4">

      {/* TITLE WITH COUNT */}
      <h2 className="text-lg font-semibold mb-4">
        Total Comments: ({comments.length})
      </h2>

      {/* FORM */}
      <form onSubmit={handleComment}>
        <textarea
          name="comment"
          placeholder="write a comment about this idea..."
          rows={4}
          className="w-full border rounded-md p-3 outline-none"
          required
        />

        <Button
          type="submit"
          className="mt-3 bg-[#5B4DF1] text-white font-medium rounded-md p-3"
        >
          Post Comment
        </Button>
      </form>

      {/* COMMENT LIST */}
      <div className="my-5">
        <UiComment comments={comments} setComments={setComments} />
      </div>

    </div>
  );
};

export default Comment;