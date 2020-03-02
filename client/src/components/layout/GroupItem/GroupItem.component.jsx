import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const GroupItem = ({
  group: { _id, title, description, date_created },
  showButton
}) => (
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

GroupItem.defaultProps = {
  showButton: true
};

GroupItem.propTypes = {
  group: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(GroupItem);
