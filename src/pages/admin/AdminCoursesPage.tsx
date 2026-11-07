import { useState } from "react";
import { Page, Course } from "../../types";
import { initialCourses } from "../../data/mockData";
function AdminCoursesPage({
  onNavigate,
  onOpenContent,
}: {
  onNavigate: (page: Page) => void;
  onOpenContent?: (id: string, title: string) => void;
}) {
  const [courseList, setCourseList] = useState<Course[]>(initialCourses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
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
      category: "",
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
      category: course.category,
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
    if (!formData.category.trim()) newErrors.category = "دسته‌بندی الزامی است";
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
                category: formData.category,
                description: formData.description,
                instructor: formData.instructor,
                image: formData.image,
                isActive: formData.isActive,
              }
            : c,
        ),
      );
    } else {
      const newId = `c-${Date.now()}`;
      setCourseList((prev) => [
        ...prev,
        {
          id: newId,
          title: formData.title,
          category: formData.category,
          description: formData.description,
          instructor: formData.instructor,
          chapters: [],
          image: formData.image,
          isActive: formData.isActive,
          rating: 0,
          students: 0,
        },
      ]);
    }
    setIsModalOpen(false);
  };

  const toggleActive = (id: string) => {
    setCourseList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c)),
    );
  };

  const handleDelete = (id: string) => {
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
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-white truncate">
                        {course.title}
                      </h3>
                      <span className="inline-block mt-1 text-xs text-purple-400 bg-purple-500/10 border border-purple-500/30 px-2 py-0.5 rounded-md">
                        {course.category}
                      </span>
                    </div>
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
                  دسته‌بندی
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  placeholder="مثال: جبر، حسابان، هندسه"
                  className={`w-full bg-gray-800/50 border ${
                    errors.category ? "border-red-500" : "border-gray-700"
                  } rounded-xl py-2.5 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500`}
                />
                {errors.category && (
                  <p className="text-red-400 text-xs mt-1">{errors.category}</p>
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

export default AdminCoursesPage;
