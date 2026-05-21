"use client";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Input } from "@heroui/react";
import { FiEdit, FiSave, FiX, FiCamera } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

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
    setFormData({
      name: user?.name || "",
      image: user?.image || "",
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user?.name || "",
      image: user?.image || "",
    });
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

  return (
    <>
      <Toaster position="top-right" />

   
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-6">

        <div className="w-full max-w-2xl rounded-2xl border border-[#01809a8e] shadow-md p-6">

          <div className="flex flex-col items-center">

            <div className="relative">
              <Avatar className="w-12 h-12 rounded-full border overflow-hidden">
                <Avatar.Image
                  src={isEditing ? formData.image : user?.image}
                  alt={user?.name || "User"}
                  className="w-40 h-40 object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
                <Avatar.Fallback>
                  {user?.name?.charAt(0) || "U"}
                </Avatar.Fallback>
              </Avatar>

            </div>

            {isEditing ? (
              <Input
                className="mt-3 text-center max-w-sm bg-[#0475530c] rounded-2xl"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                size="sm"
                placeholder="Your name"
              />
            ) : (
              <h2 className="text-lg font-semibold mt-3">
                {user?.name}
              </h2>
            )}

            <p className="text-sm mt-1">
              {user?.email}
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">

            <div className="border rounded-lg p-3">
              <p className="text-xs mb-1 font-bold">Name</p>
              {isEditing ? (
                <Input className="border-gray-300 outline-none shadow-2xl"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  size="sm"
                  placeholder="Name"
                />
              ) : (
                <h3 className="text-sm font-medium">{user?.name}</h3>
              )}
            </div>

            <div className="border rounded-lg p-3">
              <p className="text-xs mb-1 font-bold">Email</p>
              <p className="text-xs break-all">{user?.email}</p>
            </div>

            <div className="border rounded-lg p-3">
              <p className="text-xs mb-1 font-bold">Image</p>

              {isEditing ? (
                <Input className="outline-none shadow-2xl"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, image: e.target.value }))
                  }
                  size="sm"
                  placeholder="Image URL"
                />
              ) : (
                <p className="text-xs break-all">
                  {user?.image || "No image"}
                </p>
              )}
            </div>

          </div>

          <div className="mt-5">

            {isEditing ? (
              <div className="flex gap-3">
                <Button
                  className="flex-1"
                  startContent={<FiX />}
                  onPress={handleCancel}
                  isDisabled={isLoading}
                >
                  Cancel
                </Button>

                <Button
                  className="flex-1"
                  startContent={<FiSave />}
                  onPress={handleSave}
                  isLoading={isLoading}
                >
                  Save
                </Button>
              </div>
            ) : (
              <Button
                className="w-full bg-[#02827c] rounded-full py-3 text-white"
                startContent={<FiEdit />}
                onPress={handleEdit}
              >
                Edit Profile
              </Button>
            )}

          </div>

        </div>
      </div>
    </>
  );
};

export default EditProfile;