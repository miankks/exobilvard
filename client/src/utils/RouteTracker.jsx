import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:3000/api/tracker/visittracker", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: location.pathname,
        referrer: document.referrer,
      }),
    }).catch(() => {});
  }, [location.pathname]);

  return null;
};

export default RouteTracker;
