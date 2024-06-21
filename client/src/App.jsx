import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ProtectedRoute from "./Routes/ProtectedRoute";
import ButtonGradient from "./assets/svg/ButtonGradient";
import WhyChooseUsSection from "./components/WhyChooseUs";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Login from "./dashboardComponents/Profile/Login";
import Logout from "./dashboardComponents/Profile/Logout";
import AllReviews from "./dashboardComponents/Reviews/AllReviews";
import AddPortfolioItem from "./dashboardComponents/Portfolio/AddPortfolioItem";
import AllPortfolioItems from "./dashboardComponents/Portfolio/AllPortfolioItems";
import EditPortfolioItem from "./dashboardComponents/Portfolio/EditPortfolioItem";
import AllContactFormSubmissions from "./dashboardComponents/Contact/AllContactFormSubmissions";
import Profile from "./dashboardComponents/Profile/Profile";
import SideNav from "./dashboardComponents/SideNav/SideNav";
import Dashboard from "./dashboardComponents/Home/Dashboard";
import EditReview from "./dashboardComponents/Reviews/EditReview";
import Review from "./components/Reviews";
import AddReview from "./dashboardComponents/Reviews/AddReview";
import Unsubscribe from "./components/Unsubscribe";
import AllNewsletter from "./dashboardComponents/Newsletter/AllNewsletter";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
            <Header />
            <Hero />
            <About />
            <Services />
            <WhyChooseUsSection />
            <Portfolio />
            <Review />
            <Contact />
            <Footer />
          </div>
          <ButtonGradient />
        </>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/unsubscribe",
      element: <Unsubscribe />,
    },
    {
      path: "/newreview", 
      element: <><Header /><AddReview /><Contact /><Footer /></>
    },
    {
      path: "/logout",
      element: (
        <ProtectedRoute>
          <Logout />
        </ProtectedRoute>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <div className="flex">
            <SideNav />
            <div className="flex-grow">
              <Outlet />
            </div>
          </div>
        </ProtectedRoute>
      ),
      children: [
        { path: "", element: <Dashboard /> },
        { path: "portfolio", element: <AllPortfolioItems /> },
        { path: "addportfolio", element: <AddPortfolioItem /> },
        { path: "editportfolio/:id", element: <EditPortfolioItem /> },
        { path: "allreviews", element: <AllReviews /> },
        { path: "editreview/:id", element: <EditReview /> },
        { path: "allcontactformsubmissions", element: <AllContactFormSubmissions /> },
        { path: "allnewsletter", element: <AllNewsletter/> },
        { path: "profile", element: <Profile /> },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default App;
