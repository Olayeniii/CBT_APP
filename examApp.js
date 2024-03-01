import studentExam from './exam.js';

$(document).ready(function () {
  const studExam = new studentExam();

  const selectedCourse = localStorage.getItem('selectedCourse');
  if (selectedCourse) {
      loadQuestions(selectedCourse);
  } else {
      console.error("Course not selected.");
  }

  function loadQuestions(dynamicCourse) {
    if (dynamicCourse) {
        studExam.fetchQuestions(dynamicCourse, () => {    
          studExam.currentQuestionIndex = 0;
            studExam.displayQuestion();
            const questionButtonsContainer = $("#questionButtons");
            questionButtonsContainer.empty();

            
            for (let i = 0; i < studExam.question.examQuestions.length; i++) {
                const button = $("<button>")
                    .addClass("question-btn")
                    .text(i + 1) 
                    .click(() => handleButtonClick(i));

                questionButtonsContainer.append(button);
            }
            studExam.startExam();

            //Redirect query
            if (!window.location.href.includes('exam.html')) {
              //redirect
            window.location.href = `exam.html?course=${encodeURIComponent(dynamicCourse)}`;
            }
        });
    } else {
        console.error("Please select a course.");
    }
}
function handleButtonClick(index){
  console.log("Handling button click for index:", index);
  studExam.saveAnswer();
  studExam.currentQuestionIndex = index;
  studExam.displayQuestion();
}

  $("#nextBtn").click(function () {
    studExam.saveAnswer();
    studExam.currentQuestionIndex++;
    if(studExam.currentQuestionIndex < studExam.question.examQuestions.length){
      studExam.displayQuestion();
    } else {
      console.error("Invalid question index. ")
    }
   
  });

  $("#submitBtn").click(function(e) {
    e.preventDefault();
    studExam.submitExam(studExam.savedAnswers);
 }); 
 
});


