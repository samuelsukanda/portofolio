import type { ElementType } from "react"
import {
  SiLaravel,
  SiPhp,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiMysql,
  SiPostgresql,
  SiRedis,
  SiLinux,
  SiGit,
  SiVite,
} from "react-icons/si"
import { HardDrives } from "@phosphor-icons/react"
import type { LocaleString } from "./i18n"

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
  whatsapp: "https://wa.me/0895396829484",
  socials: [
    { label: "GitHub", url: "https://github.com/samuelsukanda" },
    { label: "LinkedIn", url: "https://www.linkedin.com/" },
  ],
}

export type NavLink = { href: string; key: "about" | "skills" | "experience" | "work" | "services" | "contact" }

export const navLinks: NavLink[] = [
  { href: "#about", key: "about" },
  { href: "#skills", key: "skills" },
  { href: "#experience", key: "experience" },
  { href: "#work", key: "work" },
  { href: "#services", key: "services" },
  { href: "#contact", key: "contact" },
]

export type Skill = {
  name: string
  icon: ElementType
  description: LocaleString
  level: number
}

export const skills: Skill[] = [
  { name: "Laravel", icon: SiLaravel, level: 90, description: { id: "API, queue, job, auth, dan arsitektur modular", en: "APIs, queues, jobs, auth, and modular architecture" } },
  { name: "React", icon: SiReact, level: 88, description: { id: "SPA, hooks, state management, dan optimasi render", en: "SPAs, hooks, state management, and render optimization" } },
  { name: "TypeScript", icon: SiTypescript, level: 82, description: { id: "Tipe aman untuk frontend dan backend", en: "Type safety for frontend and backend" } },
  { name: "Tailwind CSS", icon: SiTailwindcss, level: 90, description: { id: "Design system dan antarmuka konsisten", en: "Design systems and consistent interfaces" } },
  { name: "PHP", icon: SiPhp, level: 85, description: { id: "Fondasi utama di sisi server", en: "Core server-side foundation" } },
  { name: "MySQL", icon: SiMysql, level: 84, description: { id: "Schema design, indeks, dan query kinerja", en: "Schema design, indexes, and performant queries" } },
  { name: "PostgreSQL", icon: SiPostgresql, level: 72, description: { id: "Data relasional dan full-text search", en: "Relational data and full-text search" } },
  { name: "Redis", icon: SiRedis, level: 75, description: { id: "Cache, session, dan antrian real-time", en: "Cache, sessions, and real-time queues" } },
  { name: "TrueNAS", icon: HardDrives, level: 68, description: { id: "Manajemen penyimpanan, NAS, dan backup", en: "Storage management, NAS, and backups" } },
  { name: "Linux", icon: SiLinux, level: 80, description: { id: "Setup server, deploy, dan troubleshooting", en: "Server setup, deployment, and troubleshooting" } },
  { name: "Git", icon: SiGit, level: 86, description: { id: "Branching, review, dan kolaborasi tim", en: "Branching, review, and team collaboration" } },
  { name: "Vite", icon: SiVite, level: 80, description: { id: "Tooling build cepat untuk web modern", en: "Fast build tooling for modern web" } },
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
    period: "2025 - Sekarang",
    place: { id: "Belajar mandiri", en: "Self-taught" },
    role: { id: "Full-stack web development", en: "Full-stack web development" },
    description: {
      id: "Mendalami Laravel, React, dan TypeScript lewat dokumentasi resmi, kursus online, dan latihan membangun proyek nyata.",
      en: "Deepening Laravel, React, and TypeScript through official docs, online courses, and hands-on project practice.",
    },
    tech: ["Laravel", "React", "TypeScript"],
  },
  {
    period: "2025",
    place: { id: "Proyek pribadi", en: "Personal project" },
    role: { id: "Membangun website portofolio ini", en: "Building this portfolio website" },
    description: {
      id: "Menerapkan dasar frontend: komponen React, desain responsif, dan optimasi performa.",
      en: "Applying frontend fundamentals: React components, responsive design, and performance optimization.",
    },
    tech: ["React", "Vite", "Tailwind CSS"],
  },
  {
    period: "2024",
    place: { id: "Kursus & sertifikat", en: "Courses & certificates" },
    role: { id: "Dasar pemrograman web", en: "Web development fundamentals" },
    description: {
      id: "Mulai dari HTML, CSS, dan JavaScript, lalu melanjutkan ke PHP dan MySQL.",
      en: "Started with HTML, CSS, and JavaScript, then moved on to PHP and MySQL.",
    },
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
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
    year: "2024",
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
    year: "2023",
    description: {
      id: "Sistem tiket bantuan internal dengan SLA, penugasan otomatis, dan board kanban.",
      en: "Internal support ticketing system with SLA, auto assignment, and a kanban board.",
    },
    longDescription: {
      id: "Helpdesk menyatukan tiket support yang tadinya tersebar di email dan chat ke satu tempat dengan prioritas yang jelas.",
      en: "Helpdesk unifies support tickets that used to live scattered across email and chat into one place with clear priorities.",
    },
    challenges: {
      id: "Prioritas SLA harus naik otomatis dan tiket tidak boleh macet tanpa pemilik saat agen tidak masuk.",
      en: "SLA priority must escalate automatically and tickets must never stall without an owner when agents are away.",
    },
    solutions: {
      id: "Scheduler untuk penilaian SLA dan aturan penugasan berbasis beban kerja per agen.",
      en: "A scheduler for SLA escalation and assignment rules based on each agent's workload.",
    },
    features: [
      { id: "Ticket dengan SLA", en: "Tickets with SLA" },
      { id: "Auto assignment", en: "Auto assignment" },
      { id: "Kanban board", en: "Kanban board" },
      { id: "Knowledge base", en: "Knowledge base" },
      { id: "Laporan metrik", en: "Metrics reports" },
    ],
    stack: ["Laravel", "MySQL", "Tailwind CSS"],
    architecture: {
      id: "Modular monolith: modul tiket, tim, dan laporan terpisah tapi satu database sehingga mudah dirawat tim kecil.",
      en: "Modular monolith: ticket, team, and reporting modules are separate but share one database, easy for a small team to maintain.",
    },
    process: [
      { id: "Wawancara tim", en: "Team interviews" },
      { id: "Prototipe", en: "Prototype" },
      { id: "Development", en: "Development" },
      { id: "Iterasi", en: "Iteration" },
    ],
    github: "#",
    live: "#",
    accent: "#f97316",
    image: "/images/helpdesk.svg",
    screenshots: [
      "/images/helpdesk-1.svg",
      "/images/helpdesk-2.svg",
      "/images/helpdesk-3.svg",
    ],
  },
  {
    title: "Wedding Planner",
    year: "2022",
    description: {
      id: "Platform manajemen acara pernikahan: vendor, rundown, undangan digital, dan anggaran.",
      en: "Wedding event management platform: vendors, rundown, digital invitations, and budget.",
    },
    longDescription: {
      id: "Wedding Planner mengubah koordinasi acara yang rumit menjadi daftar tugas dan vendor yang jelas bagi pasangan.",
      en: "Wedding Planner turns complex event coordination into a clear list of tasks and vendors for the couple.",
    },
    challenges: {
      id: "Banyak pihak berbeda (pasangan, vendor, keluarga) perlu berbagi data tanpa saling menimpa.",
      en: "Many different parties (couple, vendors, family) need to share data without overwriting each other.",
    },
    solutions: {
      id: "Permission berbasis peran per acara dan sync real-time lewat WebSocket untuk daftar vendor.",
      en: "Role-based permissions per event and real-time sync via WebSocket for vendor lists.",
    },
    features: [
      { id: "Manajemen vendor", en: "Vendor management" },
      { id: "Rundown acara", en: "Event rundown" },
      { id: "Undangan digital", en: "Digital invitations" },
      { id: "Tracking anggaran", en: "Budget tracking" },
      { id: "To-do bersama", en: "Shared to-do" },
    ],
    stack: ["Laravel", "React", "MySQL", "Pusher"],
    architecture: {
      id: "API Laravel dengan SPA React. Role-based access per event dan webhook untuk integrasi pembayaran.",
      en: "Laravel API with a React SPA. Role-based access per event and webhooks for payment integration.",
    },
    process: [
      { id: "Riset pasar", en: "Market research" },
      { id: "Design sprint", en: "Design sprint" },
      { id: "Development", en: "Development" },
      { id: "Launch", en: "Launch" },
    ],
    github: "#",
    live: "#",
    accent: "#f43f5e",
    image: "/images/wedding-planner.svg",
    screenshots: [
      "/images/wedding-planner-1.svg",
      "/images/wedding-planner-2.svg",
      "/images/wedding-planner-3.svg",
    ],
  },
  {
    title: "Photo Booth",
    year: "2022",
    description: {
      id: "Aplikasi photo booth untuk event: ambil foto, pilih bingkai, cetak, dan unduh via kode unik.",
      en: "Photo booth app for events: take photos, pick a frame, print, and download via a unique code.",
    },
    longDescription: {
      id: "Photo Booth menghadirkan pengalaman foto booth di laptop biasa, lengkap dengan bingkai custom dan pengambilan via webcam.",
      en: "Photo Booth brings the photo booth experience to an ordinary laptop, complete with custom frames and webcam capture.",
    },
    challenges: {
      id: "Pengambilan foto dan proses cetak harus berjalan mulus di perangkat dengan spesifikasi pas-pasan.",
      en: "Photo capture and printing must run smoothly on devices with modest specs.",
    },
    solutions: {
      id: "Menggunakan web worker untuk kompresi gambar dan antrian cetak agar UI tidak pernah freeze.",
      en: "Used a web worker for image compression and a print queue so the UI never freezes.",
    },
    features: [
      { id: "Webcam capture", en: "Webcam capture" },
      { id: "Bingkai custom", en: "Custom frames" },
      { id: "Print langsung", en: "Direct printing" },
      { id: "Kode unik untuk unduh", en: "Unique download code" },
      { id: "Galeri event", en: "Event gallery" },
    ],
    stack: ["React", "Laravel", "MySQL", "Tailwind CSS"],
    architecture: {
      id: "Frontend React menangani capture dan komposisi bingkai di browser, backend Laravel mengelola sesi dan galeri.",
      en: "A React frontend handles capture and frame composition in the browser; a Laravel backend manages sessions and the gallery.",
    },
    process: [
      { id: "Prototipe cepat", en: "Quick prototype" },
      { id: "Uji perangkat", en: "Device testing" },
      { id: "Development", en: "Development" },
      { id: "Event test", en: "Event test" },
    ],
    github: "#",
    live: "#",
    accent: "#8b5cf6",
    image: "/images/photobooth.svg",
    screenshots: [
      "/images/photobooth-1.svg",
      "/images/photobooth-2.svg",
      "/images/photobooth-3.svg",
    ],
  },
]

export type Capability = { group: LocaleString; items: LocaleString[] }

export const capabilities: Capability[] = [
  {
    group: { id: "Backend", en: "Backend" },
    items: [
      { id: "Laravel", en: "Laravel" },
      { id: "MySQL / PostgreSQL", en: "MySQL / PostgreSQL" },
      { id: "Redis", en: "Redis" },
      { id: "Queue & Jobs", en: "Queue & Jobs" },
    ],
  },
  {
    group: { id: "Frontend", en: "Frontend" },
    items: [
      { id: "React", en: "React" },
      { id: "TypeScript", en: "TypeScript" },
      { id: "Tailwind CSS", en: "Tailwind CSS" },
      { id: "Livewire", en: "Livewire" },
    ],
  },
  {
    group: { id: "Infrastructure", en: "Infrastructure" },
    items: [
      { id: "Database", en: "Database" },
      { id: "Linux server", en: "Linux server" },
      { id: "Nginx", en: "Nginx" },
      { id: "Monitoring", en: "Monitoring" },
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

