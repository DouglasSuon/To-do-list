import React, { useState } from 'react';
import EditBar from './EditBar';
import { PencilSimple, Trash, Check } from 'phosphor-react';
import styles from './Task.module.css';

function Task(props) {
  const [uncheckButton, setCheckButton] = useState(true);
  const [hideEditBar, setHideEditBar] = useState(true);

  function handleCheckButton() {
    if (props.status === 'unchecked') {
      props.onCheck(props.id, 'checked');
      setCheckButton(false);
    } else {
      props.onCheck(props.id, 'unchecked');
      setCheckButton(true);
    }
  }

  function handleOpenEditTask() {
    setHideEditBar(false);
  }

  function handleDeleteTask() {
    props.onDelete(props.id, uncheckButton);
  }

  function handleUpdateTask(newTaskText) {
    props.onUpdate(props.id, newTaskText);
    setHideEditBar(true);
  }

  return (
    <div className={props.visibility === 'visible' ? styles.task : styles.hiddenTask}>
      <div className={styles.taskArea}>
        <div className={styles.buttonAndTextArea}>
          <button className={uncheckButton ? styles.disabledButton : styles.activeButton} onClick={handleCheckButton}>
            <Check />
          </button>
          <p className={uncheckButton ? styles.content : styles.contentMarked}>
            {props.content}
          </p>
        </div>
        <div className={styles.icons}>
          <PencilSimple size={18} className={styles.editIcon} onClick={handleOpenEditTask} />
          <Trash size={18} className={styles.deleteIcon} onClick={handleDeleteTask} />
        </div>
      </div>
      <div className={hideEditBar ? styles.hiddenEditBar : styles.editBar}>
        <EditBar initialValue={props.content} onSubmit={handleUpdateTask} />
      </div>
    </div>
  );
}

export default Task;
