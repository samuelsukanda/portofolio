import type { ElementType } from "react"
import {
  SiLaravel,
  SiPhp,
  SiReact,
  SiJavascript,
  SiTailwindcss,
  SiMysql,
  SiPostgresql,
  SiPython,
  SiRedis,
  SiLinux,
  SiTypescript,
  SiVite,
} from "react-icons/si"
import type { LocaleString } from "./i18n"

export type IconProps = {
  size?: number
  weight?: string
  className?: string
}

export const profile = {
  name: "Samuel Sukanda",
  initials: "SS",
  role: { id: "Web Developer", en: "Web Developer" } as LocaleString,
  tagline: {
    id: "Membangun website dan aplikasi web yang cepat dan responsif.",
    en: "Building fast and responsive websites and web apps.",
  } as LocaleString,
  location: "Subang, Indonesia",
  email: "samuelsukanda24@gmail.com",
  whatsapp: "https://wa.me/62895396829484",
  socials: [
    { label: "GitHub", url: "https://github.com/samuelsukanda" },
    { label: "LinkedIn", url: "https://www.linkedin.com/" },
  ],
}

export type NavLink = { href: string; key: "about" | "skills" | "experience" | "work" | "services" | "faq" | "contact" }

export const navLinks: NavLink[] = [
  { href: "#about", key: "about" },
  { href: "#skills", key: "skills" },
  { href: "#experience", key: "experience" },
  { href: "#work", key: "work" },
  { href: "#services", key: "services" },
  { href: "#faq", key: "faq" },
  { href: "#contact", key: "contact" },
]

export type Skill = {
  name: string
  icon: ElementType
  description: LocaleString
  level: number
}

export const skills: Skill[] = [
  { name: "Laravel", icon: SiLaravel, level: 90, description: { id: "REST API · Auth · Queue · Modular", en: "REST API · Auth · Queue · Modular" } },
  { name: "React", icon: SiReact, level: 88, description: { id: "SPA · Hooks · State · Performa", en: "SPA · Hooks · State · Performance" } },
  { name: "TypeScript", icon: SiTypescript, level: 86, description: { id: "Type Safety · API · Kode Skalabel", en: "Type Safety · API · Scalable Code" } },
  { name: "Tailwind CSS", icon: SiTailwindcss, level: 90, description: { id: "UI Responsif · Design System", en: "Responsive UI · Design System" } },
  { name: "PHP", icon: SiPhp, level: 85, description: { id: "Backend · OOP · REST API", en: "Backend · OOP · REST API" } },
  { name: "MySQL", icon: SiMysql, level: 84, description: { id: "Indexing · Optimasi Query", en: "Indexing · Query Optimization" } },
  { name: "PostgreSQL", icon: SiPostgresql, level: 72, description: { id: "DB Relasional · Optimasi Query", en: "Relational DB · Query Optimization" } },
  { name: "Python", icon: SiPython, level: 75, description: { id: "OOP · Automation · Scripting", en: "OOP · Automation · Scripting" } },
  { name: "Redis", icon: SiRedis, level: 75, description: { id: "Cache · Session · Queue", en: "Cache · Session · Queue" } },
  { name: "Linux", icon: SiLinux, level: 80, description: { id: "Server · Deployment · Troubleshooting", en: "Server · Deployment · Troubleshooting" } },
  { name: "JavaScript", icon: SiJavascript, level: 82, description: { id: "ES6+ · DOM · API · Async", en: "ES6+ · DOM · API · Async" } },
  { name: "Vite", icon: SiVite, level: 80, description: { id: "Build Tool · Development · Optimasi", en: "Build Tool · Development · Optimization" } },
]

export type Experience = {
  period: string
  place: LocaleString
  role: LocaleString
  description: LocaleString
  tech: string[]
}

