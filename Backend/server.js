const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const Web3 = require('web3');
require('dotenv').config();

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

// Configure Web3
const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`));
const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);

const { abi } = require('./MyNFT.json'); // Your contract ABI JSON file
const contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);

// Mint an NFT
const mintNFT = async (to) => {
  const tx = contract.methods.safeMint(to);
  const gas = await tx.estimateGas({ from: account.address });
  const gasPrice = await web3.eth.getGasPrice();
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(account.address);

  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: contract.options.address,
      data,
      gas,
      gasPrice,
      nonce,
      chainId: 1 // Mainnet chain ID
    },
    process.env.PRIVATE_KEY
  );

  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  return receipt.transactionHash;
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

// Add a new post and mint an NFT
app.post('/posts', async (req, res) => {
  const newPost = req.body;

  if (newPost && newPost.id && !posts.find(post => post.id === newPost.id)) {
    posts.push(newPost);
    savePosts();

    try {
      const transactionHash = await mintNFT(newPost.owner);
      res.json({ ...newPost, transactionHash });
    } catch (error) {
      console.error('Minting NFT failed:', error);
      res.status(500).send('Failed to mint NFT');
    }
  } else {
    res.status(400).send('Invalid post data or post already exists');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
