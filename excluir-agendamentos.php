<?php
// Verifica se o método de requisição é POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recebe o ID do agendamento a ser apagado
    $data = json_decode(file_get_contents("php://input"));
    $id = $data->id;

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

    // Consulta SQL para apagar o agendamento
    $sql = "DELETE FROM agendamentos WHERE id = $id";

    if ($conn->query($sql) === TRUE) {
        // Retorna uma mensagem de sucesso
        echo json_encode(array("success" => true, "message" => "Agendamento apagado com sucesso."));
    } else {
        // Retorna uma mensagem de erro
        echo json_encode(array("success" => false, "message" => "Erro ao apagar agendamento: " . $conn->error));
    }

    // Fecha a conexão com o banco de dados
    $conn->close();
} else {
    // Se não foi recebida uma solicitação POST, retorna uma mensagem de erro
    echo json_encode(array("success" => false, "message" => "Método de requisição inválido."));
}
?>
