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

//Submit Method for Answers

public function submitExam($table, $answers) {
    $table = $this->escape($table);

    foreach ($answers as $answer) {
        
        $keys = array_keys($answer);
        
        
        $columnList = implode(',', array_map(array($this, 'escape'), $keys));

        $valueList = "'" . implode("','", array_map(array($this, 'escape'), $answer)) . "'";

        $query = "INSERT INTO $table ($columnList) VALUES ($valueList)";

        $result = $this->connection->query($query);

        if (!$result) {
            die("Failed to insert answer: " . $this->connection->error);
        }
    }
}

        private function escape($value) {
        return mysqli_real_escape_string($this->connection, $value);
    }

}        

?>