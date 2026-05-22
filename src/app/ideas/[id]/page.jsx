
import Comment from "@/components/Comment";
import Image from "next/image";
import {
  FaTag,
  FaDollarSign,
  FaUsers,
  FaExclamationTriangle,
  FaCheckCircle,
  FaFileAlt,
} from "react-icons/fa";

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
  createdAt,
  _id
} = data;

const tagList = tags
  ? tags.split(",").map((t) => t.trim().replace(/"/g, ""))
  : [];

return (
  <div className="max-w-5xl mx-auto px-4 py-8">
    <div className=" dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">

      {/* Image */}
      <div className="relative w-full h-[240px] md:h-[300px]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">

        {/* Category */}
        <span className="inline-block px-3 py-1 rounded-full text-xs dark:bg-zinc-800  mb-4">
          {category}
        </span>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold">
          {title}
        </h1>

        {/* Date */}
        <p className="text-sm text-gray-400 mt-3">
          {createdAt
            ? new Date(createdAt).toDateString()
            : "Recently Added"}
        </p>

        {/* Short Description */}
        <p className="mt-5  leading-relaxed text-sm md:text-base">
          {shortDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-5">
          {tagList.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs dark:bg-zinc-800"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

          {/* Audience */}
          <div className="border border-gray-200 dark:border-zinc-800 rounded-2xl p-4">
            <p className="flex items-center gap-2 text-sm font-medium mb-2">
              <FaUsers />
              Target Audience
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {targetAudience}
            </p>
          </div>

          {/* Budget */}
          <div className="border border-gray-200 dark:border-zinc-800 rounded-2xl p-4">
            <p className="flex items-center gap-2 text-sm font-medium  mb-2">
              <FaDollarSign />
              Budget
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              ${Number(budget).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Problem & Solution */}
        <div className="grid md:grid-cols-2 gap-4 mt-6">

          {/* Problem */}
          <div className="border border-gray-200 dark:border-zinc-800 rounded-2xl p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-red-500 mb-3">
              <FaExclamationTriangle />
              Problem Statement
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {problemStatement}
            </p>
          </div>

          {/* Solution */}
          <div className="border border-gray-200 dark:border-zinc-800 rounded-2xl p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-green-600 mb-3">
              <FaCheckCircle />
              Proposed Solution
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {proposedSolution}
            </p>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="mt-6 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5">
          <p className="flex items-center gap-2 text-sm font-semibold mb-3">
            <FaFileAlt />
            Detailed Description
          </p>

          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {detailedDescription}
          </p>
        </div>
      </div>
    </div>
    <Comment ideaId={_id} title={title}/>
  </div>
);
};

export default IdeaDetails;

