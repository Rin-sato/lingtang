// comments.js
document.getElementById('commentForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const content = document.getElementById('content').value;
  const comment = { username, content };
  try {
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    });
    const data = await response.json();
    console.log('Comment added:', data);
    // 可以在这里添加代码来更新页面上的评论列表
  } catch (error) {
    console.error('Error submitting comment:', error);
  }
});
