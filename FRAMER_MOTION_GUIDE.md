# Framer-Motion Card Animations Guide

## ✨ Animation Variants

You now have **2 animated card components** to choose from:

### 1. **AnimatedCard** (Currently in use)
Best for: **Professional, clean animations**
- **Spring-based bounce effect** on scroll
- Smooth scale-up and fade-in
- Subtle elevation on hover
- Staggered animation timing
- Located: `components/AnimatedCard.tsx`

### 2. **AnimatedCardAdvanced** (Alternative component with multiple styles)
Best for: **More dynamic, creative animations**
- Located: `components/AnimatedCardAdvanced.tsx`
- Supports 5 animation variants:

#### Available Variants:

| Variant | Effect | Best For |
|---------|--------|----------|
| `bounce` | Spring bounce with scale-up | Playful, energetic feel |
| `flip` | 3D flip rotation on scroll | Eye-catching, premium feel |
| `zoom` | Subtle zoom from small to normal | Elegant, minimal |
| `fade` | Simple fade-in effect | Professional, clean |
| `slide` | Slide in with subtle rotation | Modern, dynamic |

## 🚀 How to Switch Animations

### Current Setup (AnimatedCard - Default)
Your cards are currently using the default **AnimatedCard** with spring bounce animation.

### To Use Advanced Animations

**Option 1: Replace AnimatedCard with AnimatedCardAdvanced globally**

In `app/page.tsx`, change:
```tsx
import { AnimatedCard } from "@/components/AnimatedCard";

// Change to:
import { AnimatedCardAdvanced as AnimatedCard } from "@/components/AnimatedCardAdvanced";
```

Then modify the card rendering (around line 363):
```tsx
<AnimatedCard key={item.id} index={index} variant="bounce">
  {/* card content */}
</AnimatedCard>
```

**Option 2: Use different variants for different categories**

```tsx
{categoryItems.map((item, index) => (
  <AnimatedCardAdvanced 
    key={item.id} 
    index={index} 
    variant={selectedCategory === "coffee" ? "flip" : "bounce"}
  >
    {/* card content */}
  </AnimatedCardAdvanced>
))}
```

## 🎨 Customization

### Adjust Animation Speed
In `AnimatedCard.tsx` or `AnimatedCardAdvanced.tsx`, modify the `staggerDelay` prop:

```tsx
<AnimatedCard index={index} staggerDelay={0.1}>  // Slower
<AnimatedCard index={index} staggerDelay={0.02}> // Faster
```

### Adjust Spring Physics
In the `transition` prop:
```tsx
transition={{
  type: "spring",
  stiffness: 100,      // Higher = snappier (100-300)
  damping: 12,         // Higher = less bouncy (10-30)
  mass: 0.8,           // Higher = more inertia (0.5-1.5)
  delay: index * staggerDelay,
}}
```

### Adjust Hover Effects
In the `whileHover` prop:
```tsx
whileHover={{ 
  y: -12,              // Lift distance in pixels
  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)"  // Shadow elevation
}}
```

## 📊 Performance Tips

1. **Intersection Observer**: Cards only animate when visible (optimized)
2. **GPU Acceleration**: Animations use `transform` and `opacity` (performant)
3. **Staggering**: Spreads animations across time (prevents jank)
4. **Mobile**: All animations are responsive and smooth on touch devices

## 🎯 Recommended Configurations

### For Coffee Shop (Energetic)
```tsx
variant="bounce" 
staggerDelay={0.06}
```

### For Food Items (Premium)
```tsx
variant="flip"
staggerDelay={0.05}
```

### For Drinks (Modern Minimal)
```tsx
variant="zoom"
staggerDelay={0.04}
```

### For All Items (Safe Default)
```tsx
variant="fade"
staggerDelay={0.03}
```

## 📱 Device Support

- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Tablet (iPad, Android tablets)
- ✅ Mobile (iPhone, Android phones)
- ✅ Reduced motion enabled (respects user preferences)

## 🔗 Package Info

- **Package**: `framer-motion@12.34.0`
- **Type**: Client Component (includes "use client")
- **Dependencies**: Installed and ready to use

---

**Enjoy your beautiful scroll animations! 🎉**
