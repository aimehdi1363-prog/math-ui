import { initialChapters, initialLessons } from "../../data/mockData";
import { AdminTab, Page, Chapter, Lesson } from "../../types";
import { useState } from "react";

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

export default AdminCourseContentPage;
