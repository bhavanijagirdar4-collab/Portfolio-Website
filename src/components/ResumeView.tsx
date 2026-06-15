import { ArrowLeft, Printer, Phone, Mail, Github, MapPin } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function ResumeView() {
  const handlePrint = () => {
    window.print();
  };

  const { portfolioData } = usePortfolio();
  const { personalInfo, skillsList, certifications, languages, education, resumeProjects } = portfolioData;

  // Helper to get raw domain label from github URL
  const cleanGitHubUrl = (url: string) => {
    return url.replace(/^https?:\/\/(www\.)?/, '');
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-800 font-sans py-8 px-4 sm:px-6 md:py-12 print:bg-white print:p-0 print:text-black">
      {/* Floating Control Hub Bar */}
      <div className="max-w-[850px] mx-auto mb-6 flex items-center justify-between gap-4 print:hidden bg-slate-950 border border-white/10 p-4 rounded-xl shadow-xl">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.location.hash = '';
          }}
          className="flex items-center gap-2 text-slate-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all"
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </a>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-indigo-600/10"
          >
            <Printer size={14} />
            Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Main A4 Styled Sheet */}
      <div className="max-w-[850px] mx-auto bg-white border border-neutral-200 shadow-2xl p-8 sm:p-12 md:p-16 rounded-sm min-h-[1100px] print:shadow-none print:border-none print:p-0 text-left">
        
        {/* Name Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 uppercase">
            {personalInfo.name}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 tracking-wide font-medium flex flex-wrap justify-center items-center gap-2">
            <span className="flex items-center gap-1">
              <MapPin size={12} className="text-neutral-500" />
              {personalInfo.location}
            </span>
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 text-xs text-neutral-600 font-medium">
            <a href={`mailto:${personalInfo.email}`} className="hover:text-indigo-600 transition-colors flex items-center gap-1">
              <Mail size={12} />
              {personalInfo.email}
            </a>
            <span className="text-neutral-300 hidden sm:inline">|</span>
            <span className="flex items-center gap-1">
              <Phone size={12} />
              {personalInfo.phone}
            </span>
            <span className="text-neutral-300 hidden sm:inline">|</span>
            <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
              <Github size={12} />
              {cleanGitHubUrl(personalInfo.socials.github)}
            </a>
          </div>
        </div>

        {/* Section divider utility */}
        <hr className="my-6 border-neutral-300" />

        {/* Career Objective Section */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-neutral-950 uppercase tracking-widest border-b border-neutral-800 pb-1 flex items-center justify-between">
            <span>Career Objective</span>
          </h2>
          <p className="text-xs text-neutral-700 leading-relaxed text-justify">
            {personalInfo.bio}
          </p>
        </div>

        {/* Education Section */}
        <div className="space-y-4 mt-6">
          <h2 className="text-sm font-bold text-neutral-950 uppercase tracking-widest border-b border-neutral-800 pb-1">
            Education
          </h2>

          <div className="space-y-4">
            {education.map((item) => (
              <div key={item.id} className="flex items-start justify-between text-xs pt-1">
                <div className="space-y-1">
                  <h3 className="font-bold text-neutral-950">{item.degree} {item.field && `(${item.field})`}</h3>
                  <p className="text-neutral-600">{item.school}</p>
                </div>
                <div className="text-right shrink-0 font-semibold text-neutral-900">
                  {item.gradeLabel}: {item.gradeValue} | {item.period}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills Section */}
        <div className="space-y-3 mt-6">
          <h2 className="text-sm font-bold text-neutral-950 uppercase tracking-widest border-b border-neutral-800 pb-1">
            Technical Skills
          </h2>

          <div className="text-xs text-neutral-700 leading-relaxed flex items-baseline gap-1.5">
            <span className="font-bold text-neutral-900 shrink-0 w-36">&#8226; Skills &amp; Competencies:</span>
            <span>{skillsList.join(', ')}</span>
          </div>
        </div>

        {/* Projects Section */}
        <div className="space-y-4 mt-6">
          <h2 className="text-sm font-bold text-neutral-950 uppercase tracking-widest border-b border-neutral-800 pb-1">
            Projects
          </h2>

          <div className="space-y-5">
            {resumeProjects.map((proj) => (
              <div key={proj.id} className="space-y-2">
                <div className="flex flex-wrap items-center justify-between text-xs">
                  <h3 className="font-bold text-neutral-950">
                    {proj.title}
                  </h3>
                  <span className="font-semibold text-neutral-600">{proj.period}</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-700">
                  {proj.bulletPoints.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
                <div className="text-xs text-neutral-600 pl-1">
                  <strong className="text-neutral-900 font-bold">Tech Stack:</strong> {proj.techStack}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="space-y-2 mt-6">
          <h2 className="text-sm font-bold text-neutral-950 uppercase tracking-widest border-b border-neutral-800 pb-1">
            Certifications
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-700">
            {certifications.map((cert, idx) => (
              <li key={idx}>
                <span className="font-semibold text-neutral-900">{cert.title}</span> | {cert.year}
              </li>
            ))}
          </ul>
        </div>

        {/* Languages Section */}
        <div className="space-y-2 mt-6">
          <h2 className="text-sm font-bold text-neutral-950 uppercase tracking-widest border-b border-neutral-800 pb-1">
            Languages
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-700">
            {languages.map((lang, idx) => (
              <li key={idx}>{lang}</li>
            ))}
          </ul>
        </div>

      </div>

      {/* Aesthetic footer for print download layout info */}
      <p className="text-center text-[10px] text-slate-500 font-mono mt-8 print:hidden select-none">
        Printed view conforms exactly to industry-standard A4 placement metrics &bull; Optimized for automated ATS parsers
      </p>
    </div>
  );
}