export const experience: Experience[] = [
  {
    period: "2026 - Sekarang",
    place: { id: "Pengembangan Aplikasi", en: "Application Development" },
    role: { id: "Web Portofolio", en: "Portfolio Website" },
    description: {
      id: "Membangun website portofolio pribadi yang responsif dan modern untuk menampilkan proyek, keterampilan, dan pengalaman sebagai web developer.",
      en: "Built a modern, responsive personal portfolio website to showcase projects, skills, and experience as a web developer.",
    },
    tech: ["React 19", "TypeScript", "Tailwind CSS v4", "Vite 8", "GSAP"],
  },
  {
    period: "2026",
    place: { id: "Pengembangan Aplikasi", en: "Application Development" },
    role: { id: "Wedding Planner", en: "Wedding Planner" },
    description: {
      id: "Mengembangkan aplikasi Wedding Planner untuk mengelola berbagai kebutuhan pernikahan, mulai dari checklist persiapan, budget, vendor, hingga data dan agenda pernikahan.",
      en: "Developed a Wedding Planner application to manage various wedding needs, including preparation checklists, budget, vendors, and wedding data and schedules.",
    },
    tech: ["Laravel 13", "PHP 8.3", "Tailwind CSS v4", "Alpine.js", "Vite 8", "MySQL"],
  },
  {
    period: "2026",
    place: { id: "Pengembangan Aplikasi", en: "Application Development" },
    role: { id: "Virtual PhotoBooth", en: "Virtual PhotoBooth" },
    description: {
      id: "Mengembangkan aplikasi Virtual PhotoBooth untuk mengambil foto dengan webcam, memilih bingkai, hingga mengunduh hasil foto secara langsung untuk kebutuhan acara.",
      en: "Developed a Virtual PhotoBooth application for taking photos with a webcam, choosing frames, and downloading the photos directly for event needs.",
    },
    tech: ["Laravel 13", "PHP 8.5", "Tailwind CSS v4", "TypeScript", "Vite 8", "Vue 3.5", "MySQL", "FrankenPHP 1.12"],
  },
  {
    period: "2025",
    place: { id: "Pengembangan & Upgrade Sistem", en: "System Development & Upgrade" },
    role: { id: "Sigercep Laravel", en: "Sigercep Laravel" },
    description: {
      id: "Merombak Sigercep secara menyeluruh dari PHP menjadi Laravel setelah mengikuti pelatihan. Sistem dikembangkan dengan berbagai fitur baru serta struktur aplikasi yang lebih terorganisir dan mudah dikembangkan.",
      en: "Completely rebuilt Sigercep from PHP to Laravel after completing the training. The system was enhanced with new features and a more structured, maintainable architecture.",
    },
    tech: ["Laravel 12", "PHP 8.2", "Tailwind CSS v4", "Vite 6", "MySQL"],
  },
  {
    period: "2025",
    place: { id: "Kursus & Pelatihan", en: "Courses & Training" },
    role: { id: "Pelatihan Dasar Laravel", en: "Laravel Fundamentals Training" },
    description: {
      id: "Mengikuti pelatihan dasar Laravel di ID-Networkers untuk memperdalam pengembangan aplikasi web menggunakan Laravel.",
      en: "Completed Laravel fundamentals training at ID-Networkers to deepen web application development skills using Laravel.",
    },
    tech: ["Laravel", "PHP"],
  },
  {
    period: "2023",
    place: { id: "Pengembangan Aplikasi", en: "Application Development" },
    role: { id: "Sigercep", en: "Sigercep" },
    description: {
      id: "Mengembangkan aplikasi Sigercep menggunakan PHP untuk mengelola reservasi ruangan dan kendaraan di rumah sakit.",
      en: "Developed Sigercep using PHP to manage room and vehicle reservations in a hospital.",
    },
    tech: ["PHP", "MySQL"],
  },
  {
    period: "2022",
    place: { id: "Kursus & Sertifikat", en: "Courses & Certificates" },
    role: { id: "Front-End Development dengan React", en: "Front-End Development with React" },
    description: {
      id: "IDCamp x Dicoding\nMempelajari pengembangan web dan membuat aplikasi menggunakan React.",
      en: "IDCamp x Dicoding\nLearning web development and building applications using React.",
    },
    tech: ["React", "JavaScript"],
  },
  {
    period: "2022",
    place: { id: "Kursus & sertifikat", en: "Courses & certificates" },
    role: { id: "Dasar Pemrograman", en: "Development Fundamentals" },
    description: {
      id: "Python Dasar - Digital course Progate Indonesia\nPython - Digitalent Kominfo\nHTML, CSS & Javascript - Digital course Progate Indonesia\nMempelajari dasar-dasar HTML, CSS dan Javascript",
      en: "Python Basics - Digital course Progate Indonesia\nPython - Digitalent Kominfo\nHTML, CSS & Javascript - Digital course Progate Indonesia\nLearning the basics of HTML, CSS, and Javascript",
    },
    tech: ["HTML", "CSS", "JavaScript"],
  },
]

