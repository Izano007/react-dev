import Header from './components/Header'
import { useState, useEffect } from 'react'
import AddTask from './components/AddTask'
import Tasks from './components/Tasks'
import Footer from './components/Footer'
import About from './components/About'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])

    // const handleAdd = (task) => {
    //     setTasks([...tasks,task])
    // }

    // const handleDelete = (id) => {
    //     // console.log('delete',id)
    //     setTasks(tasks.filter((task)=>task.id!==id))
    // }

    // const handleToggle = (id) => {
    //     // console.log('toggle',id)
    //     setTasks(tasks.map((task)=>task.id===id ? {...task,reminder: !task.reminder} : task))
    // }

    useEffect(() => {
        const getTasks = async () => {
            const dataFromServer = await fetchTasks()
            setTasks(dataFromServer)
        }
        getTasks()
    }, [])

    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()
        return data
    }

    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json()
        return data
    }

    const handleAdd = async (task) => {
        const res = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(task)
        })
        const data = await res.json()
        setTasks([...tasks, data])
    }

    const handleDelete = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE'
        })
        res.status === 200 ? setTasks(tasks.filter((task) => task.id !== id)) : alert('Error')
    }

    const handleToggle = async (id) => {
        const myTask = await fetchTask(id)
        const myUpdatedTask = { ...myTask, reminder: !myTask.reminder }
        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(myUpdatedTask)
        })
        const data = await res.json()
        setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))

    }


    return (
        <Router>
            <div className='container'>
                <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
                <Route path='/' exact render={(props) =>
                    <>
                        {showAddTask && <AddTask onAdd={handleAdd} />}
                        {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={handleDelete} onToggle={handleToggle} />) : ('No Tasks To Show:/')}
                    </>
                } />
                <Route path='/about' component={About} />
                <Footer />
            </div>
        </Router>
    )
}

export default App
