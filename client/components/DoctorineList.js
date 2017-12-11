import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/fetchPhilosophers';
import gql from 'graphql-tag';

class DoctorineList extends Component {
  onDoctorineDelete(id) {
    this.props.mutate({ variables: { id } })
      .then(() => this.props.data.refetch());
  }

  renderDoctorines() {
    return this.props.doctorines.map(({ id, content }) => {
      return (
        <li key={id} className="collection-item">
          { content }

          <i
            className="material-icons"
            onClick={() => this.onDoctorineDelete(id)}
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
        {this.renderDoctorines()}
      </ul>
    );
  }
}

const mutation = gql`
  mutation deleteDoctorine($id: ID) {
    deleteDoctorine(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(
  graphql(query)(DoctorineList)
);
