export const site = {
  name: "speakKnow",
  nameFa: "اسپیک‌نو",
  tagline: "سطح واقعی انگلیسی‌ات را همین حالا بفهم",
  description:
    "تعیین سطح رایگان انگلیسی بر اساس استاندارد CEFR، همراه با گزارش نقاط قوت و ضعف و مسیر یادگیری اختصاصی. کمتر از ۵ دقیقه، بدون نیاز به ثبت‌نام.",
  url: "https://speakknow.ir",
  phone: "۰۹۱۲ ۰۰۰ ۰۰۰۰",
  phoneHref: "tel:+989120000000",
  officePhone: "۰۲۱-۱۲۳۴۵۶۷۸",
  officePhoneHref: "tel:+9821123456782",
  email: "speakknow1@gmail.com",
  address: "آکادمی آنلاین — در سراسر ایران قابل دسترس",
  supportHours: "همه‌روزه، از ۹ صبح تا ۱۰ شب",
  instagram: "https://instagram.com/speakknow",
  telegram: "https://t.me/speakknow",
  whatsapp: "https://wa.me/989120000000",
  bale: "https://ble.ir/speakknow",
  yearsTeaching: 7,
} as const;

export const nav = [
  { href: "/", label: "خانه" },
  { href: "/about", label: "درباره ما" },
  { href: "/path", label: "دوره‌ها" },
  { href: "/blog", label: "بلاگ" },
  { href: "/contact", label: "تماس با ما" },
] as const;

export type GoalValue = "work" | "immigration" | "study" | "daily";

export const goals: { value: GoalValue; label: string; hint: string }[] = [
  { value: "work", label: "کار و محیط شغلی", hint: "جلسه، ایمیل، مذاکره" },
  { value: "immigration", label: "مهاجرت", hint: "آیلتس، مصاحبه، زندگی روزمره" },
  { value: "study", label: "تحصیل", hint: "دانشگاه، مقاله، ارائه" },
  { value: "daily", label: "مکالمه روزمره", hint: "سفر، دوستی، فیلم بدون زیرنویس" },
];

export const goalLabel = (value: string) =>
  goals.find((g) => g.value === value)?.label ?? value;

export type ContactGoalValue =
  | "immigration"
  | "study"
  | "work"
  | "daily"
  | "exam"
  | "kids"
  | "other";

export const contactGoals: { value: ContactGoalValue; label: string }[] = [
  { value: "immigration", label: "مهاجرت" },
  { value: "study", label: "تحصیل و دانشگاه" },
  { value: "work", label: "کار و مصاحبه شغلی" },
  { value: "daily", label: "مکالمه روزمره و سفر" },
  { value: "exam", label: "آزمون‌های بین‌المللی (آیلتس/تافل)" },
  { value: "kids", label: "تقویت زبان کودک/نوجوان" },
  { value: "other", label: "سایر" },
];

export const contactGoalLabel = (value: string) =>
  contactGoals.find((g) => g.value === value)?.label ?? value;

/**
 * Cumulative guided-learning hours from zero, following the ranges Cambridge
 * publishes for each CEFR level. `gap` is the hours added by that level alone.
 */
export const levels = [
  {
    code: "A1",
    fa: "مبتدی",
    cum: 95,
    hours: "۹۰ تا ۱۰۰",
    gap: "۹۰ تا ۱۰۰",
    can: "خودت را معرفی می‌کنی، خرید ساده انجام می‌دهی و جمله‌های کوتاه و آماده را می‌فهمی.",
    detail: "بهترین نقطه‌ی شروع برای کسی که تا امروز اصلاً سراغ انگلیسی نرفته.",
  },
  {
    code: "A2",
    fa: "پایه",
    cum: 190,
    hours: "۱۸۰ تا ۲۰۰",
    gap: "۹۰ تا ۱۰۰",
    can: "درباره کار، خانواده و برنامه‌های روزمره‌ات گفت‌وگوی ساده می‌کنی و متن‌های کوتاه را می‌خوانی.",
    detail: "دیگر برای جمله‌سازی مکث نمی‌کنی؛ موقعیت‌های تکراری روزمره را راحت جواب می‌دهی.",
  },
  {
    code: "B1",
    fa: "متوسط",
    cum: 375,
    hours: "۳۵۰ تا ۴۰۰",
    gap: "۱۷۰ تا ۲۰۰",
    can: "در سفر از پس موقعیت‌های پیش‌بینی‌نشده برمی‌آیی و تجربه‌ها و دلایلت را توضیح می‌دهی.",
    detail: "آماده‌ی مصاحبه‌های ساده، سفر تنها و گفت‌وگوهای غیرمنتظره‌ای.",
  },
  {
    code: "B2",
    fa: "بالا متوسط",
    cum: 550,
    hours: "۵۰۰ تا ۶۰۰",
    gap: "۱۵۰ تا ۲۰۰",
    can: "بحث تخصصی رشته‌ات را دنبال می‌کنی و بدون فشار، روان با یک انگلیسی‌زبان صحبت می‌کنی.",
    detail: "می‌توانی در جلسه‌ی کاری یا کلاس دانشگاهی، با اعتمادبه‌نفس نظرت را بگویی.",
  },
  {
    code: "C1",
    fa: "پیشرفته",
    cum: 750,
    hours: "۷۰۰ تا ۸۰۰",
    gap: "۲۰۰",
    can: "متن‌های بلند و ضمنی را می‌فهمی و انگلیسی را در محیط کاری و دانشگاهی انعطاف‌پذیر به کار می‌بری.",
    detail: "انگلیسی دیگر مانعت نیست؛ در هر محیط حرفه‌ای، روان و طبیعی صحبت می‌کنی.",
  },
] as const;
