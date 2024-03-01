<?php
include("exam.php");

$db = new DatabaseConnect('localhost', 'Ifeolayeni', 'Iyanuoluwa', 'test');

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $table = "cbt";
    $selectedCourse = $_GET['course'];

    $examQuestions = $db->selectExam($table, $selectedCourse);

    header('Content-Type: application/json');
    echo json_encode(array('examQuestions' => $examQuestions));

} else {
    echo "Invalid request";
}
?>
