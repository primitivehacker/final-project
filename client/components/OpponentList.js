import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/fetchPhilosophers';
import gql from 'graphql-tag';

class OpponentList extends Component {
  onOpponentDelete(id) {
    this.props.mutate({ variables: { id } })
      .then(() => this.props.data.refetch());
  }

  renderOpponents() {

    return this.props.opponents.map(({ id, content }) => {
      return (
        <li key={id} className="collection-item">
          {content}

          <i
            className="material-icons"
            onClick={() => this.onOpponentDelete(id)}
          >
            delete
          </i>

        </li>
      );
    });
  }

  render() {
    return (
      <ul className="collection">
        {this.renderOpponents()}
      </ul>
    );
  }
}

const mutation = gql`
  mutation deleteOpponent($id: ID) {
    deleteOpponent(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(
  graphql(query)(OpponentList)
);
