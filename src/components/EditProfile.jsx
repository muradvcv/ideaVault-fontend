"use client";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { FiEdit, FiSave, FiX } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

const EditProfile = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    image: user?.image || "",
  });

  const handleEdit = () => {
    setFormData({ name: user?.name || "", image: user?.image || "" });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ name: user?.name || "", image: user?.image || "" });
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    setIsLoading(true);
    try {
      await authClient.updateUser({
        name: formData.name.trim(),
        image: formData.image.trim() || undefined,
      });
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const avatarSrc = isEditing ? formData.image : user?.image;
  const initials = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div>
      <Toaster position="top-right" />
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-10 max-w-4xl mx-auto shadow-2xl rounded-2xl my-10">
        
        <div className="w-full max-w-2xl">

          {/* Avatar + Name Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-24 h-24 mb-4">
              {avatarSrc ? (

                <Image
                  src={avatarSrc}
                  alt={user?.name || "User"}
                  width={96}
                  height={96}
                  referrerPolicy="no-referrer"
                  className="rounded-full object-cover border-4 border-cyan-500/30"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-cyan-600 flex items-center justify-center text-white text-3xl font-semibold border-4 border-cyan-500/30">
                  {initials}
                </div>
              )}
              {isEditing && (
                <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center cursor-pointer">
                  <FiEdit className="text-white text-xl" />
                </div>
              )}
            </div>

            {isEditing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="text-center text-xl font-semibold bg-transparent border-b-2 border-cyan-500 outline-none px-2 pb-1 w-48"
                placeholder="Your name"
              />
            ) : (
              <h2 className="text-xl font-semibold">{user?.name}</h2>
            )}
            <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
          </div>

          {/* 3 Column Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

            {/* Name */}
            <div className="rounded-2xl border border-cyan-500/20  dark:bg-gray-900 p-5 flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-600">Name</p>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full  dark:bg-gray-800 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter name"
                />
              ) : (
                <p className="text-sm font-medium truncate">{user?.name || "—"}</p>
              )}
            </div>

            {/* Email */}
            <div className="rounded-2xl border border-cyan-500/20 e dark:bg-gray-900 p-5 flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-600">Email</p>
              <p className="text-sm font-medium break-all">{user?.email || "—"}</p>
            </div>

            {/* Image URL */}
            <div className="rounded-2xl border border-cyan-500/20  dark:bg-gray-900 p-5 flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-600">Image URL</p>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, image: e.target.value }))
                  }
                  className="w-full  dark:bg-gray-800 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Image URL"
                />
              ) : (
                <p className="text-xs text-gray-500 break-all line-clamp-2">
                  {user?.image || "No image set"}
                </p>
              )}
            </div>

          </div>

          {/* Action Buttons */}
          {isEditing ? (
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition disabled:opacity-50"
              >
                <FiX /> Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium transition disabled:opacity-50"
              >
                <FiSave /> {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          ) : (
            <button
              onClick={handleEdit}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium transition"
            >
              <FiEdit /> Edit Profile
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default EditProfile;