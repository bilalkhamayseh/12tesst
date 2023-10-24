import { useEffect, useMemo, useState } from "react"

import { Form } from './components/Form'
import { Input } from "./components/Input"
import { Tasks } from './components/Tasks'

import styles from './styles/app.module.css'



export function App() {
  const [tasks, setTasks] = useState([])
  const [cliked, setcliked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTaskName, setSearchTaskName] = useState('')

  const onAddTask = async (newTask) => {
    await fetch('http://127.0.0.1:3000/api/Create-task', {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify JSON content type
      },
      body: JSON.stringify(newTask), // Convert object to JSON string
    })
      .then((response) => {
        if (response.status === 201) {
          alert('Task created successfully');
        } else {
          alert('Failed to create Task');
        }
      })
      .catch((err) => {
        console.error(err);
      });
    setSearchTaskName('')
    setcliked(!cliked)
  }
  const onRemoveTask = async (taskId) => {
    try {
        const response = await fetch(`http://127.0.0.1:3000/api/Delete-todo/${taskId}`, {
            method: "DELETE"
        });

        if (response.status === 204) {
            alert('Task deleted successfully');
        } else {
            alert('Failed to delete Task');
        }
    } catch (err) {
        console.error(err);
    }
    setcliked(!cliked)
}

  const onChangeCompleted = async (taskId) => {
    const taskIndex = tasks.findIndex(task => task._id === taskId);
    console.log(taskId);

    // Update the task's completed property
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].completed = !updatedTasks[taskIndex].completed;

    // Prepare the update object
    const update = {
        completed: updatedTasks[taskIndex].completed,
    };

    try {
        const response = await fetch(`http://127.0.0.1:3000/api/update-task/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json", // Specify JSON content type
            },
            body: JSON.stringify(update), // Convert object to JSON string
        });

        if (response.status === 201) {
            alert('Task updated successfully');
        } else {
            alert('Failed to update Task');
        }
    } catch (err) {
        console.error(err);
    }
    setcliked(!cliked);
}

  useEffect(() => {

    const gettododata =  async () =>{
      await  fetch("http://127.0.0.1:3000/api/Get-todo")
      .then(response => {
        if (response.ok)
          return response.json();
        throw response;
      })
      .then(data => setTasks(data))
      
    }
    gettododata()
    
    setIsLoading(false)
  }, [cliked])

  const handleTermSearch = (e) => {
    const valueTerm = e.target.value.toLocaleLowerCase()
    setSearchTaskName(valueTerm)
  }

  const totalTasks = useMemo(() => {
    return tasks.length
  }, [tasks])

  const totalCompletedTasks = useMemo(() => {
    return tasks.filter(task => task.completed).length
  })

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>TODOLIST</h1>

        <Form onSubmit={onAddTask} />

        <hr />

        <Input
          type="text"
          value={searchTaskName}
          onChange={handleTermSearch}
          placeholder="Find your tasks..."
        />

        <Tasks
          tasks={tasks}
          searchTaskName={searchTaskName}
          onRemoveTask={onRemoveTask}
          onChangeCompletedTask={onChangeCompleted}
        />

        <footer className={styles.footer}>
          <h6>
            Total Task:
            <span>{totalTasks}</span>
          </h6>

          <h6>
          Total Completed Task:
            <span>{totalCompletedTasks}</span>
          </h6>
        </footer>
      </div>
 done by moayad & bilal
    </div>
  )
}