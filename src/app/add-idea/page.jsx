"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  ImageIcon,
  CircleAlert,
  Users,
} from "lucide-react";

import { Button, Input } from "@heroui/react";
import { useRef } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const inputStyle =
  "h-9 w-full rounded-xl border border-gray-300 px-4 py-2 outline-none focus:outline-none focus:ring-0 focus:border-[#1c9e79] shadow-md hover:shadow-md transition-all duration-200";

const textareaStyle =
  "w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:outline-none focus:ring-0 focus:border-[#1c9e79] resize-none shadow-md hover:shadow-lg transition-all duration-200";

const labelStyle = "text-sm font-bold mb-1 block";

const AddIdeaPage = () => {

  const formRef = useRef(null);

  const { data: session } = authClient.useSession();

  const handleFormData = async (e) => {

    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const idea = Object.fromEntries(formData.entries());

    idea.userEmail = session?.user?.email;

    idea.userName = session?.user?.name;

    const res = await fetch("http://localhost:5000/idea", {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(idea)
    });

    const data = await res.json();

    if (data.insertedId) {

      toast.success("Idea submitted successfully!");

      formRef.current.reset();

    } else {

      toast.error("Failed to submit idea!");
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 md:px-8">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto rounded-3xl shadow-xl border border-gray-100 p-5 md:p-8"
      >

        <div className="mb-8">

          <p className="mt-1 flex flex-col sm:flex-row items-center justify-center gap-2 text-center pb-3 border-b-4 border-[#0181a8] rounded-2xl shadow px-3">

            <Lightbulb
              className="text-[#bd9e05] shrink-0"
              size={22}
            />

            <span className="text-lg sm:text-xl md:text-2xl font-bold leading-snug">

              <span className="text-[#ec750d]">
                Add your Idea Details &
              </span>{" "}

              <span className="text-[#aa07f6]">
                Fill all required
              </span>

            </span>

          </p>

        </div>

        <form
          className="space-y-8"
          ref={formRef}
          onSubmit={handleFormData}
        >

          <section className="space-y-5">

            <div className="flex items-center gap-2 text-[#1c9e79] font-semibold text-sm uppercase">
              <Lightbulb size={16} />
              Basic Information
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>

                <label className={labelStyle}>
                  Idea Title
                </label>

                <Input
                  name="title"
                  required
                  className={inputStyle}
                  placeholder="e.g. AI Study Assistant"
                />

              </div>

              <div>

                <label className={labelStyle}>
                  Category
                </label>

                <select
                  name="category"
                  required
                  className={inputStyle}
                >
                  <option value="">Select Category</option>
                  <option className="text-black">Tech</option>
                  <option className="text-black">Health</option>
                  <option className="text-black">AI</option>
                  <option className="text-black">Education</option>
                  <option className="text-black">Finance</option>
                </select>

              </div>

            </div>

            <div>

              <label className={labelStyle}>
                Short Description
              </label>

              <Input
                name="shortDescription"
                required
                className={inputStyle}
                placeholder="One line summary"
              />

            </div>

            <div>

              <label className={labelStyle}>
                Detailed Description
              </label>

              <textarea
                name="detailedDescription"
                required
                rows={3}
                className={textareaStyle}
              />

            </div>

          </section>

          <section className="space-y-4">

            <div className="flex items-center gap-2 text-[#1c9e79] font-semibold text-sm uppercase">
              <ImageIcon size={16} />
              Media & Tags
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>

                <label className={labelStyle}>
                  Image URL
                </label>

                <Input
                  name="imageUrl"
                  required
                  type="url"
                  className={inputStyle}
                  placeholder="https://image-link.com"
                />

              </div>

              <div>

                <label className={labelStyle}>
                  Tags
                </label>

                <Input
                  name="tags"
                  className={inputStyle}
                  placeholder="AI, SaaS, Startup"
                />

              </div>

            </div>

          </section>

          <section className="space-y-4">

            <div className="flex items-center gap-2 text-[#1c9e79] font-semibold text-sm uppercase">
              <CircleAlert size={16} />
              Problem & Solution
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>

                <label className={labelStyle}>
                  Problem Statement
                </label>

                <textarea
                  name="problemStatement"
                  required
                  rows={3}
                  className={textareaStyle}
                />

              </div>

              <div>

                <label className={labelStyle}>
                  Proposed Solution
                </label>

                <textarea
                  name="proposedSolution"
                  required
                  rows={3}
                  className={textareaStyle}
                />

              </div>

            </div>

          </section>

          <section className="space-y-5">

            <div className="flex items-center gap-2 text-[#1c9e79] font-semibold text-sm uppercase">
              <Users size={16} />
              Audience & Budget
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>

                <label className={labelStyle}>
                  Target Audience
                </label>

                <Input
                  name="targetAudience"
                  required
                  className={inputStyle}
                  placeholder="Students, Developers..."
                />

              </div>

              <div>

                <label className={labelStyle}>
                  Estimated Budget
                </label>

                <Input
                  name="budget"
                  required
                  type="number"
                  className={inputStyle}
                  placeholder="5000"
                />

              </div>

            </div>

          </section>

          <div className="flex justify-end gap-3">

            <Button
              type="button"
              className="h-10 px-6 bg-[#03d3b422] text-[#1c9e79] rounded-xl"
              onClick={() => formRef.current.reset()}
            >
              Clear
            </Button>

            <Button
              type="submit"
              className="h-10 px-6 bg-[#1c9e79] text-white hover:bg-[#168566] rounded-xl"
            >
              Submit
            </Button>

          </div>

        </form>

      </motion.div>

    </div>
  );
};

export default AddIdeaPage;