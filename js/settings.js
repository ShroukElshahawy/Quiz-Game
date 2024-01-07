import { Quiz } from "./quiz.js";

export class Settings {
   constructor() {
      //  ----------- Global Elements
      this.category = document.getElementById("category");
      this.amount = document.getElementById("amount");
      this.settingSection = document.getElementById("setting");
      this.icon = document.querySelector(".svg-wrapper-1");
      this.response = [];
      // ----------- Start Events
      // Start Event
      document.getElementById("start").addEventListener("click", this.getDate.bind(this));
      this.settingSection.classList.remove("d-none");
      // Start Animation
      this.settingSection.classList.add("animate__bounceInRight");

      setTimeout(() => {
         this.animation();
      }, 1000);
   }

   async getDate() {
      document.getElementById("start").setAttribute("disabled",true)
      this.icon.innerHTML = `<div class="mdi py-2 mdi-loading mdi-spin"></div>`;
      const difficulty = document.querySelector("#setting input:checked").value;

      try {
         const fetchResponse = await fetch(
            `https://opentdb.com/api.php?amount=${this.amount.value > 0 ? this.amount.value : 1}&category=${
               this.category.value
            }&difficulty=${difficulty}`
         );

         const response = await fetchResponse.json();
         this.response = response.results;

         this.hideAndShowSection();

         console.log(this.response);
      } catch (e) {
         console.log(e);
      }

      this.icon.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24">
     <path fill="none" d="M0 0h24v24H0z"></path>
     <path
        fill="currentColor"
        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
     ></path>
  </svg>`;
   }

   hideAndShowSection() {
      this.settingSection.classList.add("animate__backOutLeft");

      setTimeout(() => {
         this.settingSection.classList.remove("animate__backOutLeft");
         const quiz = new Quiz(this.response);
         this.settingSection.classList.add("d-none");
      }, 1300);
   }

   animation() {
      this.settingSection.classList.remove("animate__bounceInRight");
   }
}
