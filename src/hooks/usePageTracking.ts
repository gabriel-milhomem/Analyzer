import { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { useLocation } from 'react-router-dom';

export function usePageTracking(): void {
  const trackingId = process.env.TRACKING_ID!;
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!window.location.href.includes('localhost')) {
      ReactGA.initialize(trackingId, {
        debug: true,
        titleCase: false,
        gaOptions: {
          siteSpeedSampleRate: 100
        }
      });

      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [initialized, location]);
}
