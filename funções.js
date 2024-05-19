// Array para armazenar os horários disponíveis e o número de agendamentos em cada horário
const horariosDisponiveis = [
    { hora: '7:00', agendamentos: 0 },
    { hora: '7:10', agendamentos: 0 },
    { hora: '7:20', agendamentos: 0 },
    { hora: '7:30', agendamentos: 0 },
    { hora: '7:40', agendamentos: 0 },
    { hora: '7:50', agendamentos: 0 },
    { hora: '8:00', agendamentos: 0 },
    { hora: '8:10', agendamentos: 0 },
    { hora: '8:20', agendamentos: 0 },
    { hora: '8:30', agendamentos: 0 },
    { hora: '8:40', agendamentos: 0 },
    { hora: '8:50', agendamentos: 0 },
    { hora: '9:00', agendamentos: 0 },
    { hora: '9:10', agendamentos: 0 },
    { hora: '9:20', agendamentos: 0 },
    { hora: '9:30', agendamentos: 0 },
    { hora: '9:40', agendamentos: 0 },
    { hora: '9:50', agendamentos: 0 },
    { hora: '10:00', agendamentos: 0 },
    { hora: '10:10', agendamentos: 0 },
    { hora: '10:20', agendamentos: 0 },
    { hora: '10:30', agendamentos: 0 },
    { hora: '10:40', agendamentos: 0 },
    { hora: '10:50', agendamentos: 0 },
    { hora: '11:00', agendamentos: 0 },
    { hora: '11:10', agendamentos: 0 },
    { hora: '11:20', agendamentos: 0 },
    { hora: '11:30', agendamentos: 0 },
    { hora: '11:40', agendamentos: 0 },
    { hora: '11:50', agendamentos: 0 },
    { hora: '12:00', agendamentos: 0 },
    { hora: '12:10', agendamentos: 0 },
    { hora: '12:20', agendamentos: 0 },
    { hora: '12:30', agendamentos: 0 },
    { hora: '12:40', agendamentos: 0 },
    { hora: '12:50', agendamentos: 0 },
    { hora: '13:00', agendamentos: 0 },
    { hora: '13:10', agendamentos: 0 },
    { hora: '13:20', agendamentos: 0 },
    { hora: '13:30', agendamentos: 0 },
    { hora: '13:40', agendamentos: 0 },
    { hora: '13:50', agendamentos: 0 },
    { hora: '14:00', agendamentos: 0 },
    { hora: '14:10', agendamentos: 0 },
    { hora: '14:20', agendamentos: 0 },
    { hora: '14:30', agendamentos: 0 },
    { hora: '14:40', agendamentos: 0 },
    { hora: '14:50', agendamentos: 0 },
    { hora: '15:00', agendamentos: 0 },
    { hora: '15:10', agendamentos: 0 },
    { hora: '15:20', agendamentos: 0 },
    { hora: '15:30', agendamentos: 0 },
    { hora: '15:40', agendamentos: 0 },
    { hora: '15:50', agendamentos: 0 },
    { hora: '16:00', agendamentos: 0 }
];

// Função para verificar se a data selecionada é no futuro
function isFutureDate(selectedDate) {
    const today = new Date();
    const selected = new Date(selectedDate);
    return selected >= today;
}

// Função para verificar se o horário selecionado está disponível
const isAvailableTime = async (selectedDate, selectedTime) => {
    // Verifica se a data e o horário estão preenchidos
    if (!selectedDate || !selectedTime) {
        console.error('Por favor, forneça uma data e hora válidas.');
        return false;
    }

    try {
        const formattedDate = selectedDate.split('-').reverse().join('-');
        const formattedTime = selectedTime + ':00';

        const response = await fetch('_php/checar_horarios.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ date: formattedDate, time: formattedTime })
        });

        if (!response.ok) {
            throw new Error('Erro ao verificar a disponibilidade do horário.');
        }

        const result = await response.json();
        return result.num_agendamentos < 4;
    } catch (error) {
        console.error('Erro ao verificar a disponibilidade do horário:', error.message);
        return false;
    }
}

// Função para atualizar a cor dos horários com base na disponibilidade
const atualizarCoresHorarios = async () => {
    const date = document.getElementById('date').value;
    const options = document.querySelectorAll('#time option');

    for (const option of options) {
        const time = option.value;
        if (time) {
            const disponivel = await isAvailableTime(date, time);
            if (!disponivel) {
                option.classList.add('horario-esgotado');
            } else {
                option.classList.remove('horario-esgotado');
            }
        }
    }
}

// Adiciona um event listener para o evento de mudança da data
document.getElementById('date').addEventListener('change', atualizarCoresHorarios);

// Atualiza as cores dos horários ao carregar a página
window.addEventListener('load', atualizarCoresHorarios);

// Função para agendar
const agendar = async (event) => {
    event.preventDefault(); // Impede o envio do formulário padrão

    console.log('Iniciando envio do formulário...');

    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    console.log('Dados do formulário:', name, date, time);

    if (!name || !date || !time) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (new Date(date) < new Date()) {
        alert('A data selecionada deve ser no futuro.');
        return;
    }

    console.log('Verificando disponibilidade do horário...');

    if (!(await isAvailableTime(date, time))) {
        alert('O horário selecionado está lotado. Por favor, escolha outro horário.');
        return;
    }

     alert('Agendamento realizado com sucesso');

    console.log('Horário disponível. Enviando formulário...');
    // Se todas as verificações passaram, envia o formulário
    document.querySelector('form').submit();
}

// Adiciona um event listener para o evento de envio do formulário
document.querySelector('form').addEventListener('submit', agendar);
