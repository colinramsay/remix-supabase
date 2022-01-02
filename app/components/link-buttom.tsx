import { DetailedHTMLProps } from 'react'

const LinkButton = ({
    className,
    children,
    ...props
}: DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>) => {
    return (
        <button {...props} className={`border-0 ${className}`}>
            {children}
        </button>
    )
}

export default LinkButton
