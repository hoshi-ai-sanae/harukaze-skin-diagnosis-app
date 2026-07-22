const seasons = {
  spring: {
    banner: "../assets/spring-banner.png",
    alt: "春のお肌診断バナー",
    label: "春",
    lead: "花粉・乾燥・季節のゆらぎに寄り添い、毎日の石けんケアや保湿ケアのヒントをお届けします。",
  },
  summer: {
    banner: "../assets/summer-banner.png",
    alt: "夏のお肌診断バナー",
    label: "夏",
    lead: "汗ばむ季節のうるおい不足、紫外線を浴びた肌、毛穴まわりの気分に合わせてケアを見直しましょう。",
  },
  autumn: {
    banner: "../assets/autumn-banner.png",
    alt: "秋のお肌診断バナー",
    label: "秋",
    lead: "夏を過ごした肌をいたわりながら、乾燥・くすみ感・ハリ不足が気になる季節のケアを整えます。",
  },
  winter: {
    banner: "../assets/winter-banner.png",
    alt: "冬のお肌診断バナー",
    label: "冬",
    lead: "冷えや乾燥が気になる季節に、やさしい洗顔と保湿を中心にしたケアのヒントをお届けします。",
  },
};

const scale3 = (key) => [
  { label: "気にならない", score: { balance: 1 } },
  { label: "少し気になる", score: { [key]: 2 } },
  { label: "とても気になる", score: { [key]: 3 } },
];

const scaleOften = (key) => [
  { label: "ほとんどない", score: { balance: 1 } },
  { label: "時々ある", score: { [key]: 2 } },
  { label: "よくある", score: { [key]: 3 } },
];

