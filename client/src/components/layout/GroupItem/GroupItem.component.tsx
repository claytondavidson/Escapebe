import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const GroupItem = ({
  group: { _id, title, description, date_created },
  showButton,
}) => {
  return (
    <div className='GroupItem'>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>
        Group created on <Moment format='MM/DD/YYYY'>{date_created}</Moment>
      </p>
      {showButton && (
        <Fragment>
          <Link to={`/group/${_id}`} className='button'>
            View {title}
          </Link>
        </Fragment>
      )}
    </div>
  );
};

GroupItem.defaultProps = {
  showButton: true,
};

export default GroupItem;
