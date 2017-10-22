const { ObjectID } = require('mongodb');

// In Express, routes are wrapped in a function which takes the express instance and database for arg
module.exports = (app , db) => {
  // GET ALL POST
  app.get('/blogpost' , (req,res) => {
    db.collection('blog_posts').find().toArray()
    .then( (result) => {
      res.send(result);
    }).catch((error) => {
      res.send('You dont have any blog post yet');
    })
  });
  // READING A POST ROUTE
  app.get('/blogpost/:id', (req,res) => {
    // read one post here
    const { id } = req.params;
    if(!ObjectID.isValid(id)){
      console.log('ID not valid');
    }
    db.collection('blog_posts').find({_id: new ObjectID(id)}).toArray()
    .then( (result) => {
      if(!result) {
        return console.log('ID not found');
      }
      res.send(result);
    })
    .catch((error) => {
      console.log('Prob',error);
    })
  });
  // MAKING CREATE ROUTE
  app.post('/blogpost', (req,res) => {
    // create a blog post here
    db.collection('blog_posts').insertOne({
      title: req.body.title,
      description: req.body.description
    }, (error, result) => {
      if(error){
        return res.send('Unable to insert post');
      }
      res.send(result.ops[0]);
    })
  });
  // DELETE ROUTE
  app.delete('/blogpost/:id' , (req,res) => {
    const { id } = req.params;
    db.collection('blog_posts').remove({
      _id: new ObjectID(id)
    })
    .then( (result) => {
      res.send('Note was deleted');
    })
    .catch((error) => {
      console.log('probs', error);
    })
  });
  // UPDATE ROUTE
  app.put('/blogpost/:id' , (req,res) => {
    const { id } = req.params;
    db.collection('blog_posts').update({
      _id: new ObjectID(id)
    }, {
      title: req.body.title,
      description: req.body.description
    }, (error, result) => {
      if(error) {
        return res.send('Unable to update post');
      } else {
        res.send(result);
      }
    })
  });
}
