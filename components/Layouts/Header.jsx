import {
    faBell,
    faMagnifyingGlass,
    faPowerOff,
    faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useContext } from 'react'
import { Tooltip } from '@nextui-org/react'
import AuthContext from '@/context/AuthContext'

export default function Header() {
    const today = new Date()
    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
        }
        return new Date(dateString).toLocaleDateString('en-US', options)
    }

    const [openProfile, setOpenProfile] = useState(false)
    const handleProfile = () => setOpenProfile(!openProfile)

    const { logout, user, isLoading } = useContext(AuthContext)

    return (
        <header className="z-10 flex justify-between h-16 px-4 py-2 text-xs text-gray-500 shadow">
            <div className="my-auto ml-12">
                {/* Search */}
                <div className="flex items-center justify-between invisible px-4 pl-10 sm:visible">
                    <span className="absolute text-gray-500">
                        <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
                    </span>
                    <input
                        placeholder="Search anything"
                        className="w-full px-3 py-2 placeholder-gray-400 pl-7 focus:outline-none"
                    />
                </div>
            </div>
            <div className="my-auto">
                <div className="flex items-center">
                    {/* Date */}
                    <div className="hidden px-4 sm:block">
                        {formatDate(today)}
                    </div>

                    {/* Notification */}
                    {/* <div className="px-4">
                        <FontAwesomeIcon icon={faBell} />
                    </div> */}

                    {/* navbar user */}
                    <div className="flex items-center pr-4 space-x-4">
                        <span className="px-3 py-2 bg-gray-100 rounded-full">
                            <FontAwesomeIcon icon={faUser} />
                        </span>{' '}
                        <span
                            className="hidden cursor-pointer sm:block"
                            onClick={handleProfile}
                        >
                            {user?.name}
                        </span>
                        <Tooltip
                            content="Logout"
                            placement="left"
                            color="error"
                        >
                            <span
                                className={`${
                                    !openProfile ? 'hidden' : ''
                                } cursor-pointer hover:text-red-600 text-red-400 font-bold`}
                                onClick={() => logout()}
                            >
                                {isLoading ? (
                                    <FontAwesomeIcon
                                        icon={faPowerOff}
                                        size="lg"
                                        spin
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        icon={faPowerOff}
                                        size="lg"
                                    />
                                )}
                            </span>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </header>
    )
}
