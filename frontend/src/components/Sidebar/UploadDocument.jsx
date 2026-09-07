import { useRef } from "react";

const UploadDocument = (onUpload) => {
    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
        if (onUpload) {
            onUpload();
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file && onUpload) {
            onUpload(file);
        }
    };
  return (
    <div className="px-3 pb-3 shrink-0">
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