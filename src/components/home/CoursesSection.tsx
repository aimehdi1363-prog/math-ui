import { initialCourses } from "../../data/mockData";
import { CourseCard } from "./CourseCard";

export function CoursesSection({
  onOpenCourse,
}: {
  onOpenCourse: (courseId: string) => void;
}) {
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
        {initialCourses.map((course) => (
          <CourseCard key={course.id} course={course} onOpen={onOpenCourse} />
        ))}
      </div>
    </section>
  );
}
