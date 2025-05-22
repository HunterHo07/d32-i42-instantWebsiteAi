export const templates = [
  {
    id: "modern-business",
    name: "Modern Business",
    category: "Business",
    previewImage: "/images/templates/modern-business.webp",
    features: ["Responsive", "Contact Form", "About Section", "Services"],
    colors: {
      primary: "#3B82F6",
      secondary: "#10B981",
      accent: "#8B5CF6",
      background: "#F9FAFB",
      text: "#1F2937"
    }
  },
  {
    id: "creative-portfolio",
    name: "Creative Portfolio",
    category: "Portfolio",
    previewImage: "/images/templates/creative-portfolio.webp",
    features: ["Gallery", "Project Showcase", "Skills Section", "Contact Form"],
    colors: {
      primary: "#EC4899",
      secondary: "#8B5CF6",
      accent: "#F59E0B",
      background: "#0F172A",
      text: "#F1F5F9"
    }
  },
  {
    id: "restaurant-cafe",
    name: "Restaurant & Cafe",
    category: "Food",
    previewImage: "/images/templates/restaurant-cafe.webp",
    features: ["Menu Display", "Reservation Form", "Gallery", "Testimonials"],
    colors: {
      primary: "#F59E0B",
      secondary: "#10B981",
      accent: "#EF4444",
      background: "#FFFBEB",
      text: "#1F2937"
    }
  },
  {
    id: "tech-startup",
    name: "Tech Startup",
    category: "Technology",
    previewImage: "/images/templates/tech-startup.webp",
    features: ["Feature Showcase", "Pricing Table", "Team Section", "Blog"],
    colors: {
      primary: "#6366F1",
      secondary: "#10B981",
      accent: "#F43F5E",
      background: "#0F172A",
      text: "#F1F5F9"
    }
  },
  {
    id: "ecommerce-store",
    name: "E-Commerce Store",
    category: "E-Commerce",
    previewImage: "/images/templates/ecommerce-store.webp",
    features: ["Product Grid", "Shopping Cart", "Product Details", "Checkout"],
    colors: {
      primary: "#10B981",
      secondary: "#6366F1",
      accent: "#F59E0B",
      background: "#F9FAFB",
      text: "#1F2937"
    }
  }
];

export const getTemplateById = (id) => {
  return templates.find(template => template.id === id) || templates[0];
};

export const getTemplatesByCategory = (category) => {
  if (!category || category === 'All') {
    return templates;
  }
  return templates.filter(template => template.category === category);
};

export const getTemplateCategories = () => {
  const categories = new Set(templates.map(template => template.category));
  return ['All', ...Array.from(categories)];
};
