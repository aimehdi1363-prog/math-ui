export function Footer() {
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
