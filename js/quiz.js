
export class Quiz {
   constructor(response) {
      this.response = response;
      this.quizSection = document.getElementById("quiz");
      this.questionTitle = document.getElementById("questionTitle");
      this.finsihSection = document.getElementById("finsish");
      this.settingSection = document.getElementById("setting");
      this.correctMsg = document.getElementById("correct");
      this.inCorrectMsg = document.getElementById("inCorrect");
      this.incorrectAns = "";
      this.curentNumber = 0;
      this.score = 0;
      this.firstPlay = 1;
      this.audioMedia = document.getElementById("aud")

      // ----------- Start Events
      // Submit Event quiz
      document.getElementById("submit").addEventListener("click", this.displayQuestion.bind(this));

      // Try Again
      document.getElementById("end").addEventListener("click", this.playAgain.bind(this));

      // Add Animation
      // Start Animation and show section
      this.quizSection.classList.remove("d-none");
      this.quizSection.classList.add("animate__bounceInRight");

      // Set Question Number
      document.getElementById("to").innerHTML = response.length;
      this.from = document.getElementById("from");

      // Run Display When Start
      this.displayQuestion();
   }

   // Display Quiz
   displayQuestion() {
      const curentQuestion = this.response[this.curentNumber];

      this.firstPlay || document.getElementById("submit").setAttribute("disabled", true);
      this.firstPlay || this.checkAns();
      this.firstPlay = 0;

      this.curentNumber++;

      if (this.curentNumber - 1 < this.response.length) {
         this.from.innerHTML = this.curentNumber;
         this.incorrectAns = this.response[this.curentNumber - 1].incorrect_answers;
         this.questionTitle.innerHTML = `<span class='animate__animated animate__fadeIn animate__slow'>${curentQuestion.question}</span>`;
         const correctAns = curentQuestion.correct_answer;
         // Make Randome Answer ---> Add correct_answer to Arry By Random Number
         const randomNum = Math.floor(Math.random() * (this.incorrectAns.length + 1));
         const answer = this.incorrectAns;
         // Answer All Data And Random
         answer.splice(randomNum, 0, correctAns);

         console.log({ answer });
         let quiestion = ``;
         for (let i = 0; i < answer.length; i++) {
            quiestion += ` 
            <li class="my-3 animate__animated animate__fadeIn animate__slow">
               <div class="pretty p-default p-round p-smooth p-plain">
                  <input type="radio" name="answer" ${i || "checked"} value="${answer[i]}"  />
                  <div class="state p-success-o">
                     <label>${answer[i]}</label>
                  </div>
               </div>
            </li>
         `;
         }

         document.getElementById("questionContent").innerHTML = quiestion;
      } else {
         setTimeout(() => {
            const curentCheck = document.querySelector("#quiz input:checked");
            this.curentNumber--;

            if (curentCheck) {
               this.hideSection();
            }
         }, 700);
      }
   }

   checkAns() {
      const curentCheck = document.querySelector("#quiz input:checked");
      const correctAns = this.response[this.curentNumber - 1].correct_answer;
      if (curentCheck.value == correctAns) {
         this.score++;
         this.audioMedia.play();
         this.correctMsg.classList.remove("d-none");
         this.correctMsg.classList.add("animate__zoomIn");

         // const correct = document.getElementById("correct");

         setTimeout(() => {
            document.getElementById("correct").classList.remove("animate__zoomIn");
            document.getElementById("correct").classList.add("d-none");
            document.getElementById("submit").removeAttribute("disabled");
         }, 6500);
      } else {
        document.getElementById("inCorrect").innerText = `InCorrect [ ${correctAns} ]`;
        document.getElementById("inCorrect").classList.remove("d-none");
        document.getElementById("inCorrect").classList.add("animate__zoomIn");
         // const inCorrect = document.getElementById("inCorrect");c

         setTimeout(() => {
           document.getElementById("inCorrect").classList.remove("animate__zoomIn");
           document.getElementById("inCorrect").classList.add("d-none");
            document.getElementById("submit").removeAttribute("disabled");
         }, 1600);
      }
   }

   // Hide Section And Show Next
   hideSection() {
      this.quizSection.classList.remove("animate__bounceInRight");
      this.quizSection.classList.add("animate__backOutLeft");

      setTimeout(() => {
         this.quizSection.classList.add("d-none");
         this.quizSection.classList.remove("animate__backOutLeft");

         // To Show Finish Section
         document.getElementById("score").innerHTML = this.score;
         this.finsihSection.classList.remove("d-none");
         this.finsihSection.classList.add("animate__bounceInRight");
      }, 1600);
   }

   playAgain() {
      setTimeout(() => {
         location.reload();
      }, 500);
   }
}
