import { useEffect, useRef } from 'react';

export const useEnter = <T extends HTMLElement>(handler: () => void) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref?.current;
    if (!el) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') handler();
    };

    el.addEventListener('keydown', onKeyDown);

    return () => el.removeEventListener('keydown', onKeyDown);
  }, [ref, handler]);

  return ref;
}
