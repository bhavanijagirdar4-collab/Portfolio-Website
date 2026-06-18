import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Download, FileText, Upload, CheckCircle, AlertCircle, Eye, ZoomIn, ZoomOut
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

// Safe inline worker script url to avoid loading local script files blocked under iframe context
const PDFJS_SCRIPT_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js';
const PDFJS_WORKER_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

interface PDFPageProps {
  pdfDoc: any;
  pageNum: number;
  scale: number;
}

const PDFPage: React.FC<PDFPageProps> = ({ pdfDoc, pageNum, scale }) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [renderState, setRenderState] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    let active = true;
    let renderTask: any = null;

    async function drawPage() {
      try {
        setRenderState('loading');
        const page = await pdfDoc.getPage(pageNum);
        if (!active) return;

        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        // Maintain sharp pixel ratio on high DPI displays
        const dpr = window.devicePixelRatio || 1;
        canvas.height = viewport.height * dpr;
        canvas.width = viewport.width * dpr;
        canvas.style.height = `${viewport.height}px`;
        canvas.style.width = `${viewport.width}px`;

        context.scale(dpr, dpr);

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        renderTask = page.render(renderContext);
        await renderTask.promise;
        if (active) {
          setRenderState('success');
        }
      } catch (err) {
        console.error("Page render error:", err);
        if (active) {
          setRenderState('error');
        }
      }
    }

    drawPage();

    return () => {
      active = false;
      if (renderTask && renderTask.cancel) {
        renderTask.cancel();
      }
    };
  }, [pdfDoc, pageNum, scale]);

  return (
    <div className="relative my-4 mx-auto bg-white rounded-xl shadow-2xl overflow-hidden max-w-full flex justify-center items-center p-1 border border-white/10">
      {renderState === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/65 text-xs font-mono text-indigo-400 z-10 gap-2">
          <span className="animate-spin border-2 border-indigo-500 border-t-transparent rounded-full w-4 h-4" />
          <span>Rendering Page {pageNum}...</span>
        </div>
      )}
      <canvas ref={canvasRef} className="max-w-full h-auto" />
    </div>
  );
};

interface PDFCanvasViewerProps {
  dataUrl: string;
  scale: number;
}

