<!-- 
  QUICK ANIMATION SWITCHER GUIDE
  
  Your animations are now LIVE! The default is using AnimatedCard with spring bounce.
  
  Access your app at: http://localhost:3000
  
  To see the animations in action:
  1. Open http://localhost:3000 in your browser
  2. Scroll down to see cards animate in
  3. Hover over cards to see the interactive lift effect
  4. Refresh the page to see staggered entrance animations again
  
  ============================================================
  READY-TO-USE EXAMPLES
  ============================================================
  
  EXAMPLE 1: Using the default AnimatedCard (Currently in use)
  ─────────────────────────────────────────────────────────────
  File: app/page.tsx (line 363 - already configured)
  
  <AnimatedCard key={item.id} index={index}>
    <div className="...">
      {/* card content */}
    </div>
  </AnimatedCard>
  
  Animation: Spring bounce up on scroll with hover lift
  Effect: y: 40px → 0px with scale 0.95 → 1
  

  EXAMPLE 2: Switch to flip animation
  ────────────────────────────────────────
  1. In app/page.tsx, line 32, change:
     
     import { AnimatedCardAdvanced as AnimatedCard } from "@/components/AnimatedCardAdvanced";
  
  2. Then when rendering cards (line 363):
     
     <AnimatedCard key={item.id} index={index} variant="flip">
       {/* card content */}
     </AnimatedCard>
  
  Animation: 3D flip from left on scroll
  Effect: rotateY: -90° → 0° (premium feel)
  

  EXAMPLE 3: Different animations per category
  ────────────────────────────────────────────────
  In app/page.tsx around line 363, try:
  
  {categoryItems.map((item, index) => {
    let animVariant = "bounce";
    if (item.category === "coffee") animVariant = "flip";
    else if (item.category === "sweets") animVariant = "zoom";
    else if (item.category === "drinks") animVariant = "fade";
    
    return (
      <AnimatedCardAdvanced 
        key={item.id} 
        index={index} 
        variant={animVariant}
      >
        {/* card content */}
      </AnimatedCardAdvanced>
    );
  })}
  
  Animation: Different per category!
  Coffee → Flip | Sweets → Zoom | Drinks → Fade
  

  EXAMPLE 4: Faster animations (20% more speed)
  ──────────────────────────────────────────────
  In app/page.tsx line 363:
  
  <AnimatedCard key={item.id} index={index} staggerDelay={0.03}>
    {/* card content */}
  </AnimatedCard>
  
  Note: Lower staggerDelay = faster cascade effect
  Default: 0.05
  Slower: 0.1+
  Faster: 0.02-0.03
  

  EXAMPLE 5: More playful bounce (snappier)
  ──────────────────────────────────────────
  Edit components/AnimatedCard.tsx line 45:
  
  transition={{
    type: "spring",
    stiffness: 150,    // Increased from 100 (more snappy)
    damping: 10,       // Decreased from 12 (more bouncy)
    mass: 0.8,
    delay: index * staggerDelay,
  }}
  
  Effect: More pronounced bounce, snappier response
  

  EXAMPLE 6: Heavier, slower animations (more elegant)
  ─────────────────────────────────────────────────────
  Edit components/AnimatedCard.tsx line 45:
  
  transition={{
    type: "spring",
    stiffness: 80,     // Decreased from 100 (slower)
    damping: 15,       // Increased from 12 (less bouncy)
    mass: 1.2,         // Increased from 0.8 (heavier feel)
    delay: index * staggerDelay,
  }}
  
  Effect: Elegant, premium feel, slower entrance
  

  ============================================================
  TEST ALL ANIMATIONS - Copy & Paste Ready
  ============================================================
  
  FADE (minimal):
  variant="fade"
  
  ZOOM (elegant):
  variant="zoom"
  
  BOUNCE (energetic):
  variant="bounce"
  
  FLIP (premium):
  variant="flip"
  
  SLIDE (modern):
  variant="slide"
  
  ============================================================
  HOW TO TEST
  ============================================================
  
  1. Visual check:
     - Scroll down page slowly
     - Watch cards animate in sequence
     - Hover over cards to see lift effect
  
  2. Performance check:
     - Open DevTools (F12)
     - Go to Performance tab
     - Record while scrolling
     - White line should stay high (60fps target)
  
  3. Mobile check:
     - Use responsive design in DevTools
     - Test on different screen sizes
     - Animations should work on all sizes
  
  ============================================================
  📞 NEED HELP?
  ============================================================
  
  Animations not showing?
  → Check browser console for errors (F12)
  → Make sure framer-motion is installed: pnpm list framer-motion
  → Clear browser cache and refresh
  
  Too slow/fast?
  → Adjust staggerDelay (0.02 to 0.1)
  → Or adjust spring physics (stiffness, damping, mass)
  
  Want more customization?
  → Edit AnimatedCard.tsx or AnimatedCardAdvanced.tsx
  → Refer to FRAMER_MOTION_GUIDE.md for details
  
  ============================================================
-->

Ready to test! Your animations are live on http://localhost:3000
