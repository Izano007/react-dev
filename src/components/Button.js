import PropTypes from 'prop-types'

function Button({ text, color, onClick }) {
    return (
        <button className='btn' onClick={onClick} style={{ backgroundColor: color }} >
            {text}
        </button>
    )
}

Button.defaultProps = {
    color: 'steelblue'
}

Button.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    color: PropTypes.string
}

export default Button