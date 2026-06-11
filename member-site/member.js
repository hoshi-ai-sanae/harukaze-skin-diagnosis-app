const memberConfig = {
  currentPassword: "harukaze2026",
  storageKey: "harukaze-member-access-2026-06",
  displayMonth: 7,
};

const lockScreen = document.querySelector("#lockScreen");
const memberSite = document.querySelector("#memberSite");
const passwordForm = document.querySelector("#passwordForm");
const passwordInput = document.querySelector("#passwordInput");
const passwordToggle = document.querySelector("#passwordToggle");
const passwordToggleText = document.querySelector("#passwordToggleText");
const formMessage = document.querySelector("#formMessage");
const logoutButton = document.querySelector("#logoutButton");
const memberRecipeList = document.querySelector("#memberRecipeList");
const recipeSeasonTabs = document.querySelectorAll(".recipe-season-tab");
const currentMonthLabel = document.querySelector("#currentMonthLabel");
const seasonDiagnosisLink = document.querySelector("#seasonDiagnosisLink");

const seasonLabels = {
  spring: "春",
  summer: "夏",
  autumn: "秋",
  winter: "冬",
};

const fallbackRecipesBySeason = {
  spring: [
    {
      title: "豆乳と甘酒のプリン いちごとクコの実ソースがけ",
      seasons: ["spring"],
      seasonLabels: ["春"],
      tags: ["春", "デトックス", "ゆらぎ", "スイーツ"],
      scene: "春の季節に合わせた、春奈さんのレシピです。",
      pdfUrl: "https://hoshi-ai-sanae.github.io/harukaze-skin-diagnosis-app/assets/recipes/formatted/03.pdf",
      priority: 102,
      memo: "Word形式から統一PDF化",
    },
    {
      title: "〜菜の花チャンプルー〜",
      seasons: ["spring"],
      seasonLabels: ["春"],
      tags: ["春", "デトックス", "ゆらぎ", "野菜"],
      scene: "春の季節に合わせた、春奈さんのレシピです。",
      pdfUrl: "https://hoshi-ai-sanae.github.io/harukaze-skin-diagnosis-app/assets/recipes/formatted/04.pdf",
      priority: 103,
      memo: "Word形式から統一PDF化",
    },
    {
      title: "いちごの食べるスムージー",
      seasons: ["spring"],
      seasonLabels: ["春"],
      tags: ["春", "デトックス", "スイーツ", "うるおい"],
      scene: "春の季節に合わせた、春奈さんのレシピです。",
      pdfUrl: "https://hoshi-ai-sanae.github.io/harukaze-skin-diagnosis-app/assets/recipes/formatted/11.pdf",
      priority: 110,
      memo: "Word形式から統一PDF化",
    },
  ],
  summer: [
    {
      title: "〜夏のピリ辛チャーハン〜",
      seasons: ["summer"],
      seasonLabels: ["夏"],
      tags: ["夏", "紫外線", "うるおい", "主食"],
      scene: "夏の季節に合わせた、春奈さんのレシピです。",
      pdfUrl: "https://hoshi-ai-sanae.github.io/harukaze-skin-diagnosis-app/assets/recipes/formatted/01.pdf",
      priority: 100,
      memo: "Word形式から統一PDF化",
    },
    {
      title: "具たくさんサンラータン麺",
      seasons: ["summer"],
      seasonLabels: ["夏"],
      tags: ["夏", "紫外線", "うるおい", "主食"],
      scene: "夏の季節に合わせた、春奈さんのレシピです。",
      pdfUrl: "https://hoshi-ai-sanae.github.io/harukaze-skin-diagnosis-app/assets/recipes/formatted/02.pdf",
      priority: 101,
      memo: "Word形式から統一PDF化",
    },
    {
      title: "夏野菜たっぷりチャーハン",
      seasons: ["summer"],
      seasonLabels: ["夏"],
      tags: ["夏", "紫外線", "うるおい", "主食"],
      scene: "夏の季節に合わせた、春奈さんのレシピです。",
      pdfUrl: "https://hoshi-ai-sanae.github.io/harukaze-skin-diagnosis-app/assets/recipes/formatted/17.pdf",
      priority: 116,
      memo: "Word形式から統一PDF化",
    },
  ],
  autumn: [
    {
      title: "あったかスイートパンプキン",
      seasons: ["autumn"],
      seasonLabels: ["秋"],
      tags: ["秋", "乾燥", "巡り", "スイーツ"],
      scene: "秋の季節に合わせた、春奈さんのレシピです。",
      pdfUrl: "https://hoshi-ai-sanae.github.io/harukaze-skin-diagnosis-app/assets/recipes/formatted/07.pdf",
      priority: 106,
      memo: "Word形式から統一PDF化",
    },
    {
      title: "体ぽかぽか 鶏団子と野菜のお味噌汁",
      seasons: ["autumn"],
      seasonLabels: ["秋"],
      tags: ["秋", "乾燥", "巡り", "温活"],
      scene: "秋の季節に合わせた、春奈さんのレシピです。",
      pdfUrl: "https://hoshi-ai-sanae.github.io/harukaze-skin-diagnosis-app/assets/recipes/formatted/08.pdf",
      priority: 107,
      memo: "Word形式から統一PDF化",
    },
    {
      title: "黒キクラゲ入り蓮根ボール",
      seasons: ["autumn"],
      seasonLabels: ["秋"],
      tags: ["秋", "乾燥", "巡り", "野菜"],
      scene: "秋の季節に合わせた、春奈さんのレシピです。",
      pdfUrl: "https://hoshi-ai-sanae.github.io/harukaze-skin-diagnosis-app/assets/recipes/formatted/09.pdf",
      priority: 108,
      memo: "Word形式から統一PDF化",
    },
  ],
  winter: [
    {
      title: "いちごとアボカドのクミン和え",
      seasons: ["winter"],
      seasonLabels: ["冬"],
      tags: ["冬", "冷え", "乾燥", "野菜"],
      scene: "冬の季節に合わせた、春奈さんのレシピです。",
      pdfUrl: "https://hoshi-ai-sanae.github.io/harukaze-skin-diagnosis-app/assets/recipes/formatted/05.pdf",
      priority: 104,
      memo: "Word形式から統一PDF化",
    },
    {
      title: "かぶと鶏肉の豆乳スープ",
      seasons: ["winter"],
      seasonLabels: ["冬"],
      tags: ["冬", "冷え", "乾燥", "温活"],
      scene: "冬の季節に合わせた、春奈さんのレシピです。",
      pdfUrl: "https://hoshi-ai-sanae.github.io/harukaze-skin-diagnosis-app/assets/recipes/formatted/06.pdf",
      priority: 105,
      memo: "Word形式から統一PDF化",
    },
    {
      title: "体ポカポカ 鮭と野菜のグラタン",
      seasons: ["winter"],
      seasonLabels: ["冬"],
      tags: ["冬", "冷え", "乾燥", "温活"],
      scene: "冬の季節に合わせた、春奈さんのレシピです。",
      pdfUrl: "https://hoshi-ai-sanae.github.io/harukaze-skin-diagnosis-app/assets/recipes/formatted/15.pdf",
      priority: 114,
      memo: "Word形式から統一PDF化",
    },
  ],
};

