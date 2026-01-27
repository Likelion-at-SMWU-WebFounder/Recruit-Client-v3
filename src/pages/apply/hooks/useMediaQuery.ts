import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string) => {
  const getMatch = () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false);

  const [matches, setMatches] = useState(getMatch);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia(query);

    const onChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    mql.addEventListener('change', onChange);
    setMatches(mql.matches);

    return () => {
      mql.removeEventListener('change', onChange);
    };
  }, [query]);

  return matches;
};
