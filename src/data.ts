import { Project, SkillCategory } from './types';

export const PERSONAL_INFO = {
  name: "Bhavani Jagirdar",
  nameShort: "Bhavani",
  title: "Full-Stack Developer",
  specialization: "Aspiring Software Engineer",
  tagline: "Turning technical concepts into reliable, production-ready web platforms.",
  email: "bhavanijagirdar4@gmail.com",
  phone: "+91 93910 81937",
  location: "Anantapur, Andhra Pradesh, India",
  graduationYear: "2027", // From Resume
  cgpa: "9.2/10", // From Resume
  collegeName: "Srinivasa Ramanujan Institute of Technology",
  university: "Anantapur, Andhra Pradesh",
  bio: "Looking for an opportunity to work with an organization where I can enhance my skills, expand my knowledge, and contribute to organizational growth while achieving my full potential.",
  socials: {
    github: "https://github.com/bhavanijagirdar4-collab",
    linkedin: "https://linkedin.com",
    leetcode: "https://leetcode.com",
    email: "mailto:bhavanijagirdar4@gmail.com"
  }
};

export const GITHUB_REPO_CONFIG = {
  username: "bhavanijagirdar4-collab",
  repo: "Leetcode-Solutions"
};

export const SKILLS_MATRIX: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: "code",
    skills: ["Java"]
  },
  {
    title: "Web Technologies",
    icon: "layers",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB", "MERN Stack"]
  },
  {
    title: "Tools & Platforms",
    icon: "book-open",
    skills: ["Postman", "VS Code", "Git", "GitHub"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Java Algorithmic Solutions",
    description: "Highly optimized implementations of complex algorithms and data structures using Java. Covers Array manipulation, HashMaps, Two-Pointers, and String processing schemas.",
    extendedDescription: "Utilizes Java's built-in memory management and collections library to construct elegant solutions optimized for runtime complexity (O(N)) and space consumption targets on the LeetCode platform.",
    tags: ["Java", "Data Structures", "Algorithms", "Optimization"],
    githubUrl: `https://github.com/${GITHUB_REPO_CONFIG.username}/${GITHUB_REPO_CONFIG.repo}`
  },
  {
    id: "proj-2",
    title: "SQL Query & Database Optimization",
    description: "Mastery of advanced relational database querying and complex database design. Features JOIN optimizations, CTE structures, subqueries, and window functions.",
    extendedDescription: "Solves intermediate-to-hard querying operations, focusing on execution plan safety, indexing techniques, partition manipulation, and standardized relational query structures.",
    tags: ["SQL", "Relational Databases", "Query Design", "Performance Tuning"],
    githubUrl: `https://github.com/${GITHUB_REPO_CONFIG.username}/${GITHUB_REPO_CONFIG.repo}`
  },
  {
    id: "proj-3",
    title: "Advanced DSA (Trees & Graphs)",
    description: "Algorithmic coverage of advanced non-linear structures. Focuses on Binary Search Trees (BST), Graph Traversals (BFS/DFS), and dynamic backtracking paradigms.",
    extendedDescription: "Employs recursive evaluation blocks and stack/queue traversal architectures to process deeply-nested logical structures efficiently without exceeding maximum execution depth limits.",
    tags: ["Java", "BFS & DFS", "Binary Trees", "Recursion & Backtracking"],
    githubUrl: `https://github.com/${GITHUB_REPO_CONFIG.username}/${GITHUB_REPO_CONFIG.repo}`
  }
];

export const CERTIFICATIONS = [
  { title: "APSCHE – Full Stack Development (MERN)", year: "2025" },
  { title: "NPTEL – Software Project Management", year: "2025" }
];

export const LANGUAGES = ["English", "Kannada", "Telugu"];

