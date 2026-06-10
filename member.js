const memberConfig = {
  currentPassword: "harukaze2026",
  storageKey: "harukaze-member-access-2026-06",
};

const lockScreen = document.querySelector("#lockScreen");
const memberSite = document.querySelector("#memberSite");
const passwordForm = document.querySelector("#passwordForm");
const passwordInput = document.querySelector("#passwordInput");
const formMessage = document.querySelector("#formMessage");
const logoutButton = document.querySelector("#logoutButton");
const memberRecipeList = document.querySelector("#memberRecipeList");
const recipeSeasonTabs = document.querySelectorAll(".recipe-season-tab");

const seasonLabels = {
  spring: "春",
  summer: "夏",
  autumn: "秋",
  winter: "冬",
};

function showMemberSite() {
  lockScreen.classList.add("hidden");
  memberSite.classList.remove("hidden");
  renderMemberRecipes(getCurrentCalendarSeason());
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showLockScreen() {
  memberSite.classList.add("hidden");
  lockScreen.classList.remove("hidden");
  passwordInput.value = "";
  passwordInput.focus();
}

if (localStorage.getItem(memberConfig.storageKey) === "ok") {
  showMemberSite();
}

passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const enteredPassword = passwordInput.value.trim();

  if (enteredPassword === memberConfig.currentPassword) {
    localStorage.setItem(memberConfig.storageKey, "ok");
    formMessage.textContent = "";
    showMemberSite();
    return;
  }

  formMessage.textContent = "パスワードが違います。今月のご案内をご確認ください。";
});

logoutButton.addEventListener("click", () => {
  localStorage.removeItem(memberConfig.storageKey);
  showLockScreen();
});

recipeSeasonTabs.forEach((button) => {
  button.addEventListener("click", () => {
    const season = button.dataset.recipeSeason || "spring";
    recipeSeasonTabs.forEach((tab) => tab.classList.remove("active"));
    button.classList.add("active");
    renderMemberRecipes(season);
  });
});

function getCurrentCalendarSeason() {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}

function getAllRecipes() {
  const existingRecipes = Array.isArray(window.harukazeRecipes) ? window.harukazeRecipes : [];
  const formattedRecipes = Array.isArray(window.harukazeFormattedRecipes) ? window.harukazeFormattedRecipes : [];
  const seen = new Set();

  return [...formattedRecipes, ...existingRecipes].filter((recipe) => {
    if (!recipe?.title || !recipe?.pdfUrl) return false;
    const key = `${recipe.title}::${recipe.pdfUrl}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function renderMemberRecipes(season) {
  if (!memberRecipeList) return;

  const recipes = getAllRecipes()
    .filter((recipe) => recipe.seasons?.includes(season))
    .sort((a, b) => (Number(a.priority) || 9999) - (Number(b.priority) || 9999))
    .slice(0, 6);

  const activeTab = document.querySelector(`[data-recipe-season="${season}"]`);
  if (activeTab) {
    recipeSeasonTabs.forEach((tab) => tab.classList.remove("active"));
    activeTab.classList.add("active");
  }

  if (!recipes.length) {
    memberRecipeList.innerHTML = `
      <article class="member-recipe-card">
        <p class="empty-message">${seasonLabels[season]}のレシピは準備中です。</p>
      </article>
    `;
    return;
  }

  memberRecipeList.innerHTML = recipes.map(renderMemberRecipeCard).join("");
}

function renderMemberRecipeCard(recipe) {
  const tags = (recipe.tags || [])
    .slice(0, 4)
    .map((tag) => `<span>${escapeHtml(tag)}</span>`)
    .join("");
  const seasons = (recipe.seasonLabels || []).join("・");
  const href = getRecipeUrl(recipe);

  return `
    <article class="member-recipe-card">
      <p class="recipe-season-label">${escapeHtml(seasons)}</p>
      <h3>${escapeHtml(recipe.title)}</h3>
      <p>${escapeHtml(recipe.scene || "季節に合わせたレシピです。")}</p>
      <div class="recipe-tags">${tags}</div>
      <a href="${escapeAttribute(href)}" target="_blank" rel="noreferrer">レシピPDFを見る</a>
    </article>
  `;
}

function getRecipeUrl(recipe) {
  if (!recipe?.pdfUrl) return "";
  if (recipe.pdfUrl.includes("/assets/recipes/formatted/") || recipe.memo?.includes("Word形式から統一PDF化")) {
    return `https://docs.google.com/viewer?url=${encodeURIComponent(recipe.pdfUrl)}`;
  }
  return recipe.pdfUrl;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}
