import { useEffect, useState } from 'react'

function useIsMobile() {
    const mobileWidthBoundary = 768
    const [isMobile, setIsMobile] = useState<boolean>(
        window.innerWidth <= mobileWidthBoundary
    )

    function handleWindowSizeChange() {
        if (window.innerWidth <= mobileWidthBoundary) {
            setIsMobile(true)
        } else if (window.innerWidth > mobileWidthBoundary) {
            setIsMobile(false)
        }
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange)
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange)
        }
    }, [])

    return isMobile
}

export default useIsMobile
