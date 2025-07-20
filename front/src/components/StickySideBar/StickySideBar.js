import React, { useRef, useEffect, useContext } from 'react'
const StickySideBar = ({ children, top = 90, bottom = 20, className }) => {
    const sticky = useRef();
    const innitSticky = (sticky) => {
        if (sticky.current !== null) {
            if (sticky.current.offsetHeight <= document.body.offsetHeight - top) {
                sticky.current.style.top = top + 'px'
            } else {

                sticky.current.style.top = (top - Math.abs((top + sticky.current.offsetHeight + bottom) - document.body.offsetHeight)) + 'px'
            }
        }
    }
    useEffect(() => {

        if (sticky.current !== null) {

            innitSticky(sticky);


            window.document.body.onload = () => {
                innitSticky(sticky)
            }
            window.addEventListener('resize', () => {
                innitSticky(sticky)
                setTimeout(() => {
                    innitSticky(sticky)
                }, 500)
            })
            const timeout = setTimeout(() => {
                innitSticky(sticky)
            }, 200)
            return () => {
                clearTimeout(timeout)
            }

        }





    }, [children, sticky.current?.offsetHeight])

    useEffect(() => {
        const myObserver = new ResizeObserver(entries => {
            // this will get called whenever div dimension changes
            entries.forEach(entry => {
                innitSticky(sticky)
            });
        });

        // start listening to changes
        myObserver.observe(sticky.current);

        return () => {
            myObserver.disconnect();
        }
    }, [])
    return (
        <div className={'stickyBar ' + className} ref={sticky} style={{ position: 'sticky', height: 'auto', top: 0, left: 0, right: 0, transition: '.5s' }}>
            {
                (children) ? children : ''
            }
        </div>
    )
}

export default StickySideBar