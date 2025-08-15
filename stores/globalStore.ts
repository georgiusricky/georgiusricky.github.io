import { create } from 'zustand'

interface Socials {
  wa: string
  email: string
  github: string
  linkedin: string
  codewars: string
  hackerrank: string
}

interface Skill {
  icon: string
  name: string
}

interface Experience {
  company: string
  logo: string
  title: string
  period: {
    start: string
    end: string
  }
  description: string
}

interface Project {
  id: string
  title: string
  description: string
  fullDescription: string
  technologies: string[]
  preview: string
  assets: string[]
  githubLink: string
  demoLink: string
  liveLink: string
}

interface GlobalState {
  socials: Socials
  skills: Skill[]
  experiences: Experience[]
  projects: Project[]
  setSocials: (socials: Partial<Socials>) => void
  setSkills: (skills: Skill[]) => void
  setExperiences: (experiences: Experience[]) => void
  setProjects: (projects: Project[]) => void
}

export const useGlobalStore = create<GlobalState>((set) => ({
  socials: {
    wa: '6282177752911',
    email: 'ricky.georgius@gmail.com',
    github: 'https://github.com/georgiusricky',
    linkedin: 'https://www.linkedin.com/in/georgius-ricky/',
    codewars: 'https://www.codewars.com/users/georgiusricky',
    hackerrank: 'https://www.hackerrank.com/profile/georgiusricky',
  },
  skills: [
    { icon: '/img/svg/html.svg', name: 'HTML' },
    { icon: '/img/svg/css.svg', name: 'CSS' },
    { icon: '/img/svg/javascript.svg', name: 'Javascript' },
    { icon: '/img/svg/typescript.svg', name: 'TypeScript' },
    { icon: '/img/svg/github.svg', name: 'Github' },
    { icon: '/img/svg/gitlab.svg', name: 'Gitlab' },
    { icon: '/img/svg/bitbucket.svg', name: 'Bitbucket' },
    { icon: '/img/svg/nodejs.svg', name: 'NodeJs' },
    { icon: '/img/svg/mysql.svg', name: 'MySql' },
    { icon: '/img/svg/vue.svg', name: 'Vue' },
    { icon: '/img/svg/nuxtjs.svg', name: 'Nuxt' },
    { icon: '/img/svg/react.svg', name: 'React' },
    { icon: '/img/svg/nextjs.svg', name: 'Next' },
    { icon: '/img/svg/angular.svg', name: 'Angular' },
    { icon: '/img/svg/svelte.svg', name: 'Svelte' },
    { icon: '/img/svg/bootstrap.svg', name: 'Bootstrap' },
    { icon: '/img/svg/tailwind.svg', name: 'Tailwind' },
    { icon: '/img/svg/socketio.svg', name: 'Socket.io' },
    { icon: '/img/svg/java.svg', name: 'Java' },
    { icon: '/img/svg/python.svg', name: 'Python' },
    { icon: '/img/svg/cpp.svg', name: 'C++' },
    { icon: '/img/svg/hourglass.svg', name: 'etc' },
  ],
  experiences: [
    {
      company: 'Indodax Nasional Indonesia',
      logo: '/img/svg/indodax.svg',
      title: 'Frontend Software Engineer',
      period: { start: 'Oct 2023', end: 'Jun 2025' },
      description:
        'Manage the frontend web of projects using Vue.js, Nuxt, and CodeIgniter. Integrate frontend applications with backend APIs, work closely with the UI/UX team to implement designs, and convert Figma designs into responsive websites.',
    },
    {
      company: 'BPJS Ketenagakerjaan',
      logo: '/img/svg/bpjstk.svg',
      title: 'Fullstack Engineer',
      period: { start: 'Oct 2022', end: 'Oct 2023' },
      description:
        'Handled backend development using Express.js and frontend development with Vue.js, React.js, and PHP. Conducted User Acceptance Testing (UAT) and fixed issues identified during testing and penetration testing. Worked on both internal core applications and external applications for BPJS.',
    },
    {
      company: 'Citra Cantik Nusantara (Beautybell)',
      logo: '/img/svg/beautybell.svg',
      title: 'Frontend Engineer',
      period: { start: 'Dec 2021', end: 'Jul 2022' },
      description:
        'Installed and set up web projects, developed dashboards using Vue.js (Nuxt.js) and AngularJS, and created website apps based on Figma designs. Integrated frontend applications with backend APIs for seamless functionality.',
    },
    {
      company: 'Edconnect Solusi Integrasi',
      logo: '/img/svg/edconnect.svg',
      title: 'Software Engineer - Fullstack',
      period: { start: 'Sept 2019', end: 'Nov 2022' },
      description:
        'Developed and maintained school management systems, designed databases using MySQL, and debugged and deployed applications. Created responsive websites with Vue.js and conducted research on new web technologies to recommend design and development improvements.',
    },
  ],
  projects: [
    {
      id: "01",
      title: "Gambajak Website",
      description:
        "A real-time cryptocurrency tracking application that helps users monitor market trends and set price alerts for their favorite coins.",
      fullDescription:
        "This comprehensive cryptocurrency tracking platform provides real-time market data, price alerts, and advanced charting capabilities. Built with modern web technologies, it offers a seamless user experience for crypto enthusiasts and traders.",
      technologies: ["Next.js", "TypeScript", "TailwindCSS"],
      preview: "/projects/gambajak/gambajak.webp",
      assets: [
        "/projects/gambajak/preload.webm",
        "/projects/gambajak/1.webp",
        "/projects/gambajak/2.webp",
        "/projects/gambajak/3.webp"
      ],
      githubLink: "",
      demoLink: "https://gambajak.vercel.app",
      liveLink: "https://gambajak.com"
    },
    {
      id: "02",
      title: "Gachavista Website",
      description:
        "A real-time cryptocurrency tracking application that helps users monitor market trends and set price alerts for their favorite coins.",
      fullDescription:
        "This comprehensive cryptocurrency tracking platform provides real-time market data, price alerts, and advanced charting capabilities. Built with modern web technologies, it offers a seamless user experience for crypto enthusiasts and traders.",
      technologies: ["Next.js", "TypeScript", "TailwindCSS"],
      preview: "/projects/gacha/gacha.webp",
      assets: [
        "/projects/gacha/demo.webm",
        "/projects/gacha/1.webp",
        "/projects/gacha/2.webp",
        "/projects/gacha/3.webp"
      ],
      githubLink: "",
      demoLink: "https://gambajak.vercel.app",
      liveLink: "https://gambajak.com"
    },
    {
      id: "03",
      title: "Zuuonsol Website",
      description:
        "A real-time cryptocurrency tracking application that helps users monitor market trends and set price alerts for their favorite coins.",
      fullDescription:
        "This comprehensive cryptocurrency tracking platform provides real-time market data, price alerts, and advanced charting capabilities. Built with modern web technologies, it offers a seamless user experience for crypto enthusiasts and traders.",
      technologies: ["Nuxt.js", "Javascript", "TailwindCSS"],
      preview: "/projects/zuuonsol/zuuonsol.webp",
      assets: ["/projects/zuuonsol/1.webp", "/projects/zuuonsol/2.webp"],
      githubLink: "",
      demoLink: "https://zuuonsol.vercel.app",
      liveLink: "https://zuuonsol.com"
    },
    {
      id: "04",
      title: "Calt Supremacy Website",
      description:
        "A real-time cryptocurrency tracking application that helps users monitor market trends and set price alerts for their favorite coins.",
      fullDescription:
        "This comprehensive cryptocurrency tracking platform provides real-time market data, price alerts, and advanced charting capabilities. Built with modern web technologies, it offers a seamless user experience for crypto enthusiasts and traders.",
      technologies: ["Next.js", "TypeScript", "TailwindCSS"],
      preview: "/projects/calt/calt.webp",
      assets: ["/projects/calt/1.webp", "/projects/calt/2.webp"],
      githubLink: "",
      demoLink: "https://caltsupremacy.vercel.app",
      liveLink: "https://caltsupremacy.com/"
    },
    {
      id: "05",
      title: "Mewlord Website",
      description:
        "A real-time cryptocurrency tracking application that helps users monitor market trends and set price alerts for their favorite coins.",
      fullDescription:
        "This comprehensive cryptocurrency tracking platform provides real-time market data, price alerts, and advanced charting capabilities. Built with modern web technologies, it offers a seamless user experience for crypto enthusiasts and traders.",
      technologies: ["Next.js", "TypeScript", "TailwindCSS"],
      preview: "/projects/mewlord/mewlord.webp",
      assets: ["/projects/mewlord/1.webp"],
      githubLink: "",
      demoLink: "https://mewlord.vercel.app",
      liveLink: "https://mewlord.fun"
    },
    {
      id: "06",
      title: "Bun Website",
      description:
        "A real-time cryptocurrency tracking application that helps users monitor market trends and set price alerts for their favorite coins.",
      fullDescription:
        "This comprehensive cryptocurrency tracking platform provides real-time market data, price alerts, and advanced charting capabilities. Built with modern web technologies, it offers a seamless user experience for crypto enthusiasts and traders.",
      technologies: ["Next.js", "TypeScript", "TailwindCSS"],
      preview: "/projects/bun/bun.webp",
      assets: [
        "/projects/bun/1.webp",
        "/projects/bun/2.webp",
        "/projects/bun/3.webp"
      ],
      githubLink: "",
      demoLink: "",
      liveLink: "https://bun.meme"
    },
    {
      id: "07",
      title: "Rosiensta Website",
      description:
        "A real-time cryptocurrency tracking application that helps users monitor market trends and set price alerts for their favorite coins.",
      fullDescription:
        "This comprehensive cryptocurrency tracking platform provides real-time market data, price alerts, and advanced charting capabilities. Built with modern web technologies, it offers a seamless user experience for crypto enthusiasts and traders.",
      technologies: ["Nuxt.js", "Javascript", "TailwindCSS"],
      preview: "/projects/rosiensta/rosiensta.webp",
      assets: ["/projects/rosiensta/1.webp", "/projects/rosiensta/2.webp"],
      githubLink: "",
      demoLink: "https://rosieoninsta.vercel.app",
      liveLink: "https://rosieoninsta.com/"
    }
  ],

  // setters
  setSocials: (socials) =>
    set((state) => ({ socials: { ...state.socials, ...socials } })),
  setSkills: (skills) => set(() => ({ skills })),
  setExperiences: (experiences) => set(() => ({ experiences })),
  setProjects: (projects) => set(() => ({ projects })),
}))
