import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import boardStyles from './../Board/Board.css';
import styles from './Boards.css';

import Axios from 'axios';

class Boards extends Component {
  state = {
    boardData: {
      allBoards: [],
    },
    serverError: false,
  };

  componentDidMount = () => {
    Axios.get('https://pro-organizer-f83b5.firebaseio.com/boardData.json')
      .then((response) => {
        console.log(response);
        for (let value in response.data) {
          this.setState({
            boardData: response.data[value],
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          serverError: true,
        });
      });
  };

  render() {
    let boards = null;

    if (!this.state.serverError && this.state.boardData.allBoards) {
      Object.keys(this.state.boardData).length > 0
        ? (boards = this.state.boardData.allBoards.map((boards) => {
            return (
              <Link
                to={{
                  pathname: `/board/${boards.id}`,
                }}
                key={boards.id}
              >
                <div className={styles.BoardCard}>{boards.name}</div>
              </Link>
            );
          }))
        : (boards = <div className={styles.Loading}>Loading...</div>);
    } else {
      boards = <p>There seems to be a server error. Please try again later.</p>;
    }

    return (
      <div>
        <p className={boardStyles.BoardTitle}>Boards</p>
        <div className={styles.Boards}>{boards}</div>
      </div>
    );
  }
}

export default Boards;
