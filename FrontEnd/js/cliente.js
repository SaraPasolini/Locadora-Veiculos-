const apiUrl = "https://localhost:7243/api/Cliente";

// Carregar clientes ao iniciar
document.addEventListener("DOMContentLoaded", listarClientes);

function listarClientes() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(clientes => {
            const tabela = document.querySelector("#tabelaClientes tbody");
            tabela.innerHTML = "";

            clientes.forEach(cliente => {
                tabela.innerHTML += `
                    <tr>
                        <td>${cliente.id}</td>
                        <td>${cliente.nome}</td>
                        <td>${cliente.cpf}</td>
                        <td>${cliente.email}</td>
                    </tr>
                `;
            });
        });
}

function adicionarCliente() {
    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const email = document.getElementById("email").value;

    if (!nome || !cpf || !email) {
        alert("Preencha todos os campos!");
        return;
    }

    const novoCliente = { nome, cpf, email };

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoCliente)
    })
    .then(() => {
        listarClientes();
        document.getElementById("nome").value = "";
        document.getElementById("cpf").value = "";
        document.getElementById("email").value = "";
    });
}

// Função para deletar cliente
function deletarCliente() {
    const id = document.getElementById("deletarId").value;
    if (!id) {
        alert("Por favor, insira um ID válido.");
        return;
    }

    fetch(`${apiUrl}/${id}`, { method: "DELETE" })
        .then(() => {
            listarClientes();
            document.getElementById("deletarId").value = "";
        });
}

// Editar Cliente 
async function editarCliente() {
    const id = document.getElementById("editarId").value;
    const nome = document.getElementById("editarNome").value;
    const cpf = document.getElementById("editarCpf").value;
    const email = document.getElementById("editarEmail").value;

    const clienteAtualizado = {
        id: Number(id),
        nome: nome,
        cpf: cpf,
        email: email
    };

    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(clienteAtualizado)
        });

        if (response.ok) {
           alert("Cliente atualizado com sucesso!");
            document.getElementById("editarId").value = "";
            document.getElementById("editarNome").value = "";
            document.getElementById("editarCpf").value = "";
            document.getElementById("editarEmail").value = "";
            listarClientes();
        }
       

    } catch (error) {
        console.error("Erro ao atualizar o cliente:", error);
    
    }
}

//Buscar Cliente por CPF 
function buscarClientes() {
    const cpf = document.getElementById("buscarCpf").value;

    if (!cpf.trim()) return;

    fetch(`${apiUrl}/by-cpf/${cpf}`) // <---- CORRIGIDO: by-cpf
        .then(res => {
            if (!res.ok) {
                const tabela = document.querySelector("#tabelaClientes tbody");
                tabela.innerHTML = `<tr><td colspan="4">Nenhum cliente encontrado com esse CPF.</td></tr>`;
                return null;
            }
            return res.json();
        })
        .then(cliente => {
            if (!cliente) return;

            const tabela = document.querySelector("#tabelaClientes tbody");
            tabela.innerHTML = `
                <tr>
                    <td>${cliente.id}</td>
                    <td>${cliente.nome}</td>
                    <td>${cliente.cpf}</td>
                    <td>${cliente.email}</td>
                </tr>
            `;
        })
        .catch(err => console.error("Erro ao buscar cliente:", err));
}
