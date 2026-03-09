let startTime;
let interval;

function startTimer() {

startTime = Date.now();

interval = setInterval(() => {

let elapsed = Date.now() - startTime;

let seconds = Math.floor(elapsed / 1000) % 60;
let minutes = Math.floor(elapsed / 60000) % 60;
let hours = Math.floor(elapsed / 3600000);

document.getElementById("timer").textContent =
`${hours.toString().padStart(2,"0")}:` +
`${minutes.toString().padStart(2,"0")}:` +
`${seconds.toString().padStart(2,"0")}`;

}, 1000);
}

function stopTimer() {

clearInterval(interval);

let duration = Math.floor((Date.now() - startTime) / 1000);

saveSession(duration);
loadSessions();
}

function saveSession(seconds) {

let sessions = JSON.parse(localStorage.getItem("sessions")) || [];

sessions.push({
date: new Date().toLocaleString(),
duration: seconds
});

localStorage.setItem("sessions", JSON.stringify(sessions));
}

function loadSessions() {

let sessions = JSON.parse(localStorage.getItem("sessions")) || [];
let list = document.getElementById("sessionList");

list.innerHTML = "";

sessions.forEach(s => {

let minutes = Math.floor(s.duration / 60);

let li = document.createElement("li");

li.textContent = `${s.date} — ${minutes} min`;

list.appendChild(li);

});
}

function setVideo() {

let url = document.getElementById("youtubeURL").value;

let videoID = extractVideoID(url);

if (!videoID) {
alert("Invalid YouTube URL");
return;
}

let embedURL = "https://www.youtube.com/embed/" + videoID;

document.getElementById("lofiPlayer").src = embedURL;

localStorage.setItem("lofiVideo", embedURL);
}

function extractVideoID(url) {

let match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);

return match ? match[1] : null;
}

window.onload = function () {

let savedVideo = localStorage.getItem("lofiVideo");

if (savedVideo) {
document.getElementById("lofiPlayer").src = savedVideo;
}

loadSessions();

};
