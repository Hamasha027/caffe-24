"use client";   
import React from 'react';
import Image from 'next/image';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-black to-slate-950 relative overflow-hidden">
      {/* Animated background blur orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large amber blob top-left */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
        
        {/* Large amber blob top-right */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }} />
        
        {/* Large amber blob bottom-left */}
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
        
        {/* Large amber blob bottom-right */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6.5s', animationDelay: '0.5s' }} />
      </div>

      {/* Grid overlay with subtle animation */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(180,83,9,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(180,83,9,.08)_1px,transparent_1px)] bg-size-[80px_80px] opacity-40" />
      
      {/* Radial gradient vignette */}
      <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 0%, rgba(15, 23, 42, 0.5) 100%)" />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center gap-4 relative z-10">
        
        {/* Three Line Circular Spinner */}
        <div className="relative w-20 h-20">
          {/* Outer ring - Fast rotation */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-400 border-r-amber-500 animate-spin shadow-lg shadow-amber-600/40"
            style={{ animationDuration: '1.5s' }}
          />
          
          {/* Middle ring - Medium rotation */}
          <div className="absolute inset-2 rounded-full border-3 border-transparent border-b-amber-400 border-l-amber-500 animate-spin shadow-md shadow-amber-600/30"
            style={{ animationDuration: '2.5s', animationDirection: 'reverse' }}
          />
          
          {/* Inner ring - Slow rotation */}
          <div className="absolute inset-4 rounded-full border-2 border-transparent border-t-amber-300 border-r-amber-400 animate-spin"
            style={{ animationDuration: '3s' }}
          />
          
          {/* Center logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-xl shadow-amber-600/60 border border-amber-300/30 backdrop-blur-sm">
              <Image 
                src="/image/2.png" 
                alt="Logo" 
                width={32} 
                height={32}
                className="w-8 h-8 object-contain drop-shadow-lg filter brightness-110"
                priority
              />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <p className="text-[14x] font-bold tracking-wide">
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent animate-pulse" style={{ animationDuration: '2s' }}>
              LOADING
            </span>
          </p>
          
          {/* Animated dots */}
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '1.4s' }} />
            <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '1.4s' }} />
            <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s', animationDuration: '1.4s' }} />
          </div>
       
        </div>
        
        {/* Beautiful progress bar */}
       
       
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          50% {
            background-position: 200% 0;
          }
          100% {
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
