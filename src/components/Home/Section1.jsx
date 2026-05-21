import { FaLightbulb, FaComments, FaTools, FaRocket } from "react-icons/fa";

const steps = [
  {
    id: 1,
    icon: <FaLightbulb />,
    title: "Share Your Idea",
    description:
      "Post your startup idea and explain the problem you want to solve.",
  },
  {
    id: 2,
    icon: <FaComments />,
    title: "Get Feedback",
    description:
      "Receive valuable comments and suggestions from the community.",
  },
  {
    id: 3,
    icon: <FaTools />,
    title: "Improve Concept",
    description:
      "Refine your startup idea based on user interaction and feedback.",
  },
  {
    id: 4,
    icon: <FaRocket />,
    title: "Launch Vision",
    description:
      "Turn your innovative concept into a successful startup journey.",
  },
];

const HowIdeaVaultWorks = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-[#1c9e79]">
            How IdeaVault Works
          </h2>

          <p className="text-base-content/70 max-w-2xl mx-auto">
            Share your startup ideas, collaborate with innovators,
            and build the next big thing together.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="relative bg-base-200 rounded-2xl p-8 pt-14 text-center border border-[#1c9e79]/15 shadow-md hover:shadow-xl hover:shadow-[#1c9e79]/20 hover:-translate-y-2 transition duration-300"
            >

              {/* REAL STICKY ICON */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2">
                <div className="w-16 h-16 flex items-center justify-center rounded-full 
                                bg-gradient-to-br from-[#1c9e79] to-[#0f6b52]
                                text-white shadow-xl border-4 border-white
                                ring-2 ring-[#1c9e79]/30">

                  <div className="text-xl drop-shadow-md">
                    {step.icon}
                  </div>

                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-base-content/70">
                {step.description}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowIdeaVaultWorks;