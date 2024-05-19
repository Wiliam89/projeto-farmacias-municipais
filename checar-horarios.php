<?php
// Receba os dados da solicitação
$data = json_decode(file_get_contents('php://input'), true);

// Verifique se os dados foram recebidos corretamente
if (!isset($data['date']) || !isset($data['time']) || empty($data['date']) || empty($data['time'])) {
    die("Por favor, forneça uma data e hora válidas.");
}

// Dados de conexão com o banco de dados
$servername = "localhost";
$username = "root";
$password = "05113005";
$dbname = "agenda";

// Cria uma conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica se a conexão foi estabelecida corretamente
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

// Extrai a data e o horário da solicitação
$date = date("Y-m-d", strtotime($data['date'])); // Padroniza o formato da data
$time = $data['time'];

// SQL para verificar o número de agendamentos para o horário selecionado
$sql_check = "SELECT COUNT(*) as count FROM agendamentos WHERE data=? AND horario=?";
$stmt = $conn->prepare($sql_check);
$stmt->bind_param("ss", $date, $time);
$stmt->execute();
$result_check = $stmt->get_result();

// Verifica se a consulta SQL foi bem-sucedida
if ($result_check === false) {
    die("Erro ao executar a consulta: " . $conn->error);
}

// Obtém os resultados da consulta
$row_check = $result_check->fetch_assoc();

// Retorna o número de agendamentos para o horário selecionado como JSON
header('Content-Type: application/json');
echo json_encode(array('num_agendamentos' => $row_check['count']));

// Fecha a conexão com o banco de dados
$stmt->close();
$conn->close();
?>