export type Project = {
  title: string
  year: string
  description: LocaleString
  longDescription: LocaleString
  challenges: LocaleString
  solutions: LocaleString
  features: LocaleString[]
  stack: string[]
  architecture: LocaleString
  process: LocaleString[]
  github: string
  live: string
  accent: string
  image: string
  screenshots: string[]
}

export const projects: Project[] = [
  {
    title: "Sigercep",
    year: "2023",
    description: {
      id: "Platform tracking paket pengiriman dengan status real-time dan laporan per cabang.",
      en: "Package tracking platform with real-time status and per-branch reports.",
    },
    longDescription: {
      id: "Sigercep dibuat untuk ekspedisi lokal yang butuh visibilitas penuh atas perjalanan paket, dari diterima sampai diantar.",
      en: "Sigercep was built for a local courier that needed full visibility over a package's journey, from pickup to delivery.",
    },
    challenges: {
      id: "Status paket harus konsisten saat banyak kurir memperbarui data secara bersamaan dari perangkat berbeda.",
      en: "Package status must stay consistent while many couriers update data simultaneously from different devices.",
    },
    solutions: {
      id: "Validasi transisi status di level database plus lock per resi untuk mencegah data race.",
      en: "Status transitions are validated at the database level with per-receipt locks to prevent data races.",
    },
    features: [
      { id: "Tracking real-time", en: "Real-time tracking" },
      { id: "Manifest per cabang", en: "Per-branch manifests" },
      { id: "Laporan harian", en: "Daily reports" },
      { id: "Notifikasi status", en: "Status notifications" },
    ],
    stack: ["Laravel", "MySQL", "Redis", "Alpine.js"],
    architecture: {
      id: "Service layer dengan event sourcing ringan untuk riwayat status, dikombinasikan cache Redis untuk daftar tracking.",
      en: "Service layer with lightweight event sourcing for status history, combined with Redis cache for tracking lists.",
    },
    process: [
      { id: "Analisis alur", en: "Flow analysis" },
      { id: "Desain database", en: "Database design" },
      { id: "Development", en: "Development" },
      { id: "Uji lapangan", en: "Field testing" },
    ],
    github: "#",
    live: "#",
    accent: "#0ea5e9",
    image: "/images/sigercep.svg",
    screenshots: [
      "/images/sigercep-1.svg",
      "/images/sigercep-2.svg",
      "/images/sigercep-3.svg",
    ],
  },
  {
    title: "Helpdesk",
    year: "2026",
    description: {
      id: "Platform untuk mengelola seluruh proses support dalam satu sistem, mulai dari pembuatan tiket, penugasan, pemantauan SLA, hingga penyelesaian tiket.",
      en: "A platform to manage the entire support process in one system, from ticket creation, assignment, SLA monitoring, to ticket resolution.",
    },
    longDescription: {
      id: "Platform untuk mengelola seluruh proses support dalam satu sistem, mulai dari pembuatan tiket, penugasan, pemantauan SLA, hingga penyelesaian tiket.",
      en: "A platform to manage the entire support process in one system, from ticket creation, assignment, SLA monitoring, to ticket resolution.",
    },
    challenges: {
      id: "Tiket support yang masuk perlu dipantau berdasarkan SLA agar tidak melewati batas waktu. Sistem juga harus memastikan tiket tetap mendapatkan penanganan meskipun agen tidak tersedia.",
      en: "Incoming support tickets need to be monitored against SLA so they don't exceed deadlines. The system must also ensure tickets still get handled even when agents are unavailable.",
    },
    solutions: {
      id: "Membangun sistem dengan SLA monitoring dan eskalasi otomatis menggunakan scheduler. Tiket yang melewati batas waktu akan mendapatkan prioritas dan eskalasi secara otomatis. Sistem juga mencatat penugasan serta first response time untuk membantu mengukur performa support.",
      en: "Built with SLA monitoring and automatic escalation using a scheduler. Tickets that exceed the deadline automatically get priority and escalation. The system also records assignments and first response time to help measure support performance.",
    },
    features: [
      { id: "Ticketing dengan SLA", en: "Ticketing with SLA" },
      { id: "Penugasan & eskalasi otomatis", en: "Auto assignment & escalation" },
      { id: "Dashboard berdasarkan role", en: "Role-based dashboard" },
      { id: "Knowledge Base", en: "Knowledge Base" },
      { id: "Laporan & export Excel/PDF", en: "Reports & Excel/PDF export" },
      { id: "Notifikasi real-time", en: "Real-time notifications" },
    ],
    stack: ["Laravel", "MySQL", "Tailwind CSS"],
    architecture: {
      id: "Menggunakan Modular Monolith dengan pemisahan modul tiket, tim, dan laporan dalam satu aplikasi dan database. Pendekatan ini menjaga struktur kode tetap terorganisir sekaligus memudahkan pengembangan dan maintenance.",
      en: "Built as a Modular Monolith with ticket, team, and reporting modules separated within a single application and database. This approach keeps the code structure organized while making development and maintenance easier.",
    },
    process: [
      { id: "Analisis kebutuhan", en: "Requirements analysis" },
      { id: "Prototyping", en: "Prototyping" },
      { id: "Development", en: "Development" },
      { id: "Testing & Iterasi", en: "Testing & iteration" },
    ],
    github: "#",
    live: "#",
    accent: "#f97316",
    image: "/images/helpdesk.png",
    screenshots: [
      "/images/helpdesk.png",
      "/images/helpdesk-1.png",
      "/images/helpdesk-2.png",
      "/images/helpdesk-3.png",
      "/images/helpdesk-4.png",
    ],
  },
  {
    title: "Wedding Planner",
    year: "2026",
    description: {
      id: "Platform perencanaan pernikahan all-in-one: tamu, undangan, anggaran, vendor, checklist, dan rundown dalam satu tempat.",
      en: "All-in-one wedding planning platform: guests, invitations, budget, vendors, checklist, and rundown in one place.",
    },
    longDescription: {
      id: "Platform perencanaan pernikahan all-in-one yang membantu pasangan mengelola seluruh persiapan pernikahan dalam satu tempat. Mulai dari daftar tamu, undangan, anggaran, vendor, checklist, hingga rundown acara — semuanya dirancang untuk membuat proses persiapan lebih terorganisir, mudah dipantau, dan lebih tenang.",
      en: "An all-in-one wedding planning platform that helps couples manage every part of wedding preparation in one place. From guest lists, invitations, budget, vendors, checklists, to the event rundown — all designed to make preparation more organized, easier to monitor, and calmer.",
    },
    challenges: {
      id: "Persiapan pernikahan melibatkan banyak keputusan dan detail yang harus dikelola secara bersamaan. Daftar tamu, vendor, pembayaran, anggaran, checklist, dan jadwal acara sering kali tersebar di berbagai spreadsheet, chat, dan catatan.\n\nKondisi tersebut membuat pasangan lebih sulit mengetahui apa yang sudah selesai, apa yang masih tertunda, dan apa yang perlu segera ditindaklanjuti.",
      en: "Wedding preparation involves many decisions and details that must be managed at once. Guest lists, vendors, payments, budgets, checklists, and event schedules are often scattered across spreadsheets, chats, and notes.\n\nThis makes it harder for couples to know what's done, what's still pending, and what needs immediate attention.",
    },
    solutions: {
      id: "Membangun satu platform terpusat yang menyatukan seluruh kebutuhan persiapan pernikahan dalam satu alur yang sederhana dan mudah dipahami.\n\nSetiap bagian saling terhubung sehingga pasangan dapat melihat gambaran keseluruhan persiapan, mulai dari mengelola tamu dan vendor hingga memastikan pembayaran, checklist, dan jadwal acara tetap terkendali.\n\nDengan pendekatan ini, proses persiapan yang sebelumnya terasa kompleks menjadi lebih terstruktur, mudah dipantau, dan lebih nyaman untuk dikelola bersama.",
      en: "Built one centralized platform that unites every part of wedding preparation in a simple, easy-to-understand flow.\n\nEvery section is connected so couples can see the full picture of their preparation, from managing guests and vendors to keeping payments, checklists, and the event schedule under control.\n\nWith this approach, what used to feel complex becomes more structured, easier to monitor, and more comfortable to manage together.",
    },
    features: [
      { id: "Dashboard untuk melihat progres keseluruhan persiapan pernikahan", en: "Dashboard to view the overall wedding preparation progress" },
      { id: "Manajemen tamu dan RSVP", en: "Guest management and RSVP" },
      { id: "Pengelolaan serta pengiriman undangan WhatsApp", en: "Manage and send WhatsApp invitations" },
      { id: "Pemantauan status undangan setiap tamu", en: "Monitor each guest's invitation status" },
      { id: "Ekspor data tamu dan pencetakan label undangan", en: "Export guest data and print invitation labels" },
      { id: "Wedding checklist dengan tenggat waktu dan prioritas", en: "Wedding checklist with deadlines and priorities" },
      { id: "Budget planner untuk mengontrol rencana dan pengeluaran", en: "Budget planner to control plans and spending" },
      { id: "Manajemen vendor dan status pemesanan", en: "Vendor management and booking status" },
      { id: "Pengelolaan kontrak dan pembayaran vendor", en: "Vendor contract and payment management" },
      { id: "Payment tracker dan pengingat pembayaran", en: "Payment tracker and payment reminders" },
      { id: "Moodboard untuk menyimpan inspirasi dan konsep pernikahan", en: "Moodboard for wedding inspiration and concepts" },
      { id: "Event rundown untuk mengatur agenda hari-H", en: "Event rundown to plan the big day agenda" },
      { id: "Gift management dan pencatatan ucapan terima kasih", en: "Gift management and thank-you note tracking" },
      { id: "Laporan dan rekapitulasi persiapan", en: "Reports and preparation summaries" },
      { id: "Admin panel untuk mengelola pengaturan pernikahan", en: "Admin panel to manage wedding settings" },
      { id: "Responsive untuk desktop, Android, dan iOS", en: "Responsive for desktop, Android, and iOS" },
    ],
    stack: ["Laravel 13", "PHP 8.3", "MySQL", "Blade Templates", "Tailwind CSS 4", "Alpine.js", "Vite"],
    architecture: {
      id: "Wedding Planner dirancang sebagai pusat kendali persiapan pernikahan, bukan sekadar tempat menyimpan catatan.\n\nDengan seluruh informasi berada dalam satu platform, pasangan dapat mengetahui progres persiapan dengan lebih jelas, menjaga pengeluaran tetap terkendali, memastikan setiap kebutuhan terencana, dan mengurangi risiko detail penting terlewat.\n\nTujuannya sederhana: membuat perjalanan menuju hari pernikahan terasa lebih terorganisir, lebih tenang, dan lebih menyenangkan.",
      en: "Wedding Planner is designed as a control center for wedding preparation, not just a place to store notes.\n\nWith all information in one platform, couples can see their preparation progress more clearly, keep spending under control, make sure every need is planned, and reduce the risk of missing important details.\n\nThe goal is simple: make the journey toward the wedding day feel more organized, calmer, and more enjoyable.",
    },
    process: [
      { id: "Analisis kebutuhan dan alur persiapan pernikahan", en: "Requirements analysis and wedding preparation flow" },
      { id: "Perancangan user flow dan pengalaman pengguna", en: "User flow and user experience design" },
      { id: "Prototyping", en: "Prototyping" },
      { id: "Development", en: "Development" },
      { id: "Testing pada berbagai perangkat", en: "Testing across devices" },
      { id: "Iterasi dan penyempurnaan", en: "Iteration and refinement" },
    ],
    github: "#",
    live: "#",
    accent: "#f43f5e",
    image: "/images/wedding-planner.png",
    screenshots: [
      "/images/wedding-planner.png",
      "/images/wedding-planner-1.png",
      "/images/wedding-planner-2.png",
      "/images/wedding-planner-3.png",
      "/images/wedding-planner-4.png",
      "/images/wedding-planner-5.png",
      "/images/wedding-planner-6.png",
      "/images/wedding-planner-7.png",
      "/images/wedding-planner-8.png",
      "/images/wedding-planner-9.png",
      "/images/wedding-planner-10.png",
      "/images/wedding-planner-11.png",
      "/images/wedding-planner-12.png",
    ],
  },
  {
    title: "Virtual Photobooth",
    year: "2026",
    description: {
      id: "Platform photobooth digital untuk mengabadikan momen acara: foto, bingkai, pesan suara, dan galeri bersama.",
      en: "Digital photobooth platform to capture event moments: photos, frames, voice messages, and a shared gallery.",
    },
    longDescription: {
      id: "Platform photobooth digital yang dirancang untuk mengabadikan momen pernikahan dan berbagai acara secara lebih interaktif. Tamu dapat mengambil foto, menambahkan bingkai khas acara, merekam pesan suara, kemudian melihat dan membagikan seluruh momen dalam satu galeri bersama.",
      en: "A digital photobooth platform designed to capture wedding and event moments more interactively. Guests can take photos, add event-specific frames, record voice messages, then view and share every moment in one shared gallery.",
    },
    challenges: {
      id: "Menciptakan pengalaman photobooth yang mudah digunakan, cepat, dan menyenangkan bagi banyak tamu dengan perangkat yang berbeda-beda. Selain foto, pengalaman juga perlu memberikan ruang bagi tamu untuk meninggalkan pesan personal sehingga setiap momen terasa lebih berkesan.",
      en: "Creating a photobooth experience that is easy to use, fast, and fun for many guests on a wide range of devices. Beyond photos, the experience also needs to give guests room to leave personal messages so every moment feels more memorable.",
    },
    solutions: {
      id: "Membangun pengalaman photobooth digital yang memungkinkan tamu mengabadikan, memberikan pesan, dan melihat kembali momen secara langsung dalam satu platform.\n\nFoto secara otomatis disesuaikan agar tetap mudah diakses dan galeri dapat menampilkan kumpulan momen tanpa membuat pengalaman pengguna terasa lambat. Seluruh proses dibuat sederhana agar tamu dapat langsung menggunakan photobooth tanpa memerlukan panduan khusus.",
      en: "Built a digital photobooth experience that lets guests capture, leave messages, and revisit moments in real time in one platform.\n\nPhotos are automatically optimized to stay easily accessible and the gallery can display collections of moments without making the user experience feel slow. The entire flow is kept simple so guests can use the photobooth right away without any special guidance.",
    },
    features: [
      { id: "Mengambil foto langsung dari kamera atau memilih foto dari galeri", en: "Take photos directly from the camera or choose from the gallery" },
      { id: "Bingkai foto yang dapat disesuaikan dengan tema acara", en: "Photo frames customizable to the event theme" },
      { id: "Rekam pesan suara hingga 30 detik", en: "Record voice messages up to 30 seconds" },
      { id: "Galeri bersama untuk seluruh tamu", en: "Shared gallery for all guests" },
      { id: "Tampilan foto dalam resolusi tinggi", en: "High-resolution photo display" },
      { id: "Download dan berbagi foto", en: "Download and share photos" },
      { id: "Pemutar pesan suara dari tamu", en: "Voice message player from guests" },
      { id: "Galeri yang diperbarui secara langsung", en: "Gallery updated in real time" },
      { id: "Responsive untuk desktop, Android, dan iOS", en: "Responsive for desktop, Android, and iOS" },
      { id: "Akses melalui domain publik dengan HTTPS", en: "Access via a public domain with HTTPS" },
    ],
    stack: ["Vue 3 + TypeScript", "Laravel", "MySQL", "Tailwind CSS"],
    architecture: {
      id: "Photobooth tidak hanya menjadi tempat mengambil foto, tetapi menjadi digital guest experience yang menggabungkan foto dan pesan personal dalam satu galeri kenangan.\n\nSetiap tamu dapat meninggalkan sesuatu yang dapat dilihat kembali setelah acara selesai, menjadikan momen pernikahan atau event terasa lebih personal dan berkesan.",
      en: "The photobooth is not just a place to take photos, but a digital guest experience that combines photos and personal messages in one memory gallery.\n\nEvery guest can leave something to look back on after the event ends, making wedding or event moments feel more personal and memorable.",
    },
    process: [
      { id: "Analisis kebutuhan dan alur pengalaman tamu", en: "Requirements analysis and guest experience flow" },
      { id: "Perancangan user flow dan tampilan", en: "User flow and interface design" },
      { id: "Prototyping", en: "Prototyping" },
      { id: "Development", en: "Development" },
      { id: "Testing pada berbagai perangkat", en: "Testing across devices" },
      { id: "Iterasi dan optimasi", en: "Iteration and optimization" },
    ],
    github: "#",
    live: "#",
    accent: "#8b5cf6",
    image: "/images/photobooth-1.png",
    screenshots: [
      "/images/photobooth-1.png",
      "/images/photobooth-2.png",
      "/images/photobooth-3.png",
    ],
  },
]

