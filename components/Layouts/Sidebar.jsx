import {
    faChartBar,
    faDollarSign,
    faFileInvoiceDollar,
    faInfoCircle,
    faOutdent,
    faShoppingCart,
    faThumbsUp,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip } from '@nextui-org/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Mahalogosmall from '../Logo/MahaLogoSmall'

export default function Sidebar() {
    const [openSidebar, setOpenSidebar] = useState(false)
    const handleSidebar = () => {
        setOpenSidebar(!openSidebar)
    }
    // router
    const router = useRouter()
    const classLink =
        'flex w-full px-3 py-5 font-medium text-slate-500 hover:bg-slate-100 hover:border-r-maha-500 hover:border-r-2'
    return (
        <aside
            className={`top-0 shadow left-0 duration-500 bg-white min-h-screen h-full z-50 ${
                openSidebar ? 'w-20 sm:w-64' : 'hidden sm:block w-20'
            }`}
        >
            {/* sidebar close button */}
            <button
                type="button"
                className={`my-auto top-0 h-16 text-gray-500 transition hover:text-maha-purple absolute duration-500 ${
                    openSidebar ? 'left-60 delay-700' : 'w-auto sm:left-24'
                }`}
                onClick={handleSidebar}
            >
                <FontAwesomeIcon
                    icon={faOutdent}
                    fixedWidth
                    size="lg"
                    transform={openSidebar ? { rotate: 0 } : { rotate: 180 }}
                />
            </button>
            {/* Logo */}
            <div className="flex justify-center h-16 px-3 py-3">
                <Mahalogosmall width={40} height={40} />
            </div>
            {/* Navigation */}
            <nav
                className={`flex flex-col ${
                    openSidebar ? 'gap-y-0' : 'gap-y-3'
                }`}
            >
                <Image src="/line.svg" width={90} height={10} />
                {[
                    ['Dashboard', '/dashboard', faChartBar],
                    ['Order Management', '/order-management', faShoppingCart],
                    ['Invoices', '/invoices', faDollarSign],
                    [
                        'Product Information',
                        '/product-information',
                        faFileInvoiceDollar,
                    ],
                    ['Recommendations', '/recommendations', faInfoCircle],
                    ['Quotations', '/quotations', faThumbsUp],
                ].map(([title, url, icon]) => (
                    <a key={title} href={url}>
                        <span>
                            <Tooltip
                                content={title}
                                placement="right"
                                contentColor="secondary"
                                animated
                            >
                                <span
                                    className={`hover:text-maha-500 ${classLink} ${
                                        router.pathname === url
                                            ? 'text-maha-500 border-maha-500 border-r-4'
                                            : ''
                                    } ${
                                        openSidebar
                                            ? 'justify-start gap-2 items-center'
                                            : 'justify-center'
                                    }`}
                                >
                                    <FontAwesomeIcon icon={icon} fixedWidth />
                                    <span
                                        className={`${
                                            openSidebar ? 'visible' : 'hidden'
                                        }`}
                                    >
                                        {title}
                                    </span>
                                </span>
                            </Tooltip>
                        </span>
                    </a>
                ))}
            </nav>
        </aside>
    )
}
