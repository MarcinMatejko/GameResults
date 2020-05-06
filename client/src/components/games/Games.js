import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GameItem from './GameItem';
import { getGames } from '../../actions/game';

const Games = ({ getGames, game: { games } }) => {
  useEffect(() => {
    getGames();
  }, [getGames]);

  return (
    <Fragment>
      <h1>Lista dostępnych gier</h1>
    </Fragment>
  );
};

Games.propTypes = {
  getGames: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps, { getGames })(Games);
