// ===== NAVBAR TOGGLE =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
hamburger.addEventListener("click", () => {
  openSidebar();
});

// ===== GALLERY =====
const displayedImg = document.getElementById("displayed-img");
const thumbs = document.querySelectorAll(".thumbnails img");
thumbs.forEach(img => img.addEventListener("click", () => displayedImg.src = img.src));

// ===== MOVIES =====
const movieInput = document.getElementById("newMovieInput");
const addMovieBtn = document.getElementById("addMovieBtn");
const movieList = document.getElementById("movieList");
const searchInput = document.getElementById("searchInput");

let movies = ["Interstellar", "Inception", "The Batman", "Frozen"];

function renderMovies() {
  movieList.innerHTML = "";
  const filtered = movies.filter(m => m.toLowerCase().includes(searchInput.value.toLowerCase()));
  filtered.forEach(m => {
    const li = document.createElement("li");
    li.textContent = m;
    li.addEventListener("click", () => {
      movies = movies.filter(x => x !== m);
      renderMovies();
    });
    movieList.appendChild(li);
  });
}

addMovieBtn.addEventListener("click", () => {
  const newMovie = movieInput.value.trim();
  if(newMovie && !movies.includes(newMovie)) {
    movies.push(newMovie);
    movieInput.value = "";
    renderMovies();
  }
});
searchInput.addEventListener("input", renderMovies);
renderMovies();

// ===== TO-DO LIST =====
const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();
  if(!task) return;
  const li = document.createElement("li");
  li.textContent = task;
  li.addEventListener("click", () => li.classList.toggle("done"));
  li.addEventListener("dblclick", () => li.remove());
  taskList.appendChild(li);
  taskInput.value = "";
});

// ===== COUNTDOWN =====
const startCountdown = document.getElementById("startCountdown");
const timerDisplay = document.getElementById("countdown-timer");

startCountdown.addEventListener("click", () => {
  const name = document.getElementById("occasionName").value;
  const date = document.getElementById("occasionDate").value;
  const time = document.getElementById("occasionTime").value;
  if(!date || !time) { timerDisplay.textContent = "Please enter date and time!"; return; }
  const target = new Date(${date}T${time}).getTime();
  const occ = name || "Your Event";
  clearInterval(window.countdownInterval);
  window.countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const diff = target - now;
    if(diff < 0) { timerDisplay.textContent = ${occ} has arrived!; clearInterval(window.countdownInterval); return; }
    const d = Math.floor(diff / (1000*60*60*24));
    const h = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    const m = Math.floor((diff % (1000*60*60)) / (1000*60));
    const s = Math.floor((diff % (1000*60)) / 1000);
    timerDisplay.textContent = ${occ}: ${d}d ${h}h ${m}m ${s}s;
  }, 1000);
});

// ===== CALCULATOR =====
const calcDisplay = document.getElementById("calcDisplay");
const calcExpression = document.getElementById("calcExpression");
const btns = document.querySelectorAll(".calc-buttons .btn");
let expression = "";
let soundOn = true;

btns.forEach(btn => {
  btn.addEventListener("click", () => {
    const val = btn.dataset.value;
    if(val === undefined) return;
    expression += val;
    calcDisplay.value = expression;
    calcExpression.textContent = expression;
  });
});

document.getElementById("clear").addEventListener("click", () => {
  expression = "";
  calcDisplay.value = "";
  calcExpression.textContent = "0";
});

document.getElementById("delete").addEventListener("click", () => {
  expression = expression.slice(0,-1);
  calcDisplay.value = expression;
  calcExpression.textContent = expression || "0";
});

document.getElementById("equal").addEventListener("click", () => {
  try { expression = eval(expression).toString(); } catch(e) { expression="Error"; }
  calcDisplay.value = expression;
  calcExpression.textContent = expression;
});

// SOUND TOGGLE
const soundBtn = document.getElementById("soundToggle");
soundBtn.addEventListener("click", () => {
  soundOn = !soundOn;
  soundBtn.textContent = soundOn ? "ð Sound: On" : "ð Sound: Off";
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "âï¸ Light" : "ð Dark";
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const pass = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;
  const msg = document.getElementById("message").value.trim();
  const error = document.getElementById("error-msg");
  if(!name || !email || !pass || !confirm || !msg) { error.textContent = "All fields are required!"; return; }
  if(pass !== confirm) { error.textContent = "Passwords do not match!"; return; }
  error.textContent = "Form submitted successfully!";
  contactForm.reset();
});

// ===== SIDEBAR =====
function openSidebar() {
  document.getElementById("sidebar").style.width = "250px";
  document.getElementById("sidebar").style.display = "block";
}

function closeSidebar() {
  document.getElementById("sidebar").style.width = "0";
  setTimeout(() => {
    document.getElementById("sidebar").style.display = "none";
  }, 300); // Wait for transition to complete
}
