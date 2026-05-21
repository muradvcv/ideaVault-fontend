"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Target,
  Wallet,
} from "lucide-react";
import Link from "next/link";

const AllIdeasCard = ({ idea }) => {
  const {
    title,shortDescription,category,imageUrl,targetAudience,budget,_id} = idea;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group overflow-hidden rounded-[28px] shadow-lg hover:shadow-2xl border border-[#01b7ae42] transition-all duration-300"
    >
      {/* IMAGE */}
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* CATEGORY */}
        <div className="absolute top-4 left-4">
          <span className="rounded-full bg-[#5205d6a7] /90 px-4 py-1 text-xs font-semibold text-white backdrop-blur-md">
            {category}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {/* TITLE */}
        <div>
          <h2 className="text-[1.1rem] font-bold line-clamp-1">
            {title}
          </h2>

          <p className=" text-xs py-1 text-gray-500 line-clamp-2">
            {shortDescription}
          </p>
        </div>

        {/* INFO BOX */}
        <div className="mt-2 grid grid-cols-2 gap-3">
          {/* AUDIENCE */}
          <div className="rounded-2xl bg-[#F5F3FF] p-2">
            <div className="mb-1 flex items-center gap-2 text-[#7C3AED]">
              <Target size={16} />

              <span className="text-xs font-semibold uppercase tracking-wide">
                Audience
              </span>
            </div>

            <p className="text-xs text-gray-600 line-clamp-2">
              {targetAudience}
            </p>
          </div>

          {/* BUDGET */}
          <div className="rounded-2xl bg-[#ECFDF5] p-2">
            <div className="mb-2 flex items-center gap-2 text-[#059669]">
              <Wallet size={16} />

              <span className="text-xs font-semibold uppercase tracking-wide">
                Budget
              </span>
            </div>

            <p className="text-lg font-bold text-gray-800">
              ${budget}
            </p>
          </div>
        </div>

        {/* BUTTON */}
        <Link href={`/ideas/${_id}`}>
        <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl cursor-pointer bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] py-1 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02]">
          View Details
          <ArrowRight size={16} />
        </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default AllIdeasCard;