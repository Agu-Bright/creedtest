import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ children }) {
  const { pathname } = useLocation();
  
  useEffect(() => {
    const canControlScrollRestoration = 'scrollRestoration' in window.history
    if (canControlScrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }

    !pathname.includes('profile')? window.scrollTo(0, 0):'';
  }, [pathname]);
  
  return children;
}