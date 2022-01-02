import { Form, Link } from 'remix'
import { z } from 'zod'

export enum LoginRegisterMode {
    Login = 'login',
    Register = 'register',
}

export const LoginForm = z.object({
    email: z.string().min(3),
    password: z.string().min(6),
    mode: z.nativeEnum(LoginRegisterMode),
})

export type LoginFormType = z.infer<typeof LoginForm>

type ActionData = {
    fieldErrors?: {
        email: string | undefined
        password: string | undefined
    }
    fields?: LoginFormType
}

interface Props {
    actionData: ActionData
    mode: LoginRegisterMode
}

const LoginRegister = ({ mode, actionData }: Props) => (
    <div className="min-h-full flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
                <h2 className="text-3xl font-extrabold text-gray-900">
                    {mode === LoginRegisterMode.Login
                        ? 'Sign in to your account'
                        : 'Sign up now'}
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Or{' '}
                    <Link
                        to={
                            mode === LoginRegisterMode.Login ? '/register' : '/'
                        }
                        className="font-medium text-green-700 hover:text-green-600"
                    >
                        {mode === LoginRegisterMode.Login
                            ? 'sign up for an account'
                            : 'sign in to an existing account'}
                    </Link>
                </p>

                <div className="mt-8">
                    <div className="mt-6">
                        <Form method="post" className="space-y-6">
                            <input type="hidden" name="mode" value={mode} />
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                        defaultValue={
                                            actionData?.fields?.password
                                        }
                                        aria-invalid={
                                            Boolean(
                                                actionData?.fieldErrors
                                                    ?.password
                                            ) || undefined
                                        }
                                        aria-describedby={
                                            actionData?.fieldErrors?.password
                                                ? 'password-error'
                                                : undefined
                                        }
                                    />

                                    {actionData?.fieldErrors?.password ? (
                                        <p
                                            className="form-validation-error"
                                            role="alert"
                                            id="password-error"
                                        >
                                            {actionData?.fieldErrors.password}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                            {mode === LoginRegisterMode.Login && (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                        />
                                        <label
                                            htmlFor="remember-me"
                                            className="ml-2 block text-sm text-gray-900"
                                        >
                                            Remember me
                                        </label>
                                    </div>

                                    <div className="text-sm">
                                        <a
                                            href="#"
                                            className="font-medium text-green-700 hover:text-green-600"
                                        >
                                            Forgot your password?
                                        </a>
                                    </div>
                                </div>
                            )}

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Sign in
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
            <img
                className="absolute inset-0 h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1618609255910-d916ebc58d49?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                alt=""
            />
        </div>
    </div>
)

export default LoginRegister
