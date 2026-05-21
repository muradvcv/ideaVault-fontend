import Banner from "@/components/Home/Banner";
import HowIdeaVaultWorks from "@/components/Home/Section1";
import CommunityImpact from "@/components/Home/Section2";
import TrandingIdeas from "@/components/Home/TrandingIdeas";

export default function Home() {
  return (
   <div>
    <Banner/>
    <TrandingIdeas/>
    <HowIdeaVaultWorks/>
    <CommunityImpact/>
   </div>
  );
}
