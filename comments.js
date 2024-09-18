// comments.js
document.addEventListener('DOMContentLoaded', loadComments);

function loadComments() {
  fetchComments();
  // 可以设置一个定时器，定期刷新评论
  setInterval(fetchComments, 10000); // 每10秒刷新一次评论
}

async function fetchComments() {
  try {
    const response = await fetch('/api/comments');
    const comments = await response.json();
    displayComments(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
}

function displayComments(comments) {
  const container = document.getElementById('comments-container');
  container.innerHTML = ''; // 清空现有的评论

  // 创建评论元素并添加到容器中
  comments.forEach(comment => {
    const commentElement = document.createElement('div');
    commentElement.className = 'comment';
    commentElement.innerHTML = `
      <h3>${comment.username}</h3>
      <p>${comment.content}</p>
    `;
    container.appendChild(commentElement);
  });
}
 
