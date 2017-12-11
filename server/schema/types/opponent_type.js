const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
const Opponent = mongoose.model('opponent');

const OpponentType = new GraphQLObjectType({
  name:  'OpponentType',
  fields: () => ({
    id: { type: GraphQLID },
    content: { type: GraphQLString },
    philosopher: {
      type: require('./philosopher_type'),
      resolve(parentValue) {
        return Opponent.findById(parentValue).populate('philosopher')
          .then(opponent => {
            console.log(opponent)
            return opponent.philosopher
          });
      }
    }
  })
});

module.exports = OpponentType;
