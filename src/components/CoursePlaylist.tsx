import { useState } from "react";
import { Chapter, Lesson } from "../types";

function CoursePlaylist({
  chapters,
  lessons,
  selectedLessonId,
  onSelectLesson,
  courseTitle,
}: {
  chapters: Chapter[];
  lessons: Lesson[];
  selectedLessonId: string | null;
  onSelectLesson: (lessonId: string, chapterId: string) => void;
  courseTitle: string;
}) {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    () => new Set(chapters.filter((c) => c.isActive).map((c) => c.id)),
  );

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) => {
      const next = new Set(prev);
      if (next.has(chapterId)) next.delete(chapterId);
      else next.add(chapterId);
      return next;
    });
  };

  const sortedChapters = [...chapters].sort((a, b) => a.order - b.order);
  const totalLessons = chapters.reduce(
    (acc, ch) => acc + lessons.filter((l) => l.chapterId === ch.id).length,
    0,
  );

  return (
    <div className="bg-gray-900/70 border border-gray-800 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-blue-500/10 to-purple-600/10">
        <h2 className="text-base font-bold text-white mb-1">{courseTitle}</h2>
        <p className="text-xs text-gray-400">
          {sortedChapters.length.toLocaleString("fa-IR")} سرفصل —{" "}
          {totalLessons.toLocaleString("fa-IR")} جلسه
        </p>
      </div>

      {/* Chapters List */}
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
        {sortedChapters.length === 0 && (
          <div className="p-8 text-center text-gray-500 text-sm">
            محتوایی برای این دوره ثبت نشده است
          </div>
        )}

        {sortedChapters.map((chapter) => {
          const chapterLessons = lessons
            .filter((l) => l.chapterId === chapter.id)
            .sort((a, b) => a.order - b.order);
          const isExpanded = expandedChapters.has(chapter.id);
          const hasActiveLesson = chapterLessons.some(
            (l) => l.id === selectedLessonId,
          );

          return (
            <div key={chapter.id} className="border-b border-gray-800/50">
              {/* Chapter Header */}
              <button
                onClick={() => toggleChapter(chapter.id)}
                disabled={!chapter.isActive}
                className={`w-full px-4 py-3 flex items-center justify-between gap-2 text-right transition-colors ${
                  chapter.isActive
                    ? "hover:bg-gray-800/50"
                    : "opacity-50 cursor-not-allowed"
                } ${hasActiveLesson ? "bg-blue-500/5" : ""}`}
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div
                    className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                      hasActiveLesson
                        ? "bg-blue-500 text-white"
                        : "bg-gray-800 text-gray-400"
                    }`}
                  >
                    {chapter.order}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3
                      className={`text-sm font-bold truncate ${
                        chapter.isActive ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {chapter.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {chapterLessons.length.toLocaleString("fa-IR")} جلسه
                      {!chapter.isActive && " — غیرفعال"}
                    </p>
                  </div>
                </div>
                <svg
                  className={`shrink-0 w-4 h-4 text-gray-500 transition-transform ${
                    isExpanded ? "rotate-180" : ""
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

              {/* Lessons */}
              {isExpanded && chapter.isActive && (
                <div className="bg-gray-950/30">
                  {chapterLessons.length === 0 && (
                    <p className="px-4 py-3 text-xs text-gray-500 text-center">
                      جلسه‌ای ثبت نشده است
                    </p>
                  )}
                  {chapterLessons.map((lesson) => {
                    const isSelected = lesson.id === selectedLessonId;
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => onSelectLesson(lesson.id, chapter.id)}
                        className={`w-full px-4 py-2.5 flex items-center gap-2.5 text-right transition-colors border-r-2 ${
                          isSelected
                            ? "bg-blue-500/15 border-blue-500 text-white"
                            : "border-transparent text-gray-300 hover:bg-gray-800/40"
                        }`}
                      >
                        <div className="shrink-0">
                          {isSelected ? (
                            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                              <svg
                                className="w-3.5 h-3.5 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          ) : lesson.videoType ? (
                            <svg
                              className="w-6 h-6 text-gray-500"
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
                          ) : (
                            <svg
                              className="w-6 h-6 text-gray-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium truncate">
                            {lesson.order}. {lesson.title}
                          </p>
                        </div>
                        {lesson.exercises.length > 0 && (
                          <span className="shrink-0 text-xs text-gray-500 bg-gray-800 px-1.5 py-0.5 rounded">
                            {lesson.exercises.length}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CoursePlaylist;
