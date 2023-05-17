import LandingPageNav from "@/components/LandingPageNav";

const layout = ({ children }) => {
  return (
    <>
      <LandingPageNav />
      {children}
    </>
  );
};
export default layout;
