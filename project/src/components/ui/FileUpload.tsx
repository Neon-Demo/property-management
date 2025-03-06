'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { cn } from '@/utils/cn';
import { formatFileSize } from '@/utils/formatters';

export interface FileUploadProps {
  id?: string;
  label?: string;
  helperText?: string;
  error?: string;
  value?: File[] | null;
  onFileChange: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // in bytes, default 5MB
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function FileUpload({
  id,
  label,
  helperText,
  error,
  value,
  onFileChange,
  multiple = false,
  accept,
  maxSize = 5 * 1024 * 1024, // 5MB default
  required,
  disabled,
  className,
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [sizeError, setSizeError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const files = value || [];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      
      // Check file size
      const oversizedFiles = fileList.filter(file => file.size > maxSize);
      if (oversizedFiles.length > 0) {
        setSizeError(`One or more files exceed the maximum size of ${formatFileSize(maxSize)}`);
        return;
      }
      
      setSizeError(null);
      onFileChange(fileList);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files) {
      const fileList = Array.from(e.dataTransfer.files);
      
      // Check file size
      const oversizedFiles = fileList.filter(file => file.size > maxSize);
      if (oversizedFiles.length > 0) {
        setSizeError(`One or more files exceed the maximum size of ${formatFileSize(maxSize)}`);
        return;
      }
      
      setSizeError(null);
      onFileChange(fileList);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    onFileChange(newFiles);
  };

  const openFileSelector = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div
        className={cn(
          "relative border-2 border-dashed rounded-md p-4",
          dragActive ? "border-primary bg-primary/5" : "border-gray-300",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          className
        )}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={disabled ? undefined : openFileSelector}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          className="sr-only"
          onChange={handleChange}
          multiple={multiple}
          accept={accept}
          required={required}
          disabled={disabled}
        />
        
        <div className="text-center py-4">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="mt-2 text-sm text-gray-600">
            Drag and drop {multiple ? 'files' : 'a file'}, or click to select
          </p>
          <p className="mt-1 text-xs text-gray-500">
            {accept ? `Accepted formats: ${accept}` : 'All file types allowed'} up to {formatFileSize(maxSize)}
          </p>
        </div>
      </div>
      
      {files.length > 0 && (
        <ul className="mt-2 border rounded-md divide-y divide-gray-200">
          {files.map((file, i) => (
            <li key={i} className="px-4 py-2 flex items-center justify-between text-sm">
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 text-gray-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="truncate">{file.name}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-xs text-gray-500">{formatFileSize(file.size)}</span>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(i);
                  }}
                  disabled={disabled}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      
      {(sizeError || error || helperText) && (
        <p
          className={cn(
            'mt-1 text-sm',
            sizeError || error ? 'text-red-500' : 'text-gray-500'
          )}
        >
          {sizeError || error || helperText}
        </p>
      )}
    </div>
  );
}