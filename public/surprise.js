const overlay = document.getElementById('overlay');
const actionBtn = document.getElementById('action-btn');
const banner = document.getElementById('banner');
const balloonsBg = document.getElementById('balloons-bg');
const audio = document.getElementById('birthday-audio');
const modal = document.getElementById('msg-modal');
const closeModal = document.getElementById('close-modal');

let step = 0; // 0: lights, 1: music, 2: banner, 3: balloons, 4: message
let balloonInterval = null;

function logAction(action) {
  let logs = JSON.parse(localStorage.getItem('birthdayLogs') || '[]');
  logs.push({ action, page: 'surprise', time: new Date().toISOString() });
  localStorage.setItem('birthdayLogs', JSON.stringify(logs));
}

actionBtn.onclick = () => {
  if (step === 0) {
    overlay.style.transition = "background 1s";
    overlay.style.background = "rgba(0,0,0,0)";
    setTimeout(() => overlay.style.display = "none", 1000);
    actionBtn.textContent = "Play Music";
    step++;
    logAction('lights_on');
  } else if (step === 1) {
    // audio.src = "your-song.mp3"; // Uncomment and set your song
    audio.play();
    actionBtn.textContent = "Decorate";
    step++;
    logAction('music_played');
  } else if (step === 2) {
    banner.style.display = "block";
    actionBtn.textContent = "Fly Balloons";
    step++;
    logAction('decorated');
  } else if (step === 3) {
    startBalloons();
    actionBtn.textContent = "I have a message for you";
    step++;
    logAction('balloons_fly');
  } else if (step === 4) {
    modal.classList.add('active');
    actionBtn.style.display = "none";
    logAction('show_message');
  }
};

closeModal.onclick = () => {
  modal.classList.remove('active');
  actionBtn.style.display = "block";
};

function createBalloon() {
  const balloon = document.createElement('div');
  balloon.className = 'balloon';

  // Golden and accent colors
  const colors = ['#ffe066', '#f7b42c', '#fffbe0', '#ff99ac', '#fcbad3'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  // Random horizontal position
  balloon.style.left = `${Math.random() * 90}vw`;
  balloon.style.animationDuration = `${Math.random() * 2 + 6}s`;

  // SVG balloon with string
  balloon.innerHTML = `
    <svg class="balloon-svg" viewBox="0 0 48 64">
      <ellipse cx="24" cy="28" rx="20" ry="28" fill="${color}" stroke="#b8860b" stroke-width="2"/>
      <path class="balloon-string" d="M24 56 Q28 60 24 64 Q20 60 24 56" />
    </svg>
  `;

  balloonsBg.appendChild(balloon);
  setTimeout(() => balloon.remove(), 9000);
}

function startBalloons() {
  if (window.balloonInterval) return;
  window.balloonInterval = setInterval(createBalloon, 350);
}
