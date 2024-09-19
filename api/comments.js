import { kv } from '@vercel/kv';
import express from 'express';

const router = express.Router();

// 获取所有评论
router.get('/', async (req, res) => {
  try {
    const comments = await kv.get('comments') || [];
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).send('Internal Server Error');
  }
});

// 添加评论
router.post('/', async (req, res) => {
  try {
    const { username, content } = req.body;
    const comments = await kv.get('comments') || [];
    comments.push({ username, content });
    await kv.set('comments', comments);
    res.status(201).send('Comment created successfully');
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
