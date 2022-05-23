import Head from 'next/head'
import { useRouter } from 'next/router'
import Button from '../Button/Button'
import Countrydropdown from '../Inputs/CountryDropdown'
import Mahalogo from '../Logo/MahaLogo'

export default function Authlayout({ children, pageTitle }) {
    const router = useRouter()
    return (
        <>
            <Head>
                <title>E-Services | {pageTitle}</title>
                <meta name="description" content="E-Services Maha Chemicals" />
            </Head>
            <div className="flex min-h-screen bg-maha-500">
                {/* Logo */}
                <div className="flex flex-col items-center justify-center w-0 sm:w-5/12">
                    <Mahalogo width={400} height={100} />
                    <div className="flex flex-row justify-center gap-3 pt-3">
                        <Button
                            type="button"
                            className={`px-3 py-2 text-sm font-semibold bg-white rounded-md text-maha-500 hover:bg-maha-green-400 hover:text-white ${
                                router.pathname === '/activate' ||
                                router.pathname === '/activate/[token]'
                                    ? 'hidden'
                                    : ''
                            }`}
                            onClick={() => router.push('/activate')}>
                            activation
                        </Button>
                        <Button
                            type="button"
                            className={`px-3 py-2 text-sm font-semibold bg-white rounded-md text-maha-500 hover:bg-maha-green-400 hover:text-white ${
                                router.pathname === '/login' ? 'hidden' : ''
                            }`}
                            onClick={() => router.push('/login')}>
                            login
                        </Button>
                        <Button
                            type="button"
                            className={`px-3 py-2 text-sm font-semibold bg-white rounded-md text-maha-500 hover:bg-maha-green-400 hover:text-white ${
                                router.pathname === '/login/[admin]' ? 'hidden' : ''
                            }`}
                            onClick={() => router.push('/login/admin')}>
                            admin
                        </Button>
                    </div>
                </div>

                {/* Form */}
                <div className="sm:w-7/12 w-full bg-white sm:rounded-tl-[3.5rem] sm:rounded-bl-[3.5rem] rounded-none flex flex-col items-center justify-center">
                    <div className="absolute top-2 right-5">
                        <Countrydropdown />
                    </div>
                    {children}
                </div>
            </div>
        </>
    )
}
