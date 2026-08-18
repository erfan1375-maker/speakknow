export type PathKey = "business" | "general" | "ielts" | "speaking";

export interface Goal {
  key: PathKey;
  label: string;
}

export const goals: Goal[] = [
  { key: "business", label: "برای کار و بیزینس" },
  { key: "general", label: "از پایه شروع کنم" },
  { key: "ielts", label: "آیلتس بگیرم" },
  { key: "speaking", label: "بهتر صحبت کنم" },
];

export interface Course {
  key: PathKey;
  title: string;
  subtitleEn: string;
  features: string[];
  levelRange: string;
  photo: string;
}

// Real stock photos (Unsplash, self-hosted in public/courses/ — verified by viewing each one).
export const courses: Course[] = [
  {
    key: "ielts",
    title: "آمادگی IELTS",
    subtitleEn: "Prepare with a clear strategy",
    features: [
      "استراتژی‌های تست و مدیریت زمان",
      "تقویت مهارت‌های چهارگانه",
      "بازخورد و ارزیابی دقیق",
      "تمرین‌های هدفمند و واقعی",
    ],
    levelRange: "B1 تا C1",
    photo: "/courses/ielts.jpg",
  },
  {
    key: "general",
    title: "انگلیسی عمومی",
    subtitleEn: "Build a stronger foundation",
    features: [
      "تقویت گرامر و دایره لغات",
      "بهبود درک مطلب و شنیداری",
      "مهارت‌های مکالمه روزمره",
      "پیشرفت همه‌جانبه و پایدار",
    ],
    levelRange: "A1 تا B2",
    photo: "/courses/general.jpg",
  },
  {
    key: "speaking",
    title: "مکالمه انگلیسی",
    subtitleEn: "Speak with confidence",
    features: [
      "صحبت روان و طبیعی",
      "افزایش اعتماد به نفس در مکالمه",
      "یادگیری عبارات کاربردی و روزمره",
      "تمرین‌های تعاملی و جذاب",
    ],
    levelRange: "A2 تا C1",
    photo: "/courses/speaking.jpg",
  },
];

export interface BookRef {
  name: string;
  note: string;
  photo?: string;
}

export interface PathContent {
  key: PathKey;
  label: string;
  intro: string;
  books: BookRef[];
  photo?: string;
}

export const pathContent: Record<PathKey, PathContent> = {
  business: {
    key: "business",
    label: "کار و بیزینس",
    intro:
      "این مسیر برای کسایی طراحی شده که برای مصاحبه شغلی بین‌المللی، مکاتبات اداری، مذاکره یا ارائه توی جلسات کاری به انگلیسی حرفه‌ای نیاز دارن.",
    books: [
      { name: "Business Result", note: "تمرکز روی موقعیت‌های واقعی محیط کار و مهارت‌های ارتباطی روزمره‌ی اداری." },
      { name: "Market Leader", note: "منبعی معتبر با محتوای به‌روز از دنیای تجارت و اقتصاد بین‌المللی." },
      { name: "English for Business Communication", note: "تمرکز ویژه روی مکاتبات رسمی، ایمیل‌نویسی و مذاکره." },
    ],
    photo: "/courses/business.jpg",
  },
  general: {
    key: "general",
    label: "انگلیسی عمومی",
    intro:
      "این مسیر برای کسایی مناسبه که می‌خوان از صفر یا از یه سطح پایه شروع کنن و پایه‌ی محکمی برای گرامر، لغات و مکالمه‌ی روزمره بسازن.",
    books: [
      {
        name: "American English File",
        note: "یکی از معتبرترین و پرکاربردترین منابع آموزش انگلیسی عمومی در دنیا، متناسب با هر سطحی از A1 تا C1.",
        photo: "/courses/book-aef.jpg",
      },
      {
        name: "Connectivity",
        note: "دوره‌ای ارتباط‌محور از ناشر Pearson، با درس‌های هدف‌گرا که مکالمه‌ی روزمره و کاربرد واقعی زبان رو در اولویت می‌ذاره.",
        photo: "/courses/book-connectivity.jpg",
      },
    ],
  },
  ielts: {
    key: "ielts",
    label: "آمادگی IELTS",
    intro:
      "این مسیر برای کسایی مناسبه که برای مهاجرت، تحصیل یا کار به یک نمره‌ی مشخص و قابل‌ارائه‌ی آیلتس نیاز دارن.",
    books: [
      { name: "Cambridge IELTS", note: "مجموعه‌ی رسمی نمونه‌سوالات با فرمت دقیقاً مشابه آزمون واقعی." },
      { name: "Barron's IELTS", note: "پوشش کامل استراتژی‌های هر بخش همراه با تمرین‌های گسترده." },
      { name: "Action Plan for IELTS", note: "مناسب برای شروع سریع و ساخت پایه‌ی استراتژی تست‌زنی." },
    ],
  },
  speaking: {
    key: "speaking",
    label: "مکالمه انگلیسی",
    intro:
      "این مسیر برای کسایی مناسبه که گرامر و لغت بلدن ولی موقع حرف‌زدن معطل می‌مونن و دنبال روانی و اعتمادبه‌نفس توی مکالمه‌ان.",
    books: [
      { name: "منابع مکالمه‌محور و تمرین‌های موقعیتی", note: "تمرکز روی گفت‌وگوی طبیعی، بی‌درنگ و کاربردهای واقعی روزمره." },
    ],
  },
};

export const pathFormatNote =
  "دوره‌ها به‌صورت خصوصی یا نیمه‌خصوصی برگزار می‌شن و می‌تونید بسته‌ی ۱۰، ۲۰ یا ۳۰ جلسه‌ای رو متناسب با هدفتون انتخاب کنید.";

export const pathBooksNote =
  "انتخاب دقیق کتاب بر اساس سطح شما، لهجه‌ی مدنظرتون (بریتیش یا آمریکن) و خواسته‌ی شخصی‌تون با استاد هماهنگ می‌شه.";

export const pathSupplementNote = "بعلاوه‌ی منابع تکمیلی که با نظر استاد تدریس خواهند شد.";

export const ieltsTypes = [
  {
    name: "Academic",
    fa: "آکادمیک",
    desc: "برای پذیرش دانشگاه‌ها و تحصیلات تکمیلی در خارج از کشور.",
  },
  {
    name: "General Training",
    fa: "جنرال",
    desc: "برای مهاجرت، اهداف کاری و شرایطی که دانشگاهی نیستن.",
  },
];

export const ieltsBands = [
  { range: "9", label: "کاربر متخصص", en: "Expert User" },
  { range: "۷ تا ۸", label: "کاربر ماهر / خیلی خوب", en: "Good / Very Good User" },
  { range: "۵ تا ۶", label: "کاربر رقابتی / متوسط", en: "Competent / Modest User" },
  { range: "۴ و کمتر", label: "کاربر محدود / مبتدی", en: "Limited User" },
];

export const ieltsSkillsNote =
  "دوره‌ی آمادگی آیلتس در اسپیک‌نو روی هر ۴ مهارت Speaking، Listening، Reading و Writing، همراه با استراتژی‌های تست‌زنی کار می‌کنه.";
