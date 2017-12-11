const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const ArgumentType = require('./argument_type');
const DoctorineType = require('./doctorine_type');
const OpponentType = require('./opponent_type');
const Philosopher = mongoose.model('philosopher');


const PhilosopherType = new GraphQLObjectType({
  name: 'PhilosopherType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    doctorines: {
      type: new GraphQLList(DoctorineType),
      resolve(parentValue) {
        return Philosopher.findDoctorines(parentValue.id);
      }
    },
    arguments: {
      type: new GraphQLList(ArgumentType),
      resolve(parentValue) {
        return Philosopher.findArguments(parentValue.id);
      }
    },
    opponents: {
      type: new GraphQLList(OpponentType),
      resolve(parentValue) {
        return Philosopher.findOpponents(parentValue.id);
      }
    }
  })
});

module.exports = PhilosopherType;
