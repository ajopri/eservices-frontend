import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function FormSuccess({ text }) {
    return (
        <section className="container my-2 text-center bg-green-200 rounded">
            <div className="p-2 text-sm text-green-600">
                <FontAwesomeIcon icon={faCheckCircle} /> <span>{text}</span>
            </div>
        </section>
    )
}

export default FormSuccess
