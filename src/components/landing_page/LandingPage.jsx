import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
function LandingPage() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default LandingPage;
