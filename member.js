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

function showMemberSite() {
  lockScreen.classList.add("hidden");
  memberSite.classList.remove("hidden");
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
