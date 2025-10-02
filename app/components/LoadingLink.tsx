"use client";

import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useLoadingStore } from '@/stores/loadingStore';

interface LoadingLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function LoadingLink({ 
  href, 
  children, 
  className = "", 
  target,
  onClick
}: LoadingLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const setLoading = useLoadingStore((state) => state.setLoading);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
      if (e.defaultPrevented) return;
    }
    
    if (target === '_blank' || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return;
    }
    
    if (href.startsWith('#')) {
      return;
    }
    
    // Check if navigating to current page (remove any trailing slash for comparison)
    const currentPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    const targetPath = href.endsWith('/') ? href.slice(0, -1) : href;
    if (currentPath === targetPath) {
      return; // Don't show loading when clicking on current page link
    }
    
    if (!e.defaultPrevented) {
      e.preventDefault();
      setLoading(true);
      router.push(href);
    }
  };

  return (
    <Link 
      href={href} 
      className={className} 
      target={target}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}