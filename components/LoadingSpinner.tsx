"use client";   
import React from 'react';
import Image from 'next/image';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-950 to-black relative overflow-hidden">
      {/* Animated gradient background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top-left cyan blob */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s' }} />
        
        {/* Top-right teal blob */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '1s' }} />
        
        {/* Bottom-left blue blob */}
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '9s', animationDelay: '2s' }} />
        
        {/* Bottom-right turquoise blob */}
        <div className="absolute -bottom-32 -right-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '1.5s' }} />
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(34,211,238,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,.05)_1px,transparent_1px)] bg-size-[100px_100px] opacity-30" />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.6) 100%)" />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center gap-4 relative z-10">
        
        {/* Modern Animated Orbs Spinner */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* Outer rotating orbit */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-teal-500 animate-spin shadow-xl shadow-cyan-500/30"
            style={{ animationDuration: '3s' }}
          />
          
          {/* Inner rotating orbit - reverse */}
          <div className="absolute inset-3 rounded-full border-2 border-transparent border-b-cyan-400 border-l-teal-500 animate-spin shadow-lg shadow-teal-500/20"
            style={{ animationDuration: '4s', animationDirection: 'reverse' }}
          />
          
          {/* Pulsing center orb */}
          <div className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400/40 to-teal-500/40 animate-pulse shadow-2xl shadow-cyan-400/40"
            style={{ animationDuration: '2s' }}
          />
          
          {/* Center logo with glow */}
          <div className="absolute flex items-center justify-center">
            <Image 
              src="/image/2.png" 
              alt="Logo" 
              width={36} 
              height={36}
              className="w-9 h-9 object-contain filter brightness-150 relative z-10"
              priority
              style={{
                filter: 'drop-shadow(0 0 12px rgba(34, 211, 238, 0.8))'
              }}
            />
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center mt-6">
          <p className="text-2xl font-bold tracking-widest">
            <span className="bg-gradient-to-r from-cyan-300 via-teal-400 to-blue-400 bg-clip-text text-transparent animate-pulse" style={{ animationDuration: '2s' }}>
              LOADING
            </span>
          </p>
          
          {/* Animated dots */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="w-3 h-3 rounded-full animate-bounce shadow-lg shadow-cyan-400/60"
              style={{
                background: 'linear-gradient(135deg, #06b6d4 0%, #67e8f9 100%)',
                animationDelay: '0s',
                animationDuration: '1.4s'
              }}
            />
            <div className="w-3 h-3 rounded-full animate-bounce shadow-lg shadow-teal-400/60"
              style={{
                background: 'linear-gradient(135deg, #14b8a6 0%, #5eead4 100%)',
                animationDelay: '0.2s',
                animationDuration: '1.4s'
              }}
            />
            <div className="w-3 h-3 rounded-full animate-bounce shadow-lg shadow-blue-400/60"
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #93c5fd 100%)',
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