const questionsBySeason = {
  summer: [
    { text: "日中、肌のベタつきが気になりますか？", answers: scale3("oil") },
    { text: "朝と比べて、夕方のテカリはどの程度ですか？", answers: scale3("oil") },
    { text: "毛穴の開きや黒ずみが目立つと感じますか？", answers: scale3("pore") },
    { text: "日差しを浴びた後に、赤みやヒリつきを感じることがありますか？", answers: scaleOften("uv") },
    { text: "エアコンの効いた室内に長時間いることが多いですか？", answers: scaleOften("innerDry") },
    { text: "夏でも肌の乾燥を感じることはありますか？", answers: scaleOften("innerDry") },
    { text: "洗顔後、肌トラブルが起こりやすいですか？", answers: scaleOften("sensitive") },
    { text: "紫外線対策をどの程度行っていますか？", answers: [
      { label: "ほとんどしない", score: { uv: 3 } },
      { label: "外出時のみ", score: { uv: 2 } },
      { label: "毎日しっかり", score: { balance: 2 } },
    ] },
    { text: "最近、くすみ感や透明感の低下を感じますか？", answers: scale3("turnover") },
    { text: "スキンケア後の肌状態に満足していますか？", answers: [
      { label: "満足している", score: { balance: 2 } },
      { label: "普通", score: { balance: 1 } },
      { label: "あまり満足していない", score: { innerDry: 1, sensitive: 1 } },
    ] },
  ],
  autumn: [
    { text: "夏の終わり頃から、肌の調子が不安定だと感じますか？", answers: scale3("sensitive") },
    { text: "肌の乾燥や軽いつっぱり感を感じ始めていますか？", answers: scaleOften("innerDry") },
    { text: "化粧のりが以前より悪くなったと感じますか？", answers: scale3("turnover") },
    { text: "肌のくすみ感や透明感の低下が気になりますか？", answers: scale3("turnover") },
    { text: "夏に受けた紫外線ダメージが気になりますか？", answers: scale3("uv") },
    { text: "季節の変わり目に、肌が敏感になることがありますか？", answers: scaleOften("sensitive") },
    { text: "毛穴の開きやざらつきが気になりますか？", answers: scale3("pore") },
    { text: "スキンケア後でも乾燥が気になることがありますか？", answers: scaleOften("innerDry") },
    { text: "肌のハリや弾力が低下したと感じますか？", answers: scale3("turnover") },
    { text: "保湿やダメージケアを意識的に行っていますか？", answers: [
      { label: "あまりしていない", score: { uv: 2, innerDry: 1 } },
      { label: "普通", score: { balance: 1 } },
      { label: "しっかりしている", score: { balance: 2 } },
    ] },
  ],
  winter: [
    { text: "肌の乾燥やつっぱり感を感じることはありますか？", answers: [
      { label: "感じない", score: { balance: 1 } },
      { label: "時々感じる", score: { dryness: 2 } },
      { label: "常に感じる", score: { dryness: 3 } },
    ] },
    { text: "洗顔後、すぐに保湿しないと不快に感じますか？", answers: scale3("dryness") },
    { text: "粉ふきや皮むけが気になることはありますか？", answers: scaleOften("dryness") },
    { text: "暖房の効いた室内に長時間いることが多いですか？", answers: scaleOften("innerDry") },
    { text: "肌が赤くなったり、敏感に感じることはありますか？", answers: scaleOften("sensitive") },
    { text: "冬になると化粧のりが悪くなると感じますか？", answers: scale3("turnover") },
    { text: "頬や目元など、特定の部位の乾燥が特に気になりますか？", answers: scale3("dryness") },
    { text: "手足の冷えなど、巡りの悪さを感じることがありますか？", answers: scale3("turnover") },
    { text: "睡眠不足によるくすみや顔色の暗さを感じますか？", answers: scale3("turnover") },
    { text: "保湿ケアをどの程度行っていますか？", answers: [
      { label: "最低限", score: { dryness: 3 } },
      { label: "普通", score: { balance: 1 } },
      { label: "意識して行っている", score: { balance: 2 } },
    ] },
  ],
  spring: [
    { text: "季節の変わり目に、肌トラブルが起こりやすいですか？", answers: scaleOften("sensitive") },
    { text: "花粉の季節に肌が敏感になると感じますか？", answers: scale3("sensitive") },
    { text: "最近、肌のかゆみやヒリつきを感じることがありますか？", answers: scaleOften("sensitive") },
    { text: "Tゾーンのテカリが気になりますか？", answers: scale3("oil") },
    { text: "ニキビが気になることがありますか？", answers: scaleOften("oil") },
    { text: "肌のバリア機能が乱れていると感じることがありますか？", answers: scale3("sensitive") },
    { text: "新しいスキンケアや環境の変化で肌が反応しやすいですか？", answers: [
      { label: "反応しない", score: { balance: 1 } },
      { label: "少し反応しやすい", score: { sensitive: 2 } },
      { label: "かなり反応しやすい", score: { sensitive: 3 } },
    ] },
    { text: "紫外線対策を意識していますか？", answers: [
      { label: "していない", score: { uv: 2 } },
      { label: "外出時のみ", score: { uv: 1, balance: 1 } },
      { label: "毎日している", score: { balance: 2 } },
    ] },
    { text: "現在のスキンケアに満足していますか？", answers: [
      { label: "満足している", score: { balance: 2 } },
      { label: "普通", score: { balance: 1 } },
      { label: "あまり満足していない", score: { sensitive: 1, innerDry: 1 } },
    ] },
    { text: "春の肌でいちばん整えたいことはどれですか？", answers: [
      { label: "赤み・かゆみ", score: { sensitive: 3 } },
      { label: "テカリ・ニキビ", score: { oil: 3 } },
      { label: "乾燥", score: { innerDry: 3 } },
      { label: "紫外線対策", score: { uv: 3 } },
    ] },
  ],
};

const productLinks = {
  "お茶せっけん": "https://haru-honoka.com/shop/products/ocha-sekken",
  "萩椿美人せっけん": "https://haru-honoka.com/shop/products/tsubaki-sekken",
  "ピュアエッセンスローション": "https://haru-honoka.com/shop/products/pure-essence-lotion",
  "EXモイスチャークリーム": "https://haru-honoka.com/shop/products/ex-moisture-cream",
  "美肌エッセンス": "https://haru-honoka.com/shop/products/bihada-essence",
  "萩椿美人BBクリーム": "https://haru-honoka.com/shop/products/tsubaki-bb-cream",
  "ナチュラルフェイスパウダー": "https://haru-honoka.com/shop/products/natural-face-powder",
  "お茶シャンプー": "https://haru-honoka.com/shop/products/ocha-shampoo",
  "緑茶小町": "https://haru-honoka.com/shop/products/ryokucha-komachi",
  "トライアルセット": "https://haru-honoka.com/shop/products/trial-set",
};

