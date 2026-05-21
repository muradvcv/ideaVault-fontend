"use client";

import CountUp from "react-countup";

const stats = [
  {
    id: 1,
    number: 1200,
    suffix: "+",
    title: "Ideas Shared",
  },
  {
    id: 2,
    number: 850,
    suffix: "+",
    title: "Active Innovators",
  },
  {
    id: 3,
    number: 5000,
    suffix: "+",
    title: "Comments Posted",
  },
  {
    id: 4,
    number: 95,
    suffix: "%",
    title: "Positive Feedback",
  },
];

const CommunityImpact = () => {
  return (
    <section className="py-16 bg-base-100 text-base-content">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-[#1c9e79]">
            Community Impact
          </h2>

          <p className="text-base-content/70 max-w-2xl mx-auto">
            Thousands of innovators are collaborating, sharing ideas,
            and building amazing startup concepts together.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-base-200 rounded-2xl p-8 text-center border border-[#1c9e79]/20 hover:scale-105 hover:shadow-xl hover:shadow-[#1c9e79]/20 transition duration-300"
            >
              {/* Number */}
              <h3 className="text-5xl font-bold mb-3 text-[#1c9e79]">
                <CountUp end={stat.number} duration={3} />
                {stat.suffix}
              </h3>

              {/* Title */}
              <p className="text-lg font-medium text-base-content/70">
                {stat.title}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CommunityImpact;