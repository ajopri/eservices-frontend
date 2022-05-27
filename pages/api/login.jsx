import { serialize } from 'cookie'
import {
    API_URL,
    API_SAP_URL,
    API_SAP_USERNAME,
    API_SAP_PASSWORD,
} from '@/config'

export default async (req, res) => {
    // checking method req
    if (req.method === 'POST') {
        // destructure email and passworod
        const { email, password } = req.body

        // Login backend
        const apiRes = await fetch(`${API_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })

        const data = await apiRes.json()

        if (apiRes.ok) {
            // Login SAP
            const apiResSap = await fetch(`${API_SAP_URL}/Auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: API_SAP_USERNAME,
                    password: API_SAP_PASSWORD,
                }),
            })

            const dataSap = await apiResSap.json()

            // @todo - Set Cookie
            res.setHeader('Set-Cookie', [
                serialize('token', String(data.data.access_token), {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    maxAge: 60 * 60 * 24, // 1 day
                    sameSite: 'strict',
                    path: '/',
                }),
                serialize('sapToken', String(dataSap.token), {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    // maxAge: new Date(Date.parse(dataSap.expire)).getMinutes(), // 1 day
                    maxAge: 60 * 60 * 24, // 1 day
                    sameSite: 'strict',
                    path: '/',
                }),
            ])

            res.status(200).json({ user: data.data.user })
            res.end()
        } else {
            res.status(data.statusCode).json({ message: data.message })
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).json({ message: `Method ${req.method} not allowed` })
    }
}
