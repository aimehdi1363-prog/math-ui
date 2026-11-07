import { Course, Chapter, Lesson } from "../types";

// Course data
export const initialCourses: Course[] = [
  {
    id: "c1",
    title: "جبر پیشرفته",
    category: "جبر",
    description:
      "یادگیری معادلات، نامعادلات، توابع و مفاهیم پیشرفته جبر با مثال‌های کاربردی و تمرین‌های متنوع",
    instructor: "دکتر علی رضایی",
    chapters: [],
    image:
      "https://image.qwenlm.ai/generated-images/e3a5eb95-89d2-46f5-ac48-a4d129483343/_result.png",
    rating: 4.5,
    students: 1240,
    isActive: true,
  },
  {
    id: "c2",
    title: "حسابان (کالکولوس)",
    category: "حسابان",
    description:
      "مفاهیم حد، مشتق، انتگرال و کاربردهای آن‌ها در حل مسائل واقعی و مهندسی",
    instructor: "دکتر مریم احمدی",
    chapters: [],
    image:
      "https://image.qwenlm.ai/generated-images/1ed05e55-c1c9-401b-bbb8-1c5650ee7e9b/_result.png",
    rating: 4.8,
    students: 980,
    isActive: true,
  },
  {
    id: "c3",
    title: "هندسه تحلیلی",
    category: "هندسه",
    description:
      "بررسی اشکال هندسی، تبدیلات، مختصات و اثبات قضایا با رویکرد تحلیلی",
    instructor: "مهندس سعید کریمی",
    chapters: [],
    image:
      "https://image.qwenlm.ai/generated-images/4ccb9820-900d-4846-9075-374358a01da0/_result.png",
    rating: 4.2,
    students: 756,
    isActive: true,
  },
  {
    id: "c4",
    title: "آمار و احتمال",
    category: "آمار",
    description:
      "آموزش مفاهیم پایه و پیشرفته آمار، توزیع‌های احتمالی و تحلیل داده‌ها",
    instructor: "دکتر زهرا موسوی",
    chapters: [],
    image:
      "https://image.qwenlm.ai/generated-images/122aaf0c-5066-4559-a723-057a09d7bc0f/_result.png",
    rating: 4.6,
    students: 1105,
    isActive: true,
  },
];

export const initialChapters: Chapter[] = [
  {
    id: "ch1",
    courseId: "c1",
    title: "مقدمه‌ای بر جبر",
    description: "آشنایی با مفاهیم پایه و نمادها",
    order: 1,
    isActive: true,
    lessons: [],
  },
  {
    id: "ch2",
    courseId: "c1",
    title: "معادلات درجه اول",
    description: "حل معادلات خطی و کاربردها",
    order: 2,
    isActive: true,
    lessons: [],
  },
  {
    id: "ch3",
    courseId: "c1",
    title: "معادلات درجه دوم",
    description: "روش‌های حل و تحلیل ریشه‌ها",
    order: 3,
    isActive: false,
    lessons: [],
  },
];

export const initialLessons: Lesson[] = [
  {
    id: "l1",
    chapterId: "ch1",
    title: "معرفی نمادها",
    description: "آشنایی با نمادهای ریاضی",
    order: 1,
    videoType: "aparat",
    videoId: "abc123",
    exercises: [],
  },
  {
    id: "l2",
    chapterId: "ch1",
    title: "اعداد و مجموعه‌ها",
    description: "مجموعه اعداد طبیعی، صحیح، حقیقی",
    order: 2,
    videoType: "",
    videoId: "",
    exercises: [],
  },
];

// Course content data (for student view)
export const initialLessonsWithVideo: Lesson[] = [
  {
    id: "l1",
    chapterId: "ch1",
    title: "معرفی نمادها",
    description: "آشنایی با نمادهای ریاضی و مفهوم متغیر",
    order: 1,
    videoType: "aparat",
    videoId: "8j7y9b",
    exercises: [],
  },
  {
    id: "l2",
    chapterId: "ch1",
    title: "اعداد و مجموعه‌ها",
    description: "مجموعه اعداد طبیعی، صحیح، گویا و حقیقی",
    order: 2,
    videoType: "youtube",
    videoId: "dQw4w9WgXcQ",
    exercises: [],
  },
  {
    id: "l3",
    chapterId: "ch2",
    title: "حل معادلات خطی",
    description: "روش‌های حل معادلات درجه اول و کاربردها",
    order: 1,
    videoType: "aparat",
    videoId: "5k3m2n",
    exercises: [],
  },
  {
    id: "l4",
    chapterId: "ch2",
    title: "کاربرد معادلات",
    description: "مسائل کلامی و مدل‌سازی با معادلات",
    order: 2,
    videoType: "youtube",
    videoId: "M7lc1UVf-VE",
    exercises: [],
  },
];

// All chapters for viewing (multiple courses)
export const allChapters: Chapter[] = [
  ...initialChapters,
  {
    id: "ch4",
    courseId: "c2",
    title: "مفاهیم حد",
    description: "حد توابع و پیوستگی",
    order: 1,
    isActive: true,
    lessons: [],
  },
  {
    id: "ch5",
    courseId: "c2",
    title: "مشتق",
    description: "تعریف مشتق و قواعد مشتق‌گیری",
    order: 2,
    isActive: true,
    lessons: [],
  },
];

// Lessons for all chapters
export const allLessons: Lesson[] = [
  ...initialLessonsWithVideo,
  {
    id: "l5",
    chapterId: "ch4",
    title: "مفهوم حد",
    description: "درک شهودی حد",
    order: 1,
    videoType: "youtube",
    videoId: "riXcZT2ICjA",
    exercises: [],
  },
  {
    id: "l6",
    chapterId: "ch5",
    title: "تعریف مشتق",
    description: "مشتق به عنوان نرخ تغییر",
    order: 1,
    videoType: "aparat",
    videoId: "3x4y5z",
    exercises: [],
  },
];
