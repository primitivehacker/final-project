import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchPhilosopher from '../queries/fetchPhilosopher';
import OpponentCreate from './OpponentCreate';
import OpponentList from './OpponentList';
import DoctorineCreate from './DoctorineCreate';
import DoctorineList from './DoctorineList';
import ArgumentCreate from './ArgumentCreate';
import ArgumentList from './ArgumentList';




class PhilosopherDetail extends Component {


  render() {
    const { philosopher } = this.props.data;

    if (!philosopher) { return <div></div>; }


    return (
      <div>
        <Link to="philosopherIndex">Back</Link>
        <h3>{philosopher.name}</h3>
        <br />
        <h5>Opponents</h5>
        <OpponentList opponents={philosopher.opponents} />
        <OpponentCreate philosopherId={this.props.params.id} />
        <br />
        <h5>Doctorines</h5>
        <DoctorineList doctorines={philosopher.doctorines} />
        <DoctorineCreate philosopherId={this.props.params.id} />
        <br />
        <h5>Arguments</h5>
        <ArgumentList articleArguments={philosopher.arguments} />
        <ArgumentCreate philosopherId={this.props.params.id} />
      </div>


    );
  }
}

export default graphql(fetchPhilosopher, {
  options: (props) => { return { variables: { id: props.params.id } } }
})(PhilosopherDetail);
