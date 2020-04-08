import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createDashboard,
  getCurrentDashboard,
} from '../../../redux/actions/dashboard';

const EditDashboard = ({ history }) => {
  const dashboard = useSelector((state: any) => state.dashboard.dashboard);
  const loading = useSelector((state: any) => state.dashboard.loading);
  const dispatch = useDispatch();
  const [dashboardData, setDashboardData] = useState({
    about: '',
  });

  const { about } = dashboardData;

  useEffect(() => {
    dispatch(getCurrentDashboard());
    setDashboardData({
      about: !dashboard.about || loading ? '' : dashboard.about,
    });
  }, [loading, dashboard.about, dispatch]);

  const onChange = (e) =>
    setDashboardData({
      ...dashboardData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createDashboard(dashboardData, history));
  };

  return (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <textarea
            placeholder='about'
            name='about'
            value={about}
            onChange={(e) => onChange(e)}
            required
          ></textarea>
        </div>
        <input type='submit' />
      </form>
    </Fragment>
  );
};

export default EditDashboard;
