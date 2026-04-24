const API = "http://localhost:3000/api";

// Get saved JWT token from browser
function getToken() {
  return localStorage.getItem("token");
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

// Auth UI (depends on login status)
function renderAuthBar() {
  const bar = document.getElementById("auth-bar");
  const token = getToken();

  if (token) {
    bar.innerHTML = `
      <span id="user-label">Logged in</span>
      <button onclick="handleLogout()">Logout</button>
    `;
    fetchCurrentUser();
  } else {
    bar.innerHTML = `
      <button onclick="handleLogin()">Login</button>
      <button onclick="handleRegister()">Register</button>
    `;
  }
}

// Get current user info using token
async function fetchCurrentUser() {
  const res = await fetch(`${API}/auth/me`, { headers: authHeaders() });
  if (res.ok) {
    const user = await res.json();
    document.getElementById("user-label").textContent = `Hi, ${user.username}`;
  }
}

// Get email address and password from user input
async function handleLogin() {
  const email = prompt("Email:");
  const password = prompt("Password:");
  if (!email || !password) return;

  // send it to the server
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("token", data.token);
    renderAuthBar();
    alert("Logged in!");
  } else {
    alert(data.message || "Login failed");
  }
}

// Request to register
async function handleRegister() {
  const username = prompt("Username:");
  const email = prompt("Email:");
  const password = prompt("Password:");
  if (!username || !email || !password) return;

  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();
  if (res.ok) {
    alert("Registered! Please login.");
  } else {
    alert(data.message || "Register failed");
  }
}

// Remove token -> logout
function handleLogout() {
  localStorage.removeItem("token");
  renderAuthBar();
}

// Post handlers
// Create a post (required login)
async function handleCreatePost() {
  if (!getToken()) return alert("Please login first.");

  const title = prompt("Post title:");
  const content = prompt("Post content:");
  if (!title || !content) return;

  const res = await fetch(`${API}/posts`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ title, content }),
  });

  const data = await res.json();
  if (res.ok) {
    alert("Post created!");
    loadForumSections();
  } else {
    alert(data.message || "Failed to create post");
  }
}

async function handleEditPost(postId) {
  if (!getToken()) return alert("Please login first.");

  const title = prompt("New title:");
  const content = prompt("New content:");
  if (!title || !content) return;

  const res = await fetch(`${API}/posts/${postId}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ title, content }),
  });

  const data = await res.json();
  if (res.ok) {
    alert("Post updated!");
    loadForumSections();
  } else {
    alert(data.message || "Failed to update post");
  }
}

async function handleDeletePost(postId) {
  if (!getToken()) return alert("Please login first.");
  if (!confirm("Delete this post?")) return;

  const res = await fetch(`${API}/posts/${postId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (res.ok) {
    alert("Post deleted!");
    loadForumSections();
  } else {
    const data = await res.json();
    alert(data.message || "Failed to delete post");
  }
}

async function handleComment(postId) {
  if (!getToken()) return alert("Please login first.");

  const content = prompt("Your comment:");
  if (!content) return;

  const res = await fetch(`${API}/comments/${postId}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ content }),
  });

  const data = await res.json();
  if (res.ok) {
    alert("Comment added!");
  } else {
    alert(data.message || "Failed to add comment");
  }
}

// Forum rendering

async function loadForumSections() {
  try {
    const response = await fetch(`${API}/forum-sections`);
    if (!response.ok) throw new Error("Failed to fetch forum sections");
    const sections = await response.json();
    renderForumSections(sections);
  } catch (error) {
    console.error(error);
    document.getElementById("forum-container").innerHTML =
      "<p>Failed to load forum data.</p>";
  }
}

function renderForumSections(sections) {
  const container = document.getElementById("forum-container");
  container.innerHTML = "";

  sections.forEach((section) => {
    const sectionHtml = `
      <section class="forum-section">
        <div class="section-header">
          <div class="section-header-left">
            <h2>${section.title}</h2>
            <p>${section.description}</p>
          </div>
          <button class="collapse-btn">−</button>
        </div>

        <div class="forum-table-header">
          <div class="col-title">Title</div>
          <div class="col-stats"></div>
          <div class="col-lastpost">Last Post</div>
        </div>

        ${section.forums.map((forum) => createForumRow(forum)).join("")}
      </section>
    `;

    container.innerHTML += sectionHtml;
  });
}

function createForumRow(forum) {
  const id = forum._id || "";
  return `
    <div class="forum-row">
      <div class="forum-main">
        <div class="forum-icon ${forum.iconColor}"></div>
        <div class="forum-info">
          <h3>${forum.title} <span>(${forum.viewingCount} Viewing)</span></h3>
          <p>${forum.description}</p>
        </div>
      </div>

      <div class="forum-stats">
        <p>Threads: ${forum.threads}</p>
        <p>Posts: ${forum.posts}</p>
      </div>

      <div class="forum-lastpost">
        <a href="#">${forum.lastPost.title}</a>
        <p>by ${forum.lastPost.author}</p>
        <p>${formatDate(forum.lastPost.createdAt)}</p>
      </div>

      <div class="forum-button">
        <button onclick="handleComment('${id}')">Comment</button>
        <button onclick="handleEditPost('${id}')">Edit</button>
        <button onclick="handleDeletePost('${id}')">Delete</button>
      </div>
    </div>
  `;
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleString();
}

// Init

renderAuthBar();
loadForumSections();

document
  .querySelector(".section-header-left button")
  .addEventListener("click", handleCreatePost);
