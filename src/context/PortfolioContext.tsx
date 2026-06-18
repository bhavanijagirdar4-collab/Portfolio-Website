import React, { createContext, useContext, useState, useEffect } from 'react';

export interface EducationItem {
  id: string;
  degree: string;
  field?: string;
  school: string;
  period: string;
  gradeLabel: string;
  gradeValue: string;
}

export interface ResumeProject {
  id: string;
  title: string;
  period: string;
  bulletPoints: string[];
  techStack: string;
}

export interface GitHubRepoItem {
  id: string;
  username: string;
  repo: string;
  title?: string;
  period?: string;
  techStack?: string;
  description?: string;
  deployedLink?: string;
}

export interface PortfolioData {
  personalInfo: {
    name: string;
    nameShort: string;
    title: string;
    specialization: string;
    tagline: string;
    avatarUrl?: string;
    resumeUrl?: string;
    resumeFileName?: string;
    email: string;
    phone: string;
    location: string;
    graduationYear: string;
    cgpa: string;
    collegeName: string;
    university: string;
    bio: string;
    socials: {
      github: string;
      linkedin: string;
      leetcode: string;
    };
  };
  githubRepos: GitHubRepoItem[];
  skillsList: string[];
  certifications: { title: string; year: string }[];
  languages: string[];
  education: EducationItem[];
  resumeProjects: ResumeProject[];
}

export const DEFAULT_PORTFOLIO_DATA: PortfolioData = {
  personalInfo: {
    name: "Bhavani Jagirdar",
    nameShort: "Bhavani",
    title: "Full-Stack Developer",
    specialization: "Aspiring Software Engineer",
    tagline: "Turning technical concepts into reliable, production-ready web platforms.",
    avatarUrl: "",
    resumeUrl: "",
    resumeFileName: "",
    email: "bhavanijagirdar4@gmail.com",
    phone: "+91 93910 81937",
    location: "Anantapur, Andhra Pradesh, India",
    graduationYear: "2027",
    cgpa: "9.2/10",
    collegeName: "Srinivasa Ramanujan Institute of Technology",
    university: "Anantapur, Andhra Pradesh",
    bio: "Looking for an opportunity to work with an organization where I can enhance my skills, expand my knowledge, and contribute to organizational growth while achieving my full potential.",
    socials: {
      github: "https://github.com/bhavanijagirdar4-collab",
      linkedin: "https://linkedin.com",
      leetcode: "https://leetcode.com"
    }
  },
  githubRepos: [
    {
      id: "repo-1",
      username: "bhavanijagirdar4-collab",
      repo: "Leetcode-Solutions",
      title: "LeetCode Solutions Repository",
      period: "Jan 2024 - Present",
      techStack: "Java, JavaScript, Algorithm Design",
      description: "A highly organized repository containing optimal solutions to complex algorithmic problems from LeetCode. Demonstrates standard data structures, efficient runtime mechanics, and clean code principles.",
      deployedLink: ""
    },
    {
      id: "repo-2",
      username: "bhavanijagirdar4-collab",
      repo: "DocSpot",
      title: "DocSpot Booking Software",
      period: "May 2025 – July 2025",
      techStack: "React, Node.js, Express, MongoDB",
      description: "A dynamic web application hosting roles for patient login, appointment booking, admin system tracking, and direct consultation requests.",
      deployedLink: "https://docspot-portal.example.com"
    }
  ],
  skillsList: ["Java", "HTML", "CSS", "Node.js", "SQL", "Postman", "React", "MongoDB", "JavaScript"],
  certifications: [
    { title: "APSCHE – Full Stack Development (MERN)", year: "2025" },
    { title: "NPTEL – Software Project Management", year: "2025" }
  ],
  languages: ["English", "Kannada", "Telugu"],
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Technology (B.Tech)",
      field: "Computer Science & Engineering",
      school: "Srinivasa Ramanujan Institute of Technology",
      period: "2023 - 2027",
      gradeLabel: "Current CGPA",
      gradeValue: "9.11/10"
    },
    {
      id: "edu-2",
      degree: "Intermediate (Class XII)",
      school: "J.C.N.R.M Junior College, Tadipatri, Ananthapur, Andhra Pradesh",
      period: "2021 - 2023",
      gradeLabel: "Percentage",
      gradeValue: "9.85"
    },
    {
      id: "edu-3",
      degree: "Secondary School Certificate (Class X)",
      school: "St. Francis Grammar High School, Madannapet, Hyderabad, Telangana",
      period: "2020 - 2021",
      gradeLabel: "CGPA",
      gradeValue: "10"
    }
  ],
  resumeProjects: [
    {
      id: "res-1",
      title: "DocSpot – Doctor Appointment Booking System",
      period: "May 2025 – July 2025",
      bulletPoints: [
        "Built a web application for booking doctor appointments with three user roles: Admin, Doctor, and Patient.",
        "Developed features such as doctor listing, appointment booking, login/signup, and appointment management.",
        "Implemented role-based authentication and authorization for secure access.",
        "Designed MongoDB collections to store users, doctors, and appointment data.",
        "Used GitHub for version control and collaborative project management."
      ],
      techStack: "HTML, CSS, JavaScript, React, Node.js, MongoDB"
    },
    {
      id: "res-2",
      title: "College Event Handling System",
      period: "Oct 2025 – Dec 2025",
      bulletPoints: [
        "Developed a web application to manage college events and student registrations.",
        "Implemented features for event creation, participant registration, and event management.",
        "Automated the registration process to reduce manual work.",
        "Used GitHub for version control and collaborative project management."
      ],
      techStack: "HTML, CSS, JavaScript, React, Node.js, MongoDB"
    }
  ]
};

