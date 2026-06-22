// ============================================================
//   PORTFOLIO DATA — Edit this file to update your portfolio
// ============================================================
//
//  HOW TO USE:
//  • ADD    → Copy an existing block, paste it, change the values
//  • DELETE → Remove the entire { ... } block for that item
//  • MODIFY → Just change the value you want to update
//
// ============================================================


// ─── YOUR PERSONAL INFO ──────────────────────────────────────
export const PERSONAL_INFO = {
  name: 'Mohammed Arshath K H',
  email: 'princearshath786@gmail.com',   // Used in the contact form & email card
  location: 'Chennai, India',
  title: 'BE Computer Science Engineering Student',
};


// ─── SKILLS ──────────────────────────────────────────────────
// category options: 'Frontend' | 'Backend' | 'Database' | 'Tools'
// level: 0 – 100 (shown as progress bar %)

export const SKILLS = [
  { name: 'Java',            category: 'Backend',  level: 90 },
  { name: 'React.js',        category: 'Frontend', level: 75 },
  { name: 'HTML5 & CSS3',    category: 'Frontend', level: 95 },
  { name: 'JavaScript',      category: 'Frontend', level: 85 },
  { name: 'Spring Boot',     category: 'Backend',  level: 50 },
  { name: 'MySQL',           category: 'Database', level: 80 },
  { name: 'Git & GitHub',    category: 'Tools',    level: 85 },
  { name: 'Tailwind CSS',    category: 'Frontend', level: 50 },

  // ── ADD A NEW SKILL ──
  // { name: 'Docker',       category: 'Tools',    level: 70 },
];


import swiggy from '../assets/proji/Swiggy_Clone.png';
import tictactoe from '../assets/proji/Tic_Tac_Toe.png';
import chatbot from '../assets/proji/Chat_Bot.jpg';

// ─── PROJECTS ────────────────────────────────────────────────
// liveUrl / githubUrl → set to '' to hide the button

export const PROJECTS = [
  {
    id: 1,
    title: 'Swiggy Clone E-commerce Platform',
    image: swiggy, // Use the imported image variable instead of a string path
    description:
      'Recreated the Swiggy food delivery interface with restaurant cards, hero banner, and responsive navigation bar Leveraged CSS Flexbox and Grid for pixel-perfect layout consistency across screen sizes',
    longDescription:
      'Recreated the Swiggy food delivery interface with restaurant cards, hero banner, and responsive navigation bar Leveraged CSS Flexbox and Grid for pixel-perfect layout consistency across screen sizes',
    technologies: ['HTML', 'CSS'],
    liveUrl: 'https://swiggy-clone-nzxi7lxq5-arshath123-techs-projects.vercel.app/',
    githubUrl: 'https://github.com/arshath123-tech/Swiggy-clone',
  },
  {
    id: 2,
    title: 'TIC-TAC-TOE Game ',
    image: tictactoe, // Use the imported image variable instead of a string path
    description:
      'Engineered a fully interactive browser-based game with win detection, draw logic, and animated transitions Structured game state using JavaScript ES6 and manipulated the DOM dynamically for real-time UI updates.',
    longDescription:
      'Engineered a fully interactive browser-based game with win detection, draw logic, and animated transitions Structured game state using JavaScript ES6 and manipulated the DOM dynamically for real-time UI updates Added reset functionality with smooth CSS animations to enhance user experience',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://arshath123-tech.github.io/tictactoe/',
    githubUrl: 'https://github.com/arshath123-tech/tictactoe',
  },
  {
    id: 3,
    title: 'Smart Health Chatbot',
    image: chatbot, // Use the imported image variable instead of a string path
    description:
      'Designed an AI-powered health chatbot using JavaScript and HTML/CSS that provides personalized health advice, symptom checking, and wellness tips through an intuitive conversational interface.',
    longDescription:
      'Designed an AI-powered health chatbot using JavaScript and HTML/CSS that provides personalized health advice, symptom checking, and wellness tips through an intuitive conversational interface.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://arshath123-tech.github.io/health_chatbot/',
    githubUrl: 'https://github.com/arshath123-tech/health_chatbot',
  },

  // ── ADD A NEW PROJECT ──
  // {
  //   id: 4,
  //   title: 'My New Project',
  //   description: 'Short description shown on the card.',
  //   longDescription: 'Full description shown in the popup modal.',
  //   technologies: ['React', 'Java'],
  //   liveUrl: 'https://...',
  //   githubUrl: 'https://github.com/...',
  // },
];


// ─── EXPERIENCE ──────────────────────────────────────────────
// type options: 'Job' | 'Internship'

export const EXPERIENCES = [
  // {
  //   id: 1,
  //   company: 'Tech Solutions Inc.',
  //   role: 'Software Developer Intern',
  //   location: 'Chennai, India',
  //   duration: 'June 2025 - Aug 2025',
  //   description: 'Assisted in building responsive frontend components in React and optimizing database queries in MySQL.',
  //   type: 'Internship',
  // }
];


// ─── EDUCATION ───────────────────────────────────────────────

export const EDUCATION = [
  
  {
    id: 1,
    institution: 'Don Bosco Matriculation Higher Secondary School',
    degree: 'SSLC (Class 10)',
    location: 'Chennai, India',
    duration: '2021-2022',
    description: '96% in SSLC (Class 10) with a strong foundation in mathematics and science. Participated in various extracurricular activities.',
  },
  {
    id: 2,
    institution: 'Don Bosco Matriculation Higher Secondary School',
    degree: 'HSE (Class 12)',
    location: 'Chennai, India',
    duration: '2023-2024',
    description: '86%  in HSE (Class 12) with a focus on biology and mathematics.',
  },
  {
    id: 3,
    institution: 'Panimalar Engineering College',
    degree: 'BE Computer Science Engineering (3rd Year)',
    location: 'Chennai, India',
    duration: '2024 - Present',
    description: 'Maintaining 8.2 CGPA with coursework in Data Structures, Algorithms, Database Management Systems, and Web Development.',
  }
];


// ─── CERTIFICATIONS ──────────────────────────────────────────
// credentialUrl: Provide a link to view or verify the certificate

export const CERTIFICATIONS = [
  {
    id: 1,
    title: 'NPTEL Certificates in Java, DSA, CN, DBMS',
    issuer: 'IIT Madrass',
    date: '2025-2026',
    credentialUrl: 'https://drive.google.com/drive/folders/1DpXp5dr9YvM-XqK2N15xIMY8AFYuNfzO?usp=sharing',
    description: 'Completed NPTEL courses in Java Programming, Data Structures & Algorithms, Computer Networks, and Database Management Systems with top grades.',
  },
  {
    id: 2,
    title: 'Web Development Certificate',
    issuer: 'Learnflu',
    date: '2025',
    credentialUrl: 'https://drive.google.com/file/d/1Dst-C3YMOb6zftmcjW3sUbrcUc2DGqzv/view?usp=sharing',
    description: 'Completed a comprehensive web development course covering HTML, CSS, JavaScript, and React.js, building multiple projects to demonstrate proficiency.',
  },
  {
    id: 3,
    title: 'Web Development Workshop Certificate',
    issuer: 'EDEN PIXEL',
    date: '2025',
    credentialUrl: 'https://drive.google.com/file/d/1WaNiVmYXxmP_1cIeLN23e0zY6r1dWfsM/view?usp=sharing',
    description: 'Completed a comprehensive web development course covering HTML, CSS, JavaScript, and React.js, building multiple projects to demonstrate proficiency.',
  }

];