export type Capability = { group: LocaleString; items: LocaleString[] }

export const capabilities: Capability[] = [
  {
    group: { id: "Backend", en: "Backend" },
    items: [
      { id: "Laravel", en: "Laravel" },
      { id: "MySQL", en: "MySQL" },
      { id: "Redis", en: "Redis" },
      { id: "REST API", en: "REST API" },
    ],
  },
  {
    group: { id: "Frontend", en: "Frontend" },
    items: [
      { id: "React", en: "React" },
      { id: "Tailwind CSS", en: "Tailwind CSS" },
      { id: "Blade", en: "Blade" },
      { id: "Vite", en: "Vite" },
    ],
  },
  {
    group: { id: "Tools & Deployment", en: "Tools & Deployment" },
    items: [
      { id: "Linux", en: "Linux" },
      { id: "Nginx", en: "Nginx" },
      { id: "Git & GitHub", en: "Git & GitHub" },
      { id: "CI/CD", en: "CI/CD" },
    ],
  },
]

export type Service = {
  title: LocaleString
  description: LocaleString
  features: LocaleString[]
  icon: string
}

export const services: Service[] = [
  {
    title: { id: "Web Development", en: "Web Development" },
    description: {
      id: "Membangun website dan aplikasi web yang modern, responsif, dan mudah dikembangkan.",
      en: "Building modern, responsive, and maintainable websites and web apps.",
    },
    features: [
      { id: "Website Company Profile", en: "Company Profile Website" },
      { id: "Landing Page", en: "Landing Page" },
      { id: "Dashboard Admin", en: "Admin Dashboard" },
      { id: "Sistem Autentikasi & Hak Akses", en: "Authentication & Role-Based Access" },
    ],
    icon: "code",
  },
  {
    title: { id: "Backend Development", en: "Backend Development" },
    description: {
      id: "Mengembangkan backend yang aman, cepat, dan siap mendukung kebutuhan aplikasi.",
      en: "Developing secure, fast backends ready to support your application needs.",
    },
    features: [
      { id: "REST API", en: "REST API" },
      { id: "Integrasi Database", en: "Database Integration" },
      { id: "Authentication & Authorization", en: "Authentication & Authorization" },
      { id: "Queue & Scheduled Jobs", en: "Queue & Scheduled Jobs" },
    ],
    icon: "server",
  },
  {
    title: { id: "Frontend Development", en: "Frontend Development" },
    description: {
      id: "Mewujudkan desain menjadi antarmuka yang responsif, interaktif, dan optimal di berbagai perangkat.",
      en: "Turning designs into responsive, interactive interfaces that work well across devices.",
    },
    features: [
      { id: "React & Tailwind CSS", en: "React & Tailwind CSS" },
      { id: "Responsive Design", en: "Responsive Design" },
      { id: "Dark Mode", en: "Dark Mode" },
      { id: "API Integration", en: "API Integration" },
    ],
    icon: "palette",
  },
  {
    title: { id: "Maintenance & Optimization", en: "Maintenance & Optimization" },
    description: {
      id: "Menjaga aplikasi tetap stabil, aman, dan memiliki performa yang optimal.",
      en: "Keeping your application stable, secure, and performing at its best.",
    },
    features: [
      { id: "Bug Fixing", en: "Bug Fixing" },
      { id: "Performance Optimization", en: "Performance Optimization" },
      { id: "Security Updates", en: "Security Updates" },
      { id: "Feature Enhancement", en: "Feature Enhancement" },
    ],
    icon: "wrench",
  },
]

