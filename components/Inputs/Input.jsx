export default function Input({ disabled = false, className, ...props }) {
    return (
        <input
                disabled={disabled}
                className={`${className} w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300`}
                {...props}
            />
    )
}