const resultTypes = {
  oil: {
    title: "過剰皮脂・テカリタイプ",
    summary:
      "ベタつき、テカリ、毛穴の目立ちが気になりやすい傾向です。取りすぎるケアではなく、やさしく洗ってうるおいのバランスを整えることを大切にしましょう。",
    points: [
      "洗顔は1日1から2回を目安にし、泡でやさしく包むように洗う",
      "タオルでこすらず、軽く押さえるように水分を取る",
      "保湿を省かず、軽めの質感で肌をすこやかに整える",
    ],
    products: ["お茶せっけん", "ピュアエッセンスローション", "EXモイスチャークリーム", "萩椿美人BBクリーム", "ナチュラルフェイスパウダー"],
  },
  innerDry: {
    title: "インナードライタイプ",
    summary:
      "表面はベタつくのに、内側の乾きが気になりやすい傾向です。水分を補い、保湿を重ね、肌をすこやかに保つケアを意識しましょう。",
    points: [
      "洗いすぎを避け、洗顔後は時間を空けずに保湿する",
      "化粧水、保湿クリームを組み合わせてうるおいを守る",
      "室内の乾燥、水分補給、睡眠リズムも見直す",
    ],
    products: ["萩椿美人せっけん", "ピュアエッセンスローション", "EXモイスチャークリーム", "美肌エッセンス"],
  },
  sensitive: {
    title: "敏感・バリア低下タイプ",
    summary:
      "赤み、かゆみ、ヒリつきなど、外部刺激に反応しやすい傾向です。まずは触れすぎない、増やしすぎない、やさしいケアを中心に整えましょう。",
    points: [
      "洗顔温度はぬるめにし、衣類やマスク、タオルの摩擦も避ける",
      "新しいアイテムを一度に増やさず、基本ケアをシンプルにする",
      "気になる状態が続く場合は、専門機関へ相談する",
    ],
    products: ["萩椿美人せっけん", "ピュアエッセンスローション", "EXモイスチャークリーム", "美肌エッセンス"],
  },
  uv: {
    title: "UVダメージ・くすみタイプ",
    summary:
      "紫外線を浴びた後の乾燥、くすみ感、ごわつきが気になりやすい傾向です。肌を清浄に保ち、うるおいを与え、日中の紫外線対策も続けましょう。",
    points: [
      "日差しを浴びた日は、冷やして落ち着かせてから保湿する",
      "ローションを重ね、仕上げに美容エッセンスをなじませる",
      "日中はBBクリームやフェイスパウダーで肌を守る意識を持つ",
    ],
    products: ["お茶せっけん", "ピュアエッセンスローション", "EXモイスチャークリーム", "美肌エッセンス", "萩椿美人BBクリーム", "ナチュラルフェイスパウダー"],
  },
  turnover: {
    title: "ターンオーバー乱れタイプ",
    summary:
      "ざらつき、くすみ感、肌リズムの乱れが気になりやすい傾向です。無理に角質を取るより、肌を整えながら正常な周期へ戻す意識が大切です。",
    points: [
      "基本の洗顔と保湿を丁寧に続ける",
      "睡眠、食事、巡りを整える生活リズムも見直す",
      "ごわつきが気になる日は、保湿を重ねてなめらかな印象を目指す",
    ],
    products: ["お茶せっけん", "ピュアエッセンスローション", "EXモイスチャークリーム", "萩椿美人BBクリーム", "ナチュラルフェイスパウダー"],
  },
  dryness: {
    title: "強い乾燥タイプ",
    summary:
      "粉ふき、つっぱり感、皮むけが気になりやすい傾向です。補うよりも、まず守ることを意識し、肌のうるおいを奪いすぎないケアを心がけましょう。",
    points: [
      "洗顔回数を見直し、ぬるま湯中心でやさしく洗う",
      "入浴後や洗顔後は時間を空けずに保湿する",
      "乾燥が強い日は、オイルパックやローションパックを検討する",
    ],
    products: ["萩椿美人せっけん", "ピュアエッセンスローション", "EXモイスチャークリーム", "トライアルセット"],
  },
  balance: {
    title: "バランス移行タイプ",
    summary:
      "部分的なテカリや乾燥があり、季節や環境で状態が変わりやすい傾向です。結果ごとに無理に調整するより、全体を安定させる意識を持ちましょう。",
    points: [
      "洗顔はこすらず短時間で行い、洗顔後は化粧水と保湿クリームを基本にして、使う順番と量を毎日できるだけ同じにする",
      "過度なコントロールを避け、肌の変化を観察する",
      "食事、睡眠、環境変化に振り回されにくい土台づくりを意識する",
    ],
    products: ["萩椿美人せっけん", "ピュアエッセンスローション", "EXモイスチャークリーム", "美肌エッセンス"],
  },
};

