const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
const Doctorine = mongoose.model('doctorine');

const DoctorineType = new GraphQLObjectType({
  name:  'DoctorineType',
  fields: () => ({
    id: { type: GraphQLID },
    content: { type: GraphQLString },
    philosopher: {
      type: require('./philosopher_type'),
      resolve(parentValue) {
        return Doctorine.findById(parentValue).populate('philosopher')
          .then(doctorine => {
            console.log(doctorine)
            return doctorine.philosopher
          });
      }
    }
  })
});

module.exports = DoctorineType;
