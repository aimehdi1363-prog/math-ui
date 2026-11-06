export interface Course {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  instructor: string;
  rating: number;
  students: number;
  chapters: Chapter[];
  isActive: boolean;
}

export type AdminCourse = Course & {
  image: string;
  rating: number;
  students: number;
  isActive: boolean;
};

export interface Chapter {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  isActive: boolean;
}

export interface Lesson {
  id: string;
  chapterId: string;
  title: string;
  description: string;
  order: number;
  videoType?: "aparat" | "youtube" | "";
  videoId?: string;
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  lessonId: string;
  type: "multiple_choice" | "text";
  question: string;
  order: number;
  solutionVideoType?: "aparat" | "youtube" | "";
  solutionVideoId?: string;
  // For multiple choice
  options?: ExerciseOption[];
}

export interface ExerciseOption {
  id: string;
  text: string;
  isCorrect: boolean;
  order: number;
}

export interface Instructor {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
}

export type AdminTab = "courses" | "chapters" | "lessons" | "exercises";
