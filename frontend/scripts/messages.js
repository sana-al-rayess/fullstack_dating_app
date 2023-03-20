const inboxBtn = document.getElementById("inbox-btn");
const outboxBtn = document.getElementById("outbox-btn");
const inboxChat = document.getElementById("inbox-chat");
const outboxChat = document.getElementById("outbox-chat");
const backButton = document.getElementById("back-button");


inboxBtn.addEventListener("click", function() {
  inboxChat.style.display = "block";
  outboxChat.style.display = "none";
});

outboxBtn.addEventListener("click", function() {
  inboxChat.style.display = "none";
  outboxChat.style.display = "block";
});

backButton.addEventListener("click", function() {
  inboxChat.style.display = "block";
  outboxChat.style.display = "none";
});