const recipeTagRules = {
  oil: ["むくみ対策", "腸内環境", "腸内環境サポート", "抗酸化ケア", "食欲サポート"],
  innerDry: ["乾燥対策", "うるおいサポート", "肌のうるおい維持", "たんぱく質補給", "肌の材料補給"],
  sensitive: ["肌荒れ予防", "胃腸にやさしい", "腸内環境", "腸内環境サポート", "抗酸化ケア"],
  uv: ["紫外線対策", "抗酸化ケア", "ビタミンC補給", "肌コンディション維持", "肌の透明感"],
  turnover: ["代謝サポート", "血行サポート", "巡りサポート", "血流・巡りサポート", "疲労回復サポート"],
  dryness: ["乾燥対策", "冷え対策", "温活", "体を温める", "肌のハリ", "うるおいサポート"],
  balance: ["腸内環境", "腸内環境サポート", "むくみ対策", "肌コンディション維持", "たんぱく質補給"],
};

const recipeSheet = {
  id: "1hBSj2vgTit_B9fgUp1gSDD8mBprdwhQd7Te2G3D5L3Y",
  name: "harukaze-recipe-management",
};

let currentSeason = getInitialSeason();
let currentQuestion = 0;
let scores = {};

const seasonBanner = document.querySelector("#seasonBanner");
const lead = document.querySelector(".lead");
const seasonMessage = document.querySelector("#seasonMessage");
const startButton = document.querySelector("#startButton");
const diagnosis = document.querySelector("#diagnosis");
const result = document.querySelector("#result");
const questionTitle = document.querySelector("#questionTitle");
const questionText = document.querySelector("#questionText");
const answerGrid = document.querySelector("#answerGrid");
const progressLabel = document.querySelector("#progressLabel");
const progressBar = document.querySelector("#progressBar");
const resultTitle = document.querySelector("#resultTitle");
const resultSummary = document.querySelector("#resultSummary");
const carePoints = document.querySelector("#carePoints");
const recipeText = document.querySelector("#recipeText");
const foodRecipes = document.querySelector("#foodRecipes");
const recipeSearchInput = document.querySelector("#recipeSearchInput");
const recipeTagCloud = document.querySelector("#recipeTagCloud");
const recipeSearchStatus = document.querySelector("#recipeSearchStatus");
const recipeSearchResults = document.querySelector("#recipeSearchResults");
const retryButton = document.querySelector("#retryButton");
const backButton = document.querySelector("#backButton");
let selectedRecipeTags = [];
let answerHistory = [];

document.querySelectorAll(".season-tab").forEach((button) => {
  button.addEventListener("click", () => {
    currentSeason = button.dataset.season;
    syncSeasonTabs();
    updateSeason();
  });
});

startButton.addEventListener("click", () => {
  resetDiagnosis();
  result.classList.add("hidden");
  diagnosis.classList.remove("hidden");
  renderQuestion();
  diagnosis.scrollIntoView({ behavior: "smooth", block: "start" });
});

retryButton.addEventListener("click", () => {
  resetDiagnosis();
  result.classList.add("hidden");
  diagnosis.classList.remove("hidden");
  renderQuestion();
  diagnosis.scrollIntoView({ behavior: "smooth", block: "start" });
});

if (backButton) {
  backButton.addEventListener("click", () => {
    goBackQuestion();
  });
}

function resetDiagnosis() {
  currentQuestion = 0;
  scores = {};
  answerHistory = [];
}

function getInitialSeason() {
  const params = new URLSearchParams(window.location.search);
  const season = params.get("season");
  return seasons[season] ? season : "spring";
}

function syncSeasonTabs() {
  document.querySelectorAll(".season-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.season === currentSeason);
  });
}

function updateSeason() {
  syncSeasonTabs();
  const season = seasons[currentSeason];
  seasonBanner.src = season.banner;
  seasonBanner.alt = season.alt;
  lead.textContent = season.lead;
  seasonMessage.textContent = `${season.label}のお肌診断を選択中です。`;
  startButton.textContent = `${season.label}の診断をはじめる`;
}

function renderQuestion() {
  const questions = getCurrentQuestions();
  const question = questions[currentQuestion];
  questionTitle.textContent = `${seasons[currentSeason].label}の質問 ${currentQuestion + 1}`;
  questionText.textContent = question.text;
  progressLabel.textContent = `${currentQuestion + 1} / ${questions.length}`;
  progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  answerGrid.innerHTML = "";
  if (backButton) {
    backButton.disabled = false;
    backButton.textContent = currentQuestion === 0 ? "前の画面に戻る" : "前の質問に戻る";
  }

  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.textContent = answer.label;
    button.addEventListener("click", () => selectAnswer(answer.score));
    answerGrid.appendChild(button);
  });
}

function selectAnswer(score) {
  answerHistory[currentQuestion] = score;
  Object.entries(score).forEach(([key, value]) => {
    scores[key] = (scores[key] || 0) + value;
  });

  currentQuestion += 1;
  const questions = getCurrentQuestions();
  if (currentQuestion < questions.length) {
    renderQuestion();
    return;
  }

  showResult();
}

