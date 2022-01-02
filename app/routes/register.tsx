import { ActionFunction, json, redirect, useActionData } from 'remix'
import LoginRegister, {
    LoginForm,
    LoginRegisterMode,
} from '~/components/login-register'
import supabase from '~/db'

export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()
    const fields = Object.fromEntries(form.entries())
    const result = LoginForm.safeParse(fields)

    if (result.success) {
        const { user, session, error } = await supabase.auth.signUp({
            email: fields.email.toString(),
            password: fields.password.toString(),
        })
        console.log(user, session, error)
        return json({ success: true })
    } else {
        return json({
            ...result,
            fields: {
                email: fields.email.toString(),
                password: fields.password.toString(),
                mode: fields.mode.toString() as LoginRegisterMode,
            },
        })
    }
}

const Register = () => {
    const actionData = useActionData()
    return (
        <LoginRegister
            actionData={actionData}
            mode={LoginRegisterMode.Register}
        />
    )
}

export default Register
