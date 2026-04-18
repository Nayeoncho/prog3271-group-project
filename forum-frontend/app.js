async function loadForumSections() {
  try {
    const response = await fetch("http://localhost:3000/api/forum-sections");

    if (!response.ok) {
      throw new Error("Failed to fetch forum sections");
    }

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
            <button>Comment</button>
            <button>Edit</button>
            <button>Delete</button>
          </div>
    </div>
  `;
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleString();
}

loadForumSections();
