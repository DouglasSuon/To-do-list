import React, { useState } from 'react';
import Clipboard from '../assets/Clipboard.png';
import CreateBar from './CreateBar';
import Task from './Task';
import styles from './Dashboard.module.css';

function Dashboard() {
  const [allTasks, setAllTasks] = useState([]);
  const [taskID, setTaskID] = useState([]);
  const [hideTasks, setHideTasks] = useState(true);
  const [tasksNumber, setTasksNumber] = useState(0);
  const [hideEditArea, setHideEditArea] = useState(true);
  const [finishedTasksNumber, setFinishedTasksNumber] = useState(0);

  function createNewTask(newTask) {
    setTaskID([...taskID, taskID.length]);
    setAllTasks([...allTasks, [taskID.length, newTask, 'unchecked', 'visible']]);
    setHideTasks(false);
    setTasksNumber(tasksNumber + 1);
  }

  function checkTask(id, status) {
    const updatedStatusTasks = allTasks.map((task) => {
      if (task[0] === id) {
        return [id, task[1], task[2] === 'unchecked' ? 'checked' : 'unchecked', task[3]];
      } else {
        return task;
      }
    });

    setAllTasks(updatedStatusTasks);

    if (status === 'unchecked') {
      setFinishedTasksNumber(finishedTasksNumber - 1);
    } else {
      setFinishedTasksNumber(finishedTasksNumber + 1);
    }
  }

  function updateTask(id, newTaskText) {
    const updatedTasks = allTasks.map((task) => {
      if (task[0] === id) {
        return [id, newTaskText, task[2], task[3]];
      } else {
        return task;
      }
    });

    setAllTasks(updatedTasks);
    setHideEditArea(false);
  }

  function deleteTask(idToRemove, uncheckButton) {
    const allTasksWithoutRemovedOne = allTasks.filter((task) => task[0] !== idToRemove);

    setTasksNumber(tasksNumber - 1);
    setAllTasks(allTasksWithoutRemovedOne);

    if (!uncheckButton) {
      setFinishedTasksNumber(finishedTasksNumber - 1);
    }
  }

  function handleFilterToDo() {
    const tasksToDo = allTasks.map((task) => {
      return task[2] === 'unchecked' ? [task[0], task[1], task[2], 'visible'] : [task[0], task[1], task[2], 'hidden'];
    });

    setAllTasks(tasksToDo);
  }

  function handleFilterFinished() {
    const tasksFinished = allTasks.map((task) => {
      return task[2] === 'checked' ? [task[0], task[1], task[2], 'visible'] : [task[0], task[1], task[2], 'hidden'];
    });

    setAllTasks(tasksFinished);
  }

  function handleFilterAll() {
    const tasksAll = allTasks.map((task) => [task[0], task[1], task[2], 'visible']);

    setAllTasks(tasksAll);
  }

  function handleSearchTask(event) {
    const taskToSearch = allTasks.map((task) => {
      return task[1].includes(event.target.value) ? [task[0], task[1], task[2], 'visible'] : [task[0], task[1], task[2], 'hidden'];
    });

    setAllTasks(taskToSearch);
  }

  return (
    <div className={styles.dashboard}>
      <CreateBar onCreateNewTask={createNewTask} />
      <div className={hideEditArea ? styles.hiddenEditArea : styles.editArea}></div>
      <header>
        <strong className={styles.created}>
          Created Tasks <span>{tasksNumber}</span>
        </strong>
        <strong className={styles.finished}>
          Finished <span>{finishedTasksNumber} of {tasksNumber}</span>
        </strong>
      </header>
      <main>
        <div hidden className={hideTasks ? styles.empty : styles.emptyHidden}>
          <img src={Clipboard} alt="Clipboard" />
          <strong>You do not have any created tasks yet</strong>
          <p>Create tasks and organize your to-do items</p>
        </div>
        <div className={hideTasks ? styles.toolBarHidden : styles.toolBar}>
          <div className={styles.filter}>
            <strong>Filter:</strong>
            <input type="radio" name="filter" onClick={handleFilterAll} />
            <label htmlFor="">All</label>
            <input type="radio" name="filter" onClick={handleFilterToDo} />
            <label htmlFor="">To-Do</label>
            <input type="radio" name="filter" onClick={handleFilterFinished} />
            <label htmlFor="">Finished</label>
          </div>
          <div className={styles.search}>
            <input type="text" onChange={handleSearchTask} placeholder="Search Task" />
          </div>
        </div>
        <div className={hideTasks ? styles.tasksHidden : styles.tasks}>
          {allTasks.map((task) => (
            <Task
              key={task[0]}
              id={task[0]}
              content={task[1]}
              status={task[2]}
              visibility={task[3]}
              onCheck={checkTask}
              onUpdate={updateTask}
              onDelete={deleteTask}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
