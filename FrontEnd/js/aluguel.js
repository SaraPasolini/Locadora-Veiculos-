const apiUrl = "https://localhost:7243/api/Aluguel";

// Listar todos os aluguéis
document.addEventListener("DOMContentLoaded", listarAlugueis);

function listarAlugueis() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(aluguels => {
            const tabela = document.querySelector("#tabelaAlugueis tbody");
            tabela.innerHTML = "";
            aluguels.forEach(a => {
                tabela.innerHTML += `
                    <tr>
                        <td>${a.id}</td>
                        <td>${a.clienteId}</td>
                        <td>${a.veiculoId}</td>
                        <td>${a.dataInicio}</td>
                        <td>${a.dataDevolucao || "-"}</td>
                        <td>${a.quilometragemInicial}</td>
                        <td>${a.quilometragemFinal || "-"}</td>
                        <td>${a.valorDiaria}</td>
                        <td>${a.valorTotal || "-"}</td>
                    </tr>
                `;
            });
        })
        .catch(err => console.error("Erro ao listar aluguéis:", err));
}

// Adicionar aluguel
function adicionarAluguel() {
    const novoAluguel = {
        clienteId: parseInt(document.getElementById("clienteId").value),
        veiculoId: parseInt(document.getElementById("veiculoId").value),
        dataInicio: document.getElementById("dataInicio").value,
        dataDevolucao: document.getElementById("dataDevolucao").value || null,
        quilometragemInicial: parseInt(document.getElementById("quilometragemInicial").value),
        quilometragemFinal: document.getElementById("quilometragemFinal").value ? parseInt(document.getElementById("quilometragemFinal").value) : null,
        valorDiaria: parseFloat(document.getElementById("valorDiaria").value),
        valorTotal: document.getElementById("valorTotal").value ? parseFloat(document.getElementById("valorTotal").value) : null
    };

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoAluguel)
    })
    .then(res => {
        if (!res.ok) throw new Error("Erro ao cadastrar aluguel.");
        return res.json();
    })
    .then(() => {
        listarAlugueis();
        ["clienteId","veiculoId","dataInicio","dataDevolucao","quilometragemInicial","quilometragemFinal","valorDiaria","valorTotal"]
        .forEach(id => document.getElementById(id).value = "");
    })
    .catch(err => console.error(err));
}

// Deletar aluguel
function deletarAluguel() {
    const id = document.getElementById("deletarId").value;
    if (!id) return alert("Insira um ID válido");

    fetch(`${apiUrl}/${id}`, { method: "DELETE" })
        .then(res => {
            if (!res.ok) throw new Error("Erro ao deletar aluguel");
            listarAlugueis();
            document.getElementById("deletarId").value = "";
        })
        .catch(err => console.error(err));
}

// Buscar por ID do Aluguel
function buscarAluguelPorID() {
    const id = document.getElementById("buscarAluguelID").value;
    if (!id) return;

    fetch(`${apiUrl}/${id}`)
        .then(res => {
            if (!res.ok) throw new Error("Aluguel não encontrado");
            return res.json();
        })
        .then(a => {
            const tabela = document.querySelector("#tabelaAlugueis tbody");
            tabela.innerHTML = `
                <tr>
                    <td>${a.id}</td>
                    <td>${a.clienteId}</td>
                    <td>${a.veiculoId}</td>
                    <td>${a.dataInicio}</td>
                    <td>${a.dataDevolucao || "-"}</td>
                    <td>${a.quilometragemInicial}</td>
                    <td>${a.quilometragemFinal || "-"}</td>
                    <td>${a.valorDiaria}</td>
                    <td>${a.valorTotal || "-"}</td>
                </tr>
            `;
        })
        .catch(err => console.error(err));
}

// Buscar por ID do Cliente
function buscarAlugueisPorCliente() {
    const idCliente = document.getElementById("buscarAluguelIDCliente").value;
    if (!idCliente) return;

    fetch(`https://localhost:7243/api/Aluguel/cliente/${idCliente}`)
        .then(res => {
            if (!res.ok) throw new Error("Nenhum aluguel encontrado para este cliente");
            return res.json();
        })
        .then(aluguels => {
            const tabela = document.querySelector("#tabelaAlugueis tbody");
            tabela.innerHTML = "";
            aluguels.forEach(a => {
                tabela.innerHTML += `
                    <tr>
                        <td>${a.id}</td>
                        <td>${a.clienteId}</td>
                        <td>${a.veiculoId}</td>
                        <td>${a.dataInicio}</td>
                        <td>${a.dataDevolucao || "-"}</td>
                        <td>${a.quilometragemInicial}</td>
                        <td>${a.quilometragemFinal || "-"}</td>
                        <td>${a.valorDiaria}</td>
                        <td>${a.valorTotal || "-"}</td>
                    </tr>
                `;
            });
        })
        .catch(err => console.error(err));
}

// Editar aluguel
function editarAluguel() {
    const id = document.getElementById("editarId").value; // PEGAR O ID AQUI

    const aluguelAtualizado = {
        id: parseInt(id), // BACKEND EXIGE O ID NO DTO
        clienteId: parseInt(document.getElementById("editarClienteId").value),
        veiculoId: parseInt(document.getElementById("editarVeiculoId").value),
        dataInicio: document.getElementById("editarDataInicio").value,
        dataDevolucao: document.getElementById("editarDataDevolucao").value || null,
        quilometragemInicial: parseInt(document.getElementById("editarQuilometragemInicial").value),
        quilometragemFinal: document.getElementById("editarQuilometragemFinal").value ? parseInt(document.getElementById("editarQuilometragemFinal").value) : null,
        valorDiaria: parseFloat(document.getElementById("editarValorDiaria").value),
        valorTotal: document.getElementById("editarValorTotal").value ? parseFloat(document.getElementById("editarValorTotal").value) : null
    };

    fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aluguelAtualizado)
    })
    .then(res => {
        if (!res.ok) throw new Error("Erro ao atualizar aluguel");
        alert("Aluguel atualizado com sucesso!");
        listarAlugueis();

        // Limpar campos
        [
            "editarId","editarClienteId","editarVeiculoId","editarDataInicio","editarDataDevolucao",
            "editarQuilometragemInicial","editarQuilometragemFinal","editarValorDiaria","editarValorTotal"
        ].forEach(campo => document.getElementById(campo).value = "");
    })
    .catch(err => console.error(err));
}

