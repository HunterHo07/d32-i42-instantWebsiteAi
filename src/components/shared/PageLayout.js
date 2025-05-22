'use client';

import Navigation from './Navigation';
import Footer from './Footer';

/**
 * Page layout component with navigation and footer
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content
 * @param {boolean} props.hideFooter - Option to hide footer
 * @returns {JSX.Element} Page layout component
 */
const PageLayout = ({ children, hideFooter = false }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default PageLayout;
