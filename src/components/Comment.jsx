"use client"
import React, { useState } from "react";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import UiComment from "./UiComment";

const Comment = () => {



  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user, 'user');

  const handleComment = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const comment = Object.fromEntries(formData.entries());

    const commentPayload = {
      comment: comment.comment,
      userName: user?.name,
      userEmail: user?.email,
      userImage: user?.image,
      createdAt: new Date(),
    };

    const res = await fetch("http://localhost:5000/comment", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(commentPayload),
    });

    const data = await res.json();
    console.log(data);

    e.target.reset();
  };
  return (
    <div className="my-8 shadow rounded-md p-4">

      {/* Title */}
      <h2 className="text-lg font-semibold mb-4">
        Comments ()
      </h2>

      {/* Form */}
      <form onSubmit={handleComment}>

        {/* Textarea */}
        <textarea
          name="comment"
          placeholder="Add your comment..."
          rows={4}
          className="w-full border rounded-md p-3 outline-none resize-none focus:border-[#5B4DF1]"
          required
        />

        {/* Button */}
        <Button
          type="submit"
          className="mt-3 bg-[#5B4DF1] text-white font-medium rounded-md p-3"
        >
          Post Comment
        </Button>
      </form>

      <div className="my-5 shadow-2xl">

        <UiComment />
      </div>


    </div>
  );
};

export default Comment;