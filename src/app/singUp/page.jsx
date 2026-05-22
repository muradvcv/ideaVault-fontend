"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoMdEyeOff } from "react-icons/io";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showpass, setShowpass] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  // redirect route
  const redirectTo = searchParams.get("redirect") || "/";

  // SIGN UP
  const handleSignUp = async (data) => {
    const { name, photo, email, password } = data;

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photo,
    });

    if (error) {
      toast.error(error?.message || "Something went wrong");
    } else {
      toast.success("Registration successful");

      setTimeout(() => {
        router.push(redirectTo);
      }, 1000);
    }
  };

  // google singIn

  const handleGoogleSignIn = async () => {

    const { data, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "Google Sign In Failed");
    }
  };
  return (
    <div className="w-10/12 mx-auto min-h-[90vh] flex justify-center items-center my-10">

      <div className=" dark:bg-gray-900 w-full max-w-md shadow-md rounded-xl py-5 px-8 space-y-3 border border-gray-200 dark:border-gray-700">

        <h1 className="text-2xl text-center font-semibold pb-3 border-b border-gray-300 dark:border-gray-700">
          Register your account
        </h1>

        <form onSubmit={handleSubmit(handleSignUp)}>

          {/* NAME */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              Name
            </legend>

            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter your valid name"
              {...register("name", { required: true })}
            />

            {errors.name && (
              <span className="text-red-500 text-sm">
                Name is required
              </span>
            )}
          </fieldset>

          {/* EMAIL */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              Email
            </legend>

            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />

            {errors.email && (
              <span className="text-red-500 text-sm">
                Email is required
              </span>
            )}
          </fieldset>

          {/* PHOTO */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              Photo URL
            </legend>

            <input
              type="url"
              className="input input-bordered w-full"
              placeholder="Enter photo URL"
              {...register("photo", { required: true })}
            />

            {errors.photo && (
              <span className="text-red-500 text-sm">
                Photo URL is required
              </span>
            )}
          </fieldset>

          {/* PASSWORD */}
          <fieldset className="fieldset relative">
            <legend className="fieldset-legend">Password</legend>

            <input
              type={showpass ? "text" : "password"}
              className="input input-bordered w-full"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",

                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },

                validate: (value) => {
                  if (!/[A-Z]/.test(value)) {
                    return "At least 1 uppercase letter required";
                  }
                  if (!/[a-z]/.test(value)) {
                    return "At least 1 lowercase letter required";
                  }
                  return true;
                },
              })}
            />

            <span
              className="absolute right-4 top-11 cursor-pointer"
              onClick={() => setShowpass(!showpass)}
            >
              {showpass ? <FaEye /> : <IoMdEyeOff />}
            </span>

            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </fieldset>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full btn btn-neutral my-5"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-400">
          or
        </p>

        {/* GOOGLE */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex items-center gap-2 font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200 py-3 border border-gray-300 dark:border-gray-700 rounded-full justify-center shadow-sm w-full"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>

        {/* LOGIN */}
        <div className="flex gap-2 font-semibold py-4 justify-center">
          <h1>Already Have An Account?</h1>

          <Link
            href={`/login?redirect=${redirectTo}`}
            className="text-red-500 underline"
          >
            Login
          </Link>
        </div>

      </div>
    </div>
  );
};

export default SignUp;