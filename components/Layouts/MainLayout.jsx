import Header from '@components/Layouts/Header'
import Sidebar from '@components/Layouts/Sidebar'
import { useAuth } from 'hooks/auth'
import Head from 'next/head'

export default function Mainlayout({ children, pageTitle }) {
    const { user } = useAuth({ middleware: 'auth' })
    return (
        <>
            <Head>
                <title>E-Services | {pageTitle}</title>
                <meta name="description" content="E-Services Maha Chemicals" />
            </Head>
            {/* Main */}
            <div className="flex w-full min-h-screen bg-white">
                <Sidebar />
                <div className="flex flex-col w-full">
                    <Header user={user} />
                    <div className="container flex flex-col h-full px-4 py-4 mx-auto bg-content">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
