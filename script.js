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
    inputCpf.classList.remove('text-2xl', 'text-emerald-500', 'border-emerald-500', 'text-red-500', 'border-red-500');
    inputCpf.classList.add('text-[#e5e5e5]', 'border-[#c5a059]', 'text-5xl');
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
        setTimeout(limpar, 3000);
        return;
    }

    try {
        // Mostra um estado de "Carregando"
        inputCpf.value = "CONSULTANDO...";

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const respostaApi = await fetch(`https://sistema-academia-backend-hx4f.vercel.app/alunos/${cpfLimpo}`, { signal: controller.signal });
        const dados = await respostaApi.json();

        if (respostaApi.ok && dados.liberado) {
            exibirMensagemNoVisor(dados.mensagem, "sucesso");
            setTimeout(limpar, 4000);
        } else {
            const msgErro = dados.mensagem || dados.error || "ACESSO NEGADO";

            exibirMensagemNoVisor(msgErro, "erro", false);

            setTimeout(() => {
                exibirMensagemNoVisor("PASSAR NA SECRETARIA", "erro", true);

                setTimeout(limpar, 6000);
            }, 2500);
        }
    } catch (error) {
        exibirMensagemNoVisor("ERRO DE CONEXÃO", "erro");
        setTimeout(limpar, 4000);
    }
}

// Função para mostrar a mensagem no lugar do CPF
function exibirMensagemNoVisor(msg, tipo, fontePequena = false) {
    inputCpf.value = msg;

    if (fontePequena) {
        inputCpf.classList.remove('text-5xl');
        inputCpf.classList.add('text-2xl');
    }
    else {
        inputCpf.classList.remove('text-2xl');
        inputCpf.classList.add('text-5xl');
    }

    inputCpf.classList.remove('border-[#c5a059]', 'text-[#e5e5e5]');

    if (tipo === "sucesso") {
        inputCpf.classList.add('text-emerald-500', 'border-emerald-500');
    }
    else if (tipo === "erro") {
        inputCpf.classList.add('text-red-500', 'border-red-500');
    }
    else {
        inputCpf.classList.add('text-[#e5e5e5]', 'border-[#c5a059]');
    }
}

