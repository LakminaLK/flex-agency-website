'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function LoadingScreen() {
  // Check if loader has been seen BEFORE setting initial state
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('hasSeenLoader');
    }
    return true;
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [hasInitialLoadCompleted, setHasInitialLoadCompleted] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!sessionStorage.getItem('hasSeenLoader');
    }
    return false;
  });
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  // Skip loading animation for studio pages
  const isStudioPage = pathname.startsWith('/studio');

  // Ensure component is mounted before showing anything
  useEffect(() => {
    setIsMounted(true);
    // Make body visible after mount
    document.body.classList.add('loaded');
  }, []);

  // Initial page load animation
  useEffect(() => {
    // Skip animation for studio pages
    if (isStudioPage) {
      setIsLoading(false);
      setHasInitialLoadCompleted(true);
      document.body.classList.add('loaded');
      return;
    }

    const hasSeenLoader = sessionStorage.getItem('hasSeenLoader');
    
    if (hasSeenLoader) {
      setIsLoading(false);
      setHasInitialLoadCompleted(true);
      document.body.classList.add('loaded');
      return;
    }

    // Start fade out after 1.5 seconds (same as page transitions)
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1500);

    // Complete loading after 2 seconds
    const completeTimer = setTimeout(() => {
      setIsLoading(false);
      setHasInitialLoadCompleted(true);
      sessionStorage.setItem('hasSeenLoader', 'true');
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [isStudioPage]);

  // Show animation on route change (only after initial load)
  useEffect(() => {
    if (!hasInitialLoadCompleted) return;
    
    // Skip animation for studio pages
    if (isStudioPage) return;
    
    setIsTransitioning(true);
    setIsFadingOut(false);
    
    // Start fade out after 1.5 seconds
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1500);
    
    // Complete transition after 2 seconds
    const completeTimer = setTimeout(() => {
      setIsTransitioning(false);
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [pathname, hasInitialLoadCompleted, isStudioPage]);

  // Don't render anything until mounted to avoid hydration flash
  if (!isMounted) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
        <div className="relative w-48 h-20">
          <Image
            src="/logo.png"
            alt="Flex Agency"
            fill
            sizes="192px"
            className="object-contain animate-logo-breathe"
            priority
          />
        </div>
      </div>
    );
  }

  if (!isLoading && !isTransitioning) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative w-48 h-20">
        <Image
          src="/logo.png"
          alt="Flex Agency"
          fill
          sizes="192px"
          className="object-contain animate-logo-breathe"
          priority
        />
      </div>
      
      <style jsx>{`
        @keyframes logo-breathe {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.9;
          }
        }
        
        :global(.animate-logo-breathe) {
          animation: logo-breathe 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