const PDFCanvasViewer: React.FC<PDFCanvasViewerProps> = ({ dataUrl, scale }) => {
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorSec, setErrorSec] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadPdf() {
      try {
        setLoading(true);
        setErrorSec(null);

        let pdfjsLib = (window as any).pdfjsLib;
        if (!pdfjsLib) {
          const scriptId = 'pdfjs-lib-script';
          let script = document.getElementById(scriptId) as HTMLScriptElement;
          if (!script) {
            script = document.createElement('script');
            script.id = scriptId;
            script.src = PDFJS_SCRIPT_SRC;
            document.body.appendChild(script);
          }

          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = () => reject(new Error('Failed to download visual PDF preview engine.'));
          });

          pdfjsLib = (window as any).pdfjsLib;
        }

        if (!pdfjsLib) {
          throw new Error('PDF Engine not instantiated.');
        }

        pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_SRC;

        let uint8Array: Uint8Array;
        if (dataUrl.startsWith('data:')) {
          const arr = dataUrl.split(',');
          const bstr = atob(arr[1]);
          let n = bstr.length;
          uint8Array = new Uint8Array(n);
          while (n--) {
            uint8Array[n] = bstr.charCodeAt(n);
          }
        } else {
          const res = await fetch(dataUrl);
          const buf = await res.arrayBuffer();
          uint8Array = new Uint8Array(buf);
        }

        if (!active) return;

        const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
        const pdf = await loadingTask.promise;
        
        if (!active) return;
        setPdfDoc(pdf);
        setNumPages(pdf.numPages);
        setLoading(false);
      } catch (err: any) {
        console.error("PDF load error:", err);
        if (active) {
          setErrorSec(err.message || 'Unable to render current document format.');
          setLoading(false);
        }
      }
    }

    loadPdf();

    return () => {
      active = false;
    };
  }, [dataUrl]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-3">
        <div className="w-10 h-10 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
        <p className="text-xs font-mono text-indigo-400">Loading resume preview engine...</p>
      </div>
    );
  }

  if (errorSec) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
        <AlertCircle size={32} className="text-rose-500" />
        <p className="text-xs font-mono text-slate-400">{errorSec}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-2 custom-scrollbar bg-slate-950/80 space-y-4">
      {Array.from({ length: numPages }).map((_, idx) => (
        <PDFPage key={idx + 1} pdfDoc={pdfDoc} pageNum={idx + 1} scale={scale} />
      ))}
    </div>
  );
};

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { portfolioData, updatePortfolioData } = usePortfolio();
  const { personalInfo } = portfolioData;
  const [dragOver, setDragOver] = useState(false);
  const [isViewingFile, setIsViewingFile] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string>('');
  const [viewerScale, setViewerScale] = useState<number>(1.25);

  useEffect(() => {
    if (personalInfo.resumeUrl && personalInfo.resumeUrl.startsWith('data:')) {
      try {
        const arr = personalInfo.resumeUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1] || '';
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const blob = new Blob([u8arr], { type: mime });
        const url = URL.createObjectURL(blob);
        setBlobUrl(url);
        return () => {
          URL.revokeObjectURL(url);
        };
      } catch (e) {
        console.error("Failed to convert dataUrl to blob URL:", e);
      }
    } else if (personalInfo.resumeUrl) {
      setBlobUrl(personalInfo.resumeUrl);
    } else {
      setBlobUrl('');
    }
  }, [personalInfo.resumeUrl]);

  // Reset view state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsViewingFile(false);
    }
  }, [isOpen]);

  const handleDownload = () => {
    if (personalInfo.resumeUrl) {
      const link = document.createElement('a');
      link.href = personalInfo.resumeUrl;
      link.download = personalInfo.resumeFileName || `${personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const processFile = (file: File) => {
    if (file.size > 8 * 1024 * 1024) {
      alert("Please select a file under 8MB for optimal performance.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (typeof dataUrl === 'string') {
        updatePortfolioData({
          ...portfolioData,
          personalInfo: {
            ...personalInfo,
            resumeUrl: dataUrl,
            resumeFileName: file.name
          }
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const clearResume = () => {
    updatePortfolioData({
      ...portfolioData,
      personalInfo: {
        ...personalInfo,
        resumeUrl: "",
        resumeFileName: ""
      }
    });
  };

  if (!isOpen) return null;

  const hasUploadedResume = !!personalInfo.resumeUrl;

  return (
    <AnimatePresence>
      <div id="resume-modal-overlay" className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] z-10"
        >
          {/* Top Header */}
          <div className="flex items-center justify-between p-5 border-b border-white/10 bg-slate-900/50 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400">
                <FileText size={18} />
              </div>
              <div>
                <h2 className="text-lg font-bold font-sans text-white tracking-tight">
                  Resume
                </h2>
                <div className="text-[10px] font-medium text-slate-400">
                  {hasUploadedResume 
                    ? `Active Document: ${personalInfo.resumeFileName || "Uploaded Resume"}`
                    : "No document uploaded yet"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {hasUploadedResume && (
                <>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg active:scale-95 shrink-0"
                    title="Download original file"
                  >
                    <Download size={13} />
                    <span>Download PDF</span>
                  </button>

                  <label className="flex items-center gap-1.5 cursor-pointer bg-slate-950 hover:bg-slate-900 border border-white/10 hover:border-white/20 text-indigo-400 hover:text-indigo-300 font-mono font-bold text-[10px] uppercase px-3.5 py-1.5 rounded-xl transition-all active:scale-95 shrink-0">
                    <Upload size={12} />
                    <span>Upload New</span>
                    <input
                      id="modal-direct-resume-uploader"
                      type="file"
                      accept=".pdf,image/*,.docx,.doc"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>

                  <button
                    onClick={clearResume}
                    className="bg-slate-950 text-rose-450 hover:text-rose-400 border border-white/5 hover:border-rose-500/10 px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold uppercase transition-colors cursor-pointer shrink-0"
                  >
                    Clear Resume
                  </button>
                </>
              )}

              <button
                onClick={onClose}
                className="p-1.5 rounded-xl bg-slate-950 border border-white/5 hover:border-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Modal Content Area */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-950/45 custom-scrollbar min-h-[350px] flex flex-col">
            {hasUploadedResume ? (
              <div className="w-full flex-1 flex flex-col items-center justify-center">
                {personalInfo.resumeUrl?.startsWith('data:application/pdf') || personalInfo.resumeUrl?.includes('.pdf') ? (
                  <div className="w-full max-w-xl mx-auto flex-1 flex flex-col items-center justify-center p-6 text-center">
                    <div className="relative p-8 rounded-3xl bg-slate-900 border border-white/10 space-y-6 shadow-xl w-full">
                      {/* File Icon with subtle pulsing bg */}
                      <div className="mx-auto w-20 h-20 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400 shadow-inner">
                        <FileText size={40} className="animate-pulse" style={{ animationDuration: '4s' }} />
                      </div>

                      {/* File details */}
                      <div className="space-y-2">
                        <h3 className="text-base font-bold text-white tracking-tight break-all max-w-md mx-auto">
                          {personalInfo.resumeFileName || "Uploaded_Resume.pdf"}
                        </h3>
                        <p className="text-xs text-slate-400 font-mono">
                          Format: Adobe PDF Document
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-950/65 border border-white/5 space-y-2 text-left">
                        <div className="flex items-start gap-2.5 text-slate-400 text-xs leading-relaxed">
                          <AlertCircle size={14} className="text-indigo-400 shrink-0 mt-0.5" />
                          <span>
                            To ensure high-fidelity reading and security across devices, modern web browsers limit rendering embedded PDF objects on sandboxed web previews. Please download and view the document directly.
                          </span>
                        </div>
                      </div>

                      {/* Main View Call To Action */}
                      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                        <button
                          type="button"
                          onClick={() => setIsViewingFile(true)}
                          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg active:scale-95 duration-150"
                        >
                          <Eye size={14} />
                          <span>View PDF</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full max-w-2xl mx-auto space-y-4 text-center">
                    <div className="bg-slate-900 border border-white/10 p-3 rounded-2xl max-h-[50vh] overflow-y-auto scrollbar-thin">
                      <img
                        src={personalInfo.resumeUrl}
                        alt="Uploaded Resume Document"
                        className="max-w-full h-auto mx-auto rounded-xl shadow-md"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono">
                      Image format uploaded. Use the download button at the top to download the original file.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* Clean, elegant "Only Show Upload" empty state */
              <div className="flex-1 flex flex-col items-center justify-center p-4">
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`w-full max-w-xl p-8 sm:p-12 rounded-3xl border-2 border-dashed transition-all duration-300 text-center space-y-6 flex flex-col items-center justify-center bg-slate-900/40 ${
                    dragOver 
                      ? 'border-indigo-500 bg-indigo-500/5 shadow-2xl scale-[1.01]' 
                      : 'border-white/10 hover:border-white/20 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/15 flex items-center justify-center text-indigo-400">
                    <Upload size={30} className="animate-bounce" style={{ animationDuration: '3s' }} />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      Upload Your Professional Resume
                    </h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                      Drag and drop your PDF, Word document, or image resume file from your computer here, or select it below.
                    </p>
                  </div>

                  <div>
                    <label className="inline-flex items-center gap-2 cursor-pointer bg-indigo-600 hover:bg-indigo-550 text-white font-mono font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-lg active:scale-95">
                      <Upload size={14} />
                      <span>Select From Computer</span>
                      <input
                        id="modal-internal-resume-uploader"
                        type="file"
                        accept=".pdf,image/*,.docx,.doc"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="flex items-center gap-1.5 justify-center text-[10px] text-slate-500 font-mono bg-slate-950/60 px-3 py-1.5 rounded-lg border border-white/5">
                    <AlertCircle size={11} className="text-indigo-400" />
                    <span>Supports PDF or images up to 8MB</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Interactive In-Page Viewer Popup Overlay */}
          <AnimatePresence>
            {isViewingFile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="absolute inset-0 bg-slate-950 z-[60] flex flex-col p-4"
              >
                {/* Viewer Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 gap-3 border-b border-white/10 bg-slate-900 rounded-t-2xl">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-indigo-400" />
                    <span className="text-xs font-bold font-mono tracking-wide text-white truncate max-w-[200px] sm:max-w-xs">
                      Viewing: {personalInfo.resumeFileName || "Active Resume"}
                    </span>
                  </div>
                  
                  {/* Zoom controls and functional buttons */}
                  <div className="flex items-center flex-wrap gap-2.5">
                    {/* Only show zoom buttons for PDF documents */}
                    {(personalInfo.resumeUrl?.startsWith('data:application/pdf') || personalInfo.resumeUrl?.includes('.pdf')) && (
                      <div className="flex items-center bg-slate-950/80 border border-white/10 rounded-xl px-2 py-1.5 shadow-inner">
                        <button
                          type="button"
                          onClick={() => setViewerScale(prev => Math.max(0.75, prev - 0.15))}
                          className="text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-slate-900 cursor-pointer"
                          title="Zoom Out"
                        >
                          <ZoomOut size={13} />
                        </button>
                        <span className="text-[10px] font-mono text-slate-400 w-12 text-center select-none">
                          {Math.round(viewerScale * 100)}%
                        </span>
                        <button
                          type="button"
                          onClick={() => setViewerScale(prev => Math.min(2.25, prev + 0.15))}
                          className="text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-slate-900 cursor-pointer"
                          title="Zoom In"
                        >
                          <ZoomIn size={13} />
                        </button>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleDownload}
                      className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-550 text-white font-mono font-bold text-[10px] uppercase px-3.5 py-2.5 rounded-xl transition-all active:scale-95 shadow-md"
                      title="Download PDF Copy"
                    >
                      <Download size={12} />
                      <span>Download PDF</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsViewingFile(false)}
                      className="flex items-center gap-1 bg-slate-950 hover:bg-slate-900 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white font-mono font-bold text-[10px] uppercase px-3.5 py-2.5 rounded-xl transition-all cursor-pointer"
                      title="Back to Modal"
                    >
                      <X size={12} />
                      <span>Close</span>
                    </button>
                  </div>
                </div>

                {/* Viewer Body */}
                <div className="flex-1 bg-slate-900/40 border border-white/5 rounded-b-2xl mt-3 overflow-hidden relative flex flex-col">
                  {personalInfo.resumeUrl ? (
                    (() => {
                      const isPDF = personalInfo.resumeUrl.startsWith('data:application/pdf') || personalInfo.resumeUrl.includes('.pdf');
                      if (isPDF) {
                        return <PDFCanvasViewer dataUrl={personalInfo.resumeUrl} scale={viewerScale} />;
                      } else {
                        return (
                          <div className="flex-1 overflow-y-auto p-4 flex items-center justify-center custom-scrollbar">
                            <img
                              src={personalInfo.resumeUrl}
                              alt="Resume visual preview"
                              className="max-w-full max-h-[70vh] rounded-xl shadow-2xl border border-white/10"
                              style={{ transform: `scale(${viewerScale - 0.25})`, transformOrigin: 'center', transition: 'transform 0.2s' }}
                            />
                          </div>
                        );
                      }
                    })()
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-3">
                      <AlertCircle size={24} className="text-indigo-400 animate-pulse" />
                      <p className="text-xs text-slate-400 font-mono">
                        No active document files loaded.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
