import Card from '@components/Card/Card'
import Searchinput from '@components/Inputs/SearchInput'
import Mainlayout from '@components/Layouts/MainLayout'
import Maintitle from '@components/Typography/MainTitle'
import Subtitle from '@components/Typography/SubTitle'
import { faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip } from '@nextui-org/react'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import ReactCountryFlag from 'react-country-flag'

const Bar = dynamic(() => import('@/components/Graph/Bar'), {
    ssr: false,
})

function renderDate(str) {
    const d = str.slice(0, 10)
    const date = new Date(d)
    const poDate = `${
        date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    }-${
        date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }-${date.getFullYear()}`
    return poDate
}

function OrderDetails({ parentExpanded, details }) {
    const [isExpanded, setIsExpanded] = useState(parentExpanded)
    useEffect(() => setIsExpanded(() => parentExpanded), [parentExpanded])
    const renderStat = (val) => (
        <span
            className={`${
                val.toLowerCase() === 'unfulfilled'
                    ? 'border-red-300 bg-red-100 text-red-500'
                    : val.toLowerCase() === 'fulfilled'
                    ? 'border-green-300 bg-green-100 text-green-500'
                    : 'border-orange-300 bg-orange-100 text-orange-500'
            } mr-1 rounded-md border-[1px] px-2 py-0.5 text-[0.6rem] font-semibold`}
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
        const color = date > today ? 'text-maha-500 font-semibold' : ''
        return color
    }
    return (
        <tr>
            <td
                colSpan={4}
                className={`${
                    !isExpanded ? 'hidden' : ''
                } bg-green-50 py-2 px-5 text-[10px]`}
            >
                <div className="rounded-sm border-[1px]">
                    <table className="w-full">
                        <thead>
                            <tr className="whitespace-nowrap border-b-[1px] border-gray-200 bg-gray-50 text-left uppercase text-gray-400">
                                <th className="px-3 py-2 rounded-tl-md">
                                    item
                                </th>
                                <th className="px-3 py-2">open qty</th>
                                <th className="px-3 py-2">total qty</th>
                                <th className="px-3 py-2">total invoice</th>
                                <th className="px-3 py-2">item status</th>
                                <th className="px-3 py-2 rounded-tr-md">
                                    scheduled delivery
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {details.map((detail, idx) => (
                                <tr
                                    key={idx}
                                    className="border-b-[1px] border-gray-200 bg-white hover:bg-gray-100"
                                >
                                    <td className="px-3 py-2">
                                        {detail.itemName}
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
                                        )} - ${
                                            detail.activityQty !== null
                                                ? detail.activityQty.toLocaleString()
                                                : '0.00'
                                        }${detail.uoM} ${detail.activity}`}
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

function Items({ data }) {
    const [isExpanded, setIsExpanded] = useState(false)

    const handleClick = () => {
        setIsExpanded(() => !isExpanded)
    }

    const renderStatItem = (val) => (
        <span
            className={`${
                val.toLowerCase() === 'open'
                    ? 'border-blue-300 bg-blue-100 text-blue-500'
                    : val.toLowerCase() === 'scheduled'
                    ? 'border-purple-300 bg-purple-100 text-maha-500'
                    : 'border-gray-300 bg-gray-100 text-gray-500'
            } mr-1 rounded-md border-[1px] px-2 py-0.5 text-[0.6rem] font-semibold`}
        >
            {val}
        </span>
    )

    return (
        <>
            <tr key={data.poNumber} className="text-left hover:bg-gray-100">
                <td className="px-6 py-1.5">
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
                <td className="px-6 py-1.5 font-semibold text-blue-500">
                    {data.poNumber}
                </td>
                <td className="px-6 py-1.5">{renderDate(data.poReceived)}</td>
                <td className="px-6 py-1.5">{renderStatItem(data.poStatus)}</td>
            </tr>
            <OrderDetails parentExpanded={isExpanded} details={data.details} />
        </>
    )
}

function Orders({ datas }) {
    return (
        <div className="flex h-[64vh] flex-col rounded-lg pt-2">
            <div className="flex-grow overflow-auto rounded-md border-[1px]">
                <table className="relative w-full text-xs">
                    <thead>
                        <tr className="text-left uppercase">
                            <th className="sticky top-0 px-6 py-3 text-gray-400 bg-gray-100" />
                            <th className="sticky top-0 px-6 py-3 text-gray-400 bg-gray-100">
                                p/o#
                            </th>
                            <th className="sticky top-0 px-6 py-3 text-gray-400 bg-gray-100">
                                po received
                            </th>
                            <th className="sticky top-0 px-6 py-3 text-gray-400 bg-gray-100">
                                po status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white-100">
                        {datas.map((item, idx) => (
                            <Items key={idx} data={item} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function Account({ detail }) {
    return (
        <>
            <div className="flex items-center justify-start">
                <div className="mr-3">
                    <ReactCountryFlag
                        countryCode={detail.currency.slice(0, 2)}
                        svg
                        cdnUrl="https://hatscripts.github.io/circle-flags/flags/"
                        style={{
                            width: '1.5em',
                            height: '1.5em',
                        }}
                        title={detail.currency}
                    />
                </div>
                <div className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold uppercase text-gray-500">
                    {detail.currency} Account
                </div>
            </div>
            <div className="w-full pt-1 text-xl font-bold text-gray-800 whitespace-nowrap sm:text-2xl">
                {detail.currency.slice(0, 2)}$ {detail.payable.toLocaleString()}
            </div>
        </>
    )
}

function TableInv({ invoices }) {
    const renderCell = (val) => (
        <span
            className={`${
                val === 'Overdue'
                    ? 'border-red-300 bg-red-100 text-red-500'
                    : 'border-orange-300 bg-orange-100 text-orange-500'
            } mr-1 rounded-lg border-[1px] px-2 py-0.5 font-semibold`}
        >
            {val}
        </span>
    )
    const renderDueIn = (val, stat) => (
        <span
            className={`${
                stat === 'Overdue' ? 'text-red-500' : 'text-orange-500'
            }  mr-1 px-2 py-0.5 font-semibold`}
        >
            {val}
        </span>
    )
    return (
        <div className="h-44 overflow-auto rounded-md border-[1px] text-[9px]">
            <table className="relative w-full">
                <thead>
                    <tr>
                        <th className="sticky top-0 px-2 py-2 font-semibold text-left text-gray-500 uppercase bg-gray-100 rounded-tl-md">
                            invoice#
                        </th>
                        <th className="sticky top-0 px-2 py-2 font-semibold text-left text-gray-500 uppercase bg-gray-100">
                            due date
                        </th>
                        <th className="sticky top-0 px-2 py-2 font-semibold text-left text-gray-500 uppercase bg-gray-100">
                            status
                        </th>
                        <th className="sticky top-0 px-2 py-2 font-semibold text-left text-gray-500 uppercase bg-gray-100">
                            due in
                        </th>
                        <th className="sticky top-0 px-2 py-2 font-semibold text-left text-gray-500 uppercase bg-gray-100 rounded-tr-md">
                            amount due
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.data.map((inv, idx) => (
                        <tr key={idx} className="hover:bg-gray-100">
                            <td className="px-3 py-2">
                                <span className="font-semibold text-blue-800">
                                    {inv.invNumber}
                                </span>
                            </td>
                            <td className="px-3 py-2">
                                {renderDate(inv.dueDate)}
                            </td>
                            <td className="px-3 py-2">
                                {renderCell(inv.invStatus)}
                            </td>
                            <td className="px-3 py-2">
                                {renderDueIn(inv.dueIn, inv.invStatus)}
                            </td>
                            <td className="px-3 py-2">
                                {inv.amountDue.toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default function Index({ orders, outstandings, invoices, payables }) {
    const payable = payables.data
    const [item, setItem] = useState(orders.data)
    const [count, setCount] = useState(0)
    const [openTab, setOpenTab] = useState(1)
    const capitalize = (str) => {
        const lower = str.toLowerCase()
        return str.charAt(0).toUpperCase() + lower.slice(1)
    }

    const filterItem = (curcat) => {
        const tempItem = orders.data.filter((newVal) =>
            newVal.poStatus.includes(capitalize(curcat))
        )
        const newItem = curcat === 'All' ? orders.data : tempItem
        setItem(newItem)
        setCount(newItem.length)
    }

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase()
        let result = []
        result = orders.data.filter(
            (data) => data.poNumber.search(value) !== -1
        )
        setItem(result)
    }

    const [openTabBar, setOpenTabBar] = useState(payable[0].foreignCurrency)
    let LC = []
    let FC = []
    payable.map((data) => {
        LC = [
            { day: '90+ days', amount: data.aging_90_LC, color: '#DE1B1B' },
            { day: '61-90 days', amount: data.aging_61_90LC, color: '#FA8E8E' },
            { day: '31-60 days', amount: data.aging_31_60LC, color: '#F5BC76' },
            { day: '0-30 days', amount: data.aging_0_30LC, color: '#FFDE86' },
            {
                day: 'Not Due',
                amount: data.aging_Future_RemitLC,
                color: '#8CC73F',
            },
        ]
        FC = [
            { day: '90+ days', amount: data.aging_90_FC, color: '#DE1B1B' },
            { day: '61-90 days', amount: data.aging_61_90FC, color: '#FA8E8E' },
            { day: '31-60 days', amount: data.aging_31_60FC, color: '#F5BC76' },
            { day: '0-30 days', amount: data.aging_0_30FC, color: '#FFDE86' },
            {
                day: 'Not Due',
                amount: data.aging_Future_RemitFC,
                color: '#8CC73F',
            },
        ]
    })

    return (
        <Mainlayout pageTitle="Dashboard">
            <Maintitle title="Dashboard" />
            <div className="flex gap-2">
                {/* Open Orders */}
                <div className="w-4/6 space-y-3">
                    <Subtitle
                        title="Open Orders"
                        content="Only outstanding & unfulfilled orders are displayed."
                        placement="right"
                    />
                    <Card additionalWrapperClasses="text-xs">
                        <div className="flex items-center justify-between">
                            <ul
                                className="flex flex-row flex-wrap pb-2 mb-0 list-none"
                                role="tablist"
                            >
                                {[
                                    [1, 'All', item.length],
                                    [2, 'Scheduled', count],
                                ].map(([idx, title, total]) => (
                                    <li
                                        key={idx}
                                        className="flex-auto -mb-px text-center last:mr-0"
                                    >
                                        <a
                                            className={`block px-4 py-2 text-xs font-bold capitalize leading-normal ${
                                                openTab === idx
                                                    ? 'rounded-tr-md rounded-tl-md border-b-2 border-maha-green-500 text-gray-700'
                                                    : 'bg-white text-gray-400'
                                            }`}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setOpenTab(idx)
                                                filterItem(title)
                                            }}
                                            data-toggle="tab"
                                            href={`#${title.toLowerCase()}`}
                                            role="tablist"
                                        >
                                            {title}{' '}
                                            <span
                                                className={`px-1 rounded ${
                                                    openTab === idx
                                                        ? 'text-maha-green-500 bg-maha-green-100'
                                                        : 'text-gray-500 bg-gray-100'
                                                }`}
                                            >
                                                {total}
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <div>
                                <span className="absolute text-gray-300 transform translate-y-1/2 pointer-events-none">
                                    <FontAwesomeIcon icon={faSearch} />
                                </span>
                                <Searchinput
                                    placeholder="Search"
                                    onChange={(event) => handleSearch(event)}
                                />
                            </div>
                        </div>
                        <div>
                            {[
                                [1, 'All', item.length],
                                [2, 'Scheduled', count],
                            ].map(([idx, title, total]) => (
                                <div
                                    key={idx}
                                    className={`${
                                        openTab === idx ? '' : 'hidden'
                                    }`}
                                >
                                    <Orders datas={item} />
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Total outstanding payables */}
                <div className="w-2/6 space-y-3">
                    <Subtitle
                        title="Total Outstanding Payables"
                        content="Only outstanding & overdue invoices are displayed."
                        placement="top"
                    />
                    <div className="flex gap-2">
                        {outstandings.details.map((detail, idx) => (
                            <div key={idx} className="w-1/2">
                                <Card>
                                    <Account detail={detail} />
                                </Card>
                            </div>
                        ))}
                    </div>
                    <Card>
                        <div className="flex flex-col">
                            {/* Title */}
                            <div className="text-sm font-semibold text-gray-600">
                                Account Payable by Age
                            </div>
                            {/* Tabs */}
                            <div>
                                <div className="w-full">
                                    <ul
                                        className="flex flex-row flex-wrap pt-3 pb-2 mb-0 list-none"
                                        role="tablist"
                                    >
                                        <li className="flex-auto -mb-px text-center last:mr-0">
                                            <a
                                                className={`block px-5 py-3 text-xs font-bold uppercase leading-normal ${
                                                    openTabBar ===
                                                    payable[0].foreignCurrency
                                                        ? 'rounded-tr-md rounded-tl-md border-b-2 border-maha-500 bg-maha-500 text-white'
                                                        : 'border-b-2 border-maha-500 bg-white text-gray-500'
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    setOpenTabBar(
                                                        payable[0]
                                                            .foreignCurrency
                                                    )
                                                }}
                                                data-toggle="tab"
                                                href={`#${payable[0].foreignCurrency}`}
                                                role="tablist"
                                            >
                                                {payable[0].foreignCurrency}
                                            </a>
                                        </li>
                                        <li className="flex-auto -mb-px text-center last:mr-0">
                                            <a
                                                className={`block px-5 py-3 text-xs font-bold uppercase leading-normal ${
                                                    openTabBar ===
                                                    payable[0].localCurrency
                                                        ? 'rounded-tr-md rounded-tl-md border-b-2 border-maha-500 bg-maha-500 text-white'
                                                        : 'border-b-2 border-maha-500 bg-white text-gray-500'
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    setOpenTabBar(
                                                        payable[0].localCurrency
                                                    )
                                                }}
                                                data-toggle="tab"
                                                href={`#${payable[0].localCurrency}`}
                                                role="tablist"
                                            >
                                                {payable[0].localCurrency}
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="relative flex flex-col w-full min-w-0 mb-2 break-words bg-white ">
                                        <div className="flex-auto">
                                            <div className="tab-content tab-space">
                                                <div
                                                    className={
                                                        openTabBar ===
                                                        payable[0].localCurrency
                                                            ? 'block'
                                                            : 'hidden'
                                                    }
                                                    id={
                                                        payable[0].localCurrency
                                                    }
                                                >
                                                    <Bar
                                                        datas={LC}
                                                        cur={
                                                            payable[0]
                                                                .localCurrency
                                                        }
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        openTabBar ===
                                                        payable[0]
                                                            .foreignCurrency
                                                            ? 'block'
                                                            : 'hidden'
                                                    }
                                                    id={
                                                        payable[0]
                                                            .foreignCurrency
                                                    }
                                                >
                                                    <Bar
                                                        datas={FC}
                                                        cur={
                                                            payable[0]
                                                                .foreignCurrency
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Open Invoices */}
                            <TableInv invoices={invoices} />
                        </div>
                    </Card>
                </div>
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
    const params = {
        rcc: 'MCA',
        custgroup: 'NIPPON',
    }
    // set headers authorize
    const headers = { Authorization: `Bearer ${sapToken}` }

    // GET open PO
    const openPo = axios.get(`${SAP_API}/DashboardDRM/GetOpenPO`, {
        params,
        headers,
    })

    // GET Outstanding payable
    const outstandingPayable = axios.get(
        `${SAP_API}/Invoices/GetOutstandingPayables`,
        {
            params,
            headers,
        }
    )

    // GET Open Invoices
    const openInvoice = axios.get(`${SAP_API}/DashboardDRM/GetOpenInvoices`, {
        params,
        headers,
    })

    // GET payable by age
    const payableByAge = axios.get(`${SAP_API}/DashboardDRM/GetPayableByAge`, {
        params,
        headers,
    })

    const [order, outstanding, invoice, payable] = await Promise.all([
        openPo,
        outstandingPayable,
        openInvoice,
        payableByAge,
    ])

    return {
        props: {
            orders: order.data,
            outstandings: outstanding.data.data[0],
            invoices: invoice.data,
            payables: payable.data,
        },
    }
}
