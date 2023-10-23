import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { FaPlus } from 'react-icons/fa'

import { Input } from '../Input'
import styles from './index.module.css'

export function Form({ onSubmit }) {
  const [taskName, setTaskName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    
    if(!!taskName) {
      const newTask = {
        _id: String,
        name: taskName,
        completed: false,
      }

      
      onSubmit(newTask)
      setTaskName('')
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        type="text"
        value={taskName}
        placeholder="Enter your tasks "
        onChange={event => setTaskName(event.target.value)}
      />
      
      <button
        type="submit"
        disabled={taskName === ''}
        className={styles.form__button}
      >
        <FaPlus size={12} />
        ADD
      </button>
    </form>
  )
}