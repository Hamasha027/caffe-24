"use client";   
import React from 'react';
import Image from 'next/image';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-950 to-black relative overflow-hidden">
      {/* Animated gradient background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top-left dark blob */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-black/80 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s' }} />
        
        {/* Top-right amber accent blob */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '1s' }} />
        
        {/* Bottom-left dark blob */}
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-black/80 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '9s', animationDelay: '2s' }} />
        
        {/* Bottom-right subtle amber blob */}
        <div className="absolute -bottom-32 -right-40 w-96 h-96 bg-amber-600/3 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '1.5s' }} />
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(180,83,9,.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(180,83,9,.02)_1px,transparent_1px)] bg-size-[100px_100px] opacity-30" />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.6) 100%)" />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center gap-4 relative z-10">
        
        {/* Modern Animated Orbs Spinner */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Outer rotating orbit */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gray-700 border-r-amber-600 animate-spin shadow-xl shadow-amber-600/20"
            style={{ animationDuration: '3s' }}
          />
          
          {/* Inner rotating orbit - reverse */}
          <div className="absolute inset-3 rounded-full border-2 border-transparent border-b-gray-700 border-l-amber-600 animate-spin shadow-lg shadow-amber-600/10"
            style={{ animationDuration: '4s', animationDirection: 'reverse' }}
          />
          
          {/* Pulsing center orb */}
          <div className="absolute w-9 h-9 rounded-full bg-gradient-to-br from-gray-800/60 to-amber-600/30 animate-pulse shadow-2xl shadow-amber-600/20"
            style={{ animationDuration: '2s' }}
          />
          
          {/* Center logo with glow */}
          <div className="absolute flex items-center justify-center">
            <Image 
              src="/image/2.png" 
              alt="Logo" 
              width={28} 
              height={28}
              className="w-7 h-7 object-contain filter brightness-150 relative z-10"
              priority
              style={{
                filter: 'drop-shadow(0 0 12px rgba(180, 83, 9, 0.7))'
              }}
            />
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center mt-6">
          <p className="text-xl font-bold tracking-widest">
            <span className="bg-gradient-to-r from-gray-400 via-gray-300 to-amber-600 bg-clip-text text-transparent animate-pulse" style={{ animationDuration: '2s' }}>
              LOADING
            </span>
          </p>
          
          {/* Animated dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-2.5 h-2.5 rounded-full animate-bounce shadow-lg shadow-amber-600/30"
              style={{
                background: 'linear-gradient(135deg, #4b5563 0%, #b54509 100%)',
                animationDelay: '0s',
                animationDuration: '1.4s'
              }}
            />
            <div className="w-2.5 h-2.5 rounded-full animate-bounce shadow-lg shadow-amber-600/30"
              style={{
                background: 'linear-gradient(135deg, #374151 0%, #b54509 100%)',
                animationDelay: '0.2s',
                animationDuration: '1.4s'
              }}
            />
            <div className="w-2.5 h-2.5 rounded-full animate-bounce shadow-lg shadow-amber-600/30"
              style={{
                background: 'linear-gradient(135deg, #1f2937 0%, #b54509 100%)',
                animationDelay: '0.4s',
                animationDuration: '1.4s'
              }}
            />
          </div>
          
        
        </div>
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
