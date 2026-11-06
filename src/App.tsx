import { useState } from "react";
import { Chapter, Lesson } from "./types";

// Types
type Page =
  | "home"
  | "signin"
  | "signup"
  | "change-password"
  | "admin-courses"
  | "admin-users"
  | "admin-reports"
  | "admin-course-content";

// Course data
const courses = [
  {
    id: "c1",
    title: "جبر پیشرفته",
    description:
      "یادگیری معادلات، نامعادلات، توابع و مفاهیم پیشرفته جبر با مثال‌های کاربردی و تمرین‌های متنوع",
    image:
      "https://image.qwenlm.ai/generated-images/e3a5eb95-89d2-46f5-ac48-a4d129483343/_result.png",
    instructor: "دکتر علی رضایی",
    rating: 4.5,
    students: 1240,
    isActive: true,
  },
  {
    id: "c2",
    title: "حسابان (کالکولوس)",
    description:
      "مفاهیم حد، مشتق، انتگرال و کاربردهای آن‌ها در حل مسائل واقعی و مهندسی",
    image:
      "https://image.qwenlm.ai/generated-images/1ed05e55-c1c9-401b-bbb8-1c5650ee7e9b/_result.png",
    instructor: "دکتر مریم احمدی",
    rating: 4.8,
    students: 980,
    isActive: true,
  },
  {
    id: "c3",
    title: "هندسه تحلیلی",
    description:
      "بررسی اشکال هندسی، تبدیلات، مختصات و اثبات قضایا با رویکرد تحلیلی",
    image:
      "https://image.qwenlm.ai/generated-images/4ccb9820-900d-4846-9075-374358a01da0/_result.png",
    instructor: "مهندس سعید کریمی",
    rating: 4.2,
    students: 756,
    isActive: true,
  },
  {
    id: "c4",
    title: "آمار و احتمال",
    description:
      "آموزش مفاهیم پایه و پیشرفته آمار، توزیع‌های احتمالی و تحلیل داده‌ها",
    image:
      "https://image.qwenlm.ai/generated-images/122aaf0c-5066-4559-a723-057a09d7bc0f/_result.png",
    instructor: "دکتر زهرا موسوی",
    rating: 4.6,
    students: 1105,
    isActive: true,
  },
];

const initialChapters: Chapter[] = [
  {
    id: "ch1",
    courseId: "c1",
    title: "مقدمه‌ای بر جبر",
    description: "آشنایی با مفاهیم پایه و نمادها",
    order: 1,
    isActive: true,
    lessons: [],
  },
  {
    id: "ch2",
    courseId: "c1",
    title: "معادلات درجه اول",
    description: "حل معادلات خطی و کاربردها",
    order: 2,
    isActive: true,
    lessons: [],
  },
  {
    id: "ch3",
    courseId: "c1",
    title: "معادلات درجه دوم",
    description: "روش‌های حل و تحلیل ریشه‌ها",
    order: 3,
    isActive: false,
    lessons: [],
  },
];

const initialLessons: Lesson[] = [
  {
    id: "l1",
    chapterId: "ch1",
    title: "معرفی نمادها",
    description: "آشنایی با نمادهای ریاضی",
    order: 1,
    videoType: "aparat",
    videoId: "abc123",
    exercises: [],
  },
  {
    id: "l2",
    chapterId: "ch1",
    title: "اعداد و مجموعه‌ها",
    description: "مجموعه اعداد طبیعی، صحیح، حقیقی",
    order: 2,
    videoType: "",
    videoId: "",
    exercises: [],
  },
];

// ==================== AUTH PAGES ====================

