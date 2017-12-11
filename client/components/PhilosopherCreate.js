import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchPhilosophers';



class PhilosopherCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { name: '' };
  }


  onSubmit(event) {
    event.preventDefault();

    this.props.mutate({
      variables: { name: this.state.name },
      refetchQueries: [{ query }]
    }).then(() => hashHistory.push('/PhilosopherIndex'));
  }




  render() {
    return (
      <div>
        <Link to="/PhilosopherIndex">Back</Link>
        <h3>Create a New Philosopher</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Philosopher Name:</label>
          <input
            onChange={event => this.setState({ name: event.target.value })}
            value={this.state.name}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddPhilosopher($name: String){
    addPhilosopher(name: $name) {
      name
    }
  }
`;

export default graphql(mutation)(PhilosopherCreate);