export type Testimonial = {
  name: string
  position: LocaleString
  company: string
  rating: number
  review: LocaleString
}

export const testimonials: Testimonial[] = [
  {
    name: "Dewi Lestari",
    position: { id: "Project Manager", en: "Project Manager" },
    company: "PT Teknologi Nusantara",
    rating: 5,
    review: {
      id: "Raka konsisten deliver tepat waktu dan komunikasinya jelas. Sistem yang dibangun tetap stabil sampai sekarang.",
      en: "Raka consistently delivers on time with clear communication. The system he built is still stable today.",
    },
  },
  {
    name: "Budi Santoso",
    position: { id: "Founder", en: "Founder" },
    company: "Sigercep",
    rating: 5,
    review: {
      id: "Dia menjelaskan pilihan teknis dengan bahasa sederhana dan hasilnya melebihi ekspektasi kami.",
      en: "He explains technical choices in plain language and the result exceeded our expectations.",
    },
  },
  {
    name: "Maya Anggraini",
    position: { id: "Owner", en: "Owner" },
    company: "Wedding Planner",
    rating: 5,
    review: {
      id: "Platform-nya langsung dipakai klien tanpa pelatihan panjang. Proses pengerjaannya juga sangat terstruktur.",
      en: "Clients used the platform right away without lengthy training. The process was also very structured.",
    },
  },
]

