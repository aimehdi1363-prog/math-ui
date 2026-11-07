import { Page } from "../../types";

export function Banner({
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
