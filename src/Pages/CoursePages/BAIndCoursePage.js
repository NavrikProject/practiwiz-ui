import React from "react";
import { Suspense } from "react";
import GoToTop from "../../Components/GoToTop";
import LoadingSpinner from "../../Components/utils/LoadingSpinner";
const Navbar = React.lazy(() => import("../../Components/Home/Navbar"));
const Footer = React.lazy(() => import("../../Components/Home/Footer.js"));
const BAIndividualCourse = React.lazy(() =>
  import("../../Components/Courses/CoursePages/BAIndividualCourse")
);
const BAIndCoursePage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Navbar />
      <BAIndividualCourse />
      <Footer />
      <GoToTop />
    </Suspense>
  );
};

export default BAIndCoursePage;
