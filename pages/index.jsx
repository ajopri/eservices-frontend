import Head from 'next/head'
import { useRouter } from 'next/router'
import Button from '@/components/Button/Button'
import Mahalogo from '@/components/Logo/MahaLogo'

export default function Home() {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>E-Services</title>
        <meta name="description" content="E-Services Maha Chemicals" />
      </Head>
      <div className="flex min-h-screen bg-maha-500">
        {/* Logo */}
        <div className="flex flex-col items-center justify-center w-full">
          <Mahalogo width={400} height={100} />
          <div className="flex flex-row justify-center gap-3 pt-3">
            <Button
              type="button"
              className="px-3 py-2 text-sm font-semibold bg-white rounded-md text-maha-500 hover:bg-maha-green-400 hover:text-white"
              onClick={() => router.push('/activate')}
            >
              activation
            </Button>
            <Button
              type="button"
              className="px-3 py-2 text-sm font-semibold bg-white rounded-md text-maha-500 hover:bg-maha-green-400 hover:text-white"
              onClick={() => router.push('/login')}
            >
              login
            </Button>
            <Button
              type="button"
              className="px-3 py-2 text-sm font-semibold bg-white rounded-md text-maha-500 hover:bg-maha-green-400 hover:text-white"
              onClick={() => router.push('/login/admin')}
            >
              admin
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
