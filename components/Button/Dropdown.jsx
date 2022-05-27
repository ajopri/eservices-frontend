import Link from 'next/link'

const DropdownLink = ({ children, ...props }) =>
    function ({ active }) {
        return (
            <Link {...props}>
                <a
                    href="#"
                    className={`w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 ${
                        active ? 'bg-gray-100' : ''
                    } focus:outline-none transition duration-150 ease-in-out`}
                >
                    {children}
                </a>
            </Link>
        )
    }

export const DropdownButton = ({ children, ...props }) =>
    function ({ active }) {
        return (
            <button
                className={`w-full text-left block px-4 py-2 text-sm leading-5 text-gray-700 ${
                    active ? 'bg-gray-100' : ''
                } focus:outline-none transition duration-150 ease-in-out`}
                {...props}
            >
                {children}
            </button>
        )
    }

export default DropdownLink
