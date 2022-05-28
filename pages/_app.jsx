import '../styles/globals.css'
import ProgressBar from '@badrap/bar-of-progress'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { AuthProvider } from '@/context/AuthContext'

const progress = new ProgressBar({
    size: 3,
    color: '#8CC73F',
    className: 'z-50',
    delay: 100,
})

// Router.events.on('routeChangeStart', progress.start)
// Router.events.on('routeChangeComplete', progress.finish)
// Router.events.on('routeChangeError', progress.finish)

function MyApp({ Component, pageProps }) {
    const router = useRouter()

    useEffect(() => {
        router.events.on('routeChangeStart', progress.start)
        router.events.on('routeChangeComplete', progress.finish)
        router.events.on('routeChangeError', progress.finish)

        return () => {
            router.events.off('routeChangeStart', progress.start)
            router.events.off('routeChangeComplete', progress.finish)
            router.events.off('routeChangeError', progress.finish)
        }
    }, [router])
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    )
}

export default MyApp
