const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000; // You can choose any port you like

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Path to your DummyPost.js file
const postsFilePath = path.join(__dirname, 'dummyPosts.js');

// Load posts from the DummyPost.js file
let posts = require(postsFilePath);

// Helper function to save posts to DummyPost.js
const savePosts = () => {
  fs.writeFileSync(postsFilePath, `module.exports = ${JSON.stringify(posts, null, 2)};`);
};

// Get all posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

// Like a post
app.post('/posts/:id/like', (req, res) => {
  const postId = req.params.id;
  const post = posts.find(post => post.id === postId);

  if (post) {
    post.likes += 1;
    savePosts();
    res.json(post);
  } else {
    res.status(404).send('Post not found');
  }
});

// Add a comment to a post
app.post('/posts/:id/comment', (req, res) => {
  const postId = req.params.id;
  const { user, comment } = req.body;
  const post = posts.find(post => post.id === postId);

  if (post) {
    const newComment = {
      id: (post.comments.length + 1).toString(),
      user,
      comment,
      timestamp: new Date().toISOString()
    };
    post.comments.push(newComment);
    savePosts();
    res.json(post);
  } else {
    res.status(404).send('Post not found');
  }
});

// Add a new post
app.post('/posts', (req, res) => {
  const newPost = req.body;

  if (newPost && newPost.id && !posts.find(post => post.id === newPost.id)) {
    posts.push(newPost);
    savePosts();
    res.json(newPost);
  } else {
    res.status(400).send('Invalid post data or post already exists');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
