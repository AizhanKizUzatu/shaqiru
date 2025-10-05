// Таймер
function updateCountdown() {
  const weddingDate = new Date('2025-11-28T00:00:00+05:00');
  const now = new Date();
  const diff = weddingDate - now;

  const countdownEl = document.getElementById('countdown');
  if (!countdownEl) return;

  if (diff <= 0) {
    countdownEl.innerText = "Той басталды! 🎉";
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  countdownEl.innerHTML = `
    <div class="time-box">${d}<span>күн</span></div>
    <div class="time-box">${h}<span>сағ</span></div>
    <div class="time-box">${m}<span>мин</span></div>
    <div class="time-box">${s}<span>сек</span></div>
  `;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Опрос (отправка в Google Sheets)
function sendRSVP(attendance) {
  const name = document.getElementById("name").value.trim();
  if (!name) {
    alert("Аты-жөніңізді енгізіңіз!");
    return;
  }

  fetch("YOUR_GOOGLE_SCRIPT_URL", {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `name=${encodeURIComponent(name)}&attendance=${encodeURIComponent(attendance)}`
  });

  alert("Жауабыңыз үшін рахмет!");
  document.getElementById("rsvp-form").reset();
}

// Переключение языка (заглушка)
function setLang(lang) {
  if (lang === 'ru') {
    document.getElementById('title').innerText = 'Свадьба Айжан';
    document.getElementById('invite-text').innerText = 'Дорогие гости! Приглашаем вас разделить нашу радость 💛';
  } else {
    document.getElementById('title').innerText = 'Айжанның Ұзатуы';
    document.getElementById('invite-text').innerText = 'Құрметті қонақтар! Сіздерді қуанышымызбен бөлісуге шақырамыз 💛';
  }
}
