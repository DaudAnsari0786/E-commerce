import { useEffect, useState, useCallback } from 'react';
import { getOrders, subscribe } from '../utils/orderStore';
import { useUser } from '../context/UserContext';

/**
 * Auto-reloading orders hook.
 * - Filters orders by the logged-in user's email.
 * - Refetches on:
 *     • orderStore updates (addOrder / updateOrderStatus)
 *     • window focus
 *     • document visibility change
 */
export const useOrdersAutoReload = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState(() => getOrders());
  const [loading, setLoading] = useState(false);
  const [lastLoaded, setLastLoaded] = useState(new Date());

  const reload = useCallback(() => {
    setLoading(true);

    // Tiny async tick so the loading bar is visible
    setTimeout(() => {
      const all = getOrders();
      const mine = user?.email
        ? all.filter((o) => o.userEmail === user.email)
        : all;
      setOrders(mine);
      setLastLoaded(new Date());
      setLoading(false);
    }, 150);
  }, [user?.email]);

  useEffect(() => {
    reload();

    const unsubscribe = subscribe(reload);
    const onFocus = () => reload();
    const onVis = () => {
      if (document.visibilityState === 'visible') reload();
    };

    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVis);

    return () => {
      unsubscribe();
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [reload]);

  return { orders, loading, lastLoaded, reload };
};