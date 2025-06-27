const messages = [
  "Today is the most special day of the year!! 🎉",
  "Happy 17th birthday, Leishaa! 🥳",
  "Do you want to see a surprise? 🎁",
];

const messageEl = document.getElementById('message');
const buttonsEl = document.getElementById('buttons');

function logAction(action) {
  let logs = JSON.parse(localStorage.getItem('birthdayLogs') || '[]');
  logs.push({ action, page: 'index', time: new Date().toISOString() });
  localStorage.setItem('birthdayLogs', JSON.stringify(logs));
}

function showMessage(idx) {
  messageEl.style.opacity = 0;
  setTimeout(() => {
    messageEl.innerHTML = messages[idx];
    messageEl.style.opacity = 1;
  }, 800);
}

showMessage(0);
setTimeout(() => { showMessage(1); }, 5000);
setTimeout(() => {
  showMessage(2);
  setTimeout(() => { buttonsEl.style.display = 'flex'; }, 800);
}, 10000);

document.querySelector('.yes-btn').onclick = () => {
  logAction('yes');
  messageEl.innerHTML = "Yayayayyy this is for you ;)";
  buttonsEl.style.display = 'none';
  setTimeout(() => {
    window.location.href = "surprise.html";
  }, 1800);
};

document.querySelector('.no-btn').onclick = () => {
  logAction('no');
  alert("Awww you pressed No :< (But you can always change your mind hehe!)");
};

function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.animationDuration = `${Math.random() * 2 + 3}s`;
  heart.style.opacity = Math.random() * 0.6 + 0.4;
  heart.innerHTML = `
    <svg viewBox="0 0 32 29" width="28" height="25">
      <path
        d="M23.5,2.5
           c-2.5,0-4.5,2-4.5,4.5
           c0-2.5-2-4.5-4.5-4.5
           C10,2.5,8,4.5,8,7
           c0,5.5,8,11,8,11
           s8-5.5,8-11
           C26,4.5,24,2.5,23.5,2.5z"
        fill="none"
        stroke="#ff69b4"
        stroke-width="2.2"
      />
    </svg>
  `;
  document.getElementById('hearts-bg').appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 350);
