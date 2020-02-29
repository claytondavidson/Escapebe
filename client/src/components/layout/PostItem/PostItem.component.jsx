import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const PostItem = ({
  groupId,
  post: { _id, username, member, title, text, upvotes, comments, date }
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
      <Link to={`/group/${groupId}/${_id}`} className='button'>
        {comments.length === 1
          ? `${comments.length} comment`
          : `${comments.length} comments`}
      </Link>
    </div>
  </Fragment>
);

PostItem.propTypes = {
  groupId: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group
});

export default connect(mapStateToProps, {})(PostItem);
