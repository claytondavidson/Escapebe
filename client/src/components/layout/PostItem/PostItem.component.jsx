import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const PostItem = ({
  groupId,
  post: { _id, username, member, title, text, upvotes, comments, date },
  auth
}) => (
  <Fragment>
    <div className='group'>
      <div>
        <Link to={`/dashboard/${member}`}>
          <h4>{username}</h4>
        </Link>
      </div>
      <p>{title}</p>
      <p>{text}</p>
      <p>
        Posted on <Moment format='MM/DD/YYYY'>{date}</Moment>
      </p>
    </div>
  </Fragment>
);

PostItem.propTypes = {
  groupId: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(PostItem);