export type Faq = { q: LocaleString; a: LocaleString }

export const faqs: Faq[] = [
  {
    q: { id: "Bisa bekerja sama untuk proyek baru?", en: "Are you available for projects?" },
    a: {
      id: "Tentu. Saya terbuka untuk berbagai kebutuhan pengembangan website dan aplikasi web. Silakan hubungi saya untuk berdiskusi.",
      en: "Yes, I'm open to freelance, remote, and on-site projects. Reach out via email or WhatsApp to discuss your needs.",
    },
  },
  {
    q: { id: "Teknologi apa yang Anda gunakan?", en: "What technologies do you use?" },
    a: {
      id: "Saya menggunakan Laravel dan PHP untuk backend, React dan JavaScript untuk frontend, serta MySQL, PostgreSQL, Redis, Docker, dan Linux untuk mendukung pengembangan dan deployment.",
      en: "I focus on Laravel for the backend and React, TypeScript, and Tailwind CSS for the frontend, backed by MySQL, PostgreSQL, Redis, and Linux for infrastructure.",
    },
  },
  {
    q: { id: "Berapa lama proses pengerjaan website?", en: "How long does building a website take?" },
    a: {
      id: "Waktu pengerjaan menyesuaikan kebutuhan dan kompleksitas fitur. Website sederhana dapat selesai dalam beberapa minggu, sementara aplikasi web membutuhkan waktu lebih lama.",
      en: "It depends on scope. Landing pages or company profiles usually take 1–2 weeks, while web apps with complex features can take 4–8 weeks or more.",
    },
  },
  {
    q: { id: "Apakah tersedia layanan maintenance?", en: "Do you offer maintenance services?" },
    a: {
      id: "Ya, saya dapat membantu perbaikan bug, optimasi performa, pembaruan sistem, serta pengembangan fitur untuk menjaga aplikasi tetap optimal.",
      en: "Yes. I provide bug fixes, security updates, performance optimization, and feature enhancements to keep your app stable.",
    },
  },
]

