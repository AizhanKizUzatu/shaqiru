// 🎵 Музыка при загрузке
const music = document.getElementById("wedding-music");
music.volume = 0.2;
document.addEventListener("click", () => {
  if (music.paused) music.play();
}, { once: true });

// 🕓 Обратный отсчёт
function updateCountdown() {
  const weddingDate = new Date('2025-11-28T00:00:00+05:00');
  const now = new Date();
  const diff = weddingDate - now;
  const el = document.getElementById('countdown');
  if (!el) return;

  if (diff <= 0) {
    el.innerText = "Той басталды! 🎉";
    return;
  }

  const d = Math.floor(diff / (1000*60*60*24));
  const h = Math.floor((diff / (1000*60*60)) % 24);
  const m = Math.floor((diff / (1000*60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  el.innerHTML = `
    <div class="time-box">${d}<span>күн</span></div>
    <div class="time-box">${h}<span>сағ</span></div>
    <div class="time-box">${m}<span>мин</span></div>
    <div class="time-box">${s}<span>сек</span></div>
  `;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// 📤 Отправка RSVP формы в Google Sheets
document.getElementById('rsvp-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const attendance = document.querySelector('input[name="attendance"]:checked').value;

  const response = await fetch('https://script.google.com/macros/s/AKfycbxTD0xwkE8hbU2XjtzzzlNg9upzMcjcxucd23twtb7nsHoAhwjrSIGeCHJrIztKUZO5/exec', {
    method: 'POST',
    body: new URLSearchParams({ name, attendance })
  });

  if (response.ok) {
    document.getElementById('rsvp-message').innerText = `${name}, сіздің жауабыңыз сақталды 💛`;
    e.target.reset();
  } else {
    document.getElementById('rsvp-message').innerText = "Қате пайда болды 😔";
  }
});
