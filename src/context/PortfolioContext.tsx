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
}

export interface PortfolioData {
  personalInfo: {
    name: string;
    nameShort: string;
    title: string;
    specialization: string;
    tagline: string;
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
      description: "A highly organized repository containing optimal solutions to complex algorithmic problems from LeetCode. Demonstrates standard data structures, efficient runtime mechanics, and clean code principles."
    },
    {
      id: "repo-2",
      username: "bhavanijagirdar4-collab",
      repo: "DocSpot",
      title: "DocSpot Booking Software",
      period: "May 2025 – July 2025",
      techStack: "React, Node.js, Express, MongoDB",
      description: "A dynamic web application hosting roles for patient login, appointment booking, admin system tracking, and direct consultation requests."
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
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'bhavani_portfolio_dynamic_data';

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(DEFAULT_PORTFOLIO_DATA);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Deep-merge or check basic structure
        if (parsed && parsed.personalInfo) {
          // Backward compatibility check for transitioning from simple key to full list
          if (!parsed.githubRepos && parsed.githubConfig) {
            parsed.githubRepos = [
              {
                id: 'repo-default',
                username: parsed.githubConfig.username || "bhavanijagirdar4-collab",
                repo: parsed.githubConfig.repo || "Leetcode-Solutions"
              }
            ];
            delete parsed.githubConfig;
          }
          if (!parsed.githubRepos || parsed.githubRepos.length === 0) {
            parsed.githubRepos = DEFAULT_PORTFOLIO_DATA.githubRepos;
          }
          setPortfolioData(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load custom portfolio details:", e);
    }
  }, []);

  const updatePortfolioData = (newData: PortfolioData) => {
    setPortfolioData(newData);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error("Failed to update custom portfolio details:", e);
    }
  };

  const resetPortfolioData = () => {
    setPortfolioData(DEFAULT_PORTFOLIO_DATA);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.error("Failed to reset portfolio details:", e);
    }
  };

  return (
    <PortfolioContext.Provider value={{ portfolioData, updatePortfolioData, resetPortfolioData }}>
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
