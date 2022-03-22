const ws = new WebSocket('ws://localhost:8080');

const span_status = document.getElementById('status');
const ul_messages = document.getElementById('ul_message');
const form = document.getElementById('form');
const input = document.getElementById('input');

let name_prompt = prompt('Enter you name: ', 'Name');
let date = new Date();

function setStatus(value) {
  span_status.innerHTML = value;
}

function printMessage(value) {
  const li = document.createElement('li');

  li.innerHTML = `<br>
  <i style="font-size: 12px;">${name_prompt}</i>
  <br>${value}<br>
  <i style="font-size: 10px;">${date.toLocaleTimeString()}</i>`;
  ul_messages.appendChild(li);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const li = document.createElement('li');

  ws.send(input.value);

  li.innerHTML = `<br>
  <i style="font-size: 12px;">${name_prompt}</i>
  <br>${input.value}<br>
  <i style="font-size: 10px;">${date.toLocaleTimeString()}</i>`;
  ul_messages.appendChild(li);

  input.value = '';
});

ws.onopen = () => setStatus('ONLINE');

ws.onclose = () => setStatus('DISCONNECTED');

ws.onerror = (error) => {
  console.error('Failed to connect', error);
};

ws.onmessage = (response) => printMessage(response.data);
