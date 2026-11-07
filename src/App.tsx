import { useState } from "react";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import CoursePlayerPage from "./pages/CoursePlayerPage";
import AdminCourseContentPage from "./pages/admin/AdminCourseContentPage";
import AdminCoursesPage from "./pages/admin/AdminCoursesPage";
import { Banner } from "./components/home/Banner";
import { CoursesSection } from "./components/home/CoursesSection";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/home/Footer";
// Types
type Page =
  | "home"
  | "signin"
  | "signup"
  | "change-password"
  | "admin-courses"
  | "admin-users"
  | "admin-reports"
  | "admin-course-content"
  | "course-player";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeCourse, setActiveCourse] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [playerCourseId, setPlayerCourseId] = useState<string>("c1");

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogin = () => setIsLoggedIn(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("home");
  };

  const openCoursePlayer = (courseId: string) => {
    setPlayerCourseId(courseId);
    handleNavigate("course-player");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "signin":
        return <SignInPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      case "signup":
        return <SignUpPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      case "change-password":
        if (!isLoggedIn)
          return (
            <SignInPage onNavigate={handleNavigate} onLogin={handleLogin} />
          );
        return (
          <ChangePasswordPage
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case "course-player":
        return (
          <CoursePlayerPage
            onNavigate={handleNavigate}
            courseId={playerCourseId}
          />
        );
      case "admin-users":
        return (
          <div className="min-h-screen bg-gray-950 text-white p-8">
            صفحه مدیریت کاربران
          </div>
        );
      case "admin-reports":
        return (
          <div className="min-h-screen bg-gray-950 text-white p-8">
            صفحه گزارشات
          </div>
        );
      case "admin-courses":
        return (
          <AdminCoursesPage
            onNavigate={handleNavigate}
            onOpenContent={(id, title) => {
              setActiveCourse({ id, title });
              handleNavigate("admin-course-content");
            }}
          />
        );
      case "admin-course-content":
        return (
          <AdminCourseContentPage
            onNavigate={handleNavigate}
            courseId={activeCourse?.id ?? "c1"}
            courseTitle={activeCourse?.title ?? "جبر پیشرفته"}
          />
        );
      default:
        return (
          <>
            <Banner isLoggedIn={isLoggedIn} onNavigate={handleNavigate} />
            <CoursesSection onOpenCourse={openCoursePlayer} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-950" dir="rtl">
      <Navbar
        isLoggedIn={isLoggedIn}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      <main className="pt-16">{renderPage()}</main>
      {currentPage === "home" && <Footer />}
    </div>
  );
}
