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

    public function insertQuestion($table, $data) {
        $columns = implode(',', array_keys($data));
        $values = "'" . implode("','", array_map(array($this, 'escape'), $data)) . "'";
        $query = "INSERT INTO $table ($columns) VALUES ($values)";
        $result = mysqli_query($this->connection, $query);
        return $result;
    }

    

    private function escape($value) {
        return mysqli_real_escape_string($this->connection, $value);
    }
}
?>