function goBackQuestion() {
  if (currentQuestion === 0) {
    resetDiagnosis();
    diagnosis.classList.add("hidden");
    result.classList.add("hidden");
    startButton.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  const previousScore = answerHistory[currentQuestion - 1] || {};
  Object.entries(previousScore).forEach(([key, value]) => {
    scores[key] = Math.max(0, (scores[key] || 0) - value);
    if (scores[key] === 0) {
      delete scores[key];
    }
  });

  answerHistory.splice(currentQuestion - 1);
  currentQuestion -= 1;
  renderQuestion();
}

function showResult() {
  const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] || "balance";
  const detail = resultTypes[winner] || resultTypes.balance;

  resultTitle.textContent = detail.title;
  resultSummary.textContent = detail.summary;
  carePoints.innerHTML = "";
  detail.points.forEach((point) => {
    const item = document.createElement("li");
    item.textContent = point;
    carePoints.appendChild(item);
  });
  recipeText.innerHTML = `
    <span class="recipe-status">春風おすすめ商品</span>
    <span class="product-links">${renderProductLinks(detail.products)}</span>
    <span>診断結果に合わせて、石けん・保湿・メイクまわりの商品ページへ移動できます。</span>
  `;
  renderFoodRecipes(winner);
  selectedRecipeTags = [];
  renderRecipeTagSearch(winner);

  diagnosis.classList.add("hidden");
  result.classList.remove("hidden");
  result.scrollIntoView({ behavior: "smooth", block: "start" });
}

function getCurrentQuestions() {
  return questionsBySeason[currentSeason] || questionsBySeason.spring;
}

function renderProductLinks(products) {
  return products
    .map((name) => {
      const href = productLinks[name] || "https://haru-honoka.com/shop/products";
      return `<a href="${href}" target="_blank" rel="noreferrer">${name}</a>`;
    })
    .join("");
}

function loadRecipesFromSheet() {
  const callbackName = `harukazeRecipeCallback_${Date.now()}`;
  const query = new URLSearchParams({
    tqx: `responseHandler:${callbackName}`,
    sheet: recipeSheet.name,
    tq: "select A,B,C,D,E,F,G,H",
  });
  const url = `https://docs.google.com/spreadsheets/d/${recipeSheet.id}/gviz/tq?${query.toString()}`;

  return new Promise((resolve) => {
    const script = document.createElement("script");
    let settled = false;

    window[callbackName] = (response) => {
      settled = true;
      cleanup();
      if (response?.status !== "ok") {
        resolve([]);
        return;
      }
      resolve(parseRecipeSheetRows(response.table?.rows || []));
    };

    script.onerror = () => {
      if (settled) {
        return;
      }
      settled = true;
      cleanup();
      resolve([]);
    };

    function cleanup() {
      delete window[callbackName];
      script.remove();
    }

    script.src = url;
    document.head.appendChild(script);
  });
}

function parseRecipeSheetRows(rows) {
  return rows
    .map((row, index) => {
      if (index === 0) {
        return null;
      }

      const cells = row.c || [];
      const status = readSheetCell(cells[5]);
      const url = readSheetCell(cells[4]);

      if (status !== "公開" || !url) {
        return null;
      }

      return {
        title: readSheetCell(cells[0]),
        seasons: splitSheetList(readSheetCell(cells[1])).map(normalizeSeason),
        seasonLabels: splitSheetList(readSheetCell(cells[1])),
        tags: splitSheetList(readSheetCell(cells[2])),
        scene: readSheetCell(cells[3]),
        pdfUrl: url,
        priority: Number(readSheetCell(cells[6])) || 9999,
        memo: readSheetCell(cells[7]),
      };
    })
    .filter((recipe) => recipe?.title);
}

function readSheetCell(cell) {
  return String(cell?.v ?? cell?.f ?? "").trim();
}

