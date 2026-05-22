import AllIdeasCard from "@/components/AllIdeasCard";

const TrandingIdeas = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas`, {
    cache: "no-store",
  });

  const ideas = await res.json();

  // 🔥 Top 6 ideas
  const topIdeas = ideas
    .sort((a, b) => b.budget - a.budget) // or likes/views
    .slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto my-10 px-5">

      <h1 className="text-2xl font-bold mb-6">
        🔥 Trending Ideas
      </h1>

      {/* 6 cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topIdeas.map((idea) => (
          <AllIdeasCard key={idea._id} idea={idea} />
        ))}
      </div>

    </div>
  );
};

export default TrandingIdeas;