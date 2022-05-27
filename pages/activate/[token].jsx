import Authlayout from '@components/Layouts/AuthLayout'
import Primarybutton from '@components/Button/PrimaryButton'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Authvalidationerrors from '@/components/Layouts/AuthValidationErrors'
import Authsessionstatus from '@/components/Layouts/AuthSessionStatus'
import { useAuth } from '@/hooks/auth'

export default function Activate() {
    const router = useRouter()

    const { activateAccount } = useAuth({ middleware: 'guest' })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = (event) => {
        event.preventDefault()

        activateAccount({
            email,
            password,
            passwordConfirmation,
            setErrors,
            setStatus,
        })
    }

    useEffect(() => {
        setEmail(router.query.email || '')
    }, [router.query.email])

    return (
        <Authlayout pageTitle="Activate">
            {/* content */}
            <div className="flex flex-col px-10 w-96 sm:px-0">
                {/* title */}
                <div className="mb-6 text-left">
                    <h1 className="text-2xl font-bold text-gray-700 sm:text-3xl">
                        Activate your account
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Create a password to log into e-services.
                    </p>
                    {/* Session Status */}
                    <Authsessionstatus className="mb-4" status={status} />
                    {/* Validation Errors */}
                    <Authvalidationerrors errors={errors} />
                </div>
                <div className="sm:w-[21rem] w-fit">
                    <form className="mb-4" onSubmit={submitForm}>
                        <div className="mb-3">
                            <input
                                name="email"
                                id="email"
                                placeholder="Email"
                                readOnly
                                disabled
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                className="w-full px-3 py-2 text-gray-400 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                name="password"
                                id="password"
                                type="password"
                                value={password}
                                placeholder="Password"
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                name="password-confirmation"
                                id="password-confirmation"
                                type="password"
                                placeholder="Confirm password"
                                value={passwordConfirmation}
                                onChange={(event) =>
                                    setPasswordConfirmation(event.target.value)
                                }
                                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                            />
                        </div>
                        <div className="my-6">
                            <Primarybutton>activate</Primarybutton>
                        </div>
                        <p className="text-xs text-left text-gray-400">
                            <span>
                                This portal is reserved for MahaChem customers
                                only. Your account will be disabled until it’s
                                activated by you.
                                <Link href="/" passHref>
                                    <span className="font-light text-indigo-500 cursor-pointer focus:text-indigo-600 focus:outline-none focus:underline hover:font-normal">
                                        {' '}
                                        Learn more
                                    </span>
                                </Link>
                            </span>
                        </p>
                    </form>
                </div>
            </div>
            {/* end content */}
        </Authlayout>
    )
}
