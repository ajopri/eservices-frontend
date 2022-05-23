export default function Searchinput({
    disabled = false,
    placeholder = '',
    className,
    ...props
}) {
    return (
        <input
            disabled={disabled}
            type="text"
            placeholder={placeholder}
            className={`${className} w-full border-b-2 border-gray-300 px-3 py-2 pl-7 placeholder-gray-300 focus:border-maha-green-500 focus:outline-none`}
            {...props}
        />
    )
}
