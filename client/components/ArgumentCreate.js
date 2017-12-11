import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class ArgumentCreate extends Component {
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
        <label>Add a Argument</label>
        <input
          value={this.state.content}
          onChange={event => this.setState({ content: event.target.value})}
        />
      </form>
    );
  }
}

const mutation = gql`
  mutation AddArgumentToPhilosopher($content: String, $philosopherId: ID) {
    addArgumentToPhilosopher(content: $content, philosopherId: $philosopherId) {
      id
      arguments {
        id
        content
      }
    }
  }
`;

export default graphql(mutation)(ArgumentCreate);
