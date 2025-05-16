// Função principal que é executada quando o DOM está carregado
document.addEventListener('DOMContentLoaded', function () {
    // Obter elementos do DOM
    const visitBtn = document.getElementById('visitBtn');
    const backBtn = document.getElementById('backBtn');
    const timeEventsInput = document.getElementById('timeEvents');
    const resultDisplay = document.getElementById('result');

    // Adicionar event listeners aos botões
    visitBtn.addEventListener('click', calculateTimeDestination);
    backBtn.addEventListener('click', resetForm);

    // Função para calcular o destino temporal
    function calculateTimeDestination(e) {
        e.preventDefault();

        try {
            // Obter e processar a entrada do usuário
            const input = timeEventsInput.value.trim();
            let eventsArray;

            // Tentar analisar como JSON se estiver entre colchetes
            if (input.startsWith('[') && input.endsWith(']')) {
                eventsArray = JSON.parse(input);
            } else {
                // Caso contrário, dividir por vírgulas
                eventsArray = input.split(',').map(item => item.trim()).filter(item => item);
            }

            // Verificar se há eventos inseridos
            if (!eventsArray || eventsArray.length === 0) {
                throw new Error('Please enter at least one time event');
            }

            // Calcular a soma dos anos
            const total = sumYearsFromEvents(eventsArray);

            // Exibir o resultado com animação
            animateResult(total);

        } catch (error) {
            resultDisplay.textContent = 'Error: ' + error.message;
            resultDisplay.style.color = '#ff0000';
        }
    }

    // Função para extrair e somar números de um array de strings
    function sumYearsFromEvents(events) {
        let total = 0;

        for (const event of events) {
            // Extrair todos os números da string
            const numbers = event.match(/\d+/g);

            if (numbers && numbers.length > 0) {
                // Somar todos os números encontrados no evento
                for (const numStr of numbers) {
                    total += parseInt(numStr, 10);
                }
            }
        }

        return total;
    }

    // Função para animar o resultado
    function animateResult(finalValue) {
        let current = 0;
        const increment = Math.ceil(finalValue / 50); // Determinar incremento para animação suave
        const timer = setInterval(() => {
            current += increment;
            if (current >= finalValue) {
                clearInterval(timer);
                current = finalValue;
            }
            resultDisplay.textContent = current;
            resultDisplay.style.color = '#ff4700';
        }, 20);
    }

    // Função para resetar o formulário
    function resetForm(e) {
        e.preventDefault();
        timeEventsInput.value = '';
        resultDisplay.textContent = '--';
        resultDisplay.style.color = '#ff4700';
    }
});