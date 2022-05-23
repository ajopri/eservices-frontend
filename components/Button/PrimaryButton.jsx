export default function Primarybutton({ type = 'submit', children, ...props }) {
    const classes =
        'w-full px-3 py-3 text-white uppercase duration-100 ease-in-out rounded-full bg-maha-500 hover:bg-maha-400 focus:outline-none'

    return (
        <button type={type} className={classes} onClick={props.onClick}>
            {children}
        </button>
    )
}
