import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../Spinner/Spinner.component';
import GroupItem from '../GroupItem/GroupItem.component';
import { getGroups } from '../../../redux/actions/group';
import GroupForm from '../GroupForm/GroupForm.component';
import LazyLoad from 'react-lazyload';

const Groups: React.FC = () => {
  const groups = useSelector((state: any) => state.group.groups);
  const loading = useSelector((state: any) => state.group.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1>Groups</h1>
      <div className='groups'>
        {groups.map((group) => (
          <LazyLoad key={group._id}>
            <GroupItem key={group._id} group={group} />
          </LazyLoad>
        ))}
      </div>
      <GroupForm />
    </Fragment>
  );
};

export default Groups;
