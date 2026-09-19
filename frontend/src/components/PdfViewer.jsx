import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PdfViewer = ({ pdfUrl, closePdf }) => {
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 2));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5));
  };

  const resetZoom = () => {
    setScale(1);
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-zinc-900">
      
      {/* Zoom Controls */}
      <div className="absolute right-4 top-4 z-10 flex items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-800/90 p-1 shadow-lg backdrop-blur">
        <button
          onClick={zoomOut}
          disabled={scale <= 0.5}
          className="flex h-8 w-8 items-center justify-center rounded-md text-lg text-zinc-200 transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          −
        </button>

        <button
          onClick={resetZoom}
          className="min-w-14 rounded-md px-2 py-1 text-sm text-zinc-300 transition hover:bg-zinc-700"
        >
          {Math.round(scale * 100)}%
        </button>

        <button
          onClick={zoomIn}
          disabled={scale >= 2}
          className="flex h-8 w-8 items-center justify-center rounded-md text-lg text-zinc-200 transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          +
        </button>

         <button
            onClick={closePdf}
            className="ml-1 flex h-8 w-8 items-center justify-center rounded-md text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
            aria-label="Close PDF">
            ×
          </button>
      </div>

      {/* PDF */}
      <div className="pdf-scrollbar h-full w-full overflow-auto">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          className="flex min-w-max flex-col items-center gap-4 py-6"
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={600}
              scale={scale}
            />
          ))}
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;
