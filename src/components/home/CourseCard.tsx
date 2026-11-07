import { Course } from "../../types";
import { StarRating } from "./StarRating";

export function CourseCard({
  course,
  onOpen,
}: {
  course: Course;
  onOpen?: (courseId: string) => void;
}) {
  return (
    <button
      onClick={() => onOpen?.(course.id)}
      className="group text-right w-full bg-gray-800/50 border border-gray-700/50 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
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
    </button>
  );
}
