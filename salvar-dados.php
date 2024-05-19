<?php

echo "Chegou aqui - Método de requisição: " . $_SERVER["REQUEST_METHOD"] . "<br>"; // Debug: Verifica se o arquivo PHP está sendo acessado

// Verifica se os dados foram recebidos corretamente
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verifica se os campos necessários estão preenchidos
    if (isset($_POST['name']) && isset($_POST['date']) && isset($_POST['time'])) {
        // Dados de conexão com o banco de dados
        $servername = "localhost";
        $username = "*****";
        $password = "*****";
        $dbname = "******";

        // Cria uma conexão com o banco de dados
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Verifica se a conexão foi estabelecida corretamente
        if ($conn->connect_error) {
            die("Erro de conexão: " . $conn->connect_error);
        }else{
            echo "Conexão com o banco de dados estabelecida com sucesso!<br>"; // Debug: Verifica se a conexão com o banco de dados está sendo estabelecida
        }

        // Prepara os dados para serem inseridos no banco de dados
        $name = $_POST['name'];
        $date = $_POST['date'];
        $time = $_POST['time'];

        // SQL para verificar o número de agendamentos para o horário selecionado
        $sql_check = "SELECT COUNT(*) as count FROM agendamentos WHERE data='$date' AND horario='$time'";
        $result_check = $conn->query($sql_check);
        $row_check = $result_check->fetch_assoc();
        $num_agendamentos = $row_check['count'];

        // Verifica se ainda há vagas disponíveis para o horário selecionado
        if ($num_agendamentos < 4) {
            // SQL para inserir os dados na tabela de agendamentos
            $sql_insert = "INSERT INTO agendamentos (nome, data, horario) VALUES ('$name', '$date', '$time')";

            // Executa a query SQL
            if ($conn->query($sql_insert) === TRUE) {
                echo "Agendamento realizado com sucesso!";
            } else {
                echo "Erro ao agendar: " . $conn->error;
            }
        } else {
            echo "Este horário está lotado. Por favor, escolha outro horário.";
        }

        // Fecha a conexão com o banco de dados
        $conn->close();
    } else {
        echo "Por favor, preencha todos os campos!";
    }
} else {
    echo "Método de requisição inválido!";
}
?>
