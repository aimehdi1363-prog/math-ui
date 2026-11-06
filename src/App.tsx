import { useState } from "react";

// Course data
const courses = [
  {
    id: 1,
    title: "جبر پیشرفته",
    description: "یادگیری معادلات، نامعادلات، توابع و مفاهیم پیشرفته جبر با مثال‌های کاربردی و تمرین‌های متنوع",
    image: "https://image.qwenlm.ai/generated-images/e3a5eb95-89d2-46f5-ac48-a4d129483343/_result.png",
    rating: 4.5,
    students: 1240,
  },
  {
    id: 2,
    title: "حسابان (کالکولوس)",
    description: "مفاهیم حد، مشتق، انتگرال و کاربردهای آن‌ها در حل مسائل واقعی و مهندسی",
    image: "https://image.qwenlm.ai/generated-images/1ed05e55-c1c9-401b-bbb8-1c5650ee7e9b/_result.png",
    rating: 4.8,
    students: 980,
  },
  {
    id: 3,
    title: "هندسه تحلیلی",
    description: "بررسی اشکال هندسی، تبدیلات، مختصات و اثبات قضایا با رویکرد تحلیلی",
    image: "https://image.qwenlm.ai/generated-images/4ccb9820-900d-4846-9075-374358a01da0/_result.png",
    rating: 4.2,
    students: 756,
  },
  {
    id: 4,
    title: "آمار و احتمال",
    description: "آموزش مفاهیم پایه و پیشرفته آمار، توزیع‌های احتمالی و تحلیل داده‌ها",
    image: "https://image.qwenlm.ai/generated-images/122aaf0c-5066-4559-a723-057a09d7bc0f/_result.png",
    rating: 4.6,
    students: 1105,
  },
];

// Star Rating Component
function StarRating({ rating }: { rating: number }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      );
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20">
          <defs>
            <linearGradient id={`grad-${i}`}>
              <stop offset={`${(rating % 1) * 100}%`} stopColor="currentColor" />
              <stop offset={`${(rating % 1) * 100}%`} stopColor="#4B5563" />
            </linearGradient>
          </defs>
          <path fill={`url(#grad-${i})`} d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      );
    } else {
      stars.push(
        <svg key={i} className="w-4 h-4 text-gray-600 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      );
    }
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
}

// Navbar Component
function Navbar({ isLoggedIn, onToggleLogin }: { isLoggedIn: boolean; onToggleLogin: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left Side */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">∑</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              Math<span className="text-blue-400">Verse</span>
            </span>
          </div>

          {/* Desktop Buttons - Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <button className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-white border border-gray-600 rounded-lg hover:border-gray-400 transition-all duration-200">
                  Sign In
                </button>
                <button className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-500/25">
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <button className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-white border border-gray-600 rounded-lg hover:border-gray-400 transition-all duration-200 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </button>
                <button className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-500/25 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Admin
                </button>
              </>
            )}
            {/* Toggle Login Button (for demo) */}
            <button
              onClick={onToggleLogin}
              className="ml-2 px-3 py-2 text-xs text-gray-500 hover:text-gray-300 border border-gray-700 rounded-lg hover:border-gray-500 transition-all duration-200"
              title="Toggle login state for demo"
            >
              {isLoggedIn ? "Logout" : "Login Demo"}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-800 mt-2 pt-4">
            {!isLoggedIn ? (
              <div className="flex flex-col gap-3">
                <button className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-white border border-gray-600 rounded-lg text-center">
                  Sign In
                </button>
                <button className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-center">
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <button className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-white border border-gray-600 rounded-lg text-center">
                  Profile
                </button>
                <button className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-center">
                  Admin
                </button>
              </div>
            )}
            <button
              onClick={onToggleLogin}
              className="mt-3 w-full px-3 py-2 text-xs text-gray-500 hover:text-gray-300 border border-gray-700 rounded-lg"
            >
              {isLoggedIn ? "Logout" : "Login Demo"}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

// Banner Component
function Banner({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <section className="relative w-full h-[500px] md:h-[550px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://image.qwenlm.ai/generated-images/bc0782ce-946c-4e49-9fc7-f89cbbc56572/_result.png')`,
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/50 to-gray-900" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          دنیای <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">ریاضی</span> را کشف کنید
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
          با بهترین اساتید و محتوای آموزشی، ریاضی را به ساده‌ترین شکل ممکن یاد بگیرید
        </p>

        {/* Auth Buttons on Banner */}
        {!isLoggedIn && (
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105">
              Sign Up — رایگان شروع کنید
            </button>
            <button className="px-8 py-3 text-base font-medium text-white border-2 border-white/30 rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm">
              Sign In
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// Course Card Component
function CourseCard({ course }: { course: typeof courses[0] }) {
  return (
    <div className="group bg-gray-800/50 border border-gray-700/50 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-gray-400 mb-4 leading-relaxed line-clamp-2">
          {course.description}
        </p>

        {/* Rating & Students */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
          <div className="flex items-center gap-2">
            <StarRating rating={course.rating} />
            <span className="text-sm text-gray-400">{course.rating}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-sm">{course.students.toLocaleString("fa-IR")} شرکت‌کننده</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Courses Section
function CoursesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          دوره‌های آموزشی
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          بهترین دوره‌های ریاضی با کیفیت بالا و اساتید مجرب
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">∑</span>
            </div>
            <span className="text-gray-400 text-sm">
              © ۲۰۲۵ MathVerse — تمامی حقوق محفوظ است
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors text-sm">درباره ما</a>
            <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors text-sm">تماس با ما</a>
            <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors text-sm">قوانین</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950" dir="rtl">
      <Navbar isLoggedIn={isLoggedIn} onToggleLogin={() => setIsLoggedIn(!isLoggedIn)} />
      <main className="pt-16">
        <Banner isLoggedIn={isLoggedIn} />
        <CoursesSection />
      </main>
      <Footer />
    </div>
  );
}
