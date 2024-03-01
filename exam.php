<?php
class DatabaseConnect {
    private $connection;

    public function __construct($server, $username, $password, $database) {
        $this->server = $server;
        $this->user = $username;
        $this->pass = $password;
        $this->dataB = $database;

        $this->connection = mysqli_connect($this->server, $this->user, $this->pass, $this->dataB);

        if (!$this->connection) {
            die("Connection failed: " . mysqli_connect_error());
        }
    }


    //Select Questions from datbase
    public function selectExam($table, $selectedCourse) {
        
        $query = "SELECT * FROM $table WHERE course = '$selectedCourse' ORDER BY RAND() LIMIT 25";
        $result = mysqli_query($this->connection, $query);
    
        $examQuestions =array();
        while ($row = mysqli_fetch_assoc($result)) {
            $row['Course'] = $selectedCourse;
            $examQuestions[] = $row;
        }
    
        return array('examQuestions' => $examQuestions);
    }
    

    private function escape($value) {
        return mysqli_real_escape_string($this->connection, $value);
    }
}
?>