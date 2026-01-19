// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  doc,
  onSnapshot,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBJ1W-Sp2bnFD276JxFUhgK0xl6pKWCnmI",
  authDomain: "ana-banco.firebaseapp.com",
  projectId: "ana-banco",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ref = doc(db, "contador", "vendidos");

const el = document.getElementById("count");
const addBtn = document.getElementById("addBtn");
const subBtn = document.getElementById("subBtn");

// Atualiza em tempo real
onSnapshot(ref, (docSnap) => {
  if (docSnap.exists()) {
    el.textContent = docSnap.data().valor;
  }
});

// Soma +1
addBtn.addEventListener("click", async () => {
  pulse();
  await updateDoc(ref, { valor: increment(1) });
});

// Subtrai -1
subBtn.addEventListener("click", async () => {
  await updateDoc(ref, { valor: increment(-1) });
});

// Mostrar botão oculto
document.querySelector(".card").addEventListener("mouseenter", () => {
  subBtn.classList.remove("hidden");
});
document.querySelector(".card").addEventListener("mouseleave", () => {
  subBtn.classList.add("hidden");
});

function pulse() {
  el.animate(
    [{ transform: "scale(1)" }, { transform: "scale(1.08)" }, { transform: "scale(1)" }],
    { duration: 280 }
  );
}

// CONTADOR REGRESSIVO ATÉ 14 DE MARÇO
const targetDate = new Date("2026-03-14T23:59:59"); 
// se quiser outro ano, é só trocar 2026

const dEl = document.getElementById("d");
const hEl = document.getElementById("h");
const mEl = document.getElementById("m");
const sEl = document.getElementById("s");

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    dEl.textContent = 0;
    hEl.textContent = 0;
    mEl.textContent = 0;
    sEl.textContent = 0;
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  dEl.textContent = days;
  hEl.textContent = hours;
  mEl.textContent = minutes;
  sEl.textContent = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

