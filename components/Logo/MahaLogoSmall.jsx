import Image from 'next/image'
import MahaLogoSmall from '../../public/maha-logo-small.png'

export default function Mahalogosmall({ width, height }) {
    return <Image src={MahaLogoSmall} width={width} height={height} />
}
