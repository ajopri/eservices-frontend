import Authlayout from '@components/Layouts/AuthLayout'
import Primarybutton from '@components/Button/PrimaryButton'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFan } from '@fortawesome/free-solid-svg-icons'
import * as Yup from 'yup'
import { useContext } from 'react'
import { Form, Formik } from 'formik'
import AuthContext from '@/context/AuthContext'
import FormInput from '@/components/Inputs/FormInput'
import FormSuccess from '@/components/Inputs/FormSuccess'
import FormError from '@/components/Inputs/FormError'

const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Passworddddddd is required'),
})

export default function Login() {
    const { login, error, user, isLoading } = useContext(AuthContext)

    const handleLoginsubmit = async ({ email, password }) => {
        login({ email, password })
    }
    return (
        <Authlayout pageTitle="Login">
            {/* content */}
            <div className="flex flex-col px-10 w-96 sm:px-0">
                {/* title */}
                <div className="mb-8 text-left">
                    <h1 className="text-2xl font-bold text-gray-700 sm:text-3xl">
                        Welcome to E-services
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Please sign in to continue
                    </p>
                </div>
                {/* Form */}
                <div className="sm:w-[21rem] w-fit">
                    {/* Login form */}
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        onSubmit={(val) => handleLoginsubmit(val)}
                        validationSchema={LoginSchema}
                    >
                        {() => (
                            <Form className="mb-4">
                                {user && (
                                    <FormSuccess text="Login successful" />
                                )}
                                {error && <FormError text={error} />}
                                <div className="mb-3">
                                    <FormInput
                                        ariaLabel="Email"
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="mb-3">
                                    <FormInput
                                        ariaLabel="Password"
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="mb-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <label
                                                className="block font-light text-gray-500"
                                                htmlFor="remember"
                                            >
                                                <input
                                                    className="ml-2 leading-tight"
                                                    type="checkbox"
                                                    id="remember"
                                                    name="remember"
                                                />
                                                <span className="text-sm">
                                                    {' '}
                                                    Remember me{' '}
                                                </span>
                                            </label>
                                        </div>
                                        <div>
                                            <a
                                                className="text-sm font-light text-indigo-500 hover:text-indigo-600 hover:font-normal"
                                                href="#password-request"
                                            >
                                                Forgot password?
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <Primarybutton>
                                        {!isLoading ? (
                                            'Log In'
                                        ) : (
                                            <span>
                                                <FontAwesomeIcon
                                                    icon={faFan}
                                                    spin
                                                />{' '}
                                                Loading...
                                            </span>
                                        )}
                                    </Primarybutton>
                                </div>
                                <p className="text-xs text-left text-gray-400">
                                    <span>
                                        This portal is reserved for MahaChem
                                        customers only.{' '}
                                        <Link href="/" passHref>
                                            <span className="font-light text-indigo-500 cursor-pointer focus:text-indigo-600 focus:outline-none focus:underline hover:font-normal">
                                                Learn more
                                            </span>
                                        </Link>
                                    </span>
                                </p>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            {/* end content */}
        </Authlayout>
    )
}
