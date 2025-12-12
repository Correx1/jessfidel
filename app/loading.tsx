import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-white to-blue-50/20 flex items-center justify-center">
      <div className="text-center">
        {/* Animated spinner */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-900 border-r-transparent"></div>
          <div className="absolute h-12 w-12 animate-ping rounded-full bg-blue-900/20"></div>
        </div>

       

        {/* Animated dots */}
        <div className="flex justify-center gap-1 mt-4">
          <span className="h-2 w-2 bg-blue-900 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
          <span className="h-2 w-2 bg-blue-900 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
          <span className="h-2 w-2 bg-blue-900 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
        </div>
      </div>
    </div>
  );
}