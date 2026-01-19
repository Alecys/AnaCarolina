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
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO",
  projectId: "SEU_PROJECT_ID",
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
