import React, { useState, useRef } from 'react';
import { Upload, FileText, Play, AlertCircle } from 'lucide-react';
import { parseCSV } from '../utils/csvParser';
import { VideoItem } from '../types';

interface CsvUploadProps {
  onDataLoaded: (data: VideoItem[]) => void;
  onUseDemo: () => void;
}

export const CsvUpload: React.FC<CsvUploadProps> = ({ onDataLoaded, onUseDemo }) => {
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    setError(null);
    if (file.type !== "text/csv" && !file.name.endsWith('.csv')) {
      setError("Please upload a valid .csv file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const data = parseCSV(text);
        
        if (data.length === 0) {
          setError("No valid videos found in CSV. Check columns: title, link, level.");
          return;
        }
        
        onDataLoaded(data);
      } catch (err) {
        console.error(err);
        setError("Failed to parse CSV. Ensure it has 'title' and 'link' headers.");
      }
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 animate-fade-in">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl text-center">
        <h2 className="text-2xl font-bold mb-2">Setup Competition</h2>
        <p className="text-zinc-400 mb-8">Upload a CSV file to generate the quiz playlist.</p>

        {/* Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-xl p-10 cursor-pointer transition-all
            flex flex-col items-center gap-4 group
            ${isDragging 
              ? 'border-indigo-500 bg-indigo-500/10' 
              : 'border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800'
            }
          `}
        >
          <div className="bg-zinc-800 p-4 rounded-full group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8 text-indigo-400" />
          </div>
          <div className="text-zinc-300">
            <span className="font-semibold text-indigo-400">Click to upload</span> or drag and drop
          </div>
          <p className="text-sm text-zinc-500">Required columns: <code className="bg-zinc-950 px-1 py-0.5 rounded text-zinc-400">title</code>, <code className="bg-zinc-950 px-1 py-0.5 rounded text-zinc-400">link</code>, <code className="bg-zinc-950 px-1 py-0.5 rounded text-zinc-400">level</code></p>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".csv" 
            className="hidden" 
          />
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-900/30 border border-red-800 text-red-200 rounded-lg flex items-center justify-center gap-2 text-sm">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-zinc-900 text-zinc-500">Or start immediately</span>
          </div>
        </div>

        <button
          onClick={onUseDemo}
          className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-semibold flex items-center justify-center gap-3 transition-colors"
        >
          <Play className="w-5 h-5 fill-current" />
          Play with Demo Data
        </button>
      </div>
    </div>
  );
};