const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhilosopherSchema = new Schema({
  name: { type: String },
  arguments: [{
    type: Schema.Types.ObjectId,
    ref: 'argument'
  }],
  doctorines: [{
    type: Schema.Types.ObjectId,
    ref: 'doctorine'
  }],
  opponents: [{
    type: Schema.Types.ObjectId,
    ref: 'opponent'
  }]
});

PhilosopherSchema.statics.addArgument = function(id, content) {
  const Argument = mongoose.model('argument');

  return this.findById(id)
    .then(philosopher => {
      const argument = new Argument({ content, philosopher })
      philosopher.arguments.push(argument)
      return Promise.all([argument.save(), philosopher.save()])
        .then(([argument, philosopher]) => philosopher);

    });
}

PhilosopherSchema.statics.findArguments = function(id) {
  return this.findById(id)
    .populate('arguments')
    .then(philosopher => philosopher.arguments);
}

PhilosopherSchema.statics.addOpponent = function(id, content) {
  const Opponent = mongoose.model('opponent');

  return this.findById(id)
    .then(philosopher => {
      const opponent = new Opponent({ content, philosopher })
      philosopher.opponents.push(opponent)
      return Promise.all([opponent.save(), philosopher.save()])
        .then(([opponent, philosopher]) => philosopher);
    });
}

PhilosopherSchema.statics.findOpponents = function(id) {
  return this.findById(id)
    .populate('opponents')
    .then(philosopher => philosopher.opponents);
}

PhilosopherSchema.statics.addDoctorine = function(id, content) {
  const Doctorine = mongoose.model('doctorine');

  return this.findById(id)
    .then(philosopher => {
      const doctorine = new Doctorine({ content, philosopher })
      philosopher.doctorines.push(doctorine)
      return Promise.all([doctorine.save(), philosopher.save()])
        .then(([doctorine, philosopher]) => philosopher);

    });
}

PhilosopherSchema.statics.findDoctorines = function(id) {
  return this.findById(id)
    .populate('doctorines')
    .then(philosopher => philosopher.doctorines);
}




mongoose.model('philosopher', PhilosopherSchema);
