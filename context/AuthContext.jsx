import { useRouter } from 'next/router'
import { createContext, useEffect, useState } from 'react'
import { NEXT_URL } from '@/config'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState('')
    const [isError, setIsError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [initialLoading, setInitialLoading] = useState(true)

    const router = useRouter()

    // Login User
    const login = async ({ email, password }) => {
        setIsLoading(true)
        const res = await fetch(`${NEXT_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })

        const data = await res.json()

        if (res.ok) {
            setIsLoading(false)
            setUser(data.user)
            router.push('/dashboard')
        } else {
            setIsLoading(false)
            setIsError(data.message)
            console.log('error')
        }
    }

    // Logout User
    const logout = async () => {
        setIsLoading(true)
        const res = await fetch(`${NEXT_URL}/api/logout`, {
            method: 'POST',
        })

        if (res.ok) {
            setUser(null)
            setIsLoading(false)
            router.push('/')
        }
    }

    //   Check if user is logged
    const checkUserLoggedIn = async () => {
        setInitialLoading(true)

        const res = await fetch(`${NEXT_URL}/api/user`)
        const data = await res.json()

        if (res.ok) {
            setUser(data.user)
        } else {
            setUser(null)
        }
    }

    useEffect(() => {
        checkUserLoggedIn()
    }, [])

    return (
        <AuthContext.Provider
            value={{ login, logout, user, isError, isLoading }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
