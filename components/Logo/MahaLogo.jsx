import Image from 'next/image'
import Link from 'next/link'
import MahaLogoWhite from '../../public/maha-logo-white.png'

export default function Mahalogo({ width, height }) {
    return (
        <Link href="/">
            <a>
                <Image src={MahaLogoWhite} width={width} height={height} />
            </a>
        </Link>
    )
}
