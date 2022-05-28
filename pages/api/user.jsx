import { serialize } from 'cookie'
import { API_URL } from '@/config'

const cookie = require('cookie')

export default async (req, res) => {
    // checking method req
    if (req.method === 'GET') {
        if (!req.headers.cookie) {
            res.status(403).json({ message: 'Not Authorized' })
            return
        }

        // Parse the cookies on the request
        const { token } = cookie.parse(req.headers.cookie)

        const apiRes = await fetch(`${API_URL}/api/me`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        const user = await apiRes.json()

        if (apiRes.ok) {
            res.status(200).json({ user })
        } else {
            res.status(403).json({ message: 'User forbidden' })
        }
    } else {
        res.setHeader('Allow', ['GET'])
        res.status(405).json({ message: `Method ${req.method} not allowed` })
    }
}
