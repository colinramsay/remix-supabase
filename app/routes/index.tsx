import { ActionFunction, LoaderFunction, useActionData } from 'remix'
import { sessionStorage } from '~/session.server'
import { authenticator, supabaseStrategy } from '~/auth.server'
import LoginRegister, { LoginRegisterMode } from '~/components/login-register'

export const loader: LoaderFunction = async ({ request }) =>
    supabaseStrategy.checkSession(request, sessionStorage, {
        sessionKey: 'sb:session',
        sessionErrorKey: 'sb:error',
        successRedirect: '/dash',
    })

export const action: ActionFunction = async ({ request }) =>
    authenticator.authenticate('sb', request, {
        successRedirect: '/dash',
        failureRedirect: '/',
    })

const Login = () => {
    const actionData = useActionData()

    return (
        <LoginRegister actionData={actionData} mode={LoginRegisterMode.Login} />
    )
}

export default Login