interface PortfolioContextType {
  portfolioData: PortfolioData;
  updatePortfolioData: (data: PortfolioData) => void;
  resetPortfolioData: () => void;
  isResumeOpen: boolean;
  setIsResumeOpen: (open: boolean) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'bhavani_portfolio_dynamic_data';
const DB_NAME = 'ResumeStorageDB';
const STORE_NAME = 'resumes';
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
}

function saveResumeToDB(dataUrl: string, fileName: string): Promise<void> {
  return openDB().then((db) => {
    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put({ dataUrl, fileName }, 'active_resume');
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  });
}

function getResumeFromDB(): Promise<{ dataUrl: string; fileName: string } | null> {
  return openDB().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get('active_resume');
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  });
}

function deleteResumeFromDB(): Promise<void> {
  return openDB().then((db) => {
    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete('active_resume');
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  });
}

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(DEFAULT_PORTFOLIO_DATA);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Load from local storage and IndexedDB on mount
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        let parsed: PortfolioData = stored ? JSON.parse(stored) : { ...DEFAULT_PORTFOLIO_DATA };

        // Attempt to load resume file data from IndexedDB
        try {
          const dbResume = await getResumeFromDB();
          if (dbResume) {
            parsed.personalInfo.resumeUrl = dbResume.dataUrl;
            parsed.personalInfo.resumeFileName = dbResume.fileName;
          } else {
            parsed.personalInfo.resumeUrl = "";
            parsed.personalInfo.resumeFileName = "";
          }
        } catch (dbErr) {
          console.error("Failed to load resume from IndexedDB:", dbErr);
        }

        // Backward compatibility checks
        if (parsed && parsed.personalInfo) {
          if (!parsed.githubRepos && (parsed as any).githubConfig) {
            parsed.githubRepos = [
              {
                id: 'repo-default',
                username: (parsed as any).githubConfig.username || "bhavanijagirdar4-collab",
                repo: (parsed as any).githubConfig.repo || "Leetcode-Solutions"
              }
            ];
          }
          if (!parsed.githubRepos || parsed.githubRepos.length === 0) {
            parsed.githubRepos = DEFAULT_PORTFOLIO_DATA.githubRepos;
          }
          setPortfolioData(parsed);
        }
      } catch (e) {
        console.error("Failed to load custom portfolio details:", e);
      }
    };

    loadSavedData();
  }, []);

  const updatePortfolioData = async (newData: PortfolioData) => {
    setPortfolioData(newData);

    // Save heavy raw resume file content to IndexedDB
    try {
      if (newData.personalInfo.resumeUrl) {
        await saveResumeToDB(newData.personalInfo.resumeUrl, newData.personalInfo.resumeFileName || "Resume.pdf");
      } else {
        await deleteResumeFromDB();
      }
    } catch (dbErr) {
      console.error("Failed to save resume to IndexedDB:", dbErr);
    }

    // Save lighter-weight metadata to localStorage, stripping base64 to prevent storage quotas limits
    try {
      const dataToSave = {
        ...newData,
        personalInfo: {
          ...newData.personalInfo,
          resumeUrl: "", // Strip heavy base64 value
          resumeFileName: newData.personalInfo.resumeFileName || ""
        }
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.error("Failed to update custom portfolio details in localStorage:", e);
    }
  };

  const resetPortfolioData = async () => {
    setPortfolioData(DEFAULT_PORTFOLIO_DATA);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      await deleteResumeFromDB();
    } catch (e) {
      console.error("Failed to reset portfolio details:", e);
    }
  };

  return (
    <PortfolioContext.Provider value={{ portfolioData, updatePortfolioData, resetPortfolioData, isResumeOpen, setIsResumeOpen }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
