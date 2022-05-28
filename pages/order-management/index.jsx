import {
    faChevronDown,
    faCircleInfo,
    faDownload,
    faSearch,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Mainlayout from '@/components/Layouts/MainLayout'
import Card from '@/components/Card/Card'

const tooltips = (
    <span>
        All current and historical POs are displayed.
        <br /> You may search them by item or PO no.
    </span>
)

const renderCell = (val) => (
    <span
        key={val}
        className={`${
            val === 'Open'
                ? 'border-2 border-blue-300 bg-blue-100 text-blue-500'
                : val === 'Scheduled'
                ? 'border-2 border-purple-300 bg-purple-100 text-maha-500'
                : 'border-2 border-gray-300 bg-gray-100 text-gray-500'
        }  mr-1 rounded-md px-2 py-0.5 font-semibold`}
    >
        {val}
    </span>
)

function LinkDownload({ link, label }) {
    if (link) {
        return (
            <Link href={link} passHref>
                <span className="px-2 py-1 font-semibold text-green-700 bg-green-100 rounded cursor-pointer whitespace-nowrap">
                    <FontAwesomeIcon icon={faDownload} /> {label}
                </span>
            </Link>
        )
    }
}

function OrderByPo({ items }) {
    function renderDateReceive(str) {
        const d = str.slice(0, 10)
        const date = new Date(d)
        const poDate = `${
            date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
        }-${
            date.getMonth() < 9
                ? `0${date.getMonth() + 1}`
                : date.getMonth() + 1
        }-${date.getFullYear()}`
        return poDate
    }

    const [isExpanded, setIsExpanded] = useState(false)

    const handleClick = () => {
        setIsExpanded(() => !isExpanded)
    }
    return (
        <div className="flex h-[64vh] flex-col rounded-lg">
            <div className="flex-grow overflow-auto rounded-md border-[1px]">
                <table className="relative w-full text-xs">
                    <thead>
                        <tr className="text-left uppercase">
                            <th className="sticky top-0 w-3 px-6 py-3 text-gray-400 bg-gray-100" />
                            <th className="sticky top-0 px-6 py-3 text-gray-400 bg-gray-100">
                                po
                            </th>
                            <th className="sticky top-0 px-6 py-3 text-gray-400 bg-gray-100">
                                po received
                            </th>
                            <th className="sticky top-0 px-6 py-3 text-gray-400 bg-gray-100">
                                status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white-100">
                        {items.map((data, idx) => (
                            <tr
                                key={data.poNumber}
                                className="hover:bg-gray-100"
                            >
                                <td className="px-6 py-1.5 text-left">
                                    <Tooltip content="Details" placement="left">
                                        <button
                                            className={` inline-flex items-center rounded py-2 px-2 font-bold ${
                                                isExpanded
                                                    ? 'bg-green-400 text-white hover:bg-green-100 hover:text-gray-600'
                                                    : 'bg-gray-100 text-gray-400 hover:bg-gray-300'
                                            }`}
                                            onClick={handleClick}
                                        >
                                            <FontAwesomeIcon
                                                icon={faChevronDown}
                                                transform={
                                                    isExpanded
                                                        ? { rotate: 180 }
                                                        : { rotate: 0 }
                                                }
                                            />
                                        </button>
                                    </Tooltip>
                                </td>
                                <td className="px-6 py-1.5 text-left">
                                    {data.poNumber}
                                </td>
                                <td className="px-6 py-1.5 text-left">
                                    {renderDateReceive(data.poReceived)}
                                </td>
                                <td className="whitespace-nowrap px-6 py-1.5 text-left">
                                    {renderCell(data.poStatus)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

// Order by item stat
function OrderByItem({ items }) {
    return (
        <div className="flex h-[64vh] flex-col rounded-lg">
            <div className="flex-grow overflow-auto rounded-md border-[1px]">
                <table className="relative w-full text-xs">
                    <thead>
                        <tr className="text-left uppercase">
                            <th className="sticky top-0 w-3 px-6 py-3 text-gray-400 bg-gray-100" />
                            <th className="sticky top-0 px-6 py-3 text-gray-400 bg-gray-100">
                                name
                            </th>
                            <th className="sticky top-0 px-6 py-3 text-gray-400 bg-gray-100">
                                status
                            </th>
                            <th className="sticky top-0 px-6 py-3 text-gray-400 bg-gray-100">
                                download
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white-100">
                        {items.map((data, idx) => (
                            <ItemsByItem key={idx} data={data} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function ItemsByItem({ data }) {
    const [isExpanded, setIsExpanded] = useState(false)

    const handleClick = () => {
        setIsExpanded(() => !isExpanded)
    }

    return (
        <>
            <tr key={data.itemCode} className="hover:bg-gray-100">
                <td className="px-6 py-1.5 text-left">
                    <Tooltip content="Details" placement="left">
                        <button
                            className={` inline-flex items-center rounded py-2 px-2 font-bold ${
                                isExpanded
                                    ? 'bg-green-400 text-white hover:bg-green-100 hover:text-gray-600'
                                    : 'bg-gray-100 text-gray-400 hover:bg-gray-300'
                            }`}
                            onClick={handleClick}
                        >
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                transform={
                                    isExpanded ? { rotate: 180 } : { rotate: 0 }
                                }
                            />
                        </button>
                    </Tooltip>
                </td>
                <td className="px-6 py-1.5 text-left">{data.itemName}</td>
                <td className="px-6 py-1.5 text-left">
                    {renderCell(data.poStatus)}
                </td>
                <td className="whitespace-nowrap px-6 py-1.5 text-left">
                    <LinkDownload link={data.tdsLink} label="TDS" />{' '}
                    <LinkDownload link={data.sdsLink} label="SDS" />
                </td>
            </tr>

            <OrderDetailByItem
                parentExpanded={isExpanded}
                details={data.details}
            />
        </>
    )
}

function OrderDetailByItem({ parentExpanded, details }) {
    const [isExpanded, setIsExpanded] = useState(parentExpanded)
    useEffect(() => setIsExpanded(() => parentExpanded), [parentExpanded])
    const renderStat = (val) => (
        <span
            className={`${
                val.toLowerCase() === 'unfulfilled'
                    ? 'border-[1px] border-red-300 bg-red-100 text-red-500'
                    : val.toLowerCase() === 'fulfilled'
                    ? 'border-[1px] border-green-300 bg-green-100 text-green-500'
                    : 'border-[1px] border-orange-300 bg-orange-100 text-orange-500'
            }  mr-1 rounded-md px-2 py-0.5 text-[0.6rem] font-semibold`}
        >
            {val}
        </span>
    )

    function renderDateReceive(str) {
        const d = str.slice(0, 10)
        const date = new Date(d)
        const poDate = `${
            date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
        }-${
            date.getMonth() < 9
                ? `0${date.getMonth() + 1}`
                : date.getMonth() + 1
        }-${date.getFullYear()}`
        return poDate
    }
    function renderColor(str) {
        const d = str.slice(0, 10)
        const date = new Date(d)
        const today = new Date()
        const color = date > today ? 'text-maha-purple font-semibold' : ''
        return color
    }

    return (
        <tr>
            <td
                colSpan={4}
                className={`${
                    !isExpanded ? 'hidden' : ''
                } bg-green-50 py-2 px-5`}
            >
                <div className="rounded-sm border-[1px]">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b-[1px] border-gray-200 bg-gray-50 text-left uppercase text-gray-400">
                                <th className="px-3 py-2 rounded-tl-md">
                                    P/O#
                                </th>
                                <th className="px-3 py-2">po received</th>
                                <th className="px-3 py-2">open qty</th>
                                <th className="px-3 py-2">total qty</th>
                                <th className="px-3 py-2">unit price</th>
                                <th className="px-3 py-2">total invoice</th>
                                <th className="px-3 py-2">item status</th>
                                <th className="px-3 py-2 rounded-tr-md">
                                    latest activity
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {details.map((detail, idx) => (
                                <tr
                                    key={idx}
                                    className="border-b-[1px] border-gray-200 bg-white hover:bg-gray-100"
                                >
                                    <td className="px-3 py-2 text-blue-500">
                                        {detail.poNumber}
                                    </td>
                                    <td className="px-3 py-2">
                                        {renderDateReceive(detail.poReceived)}
                                    </td>
                                    <td className="px-3 py-2">
                                        {`${detail.openQty.toLocaleString()} ${
                                            detail.uoM
                                        }`}
                                    </td>
                                    <td className="px-3 py-2">
                                        {`${detail.totalQty.toLocaleString()} ${
                                            detail.uoM
                                        }`}
                                    </td>
                                    <td className="px-3 py-2">
                                        {`${
                                            detail.currency
                                        } $${detail.unitPrice.toLocaleString()}/${
                                            detail.uoM
                                        }`}
                                    </td>
                                    <td className="px-3 py-2">
                                        {`${
                                            detail.currency
                                        } $${detail.totalInvoice.toLocaleString()}`}
                                    </td>
                                    <td className="px-3 py-2">
                                        {renderStat(detail.itemStatus)}
                                    </td>
                                    <td
                                        className={`px-3 py-2 ${renderColor(
                                            detail.activityDate
                                        )}`}
                                    >
                                        {`${renderDateReceive(
                                            detail.activityDate
                                        )} - ${detail.activityQty}${
                                            detail.uoM
                                        } ${detail.activity}`}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    )
}
// Order by item end

export default function OrderManagement({ orderByPo, orderByItem }) {
    const [openTab, setOpenTab] = useState('item')
    const [searchVal, setsearchVal] = useState('')

    const [filteredListItem, setFilteredListItem] = useState(orderByItem.data)
    const [filteredListPo, setFilteredListPo] = useState(orderByPo.data)
    const handleSearch = (event, by) => {
        let result
        const value = event.target.value.toUpperCase()
        if (by === 'item') {
            result = orderByItem.data.filter(
                (data) =>
                    data.itemName.search(value) !== -1 ||
                    data.details.some(
                        (det) => det.poNumber.search(value) !== -1
                    )
            )
            setFilteredListItem(result)
        } else {
            result = orderByPo.data.filter(
                (data) =>
                    data.poNumber.search(value) !== -1 ||
                    data.details.some(
                        (det) => det.itemName.search(value) !== -1
                    )
            )
            setFilteredListPo(result)
        }
    }

    return (
        <Mainlayout pageTitle="Order Management">
            {/* Title */}
            <div className="flex items-center py-3 font-semibold text-maha-500">
                All Orders{' '}
                <Tooltip content={tooltips} placement="right">
                    <span className="ml-2 text-gray-400">
                        <FontAwesomeIcon icon={faCircleInfo} />
                    </span>
                </Tooltip>
            </div>
            {/* Order */}
            <div className="flex flex-col space-x-0 space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
                <div className="basis-4/5">
                    <Card>
                        <div className="flex flex-wrap">
                            <div className="w-full">
                                {/* Filter */}
                                <div className="flex items-center mb-2 space-x-1 text-xs">
                                    {/* Tabs */}
                                    <div className="flex items-center justify-start w-2/4 font-semibold text-gray-600">
                                        <ul
                                            className="flex flex-row mb-0 list-none"
                                            role="tablist"
                                        >
                                            <li className="flex-auto -mb-px text-center last:mr-0">
                                                <a
                                                    className={`block space-x-2 px-3 py-3 text-xs font-bold leading-normal ${
                                                        openTab === 'item'
                                                            ? `border-b-2 border-green-600 text-gray-600`
                                                            : `text-gray-400`
                                                    }`}
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        setOpenTab('item')
                                                        setFilteredListItem(
                                                            orderByItem.data
                                                        )
                                                        setsearchVal('')
                                                    }}
                                                    data-toggle="tab"
                                                    href="#byItem"
                                                    role="tablist"
                                                >
                                                    <span className="whitespace-nowrap">
                                                        By Item
                                                    </span>
                                                    <span
                                                        className={`${
                                                            openTab === 'item'
                                                                ? 'bg-green-50 text-green-600'
                                                                : 'bg-gray-100'
                                                        } rounded-md px-1 py-0.5`}
                                                    >
                                                        {
                                                            filteredListItem.length
                                                        }
                                                    </span>
                                                </a>
                                            </li>
                                            <li className="flex-auto -mb-px text-center last:mr-0">
                                                <a
                                                    className={`block space-x-2 px-3 py-3 text-xs font-bold leading-normal ${
                                                        openTab === 'po'
                                                            ? `border-b-2 border-green-600 text-gray-600`
                                                            : `text-gray-400`
                                                    }`}
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        setOpenTab('po')
                                                        setFilteredListPo(
                                                            orderByPo.data
                                                        )
                                                        setsearchVal('')
                                                    }}
                                                    data-toggle="tab"
                                                    href="#byPo"
                                                    role="tablist"
                                                >
                                                    <span className="whitespace-nowrap">
                                                        By PO
                                                    </span>
                                                    <span
                                                        className={`${
                                                            openTab === 'po'
                                                                ? 'bg-green-50 text-green-600'
                                                                : 'bg-gray-100'
                                                        } rounded-md px-1 py-0.5`}
                                                    >
                                                        {filteredListPo.length}
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* Search */}
                                    <div className="flex justify-end invisible w-2/4 sm:visible">
                                        <div>
                                            <span className="absolute text-gray-300 transform translate-y-1/2 pointer-events-none">
                                                <FontAwesomeIcon
                                                    icon={faSearch}
                                                />
                                            </span>
                                            <input
                                                type="text"
                                                name="search"
                                                id="search"
                                                onChange={(event) => {
                                                    handleSearch(event, openTab)
                                                    setsearchVal(
                                                        event.target.value
                                                    )
                                                }}
                                                value={searchVal}
                                                placeholder="Search"
                                                className="w-full px-3 py-2 placeholder-gray-300 border-b-2 border-gray-300 pl-7 focus:border-green-700 focus:outline-none focus:ring-0 "
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Content */}
                                <div className="relative flex flex-col w-full min-w-0 break-words bg-white">
                                    <div className="flex-auto">
                                        <div
                                            className={
                                                openTab === 'item'
                                                    ? ''
                                                    : 'hidden'
                                            }
                                            id="byItem"
                                        >
                                            <OrderByItem
                                                items={filteredListItem}
                                            />
                                        </div>
                                        <div
                                            className={
                                                openTab === 'po' ? '' : 'hidden'
                                            }
                                            id="byPo"
                                        >
                                            <OrderByPo items={filteredListPo} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                {/* Summary */}
                {/* <Summary sum={dataOrderByPo.data[0]} /> */}
            </div>
        </Mainlayout>
    )
}

export async function getServerSideProps(ctx) {
    // SAP url
    const SAP_API = process.env.NEXT_PUBLIC_SAP_URL
    // get token SAP
    const { sapToken } = ctx.req.cookies
    // set params
    const rcc = 'MCA'
    const custgroup = 'NIPPON'
    // set headers authorize
    const headers = { Authorization: `Bearer ${sapToken}` }
    const [poRes, itemRes] = await Promise.all([
        fetch(
            `${SAP_API}/Orders/GetOrdersByPO?rcc=${rcc}&custgroup=${custgroup}`,
            {
                headers,
            }
        ),
        fetch(
            `${SAP_API}/Orders/GetOrdersByItem?rcc=${rcc}&custgroup=${custgroup}`,
            {
                headers,
            }
        ),
    ])
    const [orderByPo, orderByItem] = await Promise.all([
        poRes.json(),
        itemRes.json(),
    ])
    return {
        props: { orderByPo, orderByItem },
    }
}
