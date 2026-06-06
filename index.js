const faqResponses = {
  order: 'You can place an order through WhatsApp or by using this chat assistant. Send your preferred model, quantity, and whether you need delivery or pickup.',
  delivery: 'Yes, we deliver. Availability depends on your location and stock; we will confirm delivery timing once you send your request.',
  authentic: 'All devices are sourced from trusted partners and sold with a guarantee of authenticity and quality.',
  payment: 'We accept mobile money, bank transfer, and other secure payment methods. Ask for the best option for your order.',
  warranty: 'Most devices include a standard warranty. We can share details for each model once you choose the device you want.',
  stock: 'Tell us which brands or models (phones, laptops, or monitors) you want and we’ll share current stock, prices, and expected restock dates.',
  budget: 'Share your budget and we can recommend the best phones, laptops, or monitors and accessories that fit it.',
  bulk: 'For bulk orders, let us know the quantity and device types. We’ll prepare a tailored quote with delivery details.',
  support: 'We offer after-sales support, warranty guidance, and service options to keep your devices protected.',
  accessories: 'We can add chargers, cases, screen protectors, stands, and more. Just ask for the accessories you need.'
};

const keywordResponses = [
  {terms: ['order', 'buy', 'purchase', 'place an order'], answer: faqResponses.order},
  {terms: ['deliver', 'delivery', 'ship', 'shipping'], answer: faqResponses.delivery},
  {terms: ['authentic', 'genuine', 'original', 'real'], answer: faqResponses.authentic},
  {terms: ['payment', 'pay', 'method', 'methods'], answer: faqResponses.payment},
  {terms: ['warranty', 'guarantee', 'service'], answer: faqResponses.warranty},
  {terms: ['stock', 'available', 'availability', 'inventory'], answer: faqResponses.stock},
  {terms: ['budget', 'cheap', 'affordable', 'price range', 'under'], answer: faqResponses.budget},
  {terms: ['bulk', 'wholesale', 'quantity', 'large order'], answer: faqResponses.bulk},
  {terms: ['support', 'after-sales', 'repair', 'return'], answer: faqResponses.support},
  {terms: ['accessory', 'charger', 'case', 'screen protector', 'stand', 'accessories'], answer: faqResponses.accessories},
  {terms: ['laptop', 'notebook', 'computer', 'pc'], answer: faqResponses.stock},
  {terms: ['monitor', 'display', 'screen', 'screens'], answer: faqResponses.stock}
];

function contactWhatsApp() {
  const message = encodeURIComponent('Hi, I’m interested in your phones. Can you provide more information?');
  window.open(`https://wa.me/+8619732030587?text=${message}`, '_blank');
}function contactWhatsApp2() {
  const message = encodeURIComponent('Hi, I’m interested in your phones. Can you provide more information?');
  window.open(`https://wa.me/+256756496135?text=${message}`, '_blank');
}

function toggleChat() {
  const chatWindow = document.getElementById('chatWindow');
  const isOpen = chatWindow.classList.toggle('open');
  chatWindow.setAttribute('aria-hidden', !isOpen);

  if (isOpen) {
    document.getElementById('chatInput').focus();
    if (!chatWindow.dataset.started) {
      chatWindow.dataset.started = 'true';
      addChatMessage('Hello! I’m here to help with stock, pricing, delivery, warranty, and bulk orders.', 'bot');
      addChatMessage('Try asking: “Which phones are in stock?”, “What is the best phone under 500?”, “Can I order in bulk?”, or “How does your warranty work?”.', 'bot');
    }
  }
}

function addChatMessage(text, sender) {
  const chatBody = document.getElementById('chatBody');
  const message = document.createElement('div');
  message.className = `chat-message ${sender}`;
  message.textContent = text;
  chatBody.appendChild(message);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;

  addChatMessage(text, 'user');
  input.value = '';

  const response = getBotResponse(text);
  setTimeout(() => addChatMessage(response, 'bot'), 300);
}

function getBotResponse(message) {
  const normalized = message.toLowerCase();

  for (const item of keywordResponses) {
    if (item.terms.some(term => normalized.includes(term))) {
      return item.answer;
    }
  }

  return 'I’m happy to help. Please tell me what you need: stock availability, a budget recommendation, delivery options, warranty details, bulk pricing, or accessories support.';
}
