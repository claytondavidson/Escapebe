import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDashboard } from '../../../redux/actions/dashboard';

interface CreateDashboardProps {
  history: History;
}

interface DashboardData {
  about: string;
}

const CreateDashboard: React.FC<CreateDashboardProps> = (history) => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    about: '',
  });
  const dispatch = useDispatch();

  const { about } = dashboardData;

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDashboardData({
      ...dashboardData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

export default CreateDashboard;
