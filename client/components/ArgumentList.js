import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/fetchPhilosophers';
import gql from 'graphql-tag';

class ArgumentList extends Component {
  onArgumentDelete(id) {
    this.props.mutate({ variables: { id } })
      .then(() => this.props.data.refetch());
  }

  renderArguments() {
    return this.props.articleArguments.map(({ id, content }) => {
      return (
        <li key={id} className="collection-item">
          { content }

          <i
            className="material-icons"
            onClick={() => this.onArgumentDelete(id)}
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
        {this.renderArguments()}
      </ul>
    );
  }
}

const mutation = gql`
  mutation deleteArgument($id: ID) {
    deleteArgument(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(
  graphql(query)(ArgumentList)
);
