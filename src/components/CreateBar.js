import React, { useState } from 'react';
import styles from './CreateBar.module.css';
import { PlusCircle } from 'phosphor-react';

function CreateBar(props) {
  const [taskText, setTaskText] = useState('');

  function handleSetTaskText(event) {
    event.target.setCustomValidity('');
    setTaskText(event.target.value);
  }

  function handleCreateTask(event) {
    event.preventDefault();
    props.onCreateNewTask(taskText);
    setTaskText('');
  }

  function handleNewTaskInvalid(event) {
    event.target.setCustomValidity('This field is required!');
  }

  return (
    <form className={styles.createBar} onSubmit={handleCreateTask}>
      <input
        type="text"
        placeholder="Add a new task you want to accomplish"
        onChange={handleSetTaskText}
        onInvalid={handleNewTaskInvalid}
        value={taskText}
        spellCheck={false}
        required
      />
      <button>
        Create <PlusCircle size={18} />
      </button>
    </form>
  );
}

export default CreateBar;
