export default function Card({
    additionalWrapperClasses,
    additionalInnerClasses,
    children,
}) {
    const outerClasses = `card w-full rounded-md bg-white border-[1px] p-3 ${additionalWrapperClasses}`
    const innerClasses = `max-w-full h-full mx-auto flex flex-col ${additionalInnerClasses}`

    return (
        <div className={outerClasses}>
            <div className={innerClasses}>{children}</div>
        </div>
    )
}
