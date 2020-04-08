import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createGroup } from '../../../redux/actions/group';
import { Button } from 'react-bootstrap';
const GroupForm = () => {
  const dispatch = useDispatch();
  const [groupData, setGroupData] = useState({
    title: '',
    description: '',
  });

  const { title, description } = groupData;

  const onChange = (e) =>
    setGroupData({ ...groupData, [e.target.name]: e.target.value });

  return (
    <div className='' style={{ position: 'fixed', top: 100, right: 50 }}>
      <div className=''>
        <h3>Create a group</h3>
        <form
          className='groupform'
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(
              createGroup({
                title,
                description,
              })
            );
            setGroupData({
              title: '',
              description: '',
            });
          }}
        >
          <textarea
            name='title'
            placeholder='Name your group'
            value={title}
            onChange={(e) => onChange(e)}
            required
          ></textarea>
          <textarea
            name='description'
            placeholder='Write a group description'
            cols='30'
            rows='2'
            value={description}
            onChange={(e) => onChange(e)}
            required
          ></textarea>

          <Button type='submit' className='btn-success'>
            Create Group
          </Button>
        </form>
      </div>
    </div>
  );
};

export default GroupForm;
