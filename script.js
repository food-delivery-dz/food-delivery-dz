import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js"; 
import { 
  getDatabase, 
  push, 
  ref, 
  update, 
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js"; 
import { firebaseConfig } from "./firebase-api.js"; 
 
// Initialize Firebase 
const app = initializeApp(firebaseConfig); 
const database = getDatabase(app); 
const db = getDatabase(app); 
 
// Selectors 
const submitButton = document.querySelector(".submit-btn"); 
const destinationInput = document.getElementById("destination"); 
const orderDetailsInput = document.getElementById("order-details"); 
const phoneNumberInput = document.getElementById("phone-number"); 
const selectInput = document.querySelector(".minimal"); 
 
// Functions 
function getOrderData() { 
  return { 
    to: selectInput.value, 
    order: orderDetailsInput.value, 
    phone: phoneNumberInput.value, 
    prix: 300, 
    date: "", 
    delivery: "", 
    email: "nourodev@gmail.com", 
    key: "", 
    month: "", 
    promot: "", 
    static: "raning", 
    time: "25 - 35 ", 
    to_info: destinationInput.value, 
    uid: "", 
  }; 
} 
 
function sendOrder(order) { 
  set(ref(db, 'newOrder'), order);
  push(ref(database, "order"), order) 
    .then((order) => { 
      // update the same record to set uid 
      update(ref(database, `order/${order.key}`),{uid: order.key}).then(()=>{ 
        alert("تم إرسال الطلب في أقل من ساعة سوف يتم توصيل الطلب و شكرا!"); 
      }) 
    }) 
    .catch((error) => { 
      console.error("Error writing new order to Firebase Database", error); 
      alert("تم إرسال الطلب error!"); 
    }); 
  
} 
 
function clearInputs() { 
  destinationInput.value = ""; 
  orderDetailsInput.value = ""; 
  phoneNumberInput.value = ""; 
  selectInput.value = "-- اختر --"; 
  destinationInput.focus(); 
} 
 
 
 
 
// Events 
submitButton.onclick = function (e) { 
  e.preventDefault(); 

  if (destinationInput.value.length > 0) {
    // The variable is an array and not empty

    clearInputs(); 
  const orderData = getOrderData(); 
  sendOrder(orderData); 
    
  }

  

  



  
};
