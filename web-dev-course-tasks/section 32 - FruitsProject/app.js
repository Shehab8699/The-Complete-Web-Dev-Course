const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favouriteFruit: fruitSchema,
});

const Fruit = mongoose.model('Fruit', fruitSchema);
const Person = mongoose.model('Person', personSchema);

const pineapple = new Fruit({
  name: 'Pineapple',
  rating: 9,
  review: 'delicious',
});

pineapple.save();

const person = new Person({
  name: 'John',
  age: 20,
  favouriteFruit: pineapple,
});
person.save();

const peach = new Fruit({
  name: 'Peach',
  rating: 9,
  review: 'Great',
});
const apple = new Fruit({
  name: 'apple',
  rating: 9,
  review: 'Great',
});
const mango = new Fruit({
  name: 'mango',
  rating: 9,
  review: 'Great',
});
Fruit.insertMany([peach, apple, mango]).then((err, doc) => {
  if (err) {
    console.log(err);
  } else {
    console.log(doc);
  }
});
Person.updateOne({ first_nameno: 'Shehab' }, { favouriteFruit: peach }).then(
  function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log('Updated Docs : ', docs);
    }
  }
);


Fruit.deleteMany({ name: 'mango' }).then(function (err, docs) {
  if (err) {
    console.log(err);
  } else {
    console.log('Updated Docs : ', docs);
  }
});

Fruit.find()
  .then((fruits) => {
    fruits.forEach((fruit) => {
      console.log(fruit.name);
    });
    mongoose.connection.close();
  });
