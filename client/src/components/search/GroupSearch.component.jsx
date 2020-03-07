import React, { Fragment, useEffect, useState } from 'react';
import RenderResults from '../search/RenderResults.component';
import { getGroups } from '../../redux/actions/group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const GroupSearch = ({ getGroups, group: { groups } }) => {
  const [search, setSearch] = useState('');
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    getGroups();
  }, [getGroups]);

  const searchGroups = async text => {
    let matches = groups.filter(group => {
      const regex = new RegExp(`^${text}`, 'gi');
      return group.title.match(regex);
    });

    if (matches.length === 0 || text.length === 0) {
      setMatches([]);
    } else {
      setMatches(matches);
    }
    console.log(text.length);
  };

  const handleSearchChange = e => {
    setSearch(e.target.value);
    searchGroups(e.target.value);
  };

  return (
    <Fragment>
      <div>
        <input
          placeholder='Search for groups'
          value={search}
          onChange={handleSearchChange}
          id="groupSearchBar"
        />
        <div className='groups'>
          {matches.map(match => (
            <Dropdown.Item id="dropdownId"
              key={match._id}
              as={Link}
              to={`/group/${match._id}`}
              style={{ backgroundColor:"white"}}
            >
              <RenderResults key={match._id} group={match} />
            </Dropdown.Item>
          ))}
        </div>
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
