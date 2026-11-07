import { Lesson } from "../types";

function VideoPlayer({
  lesson,
  courseTitle,
  chapterTitle,
}: {
  lesson: Lesson | null;
  courseTitle: string;
  chapterTitle?: string;
}) {
  const getEmbedUrl = () => {
    if (!lesson?.videoType || !lesson?.videoId) return null;
    if (lesson.videoType === "youtube") {
      return `https://www.youtube.com/embed/${lesson.videoId}?rel=0`;
    }
    if (lesson.videoType === "aparat") {
      return `https://www.aparat.com/video/video/embed/videohash/${lesson.videoId}/vt/frame`;
    }
    return null;
  };

  const embedUrl = getEmbedUrl();

  if (!lesson) {
    return (
      <div className="bg-gray-900/70 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="aspect-video flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-950">
          <div className="w-20 h-20 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-blue-400"
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
          </div>
          <h3 className="text-lg font-bold text-white mb-2">
            جلسه‌ای انتخاب نشده
          </h3>
          <p className="text-sm text-gray-400 text-center px-4">
            از لیست سمت راست یک جلسه انتخاب کنید تا ویدیو پخش شود
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Video */}
      <div className="bg-gray-900/70 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        {embedUrl ? (
          <div className="aspect-video bg-black">
            <iframe
              key={lesson.id}
              src={embedUrl}
              title={lesson.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="aspect-video flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-950">
            <svg
              className="w-12 h-12 text-gray-600 mb-3"
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
            <p className="text-sm text-gray-500">
              ویدیویی برای این جلسه ثبت نشده است
            </p>
          </div>
        )}
      </div>

      {/* Lesson Info */}
      <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h2 className="text-xl font-bold text-white">{lesson.title}</h2>
          {lesson.videoType && (
            <span
              className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-md flex items-center gap-1 ${
                lesson.videoType === "youtube"
                  ? "text-red-400 bg-red-500/10 border border-red-500/30"
                  : "text-purple-400 bg-purple-500/10 border border-purple-500/30"
              }`}
            >
              {lesson.videoType === "youtube" ? (
                <>
                  <svg
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  YouTube
                </>
              ) : (
                <>
                  <svg
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" opacity="0.3" />
                    <path d="M10 8l6 4-6 4V8z" />
                  </svg>
                  آپارات
                </>
              )}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-400 leading-relaxed">
          {lesson.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-800 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            {courseTitle}
          </span>
          {chapterTitle && (
            <span className="flex items-center gap-1.5">
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
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
              {chapterTitle}
            </span>
          )}
          <span className="flex items-center gap-1.5">
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            {lesson.exercises.length.toLocaleString("fa-IR")} تمرین
          </span>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
