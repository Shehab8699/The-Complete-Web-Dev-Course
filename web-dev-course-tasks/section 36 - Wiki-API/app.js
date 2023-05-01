const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb://127.0.0.1:27017/wikiDB');

const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model('Article', articleSchema);

app
  .route('/articles')

  .get(function (req, res) {
    Article.find().then((articles) => {
      if (articles) {
        const jsonArticles = JSON.stringify(articles);
        res.send(jsonArticles);
      } else {
        res.send('No articles currently in wikiDB.');
      }
    });
  })

  .post(function (req, res) {
    const titleBody = req.body.title;
    const contentBody = req.body.content;
    const article = new Article({
      title: titleBody,
      content: contentBody,
    });
    article.save().then((article) => {
      if (article) {
        res.send('Successfully added a new article.');
      } else {
        res.send(article);
      }
    });
  })

  .delete((req, res) => {
    Article.deleteMany().then((found) => {
      if (found) {
        res.send(found);
      } else {
        res.send(found);
      }
    });
  });

//// Individual Articles

app
  .route('/articles/:articleTitle')

  .get(function (req, res) {
    const articleTitle = req.params.articleTitle;
    Article.find({ title: articleTitle }).then((articles) => {
      if (articles) {
        const jsonArticles = JSON.stringify(articles);
        res.send(jsonArticles);
      } else {
        res.send('No articles currently in wikiDB.');
      }
    });
  })

  .put((req, res) => {
    const articleTitle = req.params.articleTitle;
    const titleBody = req.body.title;
    const contentBody = req.body.content;
    Article.findOneAndUpdate(
      {
        title: articleTitle,
      },
      {
        $set: {
          title: titleBody,
          content: contentBody,
        },
      }
    ).then((found) => {
      res.send(found);
    });
  })

  .patch((req, res) => {
    const articleTitle = req.params.articleTitle;
    Article.findOneAndUpdate(
      {
        title: articleTitle,
      },
      {
        $set: req.body,
      }
    ).then((found) => {
      res.send(found);
    });
  })

  .delete((req, res) => {
    const articleTitle = req.params.articleTitle;
    Article.deleteOne({ title: articleTitle }).then((found) => {
      if (found) {
        res.send(found);
      } else {
        res.send(found);
      }
    });
  });

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
