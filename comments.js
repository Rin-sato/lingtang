document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('commentForm');
  const usernameInput = document.getElementById('username');
  const contentInput = document.getElementById('content');
  const commentsContainer = document.getElementById('comments');

  // 获取评论列表
  function getComments() {
    fetch('/api/comments')
      .then(response => response.json())
      .then(data => displayComments(data))
      .catch(error => console.error('Error fetching comments:', error));
  }

  // 显示评论
  function displayComments(comments) {
    commentsContainer.innerHTML = ''; // 清空之前的评论
    comments.forEach(comment => {
      const commentDiv = document.createElement('div');
      commentDiv.innerHTML = `
        <strong>${comment.username}</strong>: ${comment.content}
      `;
      commentsContainer.appendChild(commentDiv);
    });
  }

  // 发送评论
  function postComment(username, content) {
    fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, content })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        usernameInput.value = '';
        contentInput.value = '';
        getComments(); // 重新获取评论列表并显示
      })
      .catch(error => console.error('Error posting comment:', error));
  }

  // 监听表单提交事件
  form.addEventListener('submit', event => {
    event.preventDefault();
    const username = usernameInput.value.trim();
    const content = contentInput.value.trim();
    if (username && content) {
      postComment(username, content);
    } else {
      alert('请填写用户名和评论内容！');
    }
  });

  // 初始化加载评论
  getComments();
});
