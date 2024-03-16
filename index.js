const chatForm = get('form');
const chatInput = get('input');
const chatBox = get('main');

appendMessage('bot', 'Hello, I am Chat-CPT, a chatbot designed to help you choose a treatment depending on your symptoms. Please describe your symptoms.')

chatForm.addEventListener('submit', event => {
  event.preventDefault();
  const text = chatInput.value;
  if (!text) return;
  
  appendMessage('user', text);
  tempMessage()
  chatInput.value = '';

  query({
    "inputs": text,
    "parameters": {}
}).then((response) => {
  botAnswerReceived(response[0].generated_text)
});
});

function tempMessage(){
  const bubble = `
    <div class="msg -bot temp">
        <div class="bubble">Chat-CPT is writing...</div>
    </div>`;
  chatBox.insertAdjacentHTML('beforeend', bubble);
  chatBox.scrollTop += 500;
}

function botAnswerReceived(text) {
  const bubble = `
  <div class="msg -bot">
      <div class="bubble">${text}</div>
  </div>`;

  document.querySelectorAll('.temp').forEach(e => e.remove());


chatBox.insertAdjacentHTML('beforeend', bubble);
}

function appendMessage(side, text) {
  const bubble = `
    <div class="msg -${side}">
        <div class="bubble">${text}</div>
    </div>`;
  chatBox.insertAdjacentHTML('beforeend', bubble);
  chatBox.scrollTop += 500;
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

async function query(data) {
	const response = await fetch(
		"https://xevhza5rhd1jhkq8.us-east-1.aws.endpoints.huggingface.cloud",
		{
			headers: { 
				"Accept" : "application/json",
				"Content-Type": "application/json" 
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}