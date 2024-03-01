<?php
include ('submit.php');

// Instance of connection Class
$db = new DatabaseConnect('localhost', 'Ifeolayeni', 'Iyanuoluwa', 'test');

// Decode JSON data
$postData = file_get_contents("php://input");
$input = json_decode($postData, true);


$userInput = $input['answers'];


$tableName = 'userinputs';


$score = 0;
foreach ($userInput as $answer) {
    $isCorrect = ($answer['userAnswer'] === $answer['correctAnswer']);
    if ($isCorrect) {
        $score++;
    }
}
$totalScore = $score * 2;

$result = $db->submitExam($tableName, $userInput);

//header('Content-Type: application/json');
if($result !== false){
    echo json_encode(array('status' => 'success', 'totalScore' => $totalScore));
}else {
    $error = mysqli_error($db->connection);
    if (empty($error)) {
        $error = "Unknown error occurred while submitting the Exam.";
    }
    echo json_encode(array("status" => "error", "message" => "Failed to submit exam data: " . $error));
}


?>