// Sign In Page
function SignInPage({
  onNavigate,
  onLogin,
}: {
  onNavigate: (page: Page) => void;
  onLogin: () => void;
}) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ phone?: string; password?: string }>(
    {},
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { phone?: string; password?: string } = {};

    if (!phone.trim()) {
      newErrors.phone = "شماره تلفن الزامی است";
    } else if (!/^09\d{9}$/.test(phone.trim())) {
      newErrors.phone = "شماره تلفن معتبر نیست (مثال: 09123456789)";
    }

    if (!password) {
      newErrors.password = "رمز عبور الزامی است";
    } else if (password.length < 6) {
      newErrors.password = "رمز عبور باید حداقل ۶ کاراکتر باشد";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onLogin();
        onNavigate("home");
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">ورود به حساب</h2>
            <p className="text-gray-400 mt-2 text-sm">
              خوش آمدید! لطفاً اطلاعات خود را وارد کنید
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                شماره تلفن
              </label>
              <div className="relative">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09123456789"
                  className={`w-full bg-gray-800/50 border ${errors.phone ? "border-red-500" : "border-gray-700"} rounded-xl py-3 pr-11 pl-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all`}
                  dir="ltr"
                />
              </div>
              {errors.phone && (
                <p className="text-red-400 text-xs mt-1.5">{errors.phone}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                رمز عبور
              </label>
              <div className="relative">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="رمز عبور خود را وارد کنید"
                  className={`w-full bg-gray-800/50 border ${errors.password ? "border-red-500" : "border-gray-700"} rounded-xl py-3 pr-11 pl-11 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1.5">{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>در حال ورود...</span>
                </>
              ) : (
                "ورود"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              حساب کاربری ندارید؟{" "}
              <button
                onClick={() => onNavigate("signup")}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                ثبت نام کنید
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sign Up Page
function SignUpPage({
  onNavigate,
  onLogin,
}: {
  onNavigate: (page: Page) => void;
  onLogin: () => void;
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "نام الزامی است";
    if (!formData.lastName.trim())
      newErrors.lastName = "نام خانوادگی الزامی است";
    if (!formData.phone.trim()) {
      newErrors.phone = "شماره تلفن الزامی است";
    } else if (!/^09\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = "شماره تلفن معتبر نیست (مثال: 09123456789)";
    }
    if (!formData.password) {
      newErrors.password = "رمز عبور الزامی است";
    } else if (formData.password.length < 6) {
      newErrors.password = "رمز عبور باید حداقل ۶ کاراکتر باشد";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "تکرار رمز عبور الزامی است";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "رمز عبور و تکرار آن مطابقت ندارند";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onLogin();
        onNavigate("home");
      }, 1500);
    }
  };

  // Password strength indicator
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { level: 0, text: "", color: "" };
    if (pass.length < 4) return { level: 1, text: "ضعیف", color: "bg-red-500" };
    if (pass.length < 6)
      return { level: 2, text: "متوسط", color: "bg-yellow-500" };
    if (pass.length < 8) return { level: 3, text: "خوب", color: "bg-blue-500" };
    return { level: 4, text: "قوی", color: "bg-green-500" };
  };

  const strength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/25">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">ایجاد حساب کاربری</h2>
            <p className="text-gray-400 mt-2 text-sm">
              به خانواده MathVerse بپیوندید
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name fields */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  نام
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  placeholder="نام"
                  className={`w-full bg-gray-800/50 border ${errors.firstName ? "border-red-500" : "border-gray-700"} rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all`}
                />
                {errors.firstName && (
                  <p className="text-red-400 text-xs mt-1.5">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  نام خانوادگی
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  placeholder="نام خانوادگی"
                  className={`w-full bg-gray-800/50 border ${errors.lastName ? "border-red-500" : "border-gray-700"} rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all`}
                />
                {errors.lastName && (
                  <p className="text-red-400 text-xs mt-1.5">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                شماره تلفن
              </label>
              <div className="relative">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="09123456789"
                  className={`w-full bg-gray-800/50 border ${errors.phone ? "border-red-500" : "border-gray-700"} rounded-xl py-3 pr-11 pl-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all`}
                  dir="ltr"
                />
              </div>
              {errors.phone && (
                <p className="text-red-400 text-xs mt-1.5">{errors.phone}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                رمز عبور
              </label>
              <div className="relative">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="حداقل ۶ کاراکتر"
                  className={`w-full bg-gray-800/50 border ${errors.password ? "border-red-500" : "border-gray-700"} rounded-xl py-3 pr-11 pl-11 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {/* Password strength */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all ${i <= strength.level ? strength.color : "bg-gray-700"}`}
                      />
                    ))}
                  </div>
                  <p
                    className={`text-xs mt-1 ${strength.level <= 1 ? "text-red-400" : strength.level <= 2 ? "text-yellow-400" : strength.level <= 3 ? "text-blue-400" : "text-green-400"}`}
                  >
                    قدرت رمز: {strength.text}
                  </p>
                </div>
              )}
              {errors.password && (
                <p className="text-red-400 text-xs mt-1.5">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                تکرار رمز عبور
              </label>
              <div className="relative">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                  placeholder="رمز عبور را دوباره وارد کنید"
                  className={`w-full bg-gray-800/50 border ${errors.confirmPassword ? "border-red-500" : "border-gray-700"} rounded-xl py-3 pr-11 pl-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all`}
                />
                {formData.confirmPassword &&
                  formData.password === formData.confirmPassword && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1.5">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-medium rounded-xl hover:from-purple-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>در حال ثبت نام...</span>
                </>
              ) : (
                "ثبت نام"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              قبلاً ثبت نام کرده‌اید؟{" "}
              <button
                onClick={() => onNavigate("signin")}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                وارد شوید
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Change Password Page
function ChangePasswordPage({
  onNavigate,
  onLogout,
}: {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "رمز عبور فعلی الزامی است";
    }
    if (!formData.newPassword) {
      newErrors.newPassword = "رمز عبور جدید الزامی است";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "رمز عبور جدید باید حداقل ۶ کاراکتر باشد";
    }
    if (!formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "تکرار رمز عبور جدید الزامی است";
    } else if (formData.newPassword !== formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "رمز عبور جدید و تکرار آن مطابقت ندارند";
    }
    if (
      formData.currentPassword === formData.newPassword &&
      formData.newPassword
    ) {
      newErrors.newPassword = "رمز عبور جدید نباید با رمز فعلی یکسان باشد";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setSuccess(true);
        setTimeout(() => {
          onLogout();
          onNavigate("signin");
        }, 2000);
      }, 1500);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl text-center max-w-md w-full">
          <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            رمز عبور تغییر کرد!
          </h3>
          <p className="text-gray-400">
            رمز عبور شما با موفقیت تغییر یافت. در حال انتقال به صفحه ورود...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/25">
              <svg
                className="w-8 h-8 text-white"
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
            </div>
            <h2 className="text-2xl font-bold text-white">تغییر رمز عبور</h2>
            <p className="text-gray-400 mt-2 text-sm">
              رمز عبور خود را به‌روزرسانی کنید
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                رمز عبور فعلی
              </label>
              <div className="relative">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type={showPasswords.current ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={(e) =>
                    handleChange("currentPassword", e.target.value)
                  }
                  placeholder="رمز عبور فعلی خود را وارد کنید"
                  className={`w-full bg-gray-800/50 border ${errors.currentPassword ? "border-red-500" : "border-gray-700"} rounded-xl py-3 pr-11 pl-11 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all`}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords({
                      ...showPasswords,
                      current: !showPasswords.current,
                    })
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPasswords.current ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="text-red-400 text-xs mt-1.5">
                  {errors.currentPassword}
                </p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                رمز عبور جدید
              </label>
              <div className="relative">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <svg
                    className="w-5 h-5"
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
                </div>
                <input
                  type={showPasswords.new ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={(e) => handleChange("newPassword", e.target.value)}
                  placeholder="رمز عبور جدید (حداقل ۶ کاراکتر)"
                  className={`w-full bg-gray-800/50 border ${errors.newPassword ? "border-red-500" : "border-gray-700"} rounded-xl py-3 pr-11 pl-11 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all`}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords({
                      ...showPasswords,
                      new: !showPasswords.new,
                    })
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPasswords.new ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-400 text-xs mt-1.5">
                  {errors.newPassword}
                </p>
              )}
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                تکرار رمز عبور جدید
              </label>
              <div className="relative">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <input
                  type={showPasswords.new ? "text" : "password"}
                  value={formData.confirmNewPassword}
                  onChange={(e) =>
                    handleChange("confirmNewPassword", e.target.value)
                  }
                  placeholder="رمز عبور جدید را دوباره وارد کنید"
                  className={`w-full bg-gray-800/50 border ${errors.confirmNewPassword ? "border-red-500" : "border-gray-700"} rounded-xl py-3 pr-11 pl-11 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all`}
                />
                {formData.confirmNewPassword &&
                  formData.newPassword === formData.confirmNewPassword && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
              </div>
              {errors.confirmNewPassword && (
                <p className="text-red-400 text-xs mt-1.5">
                  {errors.confirmNewPassword}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>در حال تغییر...</span>
                </>
              ) : (
                "تغییر رمز عبور"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <button
              onClick={() => onNavigate("home")}
              className="text-gray-400 hover:text-white text-sm transition-colors flex items-center justify-center gap-1"
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              بازگشت به صفحه اصلی
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== HOME PAGE COMPONENTS ====================

// Star Rating Component
function StarRating({ rating }: { rating: number }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(
        <svg
          key={i}
          className="w-4 h-4 text-yellow-400 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>,
      );
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20">
          <defs>
            <linearGradient id={`grad-${i}`}>
              <stop
                offset={`${(rating % 1) * 100}%`}
                stopColor="currentColor"
              />
              <stop offset={`${(rating % 1) * 100}%`} stopColor="#4B5563" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#grad-${i})`}
            d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
          />
        </svg>,
      );
    } else {
      stars.push(
        <svg
          key={i}
          className="w-4 h-4 text-gray-600 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>,
      );
    }
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
}

// Navbar Component
function Navbar({
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
                {/* <button className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-500/25 flex items-center gap-2">
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
                </button> */}

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
                      className={`w-3 h-3 transition-transform duration-200 ${adminMenuOpen ? "rotate-180" : ""}`}
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
                      {/* Backdrop برای بستن منو با کلیک بیرون */}
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setAdminMenuOpen(false)}
                      />
                      <div className="absolute left-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50">
                        <button
                          onClick={() => {
                            onNavigate("admin-courses" as Page);
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
                            onNavigate("admin-users" as Page);
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
                            onNavigate("admin-reports" as Page);
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
                {/* <button className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-center">
                  Admin
                </button> */}
                {/* Admin Mobile Menu */}
                {/* Admin Mobile Menu */}
                <div className="border border-gray-700 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setAdminMenuOpen(!adminMenuOpen)}
                    className="w-full px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-between"
                  >
                    <span>Admin</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${adminMenuOpen ? "rotate-180" : ""}`}
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
                          onNavigate("admin-courses" as Page);
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
                          onNavigate("admin-users" as Page);
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
                          onNavigate("admin-reports" as Page);
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

// Banner Component
function Banner({
  isLoggedIn,
  onNavigate,
}: {
  isLoggedIn: boolean;
  onNavigate: (page: Page) => void;
}) {
  return (
    <section className="relative w-full h-[500px] md:h-[550px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://image.qwenlm.ai/generated-images/bc0782ce-946c-4e49-9fc7-f89cbbc56572/_result.png')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/50 to-gray-900" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          دنیای{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            ریاضی
          </span>{" "}
          را کشف کنید
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
          با بهترین اساتید و محتوای آموزشی، ریاضی را به ساده‌ترین شکل ممکن یاد
          بگیرید
        </p>

        {!isLoggedIn && (
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onNavigate("signup")}
              className="px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105"
            >
              Sign Up — رایگان شروع کنید
            </button>
            <button
              onClick={() => onNavigate("signin")}
              className="px-8 py-3 text-base font-medium text-white border-2 border-white/30 rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// Course Card
function CourseCard({ course }: { course: (typeof courses)[0] }) {
  return (
    <div className="group bg-gray-800/50 border border-gray-700/50 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-gray-400 mb-4 leading-relaxed line-clamp-2">
          {course.description}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
          <div className="flex items-center gap-2">
            <StarRating rating={course.rating} />
            <span className="text-sm text-gray-400">{course.rating}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="text-sm">
              {course.students.toLocaleString("fa-IR")} شرکت‌کننده
            </span>
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
            <a
              href="#"
              className="text-gray-500 hover:text-blue-400 transition-colors text-sm"
            >
              درباره ما
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-blue-400 transition-colors text-sm"
            >
              تماس با ما
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-blue-400 transition-colors text-sm"
            >
              قوانین
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ==================== ADMIN COURSES PAGE ====================

type Course = (typeof courses)[0];

function AdminCoursesPage({
  onNavigate,
  onOpenContent,
}: {
  onNavigate: (page: Page) => void;
  onOpenContent?: (id: string, title: string) => void;
}) {
  const [courseList, setCourseList] = useState<Course[]>(courses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor: "",
    image: "",
    isActive: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const openCreateModal = () => {
    setEditingCourse(null);
    setFormData({
      title: "",
      description: "",
      instructor: "",
      image: "",
      isActive: true,
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      image: course.image,
      isActive: course.isActive ?? true,
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "عنوان دوره الزامی است";
    if (!formData.description.trim())
      newErrors.description = "توضیحات الزامی است";
    if (!formData.instructor.trim())
      newErrors.instructor = "نام مدرس الزامی است";
    if (!formData.image.trim()) newErrors.image = "لینک تصویر الزامی است";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (editingCourse) {
      // در ویرایش: rating و students حفظ می‌شوند
      setCourseList((prev) =>
        prev.map((c) =>
          c.id === editingCourse.id
            ? {
                ...c,
                title: formData.title,
                description: formData.description,
                instructor: formData.instructor,
                image: formData.image,
                isActive: formData.isActive,
              }
            : c,
        ),
      );
    } else {
      const newId = Math.max(0, ...courseList.map((c) => c.id)) + 1;
      setCourseList((prev) => [
        ...prev,
        {
          id: newId,
          title: formData.title,
          description: formData.description,
          instructor: formData.instructor,
          image: formData.image,
          isActive: formData.isActive,
          rating: 0, // مقدار اولیه محاسباتی
          students: 0, // مقدار اولیه محاسباتی
        },
      ]);
    }
    setIsModalOpen(false);
  };

  const toggleActive = (id: number) => {
    setCourseList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c)),
    );
  };

  const handleDelete = (id: number) => {
    setCourseList((prev) => prev.filter((c) => c.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              مدیریت دوره‌ها
            </h1>
            <p className="text-gray-400 mt-1 text-sm">
              {courseList.length} دوره ثبت شده —{" "}
              {courseList.filter((c) => c.isActive).length} فعال
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            افزودن دوره جدید
          </button>
        </div>

        {/* Courses List */}
        <div className="space-y-4">
          {courseList.length === 0 && (
            <div className="text-center py-16 bg-gray-900/50 border border-gray-800 rounded-2xl">
              <p className="text-gray-400">هیچ دوره‌ای ثبت نشده است</p>
            </div>
          )}

          {courseList.map((course) => (
            <div
              key={course.id}
              className={`bg-gray-900/70 border rounded-2xl p-4 md:p-5 transition-all ${
                course.isActive
                  ? "border-gray-800 hover:border-blue-500/40"
                  : "border-gray-800/50 opacity-70"
              }`}
            >
              <div className="flex flex-col md:flex-row gap-4">
                {/* Image */}
                <div className="relative w-full md:w-40 h-32 md:h-28 shrink-0 rounded-xl overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  {!course.isActive && (
                    <div className="absolute inset-0 bg-gray-950/70 flex items-center justify-center">
                      <span className="text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/30 px-2 py-1 rounded-md">
                        غیرفعال
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold text-white truncate">
                      {course.title}
                    </h3>
                    <span
                      className={`shrink-0 text-xs font-medium px-2 py-1 rounded-md ${
                        course.isActive
                          ? "text-green-400 bg-green-500/10 border border-green-500/30"
                          : "text-gray-400 bg-gray-500/10 border border-gray-500/30"
                      }`}
                    >
                      {course.isActive ? "فعال" : "غیرفعال"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-sm text-blue-400">
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
                    <span>{course.instructor}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      {course.rating}
                    </span>
                    <span className="flex items-center gap-1">
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
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {course.students.toLocaleString("fa-IR")} نفر
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap md:flex-col gap-2 md:w-44 shrink-0">
                  <button
                    onClick={() => onOpenContent?.(course.id, course.title)}
                    className="flex-1 md:flex-none px-3 py-2 text-xs font-medium text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/10 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    محتویات
                  </button>
                  <button
                    onClick={() => openEditModal(course)}
                    className="flex-1 md:flex-none px-3 py-2 text-xs font-medium text-yellow-400 border border-yellow-500/30 rounded-lg hover:bg-yellow-500/10 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    ویرایش
                  </button>
                  <button
                    onClick={() => toggleActive(course.id)}
                    className={`flex-1 md:flex-none px-3 py-2 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                      course.isActive
                        ? "text-orange-400 border border-orange-500/30 hover:bg-orange-500/10"
                        : "text-green-400 border border-green-500/30 hover:bg-green-500/10"
                    }`}
                  >
                    {course.isActive ? (
                      <>
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                          />
                        </svg>
                        غیرفعال
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        فعال‌سازی
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(course.id)}
                    className="flex-1 md:flex-none px-3 py-2 text-xs font-medium text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    حذف
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {editingCourse ? "ویرایش دوره" : "افزودن دوره جدید"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  عنوان دوره
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className={`w-full bg-gray-800/50 border ${
                    errors.title ? "border-red-500" : "border-gray-700"
                  } rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-blue-500`}
                />
                {errors.title && (
                  <p className="text-red-400 text-xs mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  توضیحات
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className={`w-full bg-gray-800/50 border ${
                    errors.description ? "border-red-500" : "border-gray-700"
                  } rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-blue-500 resize-none`}
                />
                {errors.description && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  لینک تصویر
                </label>
                <input
                  type="url"
                  dir="ltr"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className={`w-full bg-gray-800/50 border ${
                    errors.image ? "border-red-500" : "border-gray-700"
                  } rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-blue-500`}
                />
                {errors.image && (
                  <p className="text-red-400 text-xs mt-1">{errors.image}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    امتیاز (۰ تا ۵)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rating: Number(e.target.value),
                      })
                    }
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    تعداد شرکت‌کننده
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.students}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        students: Number(e.target.value),
                      })
                    }
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="w-5 h-5 rounded accent-blue-500"
                />
                <span className="text-sm text-gray-300">دوره فعال باشد</span>
              </label>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  {editingCourse ? "ذخیره تغییرات" : "افزودن دوره"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 text-sm text-gray-300 border border-gray-700 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  انصراف
                </button>
              </div>
            </form> */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  عنوان دوره
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className={`w-full bg-gray-800/50 border ${
                    errors.title ? "border-red-500" : "border-gray-700"
                  } rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-blue-500`}
                />
                {errors.title && (
                  <p className="text-red-400 text-xs mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  نام مدرس
                </label>
                <input
                  type="text"
                  value={formData.instructor}
                  onChange={(e) =>
                    setFormData({ ...formData, instructor: e.target.value })
                  }
                  placeholder="مثال: دکتر علی رضایی"
                  className={`w-full bg-gray-800/50 border ${
                    errors.instructor ? "border-red-500" : "border-gray-700"
                  } rounded-xl py-2.5 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500`}
                />
                {errors.instructor && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.instructor}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  توضیحات
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className={`w-full bg-gray-800/50 border ${
                    errors.description ? "border-red-500" : "border-gray-700"
                  } rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-blue-500 resize-none`}
                />
                {errors.description && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  لینک تصویر
                </label>
                <input
                  type="url"
                  dir="ltr"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className={`w-full bg-gray-800/50 border ${
                    errors.image ? "border-red-500" : "border-gray-700"
                  } rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-blue-500`}
                />
                {errors.image && (
                  <p className="text-red-400 text-xs mt-1">{errors.image}</p>
                )}
              </div>

              {/* نمایش فقط‌خواندنی مقادیر محاسباتی در حالت ویرایش */}
              {editingCourse && (
                <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-4 space-y-2">
                  <p className="text-xs text-gray-500 mb-2">
                    اطلاعات زیر به‌صورت خودکار توسط سیستم محاسبه می‌شوند و قابل
                    ویرایش نیستند:
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">امتیاز دوره</span>
                    <span className="flex items-center gap-1 text-yellow-400 font-medium">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      {editingCourse.rating}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">تعداد شرکت‌کننده</span>
                    <span className="text-blue-400 font-medium">
                      {editingCourse.students.toLocaleString("fa-IR")} نفر
                    </span>
                  </div>
                </div>
              )}

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="w-5 h-5 rounded accent-blue-500"
                />
                <span className="text-sm text-gray-300">دوره فعال باشد</span>
              </label>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  {editingCourse ? "ذخیره تغییرات" : "افزودن دوره"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 text-sm text-gray-300 border border-gray-700 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setDeleteConfirm(null)}
          />
          <div className="relative w-full max-w-sm bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl text-center">
            <div className="w-14 h-14 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-7 h-7 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">حذف دوره</h3>
            <p className="text-sm text-gray-400 mb-6">
              آیا از حذف این دوره مطمئن هستید؟ این عمل قابل بازگشت نیست.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2.5 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 transition-colors"
              >
                حذف
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 text-gray-300 border border-gray-700 rounded-xl hover:bg-gray-800 transition-colors"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== COURSE CONTENT PAGE (Placeholder) ====================

// ==================== ADMIN COURSE CONTENT PAGE ====================

function AdminCourseContentPage({
  onNavigate,
  courseId,
  courseTitle,
}: {
  onNavigate: (page: Page) => void;
  courseId: string;
  courseTitle: string;
}) {
  const [tab, setTab] = useState<AdminTab>("chapters");
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(
    null,
  );
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  // State داده‌ها
  const [chapters, setChapters] = useState<Chapter[]>(
    initialChapters.filter((c) => c.courseId === courseId),
  );
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);

  // ===== Drag & Drop =====
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  // ===== Chapter Modal =====
  const [chapterModal, setChapterModal] = useState<{
    open: boolean;
    editing: Chapter | null;
  }>({ open: false, editing: null });
  const [chapterForm, setChapterForm] = useState({
    title: "",
    description: "",
  });
  const [chapterErrors, setChapterErrors] = useState<Record<string, string>>(
    {},
  );

  // ===== Lesson Modal =====
  const [lessonModal, setLessonModal] = useState<{
    open: boolean;
    editing: Lesson | null;
  }>({ open: false, editing: null });
  const [lessonForm, setLessonForm] = useState({
    title: "",
    description: "",
    videoType: "" as "aparat" | "youtube" | "",
    videoId: "",
  });
  const [lessonErrors, setLessonErrors] = useState<Record<string, string>>({});

  // ===== Delete Confirm =====
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: "chapter" | "lesson";
    id: string;
  } | null>(null);

  const sortedChapters = [...chapters].sort((a, b) => a.order - b.order);
  const currentChapter =
    chapters.find((c) => c.id === selectedChapterId) || null;
  const chapterLessons = lessons
    .filter((l) => l.chapterId === selectedChapterId)
    .sort((a, b) => a.order - b.order);
  const currentLesson = lessons.find((l) => l.id === selectedLessonId) || null;

  // ===== Chapter Handlers =====
  const openCreateChapter = () => {
    setChapterForm({ title: "", description: "" });
    setChapterErrors({});
    setChapterModal({ open: true, editing: null });
  };

  const openEditChapter = (chapter: Chapter) => {
    setChapterForm({ title: chapter.title, description: chapter.description });
    setChapterErrors({});
    setChapterModal({ open: true, editing: chapter });
  };

  const submitChapter = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!chapterForm.title.trim()) errs.title = "عنوان سرفصل الزامی است";
    if (!chapterForm.description.trim())
      errs.description = "توضیحات الزامی است";
    setChapterErrors(errs);
    if (Object.keys(errs).length > 0) return;

    if (chapterModal.editing) {
      setChapters((prev) =>
        prev.map((c) =>
          c.id === chapterModal.editing!.id ? { ...c, ...chapterForm } : c,
        ),
      );
    } else {
      const newId = `ch-${Date.now()}`;
      const maxOrder = Math.max(0, ...chapters.map((c) => c.order));
      setChapters((prev) => [
        ...prev,
        {
          id: newId,
          courseId,
          title: chapterForm.title,
          description: chapterForm.description,
          order: maxOrder + 1,
          isActive: true,
          lessons: [],
        },
      ]);
    }
    setChapterModal({ open: false, editing: null });
  };

  const toggleChapterActive = (id: string) => {
    setChapters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c)),
    );
  };

  const deleteChapter = (id: string) => {
    setChapters((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      return filtered
        .sort((a, b) => a.order - b.order)
        .map((c, i) => ({ ...c, order: i + 1 }));
    });
    setLessons((prev) => prev.filter((l) => l.chapterId !== id));
    if (selectedChapterId === id) {
      setSelectedChapterId(null);
      setTab("chapters");
    }
    setDeleteConfirm(null);
  };

  // ===== Lesson Handlers =====
  const openCreateLesson = () => {
    if (!selectedChapterId) return;
    setLessonForm({ title: "", description: "", videoType: "", videoId: "" });
    setLessonErrors({});
    setLessonModal({ open: true, editing: null });
  };

  const openEditLesson = (lesson: Lesson) => {
    setLessonForm({
      title: lesson.title,
      description: lesson.description,
      videoType: lesson.videoType || "",
      videoId: lesson.videoId || "",
    });
    setLessonErrors({});
    setLessonModal({ open: true, editing: lesson });
  };

  const submitLesson = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!lessonForm.title.trim()) errs.title = "عنوان جلسه الزامی است";
    if (!lessonForm.description.trim()) errs.description = "توضیحات الزامی است";
    if (lessonForm.videoType && !lessonForm.videoId.trim()) {
      errs.videoId = "شناسه ویدیو الزامی است";
    }
    setLessonErrors(errs);
    if (Object.keys(errs).length > 0) return;

    if (lessonModal.editing) {
      setLessons((prev) =>
        prev.map((l) =>
          l.id === lessonModal.editing!.id ? { ...l, ...lessonForm } : l,
        ),
      );
    } else {
      const newId = `l-${Date.now()}`;
      const chapterLessonsAll = lessons.filter(
        (l) => l.chapterId === selectedChapterId,
      );
      const maxOrder = Math.max(0, ...chapterLessonsAll.map((l) => l.order));
      setLessons((prev) => [
        ...prev,
        {
          id: newId,
          chapterId: selectedChapterId!,
          title: lessonForm.title,
          description: lessonForm.description,
          order: maxOrder + 1,
          videoType: lessonForm.videoType,
          videoId: lessonForm.videoId,
          exercises: [],
        },
      ]);
    }
    setLessonModal({ open: false, editing: null });
  };

  const deleteLesson = (id: string) => {
    setLessons((prev) => {
      const filtered = prev.filter((l) => l.id !== id);
      const chapterId = lessons.find((l) => l.id === id)?.chapterId;
      const sameChapter = filtered.filter((l) => l.chapterId === chapterId);
      return [
        ...filtered.filter((l) => l.chapterId !== chapterId),
        ...sameChapter
          .sort((a, b) => a.order - b.order)
          .map((l, i) => ({ ...l, order: i + 1 })),
      ];
    });
    setDeleteConfirm(null);
  };

  // ===== Drag & Drop (فقط برای chapters) =====
  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (draggedId !== id) setDragOverId(id);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) {
      setDraggedId(null);
      setDragOverId(null);
      return;
    }
    const sorted = [...chapters].sort((a, b) => a.order - b.order);
    const fromIdx = sorted.findIndex((c) => c.id === draggedId);
    const toIdx = sorted.findIndex((c) => c.id === targetId);
    if (fromIdx === -1 || toIdx === -1) return;
    const [moved] = sorted.splice(fromIdx, 1);
    sorted.splice(toIdx, 0, moved);
    setChapters(sorted.map((c, i) => ({ ...c, order: i + 1 })));
    setDraggedId(null);
    setDragOverId(null);
  };

  // ===== Navigation between levels =====
  const goToLessons = (chapterId: string) => {
    setSelectedChapterId(chapterId);
    setSelectedLessonId(null);
    setTab("lessons");
  };

  const goToExercises = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setTab("exercises");
  };

  // ===== Breadcrumb =====
  const breadcrumb = (
    <div className="mb-6 flex items-center gap-2 text-sm text-gray-400 flex-wrap">
      <button
        onClick={() => onNavigate("admin-courses")}
        className="hover:text-white transition-colors"
      >
        دوره‌ها
      </button>
      <span>/</span>
      <button
        onClick={() => {
          setTab("chapters");
          setSelectedChapterId(null);
          setSelectedLessonId(null);
        }}
        className="hover:text-white transition-colors"
      >
        {courseTitle}
      </button>
      {tab !== "chapters" && currentChapter && (
        <>
          <span>/</span>
          <button
            onClick={() => {
              setTab("lessons");
              setSelectedLessonId(null);
            }}
            className="hover:text-white transition-colors"
          >
            {currentChapter.title}
          </button>
        </>
      )}
      {tab === "exercises" && currentLesson && (
        <>
          <span>/</span>
          <span className="text-white">{currentLesson.title}</span>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {breadcrumb}

        {/* ============ LEVEL 1: CHAPTERS ============ */}
        {tab === "chapters" && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  سرفصل‌های دوره:{" "}
                  <span className="text-blue-400">{courseTitle}</span>
                </h1>
                <p className="text-gray-400 mt-1 text-sm">
                  {chapters.length} سرفصل —{" "}
                  {chapters.filter((c) => c.isActive).length} فعال
                </p>
              </div>
              <button
                onClick={openCreateChapter}
                className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                افزودن سرفصل
              </button>
            </div>

            {chapters.length > 1 && (
              <div className="mb-4 text-xs text-gray-500 flex items-center gap-2 bg-gray-900/50 border border-gray-800 rounded-lg px-3 py-2">
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                برای تغییر ترتیب سرفصل‌ها، از دستگیره سمت راست استفاده کنید.
              </div>
            )}

            <div className="space-y-3">
              {sortedChapters.length === 0 && (
                <div className="text-center py-16 bg-gray-900/50 border border-gray-800 rounded-2xl">
                  <p className="text-gray-400">هنوز سرفصلی تعریف نشده است</p>
                </div>
              )}

              {sortedChapters.map((chapter) => {
                const lessonCount = lessons.filter(
                  (l) => l.chapterId === chapter.id,
                ).length;
                return (
                  <div
                    key={chapter.id}
                    draggable
                    onDragStart={() => setDraggedId(chapter.id)}
                    onDragOver={(e) => handleDragOver(e, chapter.id)}
                    onDragLeave={() => setDragOverId(null)}
                    onDrop={(e) => handleDrop(e, chapter.id)}
                    onDragEnd={() => {
                      setDraggedId(null);
                      setDragOverId(null);
                    }}
                    className={`bg-gray-900/70 border rounded-2xl p-4 transition-all ${
                      draggedId === chapter.id
                        ? "opacity-40 border-blue-500"
                        : dragOverId === chapter.id
                          ? "border-blue-500 border-dashed bg-blue-500/5"
                          : chapter.isActive
                            ? "border-gray-800 hover:border-blue-500/40"
                            : "border-gray-800/50 opacity-70"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 pt-1 cursor-grab active:cursor-grabbing text-gray-500 hover:text-blue-400">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 8h16M4 16h16"
                          />
                        </svg>
                      </div>
                      <div className="shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-500/30 flex items-center justify-center text-sm font-bold text-blue-400">
                        {chapter.order}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-base font-bold text-white truncate">
                            {chapter.title}
                          </h3>
                          <span
                            className={`shrink-0 text-xs font-medium px-2 py-1 rounded-md ${
                              chapter.isActive
                                ? "text-green-400 bg-green-500/10 border border-green-500/30"
                                : "text-gray-400 bg-gray-500/10 border border-gray-500/30"
                            }`}
                          >
                            {chapter.isActive ? "فعال" : "غیرفعال"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                          {chapter.description}
                        </p>
                        <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-500">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {lessonCount.toLocaleString("fa-IR")} جلسه
                        </div>
                      </div>
                      <div className="shrink-0 flex items-center gap-1.5 flex-wrap justify-end">
                        <button
                          onClick={() => goToLessons(chapter.id)}
                          className="px-3 py-2 text-xs text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/10 flex items-center gap-1"
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          جلسات
                        </button>
                        <button
                          onClick={() => openEditChapter(chapter)}
                          className="p-2 text-yellow-400 border border-yellow-500/30 rounded-lg hover:bg-yellow-500/10"
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
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => toggleChapterActive(chapter.id)}
                          className={`p-2 rounded-lg ${
                            chapter.isActive
                              ? "text-orange-400 border border-orange-500/30 hover:bg-orange-500/10"
                              : "text-green-400 border border-green-500/30 hover:bg-green-500/10"
                          }`}
                        >
                          {chapter.isActive ? (
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
                                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                              />
                            </svg>
                          ) : (
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
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </button>
                        <button
                          onClick={() =>
                            setDeleteConfirm({
                              type: "chapter",
                              id: chapter.id,
                            })
                          }
                          className="p-2 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10"
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ============ LEVEL 2: LESSONS ============ */}
        {tab === "lessons" && currentChapter && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  جلسات سرفصل:{" "}
                  <span className="text-blue-400">{currentChapter.title}</span>
                </h1>
                <p className="text-gray-400 mt-1 text-sm">
                  {chapterLessons.length} جلسه
                </p>
              </div>
              <button
                onClick={openCreateLesson}
                className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                افزودن جلسه
              </button>
            </div>

            <div className="space-y-3">
              {chapterLessons.length === 0 && (
                <div className="text-center py-16 bg-gray-900/50 border border-gray-800 rounded-2xl">
                  <p className="text-gray-400">
                    هنوز جلسه‌ای برای این سرفصل تعریف نشده است
                  </p>
                </div>
              )}

              {chapterLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="bg-gray-900/70 border border-gray-800 rounded-2xl p-4 hover:border-blue-500/40 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-500/30 flex items-center justify-center text-sm font-bold text-blue-400">
                      {lesson.order}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-white truncate">
                        {lesson.title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                        {lesson.description}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 flex-wrap">
                        {lesson.videoType && (
                          <span className="flex items-center gap-1">
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                            {lesson.videoType === "aparat"
                              ? "آپارات"
                              : "یوتیوب"}
                            : {lesson.videoId}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                          {lesson.exercises.length.toLocaleString("fa-IR")}{" "}
                          تمرین
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0 flex items-center gap-1.5 flex-wrap justify-end">
                      <button
                        onClick={() => goToExercises(lesson.id)}
                        className="px-3 py-2 text-xs text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/10 flex items-center gap-1"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                        تمرین‌ها
                      </button>
                      <button
                        onClick={() => openEditLesson(lesson)}
                        className="p-2 text-yellow-400 border border-yellow-500/30 rounded-lg hover:bg-yellow-500/10"
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
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() =>
                          setDeleteConfirm({ type: "lesson", id: lesson.id })
                        }
                        className="p-2 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ============ LEVEL 3: EXERCISES ============ */}
        {tab === "exercises" && currentLesson && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  تمرین‌های جلسه:{" "}
                  <span className="text-blue-400">{currentLesson.title}</span>
                </h1>
                <p className="text-gray-400 mt-1 text-sm">
                  {currentLesson.exercises.length} تمرین
                </p>
              </div>
            </div>

            <div className="text-center py-16 bg-gray-900/50 border border-gray-800 rounded-2xl">
              <p className="text-gray-400 mb-4">
                صفحه مدیریت تمرین‌ها در گام بعدی پیاده‌سازی می‌شود.
              </p>
              <button
                onClick={() => setTab("lessons")}
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                ← بازگشت به جلسات
              </button>
            </div>
          </>
        )}
      </div>

      {/* ============ CHAPTER MODAL ============ */}
      {chapterModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setChapterModal({ open: false, editing: null })}
          />
          <div className="relative w-full max-w-lg bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {chapterModal.editing ? "ویرایش سرفصل" : "افزودن سرفصل جدید"}
              </h2>
              <button
                onClick={() => setChapterModal({ open: false, editing: null })}
                className="text-gray-400 hover:text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={submitChapter} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  عنوان سرفصل
                </label>
                <input
                  type="text"
                  value={chapterForm.title}
                  onChange={(e) =>
                    setChapterForm({ ...chapterForm, title: e.target.value })
                  }
                  className={`w-full bg-gray-800/50 border ${
                    chapterErrors.title ? "border-red-500" : "border-gray-700"
                  } rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-blue-500`}
                />
                {chapterErrors.title && (
                  <p className="text-red-400 text-xs mt-1">
                    {chapterErrors.title}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  توضیحات
                </label>
                <textarea
                  rows={3}
                  value={chapterForm.description}
                  onChange={(e) =>
                    setChapterForm({
                      ...chapterForm,
                      description: e.target.value,
                    })
                  }
                  className={`w-full bg-gray-800/50 border ${
                    chapterErrors.description
                      ? "border-red-500"
                      : "border-gray-700"
                  } rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-blue-500 resize-none`}
                />
                {chapterErrors.description && (
                  <p className="text-red-400 text-xs mt-1">
                    {chapterErrors.description}
                  </p>
                )}
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-700"
                >
                  {chapterModal.editing ? "ذخیره تغییرات" : "افزودن سرفصل"}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setChapterModal({ open: false, editing: null })
                  }
                  className="px-6 py-3 text-sm text-gray-300 border border-gray-700 rounded-xl hover:bg-gray-800"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============ LESSON MODAL ============ */}
      {lessonModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setLessonModal({ open: false, editing: null })}
          />
          <div className="relative w-full max-w-lg bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {lessonModal.editing ? "ویرایش جلسه" : "افزودن جلسه جدید"}
              </h2>
              <button
                onClick={() => setLessonModal({ open: false, editing: null })}
                className="text-gray-400 hover:text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={submitLesson} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  عنوان جلسه
                </label>
                <input
                  type="text"
                  value={lessonForm.title}
                  onChange={(e) =>
                    setLessonForm({ ...lessonForm, title: e.target.value })
                  }
                  className={`w-full bg-gray-800/50 border ${
                    lessonErrors.title ? "border-red-500" : "border-gray-700"
                  } rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-blue-500`}
                />
                {lessonErrors.title && (
                  <p className="text-red-400 text-xs mt-1">
                    {lessonErrors.title}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  توضیحات
                </label>
                <textarea
                  rows={3}
                  value={lessonForm.description}
                  onChange={(e) =>
                    setLessonForm({
                      ...lessonForm,
                      description: e.target.value,
                    })
                  }
                  className={`w-full bg-gray-800/50 border ${
                    lessonErrors.description
                      ? "border-red-500"
                      : "border-gray-700"
                  } rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-blue-500 resize-none`}
                />
                {lessonErrors.description && (
                  <p className="text-red-400 text-xs mt-1">
                    {lessonErrors.description}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    نوع ویدیو
                  </label>
                  <select
                    value={lessonForm.videoType}
                    onChange={(e) =>
                      setLessonForm({
                        ...lessonForm,
                        videoType: e.target.value as "aparat" | "youtube" | "",
                      })
                    }
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="">بدون ویدیو</option>
                    <option value="aparat">آپارات</option>
                    <option value="youtube">یوتیوب</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    شناسه ویدیو
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={lessonForm.videoId}
                    onChange={(e) =>
                      setLessonForm({ ...lessonForm, videoId: e.target.value })
                    }
                    disabled={!lessonForm.videoType}
                    className={`w-full bg-gray-800/50 border ${
                      lessonErrors.videoId
                        ? "border-red-500"
                        : "border-gray-700"
                    } rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-blue-500 disabled:opacity-40`}
                  />
                  {lessonErrors.videoId && (
                    <p className="text-red-400 text-xs mt-1">
                      {lessonErrors.videoId}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-700"
                >
                  {lessonModal.editing ? "ذخیره تغییرات" : "افزودن جلسه"}
                </button>
                <button
                  type="button"
                  onClick={() => setLessonModal({ open: false, editing: null })}
                  className="px-6 py-3 text-sm text-gray-300 border border-gray-700 rounded-xl hover:bg-gray-800"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============ DELETE CONFIRM ============ */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setDeleteConfirm(null)}
          />
          <div className="relative w-full max-w-sm bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl text-center">
            <div className="w-14 h-14 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-7 h-7 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              حذف {deleteConfirm.type === "chapter" ? "سرفصل" : "جلسه"}
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              آیا از حذف مطمئن هستید؟ این عمل قابل بازگشت نیست.
              {deleteConfirm.type === "chapter" &&
                " تمام جلسات زیرمجموعه نیز حذف خواهند شد."}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() =>
                  deleteConfirm.type === "chapter"
                    ? deleteChapter(deleteConfirm.id)
                    : deleteLesson(deleteConfirm.id)
                }
                className="flex-1 py-2.5 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600"
              >
                حذف
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 text-gray-300 border border-gray-700 rounded-xl hover:bg-gray-800"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== MAIN APP ====================

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeCourse, setActiveCourse] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("home");
  };

  // Render page based on current route
  const renderPage = () => {
    switch (currentPage) {
      case "signin":
        return <SignInPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      case "signup":
        return <SignUpPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      case "change-password":
        if (!isLoggedIn) {
          // Redirect to signin if not logged in
          return (
            <SignInPage onNavigate={handleNavigate} onLogin={handleLogin} />
          );
        }
        return (
          <ChangePasswordPage
            onNavigate={handleNavigate}
            onLogout={handleLogout}
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
            <CoursesSection />
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
