import { useState } from "react";
import { Page } from "../types";

export function Navbar({
  isLoggedIn,
  onNavigate,
  onLogout,
}: {
  isLoggedIn: boolean;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">∑</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              Math<span className="text-blue-400">Verse</span>
            </span>
          </button>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => onNavigate("signin")}
                  className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-white border border-gray-600 rounded-lg hover:border-gray-400 transition-all duration-200"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onNavigate("signup")}
                  className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-500/25"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate("change-password")}
                  className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-white border border-gray-600 rounded-lg hover:border-gray-400 transition-all duration-200 flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                  تغییر رمز
                </button>
                <button className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-500/25 flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Profile
                </button>

                {/* Admin Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setAdminMenuOpen(!adminMenuOpen)}
                    className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-500/25 flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Admin
                    <svg
                      className={`w-3 h-3 transition-transform duration-200 ${
                        adminMenuOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {adminMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setAdminMenuOpen(false)}
                      />
                      <div className="absolute left-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50">
                        <button
                          onClick={() => {
                            onNavigate("admin-courses");
                            setAdminMenuOpen(false);
                          }}
                          className="w-full px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors text-right flex items-center gap-3"
                        >
                          <svg
                            className="w-4 h-4 text-blue-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                          دوره‌ها
                        </button>
                        <button
                          onClick={() => {
                            onNavigate("admin-users");
                            setAdminMenuOpen(false);
                          }}
                          className="w-full px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors text-right flex items-center gap-3 border-t border-gray-800"
                        >
                          <svg
                            className="w-4 h-4 text-purple-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                          </svg>
                          کاربران
                        </button>
                        <button
                          onClick={() => {
                            onNavigate("admin-reports");
                            setAdminMenuOpen(false);
                          }}
                          className="w-full px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors text-right flex items-center gap-3 border-t border-gray-800"
                        >
                          <svg
                            className="w-4 h-4 text-green-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                          گزارشات
                        </button>
                      </div>
                    </>
                  )}
                </div>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 border border-red-500/30 rounded-lg hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-200 flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  خروج
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-800 mt-2 pt-4">
            {!isLoggedIn ? (
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    onNavigate("signin");
                    setMobileMenuOpen(false);
                  }}
                  className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-white border border-gray-600 rounded-lg text-center"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    onNavigate("signup");
                    setMobileMenuOpen(false);
                  }}
                  className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-center"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    onNavigate("change-password");
                    setMobileMenuOpen(false);
                  }}
                  className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-white border border-gray-600 rounded-lg text-center"
                >
                  تغییر رمز عبور
                </button>
                <button className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-white border border-gray-600 rounded-lg text-center">
                  Profile
                </button>

                <div className="border border-gray-700 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setAdminMenuOpen(!adminMenuOpen)}
                    className="w-full px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-between"
                  >
                    <span>Admin</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        adminMenuOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {adminMenuOpen && (
                    <div className="bg-gray-800/50">
                      <button
                        onClick={() => {
                          onNavigate("admin-courses");
                          setMobileMenuOpen(false);
                          setAdminMenuOpen(false);
                        }}
                        className="w-full px-5 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 text-right border-t border-gray-700 flex items-center gap-3"
                      >
                        <svg
                          className="w-4 h-4 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                        <span>دوره‌ها</span>
                      </button>
                      <button
                        onClick={() => {
                          onNavigate("admin-users");
                          setMobileMenuOpen(false);
                          setAdminMenuOpen(false);
                        }}
                        className="w-full px-5 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 text-right border-t border-gray-700 flex items-center gap-3"
                      >
                        <svg
                          className="w-4 h-4 text-purple-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                        <span>کاربران</span>
                      </button>
                      <button
                        onClick={() => {
                          onNavigate("admin-reports");
                          setMobileMenuOpen(false);
                          setAdminMenuOpen(false);
                        }}
                        className="w-full px-5 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 text-right border-t border-gray-700 flex items-center gap-3"
                      >
                        <svg
                          className="w-4 h-4 text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                        <span>گزارشات</span>
                      </button>
                    </div>
                  )}
                </div>
                <button
                  onClick={onLogout}
                  className="px-5 py-2 text-sm font-medium text-red-400 border border-red-500/30 rounded-lg text-center"
                >
                  خروج
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
