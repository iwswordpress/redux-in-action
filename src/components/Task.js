import React, { useEffect } from 'react';

import { TASK_STATUSES } from '../constants';

const Task = props => {
  useEffect(() => {}, [props.task]);
  return (
    <div className='task'>
      <div className='task-header'>
        <div>{props.task.title}</div>
        <select value={props.task.status} onChange={onStatusChangeTask}>
          {TASK_STATUSES.map(status => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <hr />
      <div className='task-body'>{props.task.description}</div>
    </div>
  );

  function onStatusChangeTask(e) {
    props.onStatusChange(props.task.id, e.target.value);
  }
};

export default Task;
