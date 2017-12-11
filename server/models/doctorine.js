const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorineSchema = new Schema({
  title: { type: String },
  philosopher: [{
    type: Schema.Types.ObjectId,
    ref: 'philosopher'
  }],
  argument: [{
    type: Schema.Types.ObjectId,
    ref: 'argument'
  }],
  opponent: [{
    type: Schema.Types.ObjectId,
    ref: 'opponent'
  }],
  content: { type: String }
});

DoctorineSchema.statics.addPhilosopher = function(id) {
  const Philosopher = mongoose.model('philosopher');

  return this.findById(id)
    .then(doctorine => {
      const philosopher = new Philosopher({ doctorine })
      doctorine.philosopher.push(philosopher)
      return Promise.all([philosopher.save(), doctorine.save()])
        .then(([philosopher, doctorine]) => doctorine);
    });
}

DoctorineSchema.statics.findPhilosopher = function(id) {
  return this.findById(id)
    .populate('philosphers')
    .then(doctorine => doctorine.philosopher);
}

DoctorineSchema.statics.addArgument = function(id) {
  const Argument = mongoose.model('argument');

  return this.findById(id)
    .then(doctorine => {
      const argument = new Argument({ doctorine })
      doctorine.argument.push(argument)
      return Promise.all([argument.save(), doctorine.save()])
        .then(([argument, doctorine]) => doctorine);
    });
}

DoctorineSchema.statics.findArguments = function(id) {
  return this.findById(id)
    .populate('arguments')
    .then(doctorine => doctorine.arguments);
}

mongoose.model('doctorine', DoctorineSchema);
