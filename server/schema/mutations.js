const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql;
const mongoose = require('mongoose');
const Philosopher = mongoose.model('philosopher');
const Argument = mongoose.model('argument');
const Opponent = mongoose.model('opponent');
const Doctorine = mongoose.model('doctorine');
const UserType = require('./types/user_type');
const PhilosopherType = require('./types/philosopher_type');
const ArgumentType = require('./types/argument_type');
const OpponentType = require('./types/opponent_type');
const DoctorineType = require('./types/doctorine_type');
const AuthService = require('../services/auth');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.signup({ email, password, req })
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout();
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.login({ email, password, req });
      }
    },
    addPhilosopher: {
      type: PhilosopherType,
      args: {
        name: { type: GraphQLString }
      },
      resolve(parentValue, { name }) {
        return (new Philosopher({ name })).save()
      }
    },
    addArgumentToPhilosopher: {
      type: PhilosopherType,
      args: {
        content: { type: GraphQLString },
        philosopherId: { type: GraphQLID }
      },
      resolve(parentValue, { content, philosopherId }) {
        return Philosopher.addArgument(philosopherId, content);
      }
    },
    addOpponentToPhilosopher: {
      type: PhilosopherType,
      args: {
        content: { type: GraphQLString },
        philosopherId: { type: GraphQLID }
      },
      resolve(parentValue, { content, philosopherId }) {
        return Philosopher.addOpponent(philosopherId, content);
      }
    },
    addDoctorineToPhilosopher: {
      type: PhilosopherType,
      args: {
        content: { type: GraphQLString },
        philosopherId: { type: GraphQLID }
      },
      resolve(parentValue, { content, philosopherId }) {
        return Philosopher.addDoctorine(philosopherId, content);
      }
    },
    deletePhilosopher: {
      type: PhilosopherType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Philosopher.remove({ _id: id });
      }
    },
    deleteOpponent: {
      type: OpponentType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Opponent.remove({ _id: id });
      }
    },

    deleteArgument: {
      type: ArgumentType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Argument.remove({ _id: id });
      }
    },

    deleteDoctorine: {
      type: DoctorineType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Doctorine.remove({ _id: id });
      }
    }



  }
});

module.exports = mutation;
