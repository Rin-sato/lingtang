import { kv } from '@vercel/kv';

export const config = {
  runtime: 'edge',
};

// 获取所有评论
export async function GET(request) {
  try {
    const comments = await kv.get('comments') || [];
    return new Response(JSON.stringify(comments), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// 添加评论
export async function POST(request) {
  try {
    const { username, content } = await request.json();
    const comments = await kv.get('comments') || [];
    comments.push({ username, content });
    await kv.set('comments', comments);
    return new Response('Comment created successfully', { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
