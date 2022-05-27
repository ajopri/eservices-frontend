import { serialize } from 'cookie'
import { API_URL } from '@/config'

const cookie = require('cookie')

export default async (req, res) => {
    // checking method req
    if (req.method === 'POST') {
        // Parse the cookies on the request
        const cookies = cookie.parse(req.headers.cookie || '')

        // Get the visitor name set in the cookie
        const { token } = cookies

        const apiRes = await fetch(`${API_URL}/api/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })

        const data = await apiRes.json()

        if (apiRes.ok) {
            // DESTROY COOKIE
            res.setHeader('Set-Cookie', [
                serialize('token', '', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    expires: new Date(0),
                    sameSite: 'strict',
                    path: '/',
                }),
                serialize('sap-token', '', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    maxAge: new Date(0), // 1 day
                    sameSite: 'strict',
                    path: '/',
                }),
            ])

            res.status(200).json({ message: 'Success' })
        } else {
            res.status(data.statusCode).json({ message: data.message })
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).json({ message: `Method ${req.method} not allowed` })
    }
}
