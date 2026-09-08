import {useDocumentStore} from "../../store/useDocumentStore";
import { useRef } from "react";


const UploadDocument = () => {
    const fileInputRef = useRef(null);

    const { uploadDocument, isUploading } = useDocumentStore();

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            uploadDocument(file);
        }
    };
  return (
    <div className="px-3 pb-3 shrink-0">
        {isUploading && (
    <div className="fixed inset-0 z-50 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-zinc-800 overflow-hidden">
            <div className="h-full w-1/3 bg-zinc-200 animate-[progress_1.2s_ease-in-out_infinite]" />
        </div>
    </div>
)}
        <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
        />
        <button
            type="button"
            onClick={handleUploadClick}
            className="w-full h-9 bg-white hover:bg-zinc-100 active:scale-[0.98] text-zinc-950 font-medium text-sm rounded-lg shadow-sm transition-all flex items-center justify-center cursor-pointer select-none"
        >
            Upload Document
        </button>
    </div>
  )
}

export default UploadDocument