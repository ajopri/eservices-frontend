import { serialize } from 'cookie'
import { API_URL } from '@/config'

const cookie = require('cookie')

export default async (req, res) => {
    // checking method req
    if (req.method === 'GET') {
        // Parse the cookies on the request
        const cookies = cookie.parse(req.headers.cookie || '')

        // Get the visitor name set in the cookie
        const { token } = cookies

        const apiRes = await fetch(`${API_URL}/api/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })

        const data = await apiRes
        console.log(apiRes)

        if (apiRes.ok) {
            res.status(200).json({ user: data })
        } else {
            res.status(data.statusCode).json({ message: data.message })
        }
    } else {
        res.setHeader('Allow', ['GET'])
        res.status(405).json({ message: `Method ${req.method} not allowed` })
    }
}
