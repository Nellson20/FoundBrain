import { useEffect } from 'react'

export default function useEventsOutside(ref, events, handler) {
    useEffect(() => {
        const listener = event => {
            const el = ref?.current;
            if (!el || el.contains(event.target)) {
                return;
            }
            handler(event);
        }
        events.forEach((e) => {
            document.addEventListener(e, listener);
        })
        return () => {
            events.forEach((e) => {
                document.removeEventListener(e, listener);
            })
        }
    }, [ref, handler]);
}