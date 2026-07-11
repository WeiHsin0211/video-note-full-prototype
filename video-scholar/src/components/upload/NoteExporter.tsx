import React, { useMemo } from 'react';
import MarkdownIt from 'markdown-it';
import html2pdf from 'html2pdf.js';
import 'github-markdown-css/github-markdown.css';

interface NoteProps {
  content: string;
}

const NoteExporter: React.FC<NoteProps> = ({ content }) => {
  // 🚀 修正 useMemo 結構
  const htmlContent = useMemo(() => {
    const md = new MarkdownIt();
    return md.render(content || ""); // 防止 content 為空
  }, [content]);

  const handleDownloadPDF = () => {
    const element = document.getElementById('pdf-root');
    if (!element) return;

    const opt = {
      margin: 15,
      filename: `Note_${Date.now()}.pdf`,
      image: { type: 'jpeg' as const, quality: 1.0 }, // 🚀 修正 image.type 錯誤
      html2canvas: { scale: 3, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
      pagebreak: { mode: 'avoid-all' as const }
    };
    
    html2pdf().from(element).set(opt).save();
  };

  return (
    <div className="p-4">
      <button 
        onClick={handleDownloadPDF}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        下載專業 PDF 報表
      </button>

      {/* 🚀 這是渲染畫面，確認 id 必須是 pdf-root */}
      <div 
        id="pdf-root" 
        className="markdown-body p-10 bg-white border rounded shadow-lg"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
};

export default NoteExporter;