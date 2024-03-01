import ajaxHelp from "./sub.js";

class studentExam {
    constructor( question, option1, option2, option3, option4) {
      this.question = question ;
      this.options = [option1, option2, option3, option4];
      this.correctAnswer = [];
      this.currentQuestionIndex = 0;
      this.savedAnswers = [];
      this.examDuration = 15 * 60; 
        this.timer = null;
        this.startTime = null;
        this.timerElement = document.getElementById('timer');
    }
      
      fetchQuestions(pickedCourse, callback){
        this.course = pickedCourse;
          const fetchEndpoint = `fetch_question.php?course=${this.course}`;

          ajaxHelp(fetchEndpoint,(response) => {
            this.question = response.examQuestions;
            
            if (typeof callback === 'function') {
              callback();
          } else {
              console.error("Callback is not a function");
          }
          });
      }

      displayQuestion() {
        const currentQuestion = this.question.examQuestions[this.currentQuestionIndex];

        if (currentQuestion){
          console.log(currentQuestion);
            $("#question").html(`<p>${currentQuestion.QuestionText}</p>`);

            //assign options property

            this.options[0]= currentQuestion.Option1;
            this.options[1] = currentQuestion.Option2;
            this.options[2] = currentQuestion.Option3;
            this.options[3] = currentQuestion.Option4;
            
            const optionsHTML = this.options.map((option, index) => {
              const optionLabel = String.fromCharCode(65 + index)
              const isChecked = this.correctAnswer[this.currentQuestionIndex] == optionLabel;

              return `<label>
                   ${optionLabel}. <input type="radio" name="answer" value="${optionLabel}" ${isChecked ? 'checked' : ''}>
                        ${option}
                      </label><br>`;
          }).join("");
          
          $("#answerForm").html(optionsHTML);
        }
          else{
            $("#answerForm").html("<p> All questions answered. Click submit to finish </p>");
            $("#answerForm").empty();
          }
        }
        
        startExam() {
          this.startTime = Date.now();
          this.timer = setInterval(() => {
              const elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
              const remainingTime = this.examDuration - elapsedTime;
              if (remainingTime <= 0) {
                  this.stopTimer();
                  console.log("Time's up! Submitting exam...");
                  this.submitExam(this.savedAnswers);
              } else {
                  this.updateTimerDisplay(remainingTime);
              }
          }, 1000);
      }
  
      stopTimer() {
          clearInterval(this.timer);
      }
  
      updateTimerDisplay(remainingTime) {
          const minutes = Math.floor(remainingTime / 60);
          const seconds = remainingTime % 60;
          this.timerElement.innerText = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      }
  


        saveAnswer() {
          const selectedOption = $("input[name='answer']:checked").val();
      
          if (selectedOption !== undefined) {
              this.correctAnswer[this.currentQuestionIndex] = selectedOption;
      
              // Create a JSON object for the current question
              const currentQuestion = this.question.examQuestions[this.currentQuestionIndex];
              const questionObject = {
                  question_id: currentQuestion.QuestionID,
                  correctAnswer: currentQuestion.CorrectAnswer,
                  course: this.course,
                  userAnswer: selectedOption,
              };
      
              // Store the JSON object inside an array
              this.savedAnswers[this.currentQuestionIndex] = questionObject;
          } else {
              
              console.error("No option selected for the current question.");
              
          }
      }
  

      submitExam(savedAnswers) {
        const submitEndpoint = "submit_exam.php";
    
        const data = {
            answers: savedAnswers,
        };
    
        console.log("Exam details:", data);
    
        $.ajax({
          type: "POST",
          url: submitEndpoint,
          data: JSON.stringify(data),
          contentType: "application/json",
          success: function (response) {
              console.log("Exam successfully submitted:", JSON.parse(response));

              const redirect = JSON.parse(response);
            
              if (redirect.status === "success") {
                  const doubledScore = redirect.totalScore;
                  console.log("Your score:", doubledScore);
      
                  // Redirect to result page
                  window.location.href = `result_page.html?score=${doubledScore}&totalQuestions=${savedAnswers.length * 2}`;
              } else {
                  console.log("Invalid server response - Status is not success");
              }
          },
          error: function () {
              console.error("AJAX Error: Unable to submit the exam");
          },
      });      
           
    }
    
      }
export default studentExam;  