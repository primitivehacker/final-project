const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const UserType = require('./user_type');
const PhilosopherType = require('./philosopher_type');
const ArgumentType = require('./argument_type');
const DoctorineType = require('./doctorine_type');
const OpponentType = require('./opponent_type');
const Philosopher = mongoose.model('philosopher');
const Argument = mongoose.model('argument');
const Doctorine = mongoose.model('doctorine');
const Opponent = mongoose.model('opponent');


const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    //current user
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      }
    },
    philosophers: {
      type: new GraphQLList(PhilosopherType),
      resolve() {
        return Philosopher.find({});
      }
    },
    philosopher: {
      type: PhilosopherType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Philosopher.findById(id);
      }
    },
    arguments: {
      type: new GraphQLList(ArgumentType),
      resolve() {
        return Argument.find({});
      }
    },
    argument: {
      type: ArgumentType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Argument.findById(id);
      }
    },
    doctorines: {
      type: new GraphQLList(DoctorineType),
      resolve() {
        return Doctorine.find({});
      }
    },
    doctorine: {
      type: DoctorineType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Doctorine.findById(id);
      }
    },
    opponents: {
      type: new GraphQLList(OpponentType),
      resolve() {
        return Opponent.find({});
      }
    },
    opponent: {
      type: OpponentType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Opponent.findById(id);
      }
    },

  })
});

module.exports = RootQueryType;
