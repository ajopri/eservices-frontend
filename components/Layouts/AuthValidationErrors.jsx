export default function Authvalidationerrors({ errors = [], ...props }) {
    return (
        <>
            {errors.length > 0 && (
                <div className="p-2 mb-4 text-xs bg-red-100 rounded" {...props}>
                    <div className="font-semibold text-red-600">
                        Whoops! Something went wrong.
                    </div>

                    <ul className="mt-3 text-red-600 list-disc list-inside">
                        {errors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}
