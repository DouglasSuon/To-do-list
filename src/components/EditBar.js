import React, { useState } from 'react';
import { CheckSquare } from 'phosphor-react';
import styles from './EditBar.module.css';

function EditBar(props) {
  const [updatedText, setUpdatedText] = useState(props.initialValue);

  function handleChangeTextToEdit(event) {
    event.target.setCustomValidity('');
    setUpdatedText(event.target.value);
  }

  function handleSubmitText(event) {
    event.preventDefault();
    props.onSubmit(updatedText);
  }

  function handleNewTaskInvalid(event) {
    event.target.setCustomValidity('This field is required!');
  }

  return (
    <form className={styles.editBar} onSubmit={handleSubmitText}>
      <input
        value={updatedText}
        onChange={handleChangeTextToEdit}
        spellCheck={false}
        onInvalid={handleNewTaskInvalid}
        required
      />
      <button>
        Update <CheckSquare size={18} />
      </button>
    </form>
  );
}

export default EditBar;