function splitSheetList(value) {
  return String(value || "")
    .split(/[、,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeSeason(value) {
  const seasonMap = {
    春: "spring",
    初夏: "summer",
    夏: "summer",
    秋: "autumn",
    冬: "winter",
  };
  return seasonMap[value] || value;
}

function renderFoodRecipes(type) {
  const recipes = Array.isArray(window.harukazeRecipes) ? window.harukazeRecipes : [];
  const recommended = pickRecipes(type, recipes);

  if (!foodRecipes) {
    return;
  }

  if (!recommended.length) {
    foodRecipes.innerHTML = `
      <article class="food-card">
        <p class="food-card-empty">該当するレシピは準備中です。スプレッドシートに追加後、こちらへ表示します。</p>
      </article>
    `;
    return;
  }

  foodRecipes.innerHTML = recommended.map(renderFoodRecipeCard).join("");
}

function renderRecipeTagSearch(type = "balance", useInitialTag = true) {
  const recipes = Array.isArray(window.harukazeRecipes) ? window.harukazeRecipes : [];
  const tags = buildRecipeTags(recipes);
  const preferredTags = recipeTagRules[type] || recipeTagRules.balance;
  const initialTag = tags.find((tag) => preferredTags.some((preferred) => isKeywordMatch(tag, preferred))) || tags[0] || "";

  if (!recipeTagCloud || !recipeSearchResults) {
    return;
  }

  selectedRecipeTags = selectedRecipeTags.length ? selectedRecipeTags : (useInitialTag ? [initialTag].filter(Boolean) : []);
  if (recipeSearchInput) {
    recipeSearchInput.value = selectedRecipeTags.join(" ");
  }
  renderRecipeTagButtons(tags);
  renderRecipeSearchResults(selectedRecipeTags);
}

function buildRecipeTags(recipes) {
  const tagCounts = new Map();
  const manualTags = [
    "春奈さん",
    "GOUさん",
    "タンパク質",
    "シミ",
    "乾燥",
    "くすみ",
    "紫外線",
    "うるおい",
    "冷え",
    "温活",
    "野菜",
    "主食",
    "スイーツ",
  ];
  [...manualTags, ...recipes.flatMap((recipe) => recipe.tags || [])].forEach((tag) => {
    const cleanTag = String(tag || "").trim();
    if (!cleanTag) {
      return;
    }

    tagCounts.set(cleanTag, (tagCounts.get(cleanTag) || 0) + 1);
  });

  return [...tagCounts.entries()]
    .filter(([tag]) => !manualTags.includes(tag))
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "ja"))
    .map(([tag]) => tag)
    .reduce((tags, tag) => [...tags, tag], manualTags)
    .slice(0, 36);
}

function renderRecipeTagButtons(tags) {
  recipeTagCloud.innerHTML = tags
    .map((tag) => {
      const isActive = selectedRecipeTags.includes(tag);
      const activeClass = isActive ? " active" : "";
      const pressed = isActive ? "true" : "false";
      return `<button class="recipe-tag-button${activeClass}" type="button" data-tag="${escapeAttribute(tag)}" aria-pressed="${pressed}">${escapeHtml(tag)}</button>`;
    })
    .join("");

  recipeTagCloud.querySelectorAll(".recipe-tag-button").forEach((button) => {
    button.addEventListener("click", () => {
      const tag = button.dataset.tag || "";
      selectedRecipeTags = selectedRecipeTags.includes(tag)
        ? selectedRecipeTags.filter((selectedTag) => selectedTag !== tag)
        : [...selectedRecipeTags, tag];
      if (recipeSearchInput) {
        recipeSearchInput.value = selectedRecipeTags.join(" ");
      }
      renderRecipeTagButtons(tags);
      renderRecipeSearchResults(selectedRecipeTags);
    });
  });
}

function renderRecipeSearchResults(keywords) {
  const recipes = Array.isArray(window.harukazeRecipes) ? window.harukazeRecipes : [];
  const searchKeywords = normalizeSearchKeywords(keywords);
  const searchLabel = searchKeywords.join(" / ");
  const results = searchKeywords.length ? searchRecipesByKeywords(recipes, searchKeywords).slice(0, 9) : [];

  if (recipeSearchStatus) {
    recipeSearchStatus.textContent = searchKeywords.length
      ? `「${searchLabel}」に関連するレシピ ${results.length}件`
      : "キーワードを入力するかタグを選んでください。";
  }

  recipeSearchResults.innerHTML = results.length
    ? results.map(renderFoodRecipeCard).join("")
    : `<article class="food-card"><p class="food-card-empty">該当するレシピが見つかりませんでした。別のタグや言葉で検索してください。</p></article>`;
}

function normalizeSearchKeywords(keywords) {
  if (Array.isArray(keywords)) {
    return keywords.map((keyword) => String(keyword || "").trim()).filter(Boolean);
  }

  return String(keywords || "")
    .split(/[、,\s]+/)
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

function searchRecipesByKeywords(recipes, selectedKeywords) {
  const sourceFilter = getRecipeSourceFilter(selectedKeywords);
  const searchKeywords = removeRecipeSourceKeywords(selectedKeywords);
  const expandedKeywordGroups = searchKeywords.map(expandSearchKeyword).filter((items) => items.length);

  return recipes
    .filter((recipe) => matchesRecipeSourceFilter(recipe, sourceFilter))
    .map((recipe, index) => {
      const text = [
        recipe.title,
        recipe.scene,
        getRecipeSourceLabel(recipe),
        ...(recipe.tags || []),
        ...(recipe.seasonLabels || []),
        recipe.memo,
      ]
        .join(" ")
        .toLowerCase();
      const matchedGroups = expandedKeywordGroups.filter((keywords) =>
        keywords.some((item) => text.includes(item.toLowerCase()))
      );
      const score = expandedKeywordGroups.length ? matchedGroups.length * 3 : 3;
      const priorityScore = Math.max(0, 1000 - (Number(recipe.priority) || index + 1)) / 1000;
      return { recipe, score: score + priorityScore, index };
    })
    .filter((item) => item.score >= 3)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((item) => item.recipe);
}

function getRecipeSourceFilter(keywords) {
  const sourceKeywords = keywords.map(normalizeRecipeSourceKeyword).filter(Boolean);
  const wantsHaruna = sourceKeywords.includes("haruna");
  const wantsGou = sourceKeywords.includes("gou");

  if (wantsHaruna === wantsGou) {
    return "";
  }

  return wantsHaruna ? "haruna" : "gou";
}

function removeRecipeSourceKeywords(keywords) {
  return keywords.filter((keyword) => !normalizeRecipeSourceKeyword(keyword));
}

function expandSearchKeyword(keyword) {
  return [...new Set([...expandRecipeKeyword(keyword), ...expandNutritionKeyword(keyword)])].filter(Boolean);
}

function expandNutritionKeyword(keyword) {
  const value = String(keyword || "").trim();
  const proteinKeywords = ["\u30bf\u30f3\u30d1\u30af\u8cea", "\u305f\u3093\u3071\u304f\u8cea", "\u86cb\u767d\u8cea"];

  if (!proteinKeywords.includes(value)) {
    return [];
  }

  return [
    "\u8089",
    "\u9b5a",
    "\u5375",
    "\u8c46\u8150",
    "\u8c46\u4e73",
    "\u5927\u8c46",
    "\u9d8f",
    "\u8c5a",
    "\u30c1\u30ad\u30f3",
  ];
}

function normalizeRecipeSourceKeyword(keyword) {
  const value = String(keyword || "")
    .trim()
    .replace(/\s+/g, "")
    .toLowerCase();

  if (["\u6625\u5948\u3055\u3093", "\u6625\u5948", "\u6625\u83dc\u3055\u3093", "\u6625\u83dc"].includes(value)) {
    return "haruna";
  }

  if (["gou\u3055\u3093", "gou"].includes(value)) {
    return "gou";
  }

  return "";
}

function matchesRecipeSourceFilter(recipe, sourceFilter) {
  if (!sourceFilter) {
    return true;
  }

  return sourceFilter === "haruna" ? isHarunaRecipe(recipe) : !isHarunaRecipe(recipe);
}

function expandRecipeKeyword(keyword) {
  const value = String(keyword || "").trim();
  const aliases = {
    春奈さん: ["春奈さん", "春奈", "Word形式から統一PDF化"],
    春奈: ["春奈さん", "春奈", "Word形式から統一PDF化"],
    GOUさん: ["GOUさん", "Gouさん", "GOU", "Gou", "菜園男子GOU", "菜園男子Gou"],
    GOU: ["GOUさん", "Gouさん", "GOU", "Gou", "菜園男子GOU", "菜園男子Gou"],
    シミ: ["シミ", "しみ", "くすみ", "紫外線", "UV", "抗酸化", "ビタミンC"],
    しみ: ["シミ", "しみ", "くすみ", "紫外線", "UV", "抗酸化", "ビタミンC"],
    タンパク質: ["タンパク質", "たんぱく質", "蛋白質"],
    たんぱく質: ["タンパク質", "たんぱく質", "蛋白質"],
    乾燥: ["乾燥", "うるおい", "保湿"],
    くすみ: ["くすみ", "シミ", "しみ", "巡り", "抗酸化", "紫外線"],
    冷え: ["冷え", "温活", "体を温める", "巡り"],
  };

  return [...new Set([value, ...(aliases[value] || [])])].filter(Boolean);
}

function isKeywordMatch(value, keyword) {
  const valueText = String(value || "").toLowerCase();
  return expandRecipeKeyword(keyword).some((item) => valueText.includes(item.toLowerCase()) || item.toLowerCase().includes(valueText));
}

function getRecipeSourceLabel(recipe) {
  return isHarunaRecipe(recipe) ? "春奈さん" : "GOUさん";
}

function pickRecipes(type, recipes) {
  const preferredTags = recipeTagRules[type] || recipeTagRules.balance;

  const ranked = recipes
    .map((recipe, index) => {
      const seasonScore = recipe.seasons?.includes(currentSeason) ? 6 : 0;
      const tagScore = preferredTags.reduce((score, tag) => {
        const inTags = recipe.tags?.some((recipeTag) => recipeTag.includes(tag) || tag.includes(recipeTag));
        const inScene = recipe.scene?.includes(tag);
        return score + (inTags ? 3 : 0) + (inScene ? 1 : 0);
      }, 0);

      const priorityScore = Math.max(0, 1000 - (Number(recipe.priority) || index + 1)) / 1000;

      return { recipe, score: seasonScore + tagScore + priorityScore, index };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index);
  const selected = ranked.filter((item) => isHarunaRecipe(item.recipe)).slice(0, 3);

  ranked.forEach((item) => {
    if (selected.length >= 6) {
      return;
    }

    if (!selected.some((selectedItem) => selectedItem.recipe.pdfUrl === item.recipe.pdfUrl)) {
      selected.push(item);
    }
  });

  return selected.map((item) => item.recipe);
}

function renderFoodRecipeCard(recipe) {
  const tagChips = (recipe.tags || [])
    .slice(0, 4)
    .map((tag) => `<span class="tag-chip">${escapeHtml(tag)}</span>`)
    .join("");
  const seasonLabels = (recipe.seasonLabels || []).map(escapeHtml).join("・");
  const recipeUrl = getRecipeViewerUrl(recipe);
  const link = recipeUrl
    ? `<a class="recipe-link" href="${escapeAttribute(recipeUrl)}" target="_blank" rel="noreferrer">レシピを見る</a>`
    : `<span class="recipe-link disabled">PDF準備中</span>`;

  return `
    <article class="food-card">
      <div class="food-card-main">
        <p class="recipe-season">${seasonLabels}</p>
        <h4>${escapeHtml(recipe.title)}</h4>
        <p>${escapeHtml(recipe.scene || "季節の食事のヒントとしてご覧ください。")}</p>
      </div>
      <div class="tag-list">${tagChips}</div>
      ${link}
    </article>
  `;
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

function getRecipeViewerUrl(recipe) {
  const pdfUrl = recipe?.pdfUrl || findRecipePdfUrlByTitle(recipe?.title);

  if (!pdfUrl) {
    return "";
  }

  if (isHarunaRecipe({ ...recipe, pdfUrl })) {
    return `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}`;
  }

  return pdfUrl;
}

function isHarunaRecipe(recipe) {
  return recipe?.pdfUrl?.includes("/assets/recipes/formatted/") || recipe?.memo?.includes("Word形式から統一PDF化");
}

function findRecipePdfUrlByTitle(title) {
  const lookupTitle = normalizeRecipeTitle(title);
  const recipes = Array.isArray(window.harukazeRecipes) ? window.harukazeRecipes : [];
  const fallback = recipes.find((recipe) => recipe?.pdfUrl && normalizeRecipeTitle(recipe.title) === lookupTitle);

  return fallback?.pdfUrl || "";
}

function normalizeRecipeTitle(title) {
  return String(title || "")
    .replace(/[☆★〜～−–—!！&＆\s]/g, "")
    .replace(/[\u30a1-\u30f6]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 0x60))
    .toLowerCase();
}

function mergeRecipes(...recipeGroups) {
  const seen = new Set();

  return recipeGroups
    .flat()
    .filter((recipe) => {
      if (!recipe?.title) {
        return false;
      }

      const key = `${recipe.title}::${recipe.pdfUrl || "pending"}`;
      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });
}

window.harukazeRecipes = mergeRecipes(
  Array.isArray(window.harukazeRecipes) ? window.harukazeRecipes : [],
  Array.isArray(window.harukazeFormattedRecipes) ? window.harukazeFormattedRecipes : []
);

loadRecipesFromSheet().then((recipes) => {
  window.harukazeRecipes = mergeRecipes(
    Array.isArray(window.harukazeRecipes) ? window.harukazeRecipes : [],
    Array.isArray(window.harukazeFormattedRecipes) ? window.harukazeFormattedRecipes : [],
    recipes
  );

  if (!result.classList.contains("hidden")) {
    renderRecipeTagSearch();
  }
});

if (recipeSearchInput) {
  recipeSearchInput.addEventListener("input", () => {
    selectedRecipeTags = normalizeSearchKeywords(recipeSearchInput.value);
    renderRecipeTagSearch("balance", false);
  });
}

updateSeason();
