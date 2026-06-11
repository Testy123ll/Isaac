import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

// Helper to retrieve or generate a session ID persisting for the browser tab session
export const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

// Global event tracking utility function to log user actions anywhere in the app
export const trackEvent = async (eventName: string, eventData: Record<string, any> = {}) => {
  try {
    const sessionId = getSessionId();
    await supabase.from('analytics_events').insert([{
      session_id: sessionId,
      event_name: eventName,
      event_data: eventData
    }]);
  } catch (err) {
    console.error('Failed to log event:', err);
  }
};

export const AnalyticsTracker = () => {
  const location = useLocation();
  const currentViewIdRef = useRef<string | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Update duration spent on the current page before navigating away
  const endCurrentView = async () => {
    const viewId = currentViewIdRef.current;
    if (!viewId) return;

    const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
    // Only update if visitor stayed on page for at least 1 second
    if (duration >= 1) {
      await supabase
        .from('page_views')
        .update({ duration_seconds: duration })
        .eq('id', viewId);
    }
  };

  useEffect(() => {
    const startNewView = async () => {
      // 1. Finalize the active view timer
      await endCurrentView();

      // 2. Generate new view details
      const viewId = crypto.randomUUID();
      currentViewIdRef.current = viewId;
      startTimeRef.current = Date.now();

      const sessionId = getSessionId();
      const payload = {
        id: viewId,
        session_id: sessionId,
        url: window.location.pathname + window.location.search,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent
      };

      await supabase.from('page_views').insert([payload]);
    };

    startNewView();

    return () => {
      endCurrentView();
    };
  }, [location.pathname, location.search]);

  // Record duration if user closes the tab, hides the window, or navigates away
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        endCurrentView();
      } else if (document.visibilityState === 'visible') {
        // Reset timer start when returning to the tab
        startTimeRef.current = Date.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null;
};
