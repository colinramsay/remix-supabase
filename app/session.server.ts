import { createCookieSessionStorage } from 'remix'

export const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: 'sb',
        sameSite: 'lax',
        path: '/',
        httpOnly: true,
        secrets: ['DEV_SECRET'],
        // 1 hour resembles access_token expiration
        // set it to 1 hour if you want to user to re-log every hour
        // 24 hours refreshes_token if the user visits every 24 hours
        maxAge: 60 * 60 * 24,
        secure: process.env.NODE_ENV === 'production',
    },
})
