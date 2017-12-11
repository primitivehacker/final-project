const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArgumentSchema = new Schema({
  philosopher: {
    type: Schema.Types.ObjectId,
    ref: 'philosopher'
  },
  doctorine: [{
    type: Schema.Types.ObjectId,
    ref: 'doctorine'
  }],
  content: { type: String }
});

ArgumentSchema.statics.addPhilosopher = function(id, content) {
  const Philosopher = mongoose.model('philosopher');

  return this.findById(id)
    .then(argument => {
      const philosopher = new Philosopher({ content, argument })
      argument.philosopher.push(argument)
      return Promise.all([philosopher.save(), argument.save()])
        .then(([philosopher, argument]) => argument);
    });
}

ArgumentSchema.statics.findPhilosophers = function(id) {
  return this.findById(id)
    .populate('philosophers')
    .then(argument => argument.philosophers);
}

ArgumentSchema.statics.addDoctorine = function(id, content) {
  const Doctorine = mongoose.model('doctorine');

  return this.findById(id)
    .then(argument => {
      const doctorine = new Doctorine({ content, argument})
      argument.doctorine.push(doctorine)
      return Promise.all([doctorine.save(), argument.save()])
        .then(([doctorine, argument]) => argument);
    });
}

ArgumentSchema.statics.findDoctorine = function(id) {
  return this.findById(id)
    .populate('doctorines')
    .then(argument => argument.doctorines);
}

mongoose.model('argument', ArgumentSchema);
