
import React, { useRef } from 'react';
import { FileData } from '../types';
import { SUPPORTED_FILE_TYPES } from '../constants';

interface FileUploadProps {
  onFilesSelected: (files: FileData[]) => void;
  selectedFiles: FileData[];
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFilesSelected, selectedFiles }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    if (files.length === 0) return;

    const newFiles: FileData[] = [];
    let processedCount = 0;

    files.forEach(file => {
      if (!SUPPORTED_FILE_TYPES.includes(file.type)) {
        alert(`File type ${file.type} not supported.`);
        processedCount++;
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        newFiles.push({
          name: file.name,
          type: file.type,
          size: file.size,
          data: base64,
          previewUrl: file.type.startsWith('image/') ? base64 : undefined
        });

        processedCount++;
        if (processedCount === files.length) {
          onFilesSelected([...selectedFiles, ...newFiles]);
          if (fileInputRef.current) fileInputRef.current.value = '';
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index: number) => {
    onFilesSelected(selectedFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        className="hidden"
        accept={SUPPORTED_FILE_TYPES.join(',')}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black transition-all border ${
          selectedFiles.length > 0 
            ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' 
            : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
        }`}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
        {selectedFiles.length > 0 ? `${selectedFiles.length} FILE(S)` : 'ATTACH'}
      </button>

      {selectedFiles.length > 0 && (
        <div className="flex gap-1 overflow-x-auto max-w-[120px] scrollbar-hide">
          {selectedFiles.map((f, i) => (
            <div key={i} className="relative group shrink-0">
              <div className="w-6 h-6 bg-slate-800 rounded-lg border border-slate-700 flex items-center justify-center text-[8px] text-white">
                {f.type.startsWith('image/') ? '🖼️' : '📄'}
              </div>
              <button 
                onClick={() => removeFile(i)}
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-[6px] text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
