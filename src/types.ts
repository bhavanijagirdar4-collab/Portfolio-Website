export interface Project {
  id: string;
  title: string;
  description: string;
  extendedDescription: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  stats?: { label: string; value: string }[];
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}
