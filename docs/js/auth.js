// Підключення Firebase через CDN (НЕ імпорти)
const firebaseConfig = {
  apiKey: "AIzaSyDjHxFBDkhaiRRLV8zZ1MalvB-N_8lj3d0",
  authDomain: "web-app-project-123.firebaseapp.com",
  projectId: "web-app-project-123",
  storageBucket: "web-app-project-123.appspot.com", // ← виправлено ".app" → ".com"
  messagingSenderId: "472021851332",
  appId: "1:472021851332:web:64fdea22ef4df7cb597d91",
  measurementId: "G-0W5M5FP0T2"
};

// Ініціалізація
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Чекаємо завантаження DOM
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("register-email").value;
      const password = document.getElementById("register-password").value;

      auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          alert("Успішна реєстрація!");
        })
        .catch(error => {
          alert("Помилка: " + error.message);
        });
    });
  }

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          alert("Успішний вхід!");
        })
        .catch(error => {
          alert("Помилка: " + error.message);
        });
    });
  }

  const logoutButton = document.getElementById("btn-logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      auth.signOut().then(() => {
        alert("Ви вийшли з акаунта");
      });
    });
  }

  auth.onAuthStateChanged(user => {
    if (user) {
      console.log("Користувач увійшов:", user.email);
    } else {
      console.log("Користувач не увійшов");
    }
  });
});
