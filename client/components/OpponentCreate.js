import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';


class OpponentCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { content: '' };
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.mutate({
      variables: {
        content: this.state.content,
        philosopherId: this.props.philosopherId
      }
    }).then(() => this.setState({ content: '' }));


  }

  render() {
    return (

        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Add an Opponent</label>
          <input
            value={this.state.content}
            onChange={event => this.setState({ content: event.target.value })}
          />
        </form>

    );
  }
}

const mutation = gql`
  mutation AddOpponentToPhilosopher($content: String, $philosopherId: ID) {
    addOpponentToPhilosopher(content: $content, philosopherId: $philosopherId) {
      id
      opponents {
        id
        content
      }
    }
  }
`;

export default graphql(mutation)(OpponentCreate);
