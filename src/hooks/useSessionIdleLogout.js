import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const IDLE_EVENTS = [
  'mousemove',
  'mousedown',
  'keydown',
  'scroll',
  'touchstart',
];

export default function useSessionIdleLogout(timeout = 120000) {
  const navigate = useNavigate();
  const location = useLocation();
  const timerRef = useRef(null);

  const logout = () => {
    localStorage.removeItem('token');
    if (location.pathname !== '/login') {
      navigate('/login', { replace: true });
    }
  };

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(logout, timeout);
  };
  useEffect(() => {
    resetTimer();

    IDLE_EVENTS.forEach(ev =>
      window.addEventListener(ev, resetTimer)
    );

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      IDLE_EVENTS.forEach(ev =>
        window.removeEventListener(ev, resetTimer)
      );
    };
  }, [timeout]);
}
