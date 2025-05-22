# Development Documentation for instantWebsiteAi

## Tech Stack

### Core Technologies
- **Framework**: Next.js 15.3.2 (App Router)
- **Styling**: Tailwind CSS with custom animations
- **Animation Libraries**:
  - GSAP (GreenSock Animation Platform) for scroll animations and transitions
  - Three.js for 3D elements and backgrounds
  - Framer Motion for UI component animations
- **State Management**: React Context API + localStorage for demo data
- **Deployment**: Vercel-ready configuration

### Additional Libraries
- **UI Components**: Headless UI for accessible components
- **Icons**: Heroicons and custom SVG animations
- **Fonts**: Variable fonts for performance and flexibility
- **Effects**:
  - Particles.js for particle field effects
  - GLSL shaders for liquid mesh animations
  - Custom Canvas effects for aurora lights

## Page Structure

### Home Page Sections
1. **Hero Section** (highest priority)
   - Interactive 3D website preview generator
   - Name + logo input with real-time preview
   - Floating UI elements with parallax effects
   - Background: Particle field with user interaction

2. **Problem/Solution Section**
   - Split-screen layout with problem visualization
   - Animated solution demonstration
   - Background: Subtle gradient mesh

3. **3-Step Process Visualization**
   - Interactive timeline with step animations
   - Micro-interactions on hover/scroll
   - Background: Glassmorphism cards

4. **Feature Preview Carousel**
   - 3D carousel of template examples
   - Interactive preview cards
   - Background: Aurora light effects

5. **Competitor Comparison**
   - Animated comparison table
   - Highlight features with micro-animations
   - Background: Subtle grid pattern

6. **Testimonials/Social Proof**
   - Infinite scroll of testimonial cards
   - Animated avatars and quotes
   - Background: Soft gradient mesh

7. **Pricing Plans**
   - Interactive pricing cards with hover effects
   - Feature comparison with animated checkmarks
   - Background: Glassmorphism effect

8. **Early Adopter Section**
   - Animated counter of users
   - Infinite brand logo carousel
   - Background: Particle field

9. **Call to Action**
   - Floating CTA with attention-grabbing animation
   - Background: Aurora light effect
   - Micro-interaction on hover

### Demo Page Sections
1. **Interactive Demo Interface**
   - Live website preview generator
   - Template selection carousel
   - Real-time customization panel
   - Background: Subtle grid with particle effects

2. **Template Showcase**
   - 3D gallery of template options (minimum 5 templates)
   - Category filtering with animations
   - Background: Gradient mesh

3. **Customization Panel**
   - Interactive controls for site customization
   - Real-time preview updates
   - Background: Glassmorphism effect

4. **Mobile Preview Toggle**
   - Animated device frame switching
   - Responsive preview demonstration
   - Background: Subtle grid pattern

5. **Template Details**
   - Feature list with animated icons
   - Interactive elements showcase
   - Background: Subtle particle field

## Implementation Details

### Hero Section Implementation
- Three.js scene with interactive website mockup
- Real-time text input syncing with preview
- File upload for logo with instant preview
- GSAP animations for UI element transitions
- Particle field background with mouse interaction
- Glassmorphism UI elements with hover effects

### Demo Page Implementation
- Template selection using localStorage for state
- Custom form controls for site customization
- Real-time preview rendering
- Device frame switching animation
- Template data stored in JSON format
- Simulated "publish" functionality with success animation

### Animation & Effects Implementation
1. **Glassmorphism**
   - CSS backdrop-filter for frosted glass effect
   - Custom shadows and highlights
   - Interactive hover states

2. **Aurora Lights**
   - Canvas-based gradient animations
   - Color shifting based on scroll position
   - Performance-optimized rendering

3. **Particle Field**
   - Particles.js configuration for interactive particles
   - Mouse-following behavior
   - Density adjustment based on device performance

4. **Liquid Mesh**
   - Three.js with custom GLSL shaders
   - Vertex displacement animations
   - Color gradient mapping

5. **Parallax Scroll**
   - GSAP ScrollTrigger for multi-layer depth
   - Performance optimization for mobile
   - Subtle depth cues

## Data Structure

### Template Data
```json
{
  "templates": [
    {
      "id": "modern-business",
      "name": "Modern Business",
      "category": "Business",
      "previewImage": "/images/templates/modern-business.webp",
      "features": ["Responsive", "Contact Form", "About Section", "Services"],
      "colors": {
        "primary": "#3B82F6",
        "secondary": "#10B981",
        "accent": "#8B5CF6",
        "background": "#F9FAFB",
        "text": "#1F2937"
      }
    },
    // Additional templates...
  ]
}
```

### User Customization Data
```json
{
  "businessName": "Acme Inc",
  "logo": "/uploads/acme-logo.png",
  "selectedTemplate": "modern-business",
  "customizations": {
    "colors": {
      "primary": "#4F46E5",
      "secondary": "#10B981"
    },
    "fonts": {
      "heading": "Inter",
      "body": "Roboto"
    },
    "sections": {
      "hero": true,
      "features": true,
      "testimonials": true,
      "contact": true
    }
  }
}
```

## Mobile Responsiveness Strategy
- Fluid typography using clamp() and viewport units
- Mobile-first design approach
- Breakpoint system for layout adjustments
- Touch-optimized interactions for mobile
- Performance considerations for animation effects
- Device-specific optimizations for effects

## Performance Optimization
- Next.js image optimization
- Code splitting and lazy loading
- Reduced motion options for accessibility
- Conditional rendering of heavy effects based on device capability
- Web Vitals monitoring and optimization
