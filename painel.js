 // Função para carregar os agendamentos
function carregarAgendamentos() {
    fetch('_php/painel.php')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar os agendamentos: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const agendamentos = document.getElementById('agendamentos');
        agendamentos.innerHTML = '';
        data.forEach(agendamento => {
            const tr = document.createElement('tr');
            tr.innerHTML =` 
                <td>${agendamento.nome}</td>
                <td>${agendamento.data}</td>
                <td>${agendamento.horario}</td>
                <td><button onclick="apagarAgendamento(${agendamento.id})">Apagar</button></td>
            `;
            agendamentos.appendChild(tr);
        });
    })
    .catch(error => {
        console.error('Erro ao carregar agendamentos:', error);
    });
}

// Função para apagar um agendamento
function apagarAgendamento(id) {
    if (confirm('Tem certeza que deseja apagar este agendamento?')) {
        fetch('_php/excluir_agenda.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao apagar agendamento: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert(data.message);
                carregarAgendamentos();
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Erro ao apagar agendamento:', error);
        });
    }
}

// Carregar os agendamentos quando a página carregar
window.onload = carregarAgendamentos;


