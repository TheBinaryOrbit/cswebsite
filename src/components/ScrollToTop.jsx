import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ behavior = "auto" }) {
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior });
    } catch (e) {
      window.scrollTo(0, 0);
    }
  }, [pathname, behavior]);

  return null;
}
