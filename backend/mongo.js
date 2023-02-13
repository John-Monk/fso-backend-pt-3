const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://johnnymongodb:${password}@cluster0.dhhmrpz.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

const name = process.argv[3];
const number = process.argv[4];

if (!name && !number) {
  console.log('phonebook:');
  Person.find({})
  .then((res) => {
    res.map(({ name, number }) => {
      console.log(name, number);
    });
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((res) => {
    console.log(`Added ${name} number ${number} to phonebook.`);
    mongoose.connection.close();
  });
}

//How to use
//In the command line enter "node mongo.js <password>" to retrieve list of names and nubmers in DB
//To add an entry enter "node mongo.js <password> <new name> <new number>"