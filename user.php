<?php 
    include ("Q-data.php");
    header('Content-Type: application/json');
    
    $db = new DatabaseConnect('localhost', 'Ifeolayeni', 'Iyanuoluwa', 'test');
    
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, true);

    echo json_encode($input);

    $prop = array(
        'QuestionText' => $input['questionText'],
        'Course' => $input['course'],
        'Option1' => $input['option1'],
        'Option2' => $input['option2'],
        'Option3' => $input['option3'],
        'Option4' => $input['option4'],
        'CorrectAnswer' => $input['correctAnswer']
    );
    
    // Insertion
    $result = $db->insertQuestion('cbt', $prop);

if ($result !== false) {
    echo json_encode(array("status" => "success", "message" => "Question submitted successfully"));
} else {
    $error = mysqli_error($db->connection);
    if (empty($error)) {
        $error = "Unknown error occurred while submitting the question.";
    }
    echo json_encode(array("status" => "error", "message" => "Question failed to submit: " . $error));
}

?>
