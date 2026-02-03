"use client";   
import React from 'react';
import Image from 'next/image';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {/* Top-left glow */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
        
        {/* Top-right glow */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
        
        {/* Bottom-left glow */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        
        {/* Bottom-right glow */}
        <div className="absolute -bottom-20 -right-40 w-80 h-80 bg-amber-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '1.5s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.02)_1px,transparent_1px)] bg-size-[40px_40px]" />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center gap-8 relative z-10">
        
        {/* Premium Spinner with Logo - Enhanced */}
        <div className="relative w-40 h-40">
          {/* Outer glow effect */}
          <div className="absolute inset-0 rounded-full blur-xl opacity-75 animate-pulse" 
            style={{
              background: 'radial-gradient(circle, rgba(217, 119, 6, 0.3) 0%, rgba(59, 130, 246, 0.2) 100%)',
              animationDuration: '2s'
            }} 
          />
          
          {/* Outer rotating ring - Amber */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-400 border-r-amber-500 border-br-amber-600 animate-spin shadow-lg shadow-amber-500/50" style={{ animationDuration: '2.5s' }} />
          
          {/* Middle rotating ring - Blue (opposite) */}
          <div className="absolute inset-3 rounded-full border-3 border-transparent border-b-blue-400 border-l-blue-500 animate-spin shadow-lg shadow-blue-500/30" style={{ animationDuration: '3.5s', animationDirection: 'reverse' }} />
          
          {/* Inner rotating ring - Gradient */}
          <div className="absolute inset-6 rounded-full border-2 border-transparent border-t-purple-400 border-r-amber-400 opacity-60 animate-spin" style={{ animationDuration: '4s' }} />
          
          {/* Center logo with enhanced styling */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-28 h-28 relative bg-linear-to-br from-white to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-full flex items-center justify-center shadow-2xl shadow-amber-500/40 dark:shadow-blue-500/40 border-4 border-white/20 dark:border-slate-600/20 backdrop-blur-sm">
              <Image 
                src="/image/2.png" 
                alt="Logo" 
                width={80} 
                height={80}
                className="w-20 h-20 object-contain drop-shadow-lg"
                priority
              />
            </div>
          </div>
        </div>

        {/* Loading Text with enhanced animation */}
        <div className="text-center mt-4">
          <p className="text-2xl font-bold tracking-widest">
            <span className="bg-linear-to-r from-amber-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse" style={{ animationDuration: '2s' }}>
              LOADING
            </span>
          </p>
          
          {/* Animated dots */}
          <div className="flex items-center justify-center gap-1 mt-3">
            <span className="w-2 h-2 bg-linear-to-r from-amber-400 to-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
            <span className="w-2 h-2 bg-linear-to-r from-blue-400 to-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
            <span className="w-2 h-2 bg-linear-to-r from-purple-400 to-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
          </div>
          
          <p className="text-xs text-slate-300 dark:text-slate-400 mt-4 font-light tracking-widest">
            Preparing your menu
          </p>
        </div>

        {/* Enhanced progress bar with shimmer */}
        <div className="w-64 h-1.5 bg-slate-700/50 dark:bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-slate-600/20">
          <div 
            className="h-full rounded-full bg-linear-to-r from-amber-400  00 to-amber-400 shadow-lg shadow-blue-500/50" 
            style={{ 
              backgroundSize: '200% 100%',
              animation: 'shimmer 2.5s infinite'
            }} 
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0%, 100% {
            background-position: 200% 0;
          }
          50% {
            background-position: -200% 0;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}
