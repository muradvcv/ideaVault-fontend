"use client";

import { authClient } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";

const MyInteractions = () => {

  const { data: session } = authClient.useSession();

  const [comments, setComments] = useState([]);

  useEffect(() => {

    if (session?.user?.email) {

      fetch(
        `http://localhost:5000/my-interactions?email=${session.user.email}`
      )
        .then((res) => res.json())
        .then((data) => setComments(data));
    }

  }, [session]);



  return (
    <div className="w-11/12 mx-auto py-10">

      <h1 className="text-3xl font-bold mb-8">
        My Interactions
      </h1>

      <div className="space-y-5">

        {
          comments.map((comment) => (

            <div
              key={comment._id}
              className="border rounded-2xl p-5"
            >

              <p className="text-lg">
                {comment.text}
              </p>

              <p className="text-sm text-gray-500 mt-3">
                {
                  new Date(comment.createdAt)
                    .toLocaleString()
                }
              </p>

            </div>
          ))
        }

      </div>

    </div>
  );
};

export default MyInteractions;