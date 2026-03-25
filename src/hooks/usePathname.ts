import { useEffect, useState } from 'react';

export function usePathname() {
  const [pathname, setPathname] = useState(() => {
    if (typeof window === 'undefined') return '';
    return window.location.pathname;
  });

  useEffect(() => {
    const handleLocationChange = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  return pathname;
}
