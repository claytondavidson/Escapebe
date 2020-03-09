import React, { Fragment, useState } from 'react';
import RenderResults from '../search/RenderResults.component';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGroups } from '../../redux/actions/group';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const GroupSearch = ({ group: { groups } }) => {
  const [search, setSearch] = useState('');
  const [matches, setMatches] = useState([]);

  const searchGroups = text => {
    const regex = new RegExp(`^${text}`, 'gi');
    let matches = groups.filter(group => group.title.match(regex));
    text.length === 0 ? setMatches([]) : setMatches(matches);
  };

  const handleSearchChange = e => {
    setSearch(e.target.value);
    searchGroups(e.target.value);
  };

  return (
    <Fragment>
      <input
        placeholder='Search for groups'
        value={search}
        onChange={handleSearchChange}
      />
      <div className='groups'>
        {matches.map(match => (
          <Dropdown.Item
            id='dropdownId'
            key={match._id}
            as={Link}
            to={`/group/${match._id}`}
            style={{ backgroundColor: 'white' }}
          >
            <RenderResults key={match._id} group={match} />
          </Dropdown.Item>
        ))}
      </div>
    </Fragment>
  );
};

GroupSearch.propTypes = {
  getGroups: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  group: state.group
});

export default connect(mapStateToProps, { getGroups })(GroupSearch);
