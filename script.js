//  Chamando elemento(s) pelo id
const inputCpf = document.getElementById('cpf-input')

function atualizarHeader() {
    const agora = new Date();
    document.getElementById('data').textContent = agora.toLocaleDateString('pt-BR');
    document.getElementById('hora').textContent = agora.toLocaleTimeString('pt-BR');
}

setInterval(atualizarHeader, 1000);
atualizarHeader();

// Função do teclado numérico
function digitar(num) {
    if (isNaN(inputCpf.value.charAt(0)) && inputCpf.value !== "") {
        limpar();
    }

    if (inputCpf.value.replace(/\D/g, '').length < 11) {
        const rawValue = inputCpf.value.replace(/\D/g, '') + num;
        inputCpf.value = formatarCPF(rawValue);
    }
}

// Limpa o valor para outro aluno digitar
function limpar() {
    inputCpf.value = "";
    inputCpf.classList.remove('text-emerald-500', 'border-emerald-500', 'text-red-500', 'border-red-500');
    inputCpf.classList.add('text-[#e5e5e5]', 'border-[#c5a059]');
}

function formatarCPF(v) {
    v = v.replace(/\D/g, "");
    if (v.length <= 3) return v;
    if (v.length <= 6) return v.replace(/(\d{3})(\d+)/, "$1.$2");
    if (v.length <= 9) return v.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
    return v.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, "$1.$2.$3-$4");
}

function apagarUltimo() {
    const rawValue = inputCpf.value.replace(/\D/g, '');
    const novoValor = rawValue.slice(0, -1);
    inputCpf.value = formatarCPF(novoValor);
}

async function validarCPF() {
    const cpfLimpo = inputCpf.value.replace(/\D/g, '');

    if (cpfLimpo.length !== 11) {
        exibirMensagemNoVisor("CPF INCOMPLETO", "erro");
        return;
    }

    try {
        // Mostra um estado de "Carregando"
        inputCpf.value = "CONSULTANDO...";

        const respostaApi = await fetch(`https://sistema-academia-backend-hx4f.vercel.app/alunos/${cpfLimpo}`);
        const dados = await respostaApi.json();

        if (respostaApi.ok) {
            // Se liberado = true (BEM-VINDO), se false (ACESSO NEGADO)
            const tipo = dados.liberado ? "sucesso" : "erro";
            exibirMensagemNoVisor(dados.mensagem, tipo);
        } else {
            exibirMensagemNoVisor("NÃO ENCONTRADO", "erro");
        }
    } catch (error) {
        exibirMensagemNoVisor("ERRO CONEXÃO", "erro");
    }
}

// Função para mostrar a mensagem no lugar do CPF
function exibirMensagemNoVisor(msg, tipo) {
    inputCpf.value = msg;

    // Remove cores padrão
    inputCpf.classList.remove('border-[#c5a059]', 'text-[#e5e5e5]');

    if (tipo === "sucesso") {
        inputCpf.classList.add('text-emerald-500', 'border-emerald-500');
    } else {
        inputCpf.classList.add('text-red-500', 'border-red-500');
    }

    // Espera 3 segundos e reseta o visor para o próximo aluno
    setTimeout(() => {
        limpar();
    }, 3000);
}

