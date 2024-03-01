// examiner.js

class Question {
  constructor(question, course, option1, option2, option3, option4, correctAnswer) {
    this.question = question;
    this.course = course;
    this.option1 = option1;
    this.option2 = option2;
    this.option3 = option3;
    this.option4 = option4;
    this.correctAnswer = correctAnswer;
  }

  saveToDatabase() {
    const saveEndpoint = "user.php";

    const j = {};
j['questionText'] = this.question;
j['course'] = this.course
j['option1'] = this.option1;
j['option2'] = this.option2;
j['option3'] = this.option3;
j['option4'] = this.option4;
j['correctAnswer'] = this.correctAnswer;
   
console.log("Data to be sent:", j);

    $.ajax({
      type: "POST",
      url: saveEndpoint,
      data: JSON.stringify(j),
      contentType: "application/json",
      success: function (response) {
        console.log("Success Response:", response);
        if (response.status === "success") {
            console.log("Question saved successfully");
        } else {
            console.error("Error saving question:", response.message);
        }
    },
    
    });
  }
}
$(document).ready(function() {
  $("#addQuestionBtn").click(function(event) {
      
      event.preventDefault();

      const questionInstance = new Question(
          $("#questionInput").val(),
          $("#courseInput").val(),
          $("#option1").val(),
          $("#option2").val(),
          $("#option3").val(),
          $("#option4").val(),
          $("#correctAnswerInput").val()
      );

      questionInstance.saveToDatabase();
  });
});

