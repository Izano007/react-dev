import { FaTimes } from 'react-icons/fa'

function Task({ task, onToggle, onDelete }) {

    var date = new Date(task.day);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = ('0' + minutes).slice(-2);
    var timeString = hours + ':' + minutes + ' ' + ampm;

    return (
        <div className={`task ${task.reminder && 'reminder'}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>
                {task.text}{' '}
                <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDelete(task.id)} />
            </h3>
            <p>{date.toLocaleDateString()} at {timeString}</p>
        </div>
    )
}

export default Task
