<?php
// Dados de conexão com o banco de dados
$servername = "localhost";
$username = "****";
$password = "*****";
$dbname = "*****";

// Cria uma conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica se a conexão foi estabelecida corretamente
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

// Consulta SQL para obter os agendamentos ordenados por data e horário
$sql = "SELECT * FROM agendamentos ORDER BY data, horario";
$result = $conn->query($sql);

$agendamentos = array();

if ($result->num_rows > 0) {
    // Saída dos dados de cada linha
    while ($row = $result->fetch_assoc()) {
        $agendamentos[] = $row;
    }
}

// Retorna os agendamentos como JSON
echo json_encode($agendamentos);

// Fecha a conexão com o banco de dados
$conn->close();

// Verifica se o método de requisição é POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recebe o ID do agendamento a ser apagado
    $id = $_POST['id'];

    // Cria uma conexão com o banco de dados
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verifica se a conexão foi estabelecida corretamente
    if ($conn->connect_error) {
        die("Erro de conexão: " . $conn->connect_error);
    }

    // Consulta SQL para apagar o agendamento
    $sql = "DELETE FROM agendamentos WHERE id = $id";

    if ($conn->query($sql) === TRUE) {
        // Retorna uma mensagem de sucesso
        echo json_encode(array("message" => "Agendamento apagado com sucesso."));
    } else {
        // Retorna uma mensagem de erro
        echo json_encode(array("message" => "Erro ao apagar agendamento: " . $conn->error));
    }

    // Fecha a conexão com o banco de dados
    $conn->close();
}
?>

