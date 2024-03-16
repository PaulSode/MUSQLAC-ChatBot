const chatForm = get('form');
const chatInput = get('input');
const chatBox = get('main');
const botFirstMessage =
  "Hello, I am Chat-CPT, a chatbot designed to help you choose a treatment depending on your symptoms. Please describe your symptoms.";
let botLastMessage = botFirstMessage;
let userLastMessage = "";
const ctx =  `
You're an AI ChatBOT, specialized detecting medical problems based on symptoms.
You are going to talk with a user, and your goal is to identify health problems based on its symptoms. 

Your answer will be based on your discussion progress, the informations you've already harvested and the missing informations.
Ask as many questions as needed to the user.

Here are some questions you can ask before proceeding to the diagnostic:
- Can you describe your symptoms ?
- Where do you feel the pain ?
- How strong is the pain ?
- What type of pain do you feel ?
- Do you have a high fever ?
- How many days have passed since the first symptoms ?
- Do you have any other symptoms ?`

appendMessage("bot", botFirstMessage);

chatForm.addEventListener('submit', event => {
  event.preventDefault();
  const text = chatInput.value;
  if (!text) return;
  
  appendMessage('user', text);
  tempMessage()
  chatInput.value = '';

  let finalText = prepareText(text);

  query({
    inputs: finalText,
    parameters: {},
  }).then((response) => {
    console.log("INITIAL : ", response[0].generated_text);
    res = prettyAnswer(response[0].generated_text);
    botLastMessage = res;
    userLastMessage = finalText;
    botAnswerReceived(res);
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

function prettyAnswer(answer) {
  console.log("answer :", answer);
  if (
    answer.includes("Your answer is :") ||
    (answer.includes(":") && answer.split(":")[0].includes("You"))
  ) {
    let a = answer.split(":")[1];
    if (a.includes("?")) {
      return a.split("?")[0];
    }
  }
  return answer;
}

function prepareText(text) {
  return `
    Context : ${ctx}\n

    You will ask questions for each missing informations, ont at a time, and will wait for the user to answer.
    Do not invent responses, only ask questions based on the informations you already have.\n
    If you have enough informations to make a diagnostic, you can make a diagnostic and tell the user about it.
    If not, ask a new question to the user to get the missing informations, and wait fot the user's answer.

    The user's message is : ${text}
    Your answer is :
  `;
}