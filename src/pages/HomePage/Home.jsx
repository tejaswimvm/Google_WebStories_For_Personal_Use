import { homeObjOne, homeObjThree, homeObjTwo, homeObjFour } from "./Data";
import { Footer, InfoSection, Navbar, Pricing } from "@website/index";
import ScrollToTop from "@website/ScrollToTop";

const Home = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <InfoSection {...homeObjOne} imgStart={true} />
      <InfoSection {...homeObjThree} />
      <InfoSection {...homeObjTwo} />
      <Pricing />
      <InfoSection {...homeObjFour} />
      <Footer />
    </>
  );
};

export default Home;