function showMemberSite() {
  updateMonthlyContent();
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

if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem(memberConfig.storageKey);
    showLockScreen();
  });
}

if (passwordToggle) {
  passwordToggle.addEventListener("click", () => {
    const isVisible = passwordInput.type === "text";
    passwordInput.type = isVisible ? "password" : "text";
    passwordToggle.classList.toggle("is-visible", !isVisible);
    passwordToggle.setAttribute("aria-label", isVisible ? "パスワードを表示" : "パスワードを非表示");
    if (passwordToggleText) {
      passwordToggleText.textContent = isVisible ? "表示" : "非表示";
    }
  });
}

recipeSeasonTabs.forEach((button) => {
  button.addEventListener("click", () => {
    const season = button.dataset.recipeSeason || "spring";
    recipeSeasonTabs.forEach((tab) => tab.classList.remove("active"));
    button.classList.add("active");
    renderMemberRecipes(season);
  });
});

function getCurrentCalendarSeason() {
  const month = getDisplayMonth();
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}

function updateMonthlyContent() {
  const month = getDisplayMonth();
  const season = getCurrentCalendarSeason();
  const label = seasonLabels[season] || "";

  if (currentMonthLabel) {
    currentMonthLabel.textContent = `${month}月の会員ページ・${label}のお手入れ`;
  }

  if (seasonDiagnosisLink) {
    seasonDiagnosisLink.href = `../app/?season=${season}&v=20260612a`;
  }
}

function getDisplayMonth() {
  return memberConfig.displayMonth || new Date().getMonth() + 1;
}

function getAllRecipes() {
  const existingRecipes = Array.isArray(window.harukazeRecipes) ? window.harukazeRecipes : [];
  const formattedRecipes = Array.isArray(window.harukazeFormattedRecipes) ? window.harukazeFormattedRecipes : [];
  const fallbackRecipes = Object.values(fallbackRecipesBySeason).flat();
  const seen = new Set();
  const primaryRecipes = [...formattedRecipes, ...existingRecipes];
  const sourceRecipes = primaryRecipes.length ? primaryRecipes : fallbackRecipes;

  return sourceRecipes.filter((recipe) => {
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
