//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');

const itemsSchema = {
  name: String,
};

const Item = mongoose.model('Item', itemsSchema);

const item1 = new Item({
  name: 'Welcome to your todolist!',
});

const item2 = new Item({
  name: 'Hit the + button to add a new item.',
});

const item3 = new Item({
  name: '<-- Hit this to delete an item.',
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  item: [itemsSchema],
};

const List = mongoose.model('List', listSchema);

app.get('/', function (req, res) {
  Item.find({}).then((foundItems) => {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems).then((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('not added');
        }
      });
      res.redirect('/');
    } else {
      res.render('list', { listTitle: 'Today', newListItems: foundItems });
    }
  });
});
app.get('/:customListName', (req, res) => {
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({ name: customListName }).then((e) => {
    if (e) {
      console.log('exist');
      res.render('list', {
        listTitle: e.name,
        newListItems: e.item,
      });
    } else {
      console.log('not exist');

      const list = new List({
        name: customListName,
        item: defaultItems,
      });
      list.save();
      res.redirect('/' + customListName);
    }
  });
});
app.post('/', function (req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName,
  });

  if (listName === 'Today') {
    item.save();
    res.redirect('/');
  } else {
    List.findOne({ name: listName }).then((foundList) => {
      foundList.item.push(item);
      foundList.save();
      res.redirect('/' + listName);
    });
  }
});

app.post('/delete', function (req, res) {
  const itemName = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === 'Today') {
    Item.findByIdAndRemove(itemName).then((err) => {
      if (err) {
        console.log('item deleted');
        res.redirect('/');
      }
    });
  } else {
    List.findOne({ name: listName }).then((foundList) => {
      console.log(foundList);
      foundList.item.pull(itemName);
      foundList.save();
    });
  }
  res.redirect('/' + listName);

  // console.log(itemName);
  // console.log(listName);
  // List.findByIdAndUpdate(
  //   { name: listName },
  //   { $pull: { item: { _id: itemName } } }
  // ).then((e) => {
  //   if (e) {
  //     res.redirect('/' + listName);
  //   }
  // });
});

app.listen(3000, function () {
  console.log('Server started on port 3000');
});

/*

app.get('/work', function (req, res) {
  res.render('list', { listTitle: 'Work List', newItem: workItems });
});

app.get('/about', function (req, res) {
  res.render('about');
});

*/
