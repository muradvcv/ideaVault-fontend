import Image from "next/image";
import {
  FaLightbulb,
  FaTag,
  FaDollarSign,
  FaUsers,
  FaExclamationTriangle,
  FaCheckCircle,
  FaFileAlt,
} from "react-icons/fa";
import { FcIdea } from "react-icons/fc";

const IdeaDetails = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/ideas/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch idea");

  const data = await res.json();

  const {
    title,
    shortDescription,
    detailedDescription,
    category,
    imageUrl,
    targetAudience,
    budget,
    tags,
    problemStatement,
    proposedSolution,
  } = data;

  const tagList = tags
    ? tags.split(",").map((t) => t.trim().replace(/"/g, ""))
    : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6 border-2 border-[#025a441e] rounded-2xl my-10 shadow-2xl bg-[#0c82c20c]">

      {/* HERO */}
      <div className="flex flex-col md:flex-row gap-6 items-start">

       <div>
          <Image
            src={imageUrl}
            alt={title}
            width={500}
            height={400}
            className="rounded-2xl shadow-md object-cover"
          />
          <h1 className="text-xl p-5 mt-8 flex items-center gap-1 border border-[#019a9033] rounded-2xl justify-center">
            <FcIdea/>
            <span>Think It. Build It. Change It</span>
             </h1>
       </div>

        <div className="flex-1">

          {/* TITLE */}
          <p className="text-xs uppercase tracking-widest mb-1 flex items-center gap-2">
            <FaLightbulb className="text-yellow-500" /> Idea
          </p>

          <h1 className="text-3xl font-semibold">
            {title}
          </h1>

          <p className="mt-2 text-base leading-relaxed">
            {shortDescription}
          </p>

          {/* CATEGORY + BUDGET */}
          <div className="mt-4 flex flex-wrap gap-2">

            <span className="px-4 py-1 text-sm rounded-full bg-blue-100 text-blue-800 flex items-center gap-1">
              <FaTag className="text-blue-600" />
              {category}
            </span>

            <span className="px-4 py-1 text-sm rounded-full bg-green-100 text-green-800 flex items-center gap-1">
              <FaDollarSign className="text-green-600" />
              ${Number(budget).toLocaleString()}
            </span>

          </div>

          {/* TAGS */}
          <div className="mt-6 rounded-2xl border border-[#00caa534] backdrop-blur p-5 shadow-sm bg-[#02999912]">

            <p className="text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
              <FaTag className="text-teal-500" /> Tags
            </p>

            <div className="flex flex-wrap gap-2">
              {tagList.map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-1 text-sm rounded-full border"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* TARGET AUDIENCE */}
            <div className="mt-6 rounded-2xl border border-[#00caa534] backdrop-blur p-5 shadow-sm bg-[#53029912]">

              <p className="text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                <FaUsers className="text-purple-500" /> Target Audience
              </p>

              <p className="text-sm">
                {targetAudience}
              </p>

            </div>


          </div>

        </div>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-4">

        <div className="rounded-2xl border border-[#00caa534] backdrop-blur p-5 shadow-sm bg-[#a9374a29]">

          <p className="text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
            <FaExclamationTriangle className="text-red-500" />
            Problem Statement
          </p>

          <p className="text-sm leading-relaxed">
            {problemStatement}
          </p>

        </div>

        <div className="rounded-2xl border border-[#00caa534] backdrop-blur p-5 shadow-sm bg-[#02990234]">

          <p className="text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
            <FaCheckCircle className="text-green-600" />
            Proposed Solution
          </p>

          <p className="text-sm leading-relaxed">
            {proposedSolution}
          </p>

        </div>

      </div>

      {/* DESCRIPTION */}
      <div className="rounded-2xl border border-[#00caa534] backdrop-blur p-5 shadow-md bg-[#67029931]">

        <p className="text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
          <FaFileAlt className="text-indigo-500" />
          Detailed Description
        </p>

        <p className="text-sm leading-relaxed">
          {detailedDescription}
        </p>

      </div>

    </div>
  );
};

export default IdeaDetails;