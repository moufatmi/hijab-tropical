'use client'

import React from 'react'

export default function NatureBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#d3ebdb] dark:bg-[#c2ded0] transition-colors duration-500">
      {/* Dynamic Background Image Layer with Parallax / Fixed Cover */}
      <div
        className="absolute inset-0 bg-[url('/tropical-bg.png')] bg-cover bg-center bg-no-repeat opacity-[0.35] dark:opacity-[0.12] transition-opacity duration-500"
        style={{ backgroundAttachment: 'fixed' }}
      />

      {/* Floating Glowing Ambient Light Orbs that colorize the leaf pattern from behind */}
      <div className="absolute inset-0 opacity-40 dark:opacity-30 mix-blend-color-burn dark:mix-blend-screen">
        {/* Teal glow */}
        <div className="absolute top-[10%] left-[5%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-teal-300/30 to-transparent blur-[120px] animate-orb-1" />
        {/* Soft pink glow */}
        <div className="absolute top-[35%] right-[10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-tr from-pink-300/30 to-transparent blur-[130px] animate-orb-2" />
        {/* Gold/Orange sunset glow */}
        <div className="absolute bottom-[5%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-tr from-[#f3db83]/30 to-transparent blur-[110px] animate-orb-3" />
      </div>

      {/* Animated Light Rays (sunlight filtering through tropical canopy) */}
      <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.08] bg-[linear-gradient(135deg,_rgba(255,255,255,0)_40%,_rgba(255,248,220,0.4)_50%,_rgba(255,255,255,0)_60%)] bg-[length:200%_200%] animate-wind-flow pointer-events-none" />

      {/* Subtle floating particles (hibiscus petals & leaves) for interactive micro-animations */}
      <div className="absolute inset-0 overflow-hidden select-none opacity-40 dark:opacity-20">
        {/* Floating Petal 1 */}
        <div className="absolute left-[12%] animate-leaf-float-1 text-[#f99cb0]">
          <svg className="w-5 h-5 opacity-40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2C12,2 6,7 6,11C6,14.3 8.7,17 12,17C15.3,17 18,14.3 18,11C18,7 12,2 12,2Z" />
          </svg>
        </div>

        {/* Floating leaf 2 */}
        <div
          className="absolute right-[18%] animate-leaf-float-2 text-teal-600"
          style={{ animationDelay: '-5s' }}
        >
          <svg className="w-6 h-6 opacity-30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L2.18,20.66C4.26,15.49 6.36,9.31 15.36,7.3C13,5 9,4 9,4C13,4 17,7 17,8Z" />
          </svg>
        </div>

        {/* Floating Petal 3 */}
        <div
          className="absolute left-[45%] animate-leaf-float-3 text-[#e0a82b]"
          style={{ animationDelay: '-10s' }}
        >
          <svg className="w-4 h-4 opacity-40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2C12,2 6,7 6,11C6,14.3 8.7,17 12,17C15.3,17 18,14.3 18,11C18,7 12,2 12,2Z" />
          </svg>
        </div>
      </div>

      {/* Textured Vignette for Vignette border frame and luxury photo feel */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(10,25,20,0.03)_100%)] pointer-events-none" />
    </div>
  )
}
