import React, { useEffect } from 'react';
import TaskList from './TaskList';

import { TASK_STATUSES } from '../constants';

const TasksPage = props => {
  const [title, setTitle] = useEffect('');
  const [description, setDescription] = useEffect('');
  const [showNewCardForm, setShowNewCardForm] = useEffect(false);
  const onTitleChange = e => {
    setTitle({ title: e.target.value });
  };

  const onDescriptionChange = e => {
    setDescription({ description: e.target.value });
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setShowNewCardForm(false);
  };

  const onCreateTask = e => {
    e.preventDefault();
    props.onCreateTask({
      title,
      description
    });
    resetForm();
  };

  const toggleForm = () => {
    setShowNewCardForm({ showNewCardForm: !showNewCardForm });
  };

  if (props.isLoading) {
    return <div className='tasks-loading'>Loading...</div>;
  }

  return (
    <div className='tasks'>
      <div className='tasks-header'>
        <button className='button button-default' onClick={toggleForm}>
          + New task
        </button>
      </div>
      {showNewCardForm && (
        <form className='new-task-form' onSubmit={onCreateTask}>
          <input
            className='full-width-input'
            onChange={onTitleChange}
            value={title}
            type='text'
            placeholder='title'
          />
          <input
            className='full-width-input'
            onChange={onDescriptionChange}
            value={description}
            type='text'
            placeholder='description'
          />
          <button className='button' type='submit'>
            Save
          </button>
        </form>
      )}
      <div className='task-lists'>
        {TASK_STATUSES.map(status => {
          const statusTasks = props.tasks.filter(
            task => task.status === status
          );
          return (
            <TaskList
              key={status}
              status={status}
              tasks={statusTasks}
              onStatusChange={props.onStatusChange}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TasksPage;
