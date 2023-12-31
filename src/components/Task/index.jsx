import { FaTrashAlt } from 'react-icons/fa'

import styles from './index.module.css'

export function Task({ _id, name, completed, onRemove, onChangeCompleted }) {
  return (
    <li className={`${styles.task} ${completed ? styles.completed : ''}`}>
      <input
        type="checkbox"
        checked={completed}
        className={styles.task__checkbox}
        onChange={e => onChangeCompleted(_id)}
      />

      <span className={styles.task__name}>
        {name}
      </span>

      <button
        type="button"
        className={styles.task__button}
        onClick={() => onRemove(_id)}
      >
        <FaTrashAlt size={16} />
      </button>
    </li>
  )
}