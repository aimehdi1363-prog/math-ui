import { useState } from "react";
import { allLessons, initialCourses, allChapters } from "../data/mockData";
import { Page } from "../types";
import CoursePlaylist from "../components/CoursePlaylist";
import VideoPlayer from "../components/VideoPlayer";

function CoursePlayerPage({
  onNavigate,
  courseId,
}: {
  onNavigate: (page: Page) => void;
  courseId: string;
}) {
  const course =
    initialCourses.find((c) => c.id === courseId) || initialCourses[0];

  const chapters = allChapters.filter((c) => c.courseId === courseId);
  const lessons = allLessons.filter((l) =>
    chapters.some((ch) => ch.id === l.chapterId),
  );

  // انتخاب اولین جلسه فعال به‌صورت پیش‌فرض
  const firstActiveChapter = [...chapters]
    .filter((c) => c.isActive)
    .sort((a, b) => a.order - b.order)[0];
  const firstLesson = firstActiveChapter
    ? lessons
        .filter((l) => l.chapterId === firstActiveChapter.id)
        .sort((a, b) => a.order - b.order)[0]
    : null;

  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(
    firstLesson?.id ?? null,
  );
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(
    firstActiveChapter?.id ?? null,
  );

  const selectedLesson = lessons.find((l) => l.id === selectedLessonId) || null;
  const selectedChapter =
    chapters.find((c) => c.id === selectedChapterId) || null;

  const handleSelectLesson = (lessonId: string, chapterId: string) => {
    setSelectedLessonId(lessonId);
    setSelectedChapterId(chapterId);
  };

  return (
    <div className="min-h-screen bg-gray-950 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb & Back */}
        <div className="mb-5 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-gray-400 flex-wrap">
            <button
              onClick={() => onNavigate("home")}
              className="hover:text-white transition-colors"
            >
              خانه
            </button>
            <span>/</span>
            <span className="text-white">{course.title}</span>
          </div>
          <button
            onClick={() => onNavigate("home")}
            className="px-3 py-1.5 text-xs text-gray-300 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-1.5"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            بازگشت
          </button>
        </div>

        {/* Layout: Left = Video, Right = Playlist (RTL) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Video Player - سمت چپ در RTL (col-span-2) */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <VideoPlayer
              lesson={selectedLesson}
              courseTitle={course.title}
              chapterTitle={selectedChapter?.title}
            />
          </div>

          {/* Playlist - سمت راست در RTL */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <CoursePlaylist
              chapters={chapters}
              lessons={lessons}
              selectedLessonId={selectedLessonId}
              onSelectLesson={handleSelectLesson}
              courseTitle={course.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursePlayerPage;
