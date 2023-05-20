import LandingPageNav from "@/components/Navbar/LandingPageNav";

const layout = ({ children }) => {
  return (
    <>
      <LandingPageNav />
      {children}
    </>
  );
};
export default layout;
