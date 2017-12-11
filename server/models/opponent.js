const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OpponentSchema = new Schema({
  title: { type: String },
  philosopher: [{
    type: Schema.Types.ObjectId,
    ref: 'philosopher'
  }],
  argument: [{
    type: Schema.Types.ObjectId,
    ref: 'argument'
  }],
  doctorine: [{
    type: Schema.Types.ObjectId,
    ref: 'doctorine'
  }],
  content: { type: String }
});

OpponentSchema.statics.addPhilosopher = function(id) {
  const Philosopher = mongoose.model('philosopher');

  return this.findById(id)
    .then(opponent => {
      const philosopher = new Philosopher({ opponent })
      opponent.philosopher.push(philosopher)
      return Promise.all([philosopher.save(), opponent.save()])
        .then(([philosopher, opponent]) => opponent);
    });
}

OpponentSchema.statics.findPhilosopher = function(id) {
  return this.findById(id)
    .populate('philosphers')
    .then(opponent => opponent.philosopher);
}

OpponentSchema.statics.addArgument = function(id) {
  const Argument = mongoose.model('argument');

  return this.findById(id)
    .then(opponent => {
      const argument = new Argument({ opponent })
      opponent.argument.push(argument)
      return Promise.all([argument.save(), opponent.save()])
        .then(([argument, opponent]) => opponent);
    });
}

OpponentSchema.statics.findArguments = function(id) {
  return this.findById(id)
    .populate('arguments')
    .then(opponent => opponent.arguments);
}

mongoose.model('opponent', OpponentSchema);
