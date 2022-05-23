export default function Button({ type = 'submit', children, ...props }) {
    const classes = `w-full uppercase duration-100 ease-in-out focus:outline-none ${props.className}`

    return (
        <button type={type} className={classes} onClick={props.onClick}>
            {children}
        </button>
    )
}
