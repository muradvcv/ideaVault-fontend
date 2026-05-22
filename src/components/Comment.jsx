"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";

const Comment = () => {

  const handleComment =(e) => {

      e.preventDefault();
      const fromData=new FormData(e.currentTarget)
      const comment=Object.fromEntries(fromData.entries())

      console.log(comment);
    }

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


    </div>
  );
};

export default Comment;