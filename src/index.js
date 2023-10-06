const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5050;

const users = [];
const posts = [];

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());


// User Sign-Up API
app.post('/api/signup', (req, res) => {
  const { name, email } = req.body;
  // Check if user already exists (you may want to use a unique identifier)
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // Create a new user
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(200).json({ message: 'User signed up successfully', user: newUser });
  console.log(newUser);
});


// Create Post API
app.post('/api/posts', (req, res) => {
  const { userId, content } = req.body;
  // Check if the user exists
  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }
  // Create a new post
  const newPost = { id: posts.length + 1, userId, content };
  posts.push(newPost);
  res.status(200).json({ message: 'Post created successfully', post: newPost });
});


// Delete Post API
app.delete('/api/deletepost/:postId', (req, res) => {
  const postId = parseInt(req.params.postId);
  // Find and delete the post by postId
  const index = posts.findIndex((post) => post.id === postId);
  if (index === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  posts.splice(index, 1);
  res.status(200).json({ message: 'Post deleted successfully' });
});


// Fetch User's Posts API
app.get('/api/posts/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  // Find all posts by userId
  const userPosts = posts.filter((post) => post.userId === userId);
  res.status(200).json({ posts: userPosts });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



