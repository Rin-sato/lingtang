// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// 假设我们使用一个数组来存储评论
let comments = [];

app.post('/api/comments', (req, res) => {
  const { username, content } = req.body;
  
  // 这里可以添加更多的验证和数据处理逻辑
  
  const newComment = { id: Date.now(), username, content };
  comments.push(newComment);
  
  res.status(201).json(newComment);
});

app.get('/api/comments', (req, res) => {
  res.status(200).json(comments);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
 
