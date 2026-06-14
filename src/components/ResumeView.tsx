import { ArrowLeft, Printer, Phone, Mail, Github, MapPin, Globe, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO, SKILLS_MATRIX, PROJECTS, CERTIFICATIONS, LANGUAGES } from '../data';

export default function ResumeView() {
  const handlePrint = () => {
    window.print();
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
      <div className="max-w-[850px] mx-auto bg-white border border-neutral-200 shadow-2xl p-8 sm:p-12 md:p-16 rounded-sm min-h-[1100px] print:shadow-none print:border-none print:p-0">
        
        {/* Name Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 uppercase">
            {PERSONAL_INFO.name}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 tracking-wide font-medium flex flex-wrap justify-center items-center gap-2">
            <span className="flex items-center gap-1">
              <MapPin size={12} className="text-neutral-500" />
              {PERSONAL_INFO.location}
            </span>
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 text-xs text-neutral-600 font-medium">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-indigo-600 transition-colors flex items-center gap-1">
              <Mail size={12} />
              {PERSONAL_INFO.email}
            </a>
            <span className="text-neutral-300 hidden sm:inline">|</span>
            <span className="flex items-center gap-1">
              <Phone size={12} />
              {PERSONAL_INFO.phone}
            </span>
            <span className="text-neutral-300 hidden sm:inline">|</span>
            <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
              <Github size={12} />
              github.com/bhavanijagirdar4-collab
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
            Looking for an opportunity to work with an organization where I can enhance my skills, expand my knowledge, and contribute to organizational growth while achieving my full potential.
          </p>
        </div>

        {/* Education Section */}
        <div className="space-y-4 mt-6">
          <h2 className="text-sm font-bold text-neutral-950 uppercase tracking-widest border-b border-neutral-800 pb-1">
            Education
          </h2>

          <div className="space-y-4">
            {/* B.Tech */}
            <div className="flex items-start justify-between text-xs">
              <div className="space-y-1">
                <h3 className="font-bold text-neutral-950">Bachelor of Computer Science and Engineering</h3>
                <p className="text-neutral-600">Srinivasa Ramanujan Institute of Technology, Anantapur.</p>
              </div>
              <div className="text-right shrink-0 font-semibold text-neutral-900">
                CGPA: 9.2 | 2027
              </div>
            </div>

            {/* Intermediate */}
            <div className="flex items-start justify-between text-xs pt-1">
              <div className="space-y-1">
                <h3 className="font-bold text-neutral-950">Intermediate (12th)</h3>
                <p className="text-neutral-600">J.C.N.R.M Junior College, Anantapur.</p>
              </div>
              <div className="text-right shrink-0 font-semibold text-neutral-900">
                98.5% | 2023
              </div>
            </div>

            {/* SSC */}
            <div className="flex items-start justify-between text-xs pt-1">
              <div className="space-y-1">
                <h3 className="font-bold text-neutral-950">SSC (10th)</h3>
                <p className="text-neutral-600">St. Francis Grammar High School, Hyderabad.</p>
              </div>
              <div className="text-right shrink-0 font-semibold text-neutral-900">
                CGPA: 10 | 2021
              </div>
            </div>
          </div>
        </div>

        {/* Technical Skills Section */}
        <div className="space-y-3 mt-6">
          <h2 className="text-sm font-bold text-neutral-950 uppercase tracking-widest border-b border-neutral-800 pb-1">
            Technical Skills
          </h2>

          <ul className="space-y-1.5 text-xs text-neutral-700">
            <li className="flex items-baseline gap-2">
              <span className="font-bold text-neutral-950 shrink-0 w-44">&#8226; Programming Languages:</span>
              <span>Java</span>
            </li>
            <li className="flex items-baseline gap-2">
              <span className="font-bold text-neutral-950 shrink-0 w-44">&#8226; Web Technologies:</span>
              <span>HTML, CSS, JavaScript, Node.js</span>
            </li>
            <li className="flex items-baseline gap-2">
              <span className="font-bold text-neutral-950 shrink-0 w-44">&#8226; Tools &amp; Platforms:</span>
              <span>Postman, VS Code</span>
            </li>
          </ul>
        </div>

        {/* Projects Section */}
        <div className="space-y-4 mt-6">
          <h2 className="text-sm font-bold text-neutral-950 uppercase tracking-widest border-b border-neutral-800 pb-1">
            Projects
          </h2>

          <div className="space-y-5">
            {/* Project 1 */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between text-xs">
                <h3 className="font-bold text-neutral-950">
                  DocSpot – Doctor Appointment Booking System
                </h3>
                <span className="font-semibold text-neutral-600">May 2025 – July 2025</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-700">
                <li>Built a web application for booking doctor appointments with three user roles: Admin, Doctor, and Patient.</li>
                <li>Developed features such as doctor listing, appointment booking, login/signup, and appointment management.</li>
                <li>Implemented role-based authentication and authorization for secure access.</li>
                <li>Designed MongoDB collections to store users, doctors, and appointment data.</li>
                <li>Used GitHub for version control and collaborative project management.</li>
              </ul>
              <div className="text-xs text-neutral-600 pl-1">
                <strong className="text-neutral-900 font-bold">Tech Stack:</strong> HTML, CSS, JavaScript, React, Node.js, MongoDB
              </div>
            </div>

            {/* Project 2 */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between text-xs">
                <h3 className="font-bold text-neutral-950">
                  College Event Handling System
                </h3>
                <span className="font-semibold text-neutral-600">Oct 2025 – Dec 2025</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-700">
                <li>Developed a web application to manage college events and student registrations.</li>
                <li>Implemented features for event creation, participant registration, and event management.</li>
                <li>Automated the registration process to reduce manual work.</li>
                <li>Used GitHub for version control and collaborative project management.</li>
              </ul>
              <div className="text-xs text-neutral-600 pl-1">
                <strong className="text-neutral-900 font-bold">Tech Stack:</strong> HTML, CSS, JavaScript, React, Node.js, MongoDB
              </div>
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="space-y-2 mt-6">
          <h2 className="text-sm font-bold text-neutral-950 uppercase tracking-widest border-b border-neutral-800 pb-1">
            Certifications
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-700">
            {CERTIFICATIONS.map((cert) => (
              <li key={cert.title}>
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
            {LANGUAGES.map((lang) => (
              <li key={lang}>{lang}</li>
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
