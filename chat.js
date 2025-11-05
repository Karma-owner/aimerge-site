const webhookUrl = "https://hooks.zapier.com/hooks/catch/25234945/usisu2a/";

document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', e => {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const input = document.getElementById('user-input');
  const msg = input.value.trim();
  if (!msg) return;

  appendMessage('Tu', msg);
  input.value = '';

  fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: msg })
  })
  .then(res => res.json())
  .then(data => {
    appendMessage('Atreyu', data.response || 'Ricevuto!');
  })
  .catch(() => appendMessage('Atreyu', 'Errore di connessione.'));
}

function appendMessage(sender, text) {
  const chat = document.getElementById('chat-messages');
  const msgEl = document.createElement('div');
  msgEl.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chat.appendChild(msgEl);
  chat.scrollTop = chat.scrollHeight;
}

function goHome() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* Language switch */
document.getElementById('lang-it').addEventListener('click', () => switchLang('it'));
document.getElementById('lang-en').addEventListener('click', () => switchLang('en'));

function switchLang(lang) {
  document.querySelectorAll('[data-it]').forEach(el => {
    el.innerText = el.getAttribute(`data-${lang}`);
  });
  document.getElementById('lang-it').classList.toggle('active', lang === 'it');
  document.getElementById('lang-en').classList.toggle('active', lang === 'en');
}
