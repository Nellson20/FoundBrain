import { useState, useEffect, useCallback,useRef } from 'react';

const useSafeState = (initialV = null) => {
    const isMounted = useRef(true);
    const [state, setState] = useState(initialV)
    useEffect(() => () => (isMounted.current = false), [])
    const setStateSafe = useCallback((value) => {
        if(isMounted.current){
            setState(value);
        }
    })
    return [state,setStateSafe]
}
export default useSafeState