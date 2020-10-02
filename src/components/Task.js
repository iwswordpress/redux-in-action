import React from 'react';
import { connect } from 'react-redux';
import { updateTask } from '../actions/index';
import { TASK_STATUSES } from '../constants';

const Task = props => {
  //console.log(props.task, props.dispatch);
  function updateTitleChange() {}
  function updateDescriptionChange() {}
  function updateForm() {
    console.log('EDIT clicked');
    props.dispatch(updateTask(props.task.id, props.task));
  }
  return (
    <div className='task'>
      <div className='task-header'>
        <div>
          {props.task.title}{' '}
          <button
            onClick={() => {
              console.log('CLICK');
              props.dispatch(updateTask(props.task.id, props.task));
            }}
          >
            SET IN PROGRESS
          </button>
        </div>
        <select value={props.task.status} onChange={onStatusChange}>
          {TASK_STATUSES.map(status => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <hr />
      <div className='task-body'>{props.task.description}</div>
      <div style={{ padding: '5px' }}>
        {' '}
        <form className='new-task-form' onSubmit={updateForm}>
          <input
            className='full-width-input'
            onChange={updateTitleChange}
            value={props.task.title}
            type='text'
            placeholder='title'
          />
          <input
            className='full-width-input'
            onChange={updateDescriptionChange}
            value={props.task.description}
            type='text'
            placeholder='description'
          />
          <button className='button' type='submit'>
            Edit
          </button>
        </form>
      </div>
    </div>
  );

  function onStatusChange(e) {
    props.onStatusChange(props.task.id, e.target.value);
  }
};

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  };
}
export default connect(mapStateToProps, null)(Task);
