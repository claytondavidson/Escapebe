import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const CommentItem = ({ comment: { _id, text, username, date } }) => (
  <div>
    <div>
      <Link to={`/dashboard/${username}`}>
        <h4>{username}</h4>
      </Link>
    </div>
    <div>
      <p>{text}</p>
    </div>
  </div>
);

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(CommentItem);
