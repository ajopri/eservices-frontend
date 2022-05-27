import Header from '@components/Layouts/Header'
import Sidebar from '@components/Layouts/Sidebar'
import Head from 'next/head'

export default function Mainlayout({ children, pageTitle }) {
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
                    <Header />
                    <div className="container flex flex-col h-full px-4 py-4 mx-auto bg-content">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
