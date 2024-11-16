import React, { memo } from 'react';

interface FooterProps {
  className?: string;
  authorName?: string;
}

const Footer = memo(
  ({
    className = '',
    authorName = ' Bhavanish Dhamnaskar',
  }: FooterProps) => {
    const currentYear = new Date().getFullYear();

    return (
      <footer
        className={`w-full bg-background border-t border-border/40 mt-auto ${className}`}
        role="contentinfo"
        aria-label="Site footer"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <span>Made with</span>
              <span
                className="text-red-500 inline-flex items-center"
                role="img"
                aria-label="love"
              >
                <span className="animate-pulse">❤️</span>
              </span>
              <span>by</span>
              <span className="font-medium text-primary">
                {authorName}
              </span>
              <span className="mx-1">©</span>
              <span>{currentYear}</span>
            </span>
          </div>
        </div>
      </footer>
    );
  },
);

Footer.displayName = 'Footer';

export default Footer;
