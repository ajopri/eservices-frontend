import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip } from '@nextui-org/react'

export default function Subtitle({ title, ...tooltip }) {
    return (
        <div className="font-semibold text-maha-500 flex items-center">
            {title}{' '}
            <Tooltip content={tooltip.content} placement={tooltip.placement}>
                <span className="ml-2 text-gray-400">
                    <FontAwesomeIcon icon={faCircleInfo} />
                </span>
            </Tooltip>
        </div>
    )
}
