/* eslint-disable consistent-return */
import { NextResponse } from 'next/server'

export default function middleware(req) {
    const { token } = req.cookies
    if (!token && req.nextUrl.pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', req.url))
    }
}
