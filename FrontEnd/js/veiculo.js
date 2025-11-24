const apiUrl = "https://localhost:7243/api/Veiculo";

// Carregar veículos ao iniciar
document.addEventListener("DOMContentLoaded", listarVeiculos);

function listarVeiculos() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(veiculos => {
            const tabela = document.querySelector("#tabelaVeiculos tbody");
            tabela.innerHTML = "";

            veiculos.forEach(veiculo => {
                tabela.innerHTML += `
                    <tr>
                        <td>${veiculo.id}</td>
                        <td>${veiculo.modelo}</td>
                        <td>${veiculo.placa}</td>
                        <td>${veiculo.cor}</td>
                        <td>${veiculo.ano}</td>
                        <td>${veiculo.quilometragem}</td>
                        <td>${veiculo.preco}</td>
                        <td>${veiculo.fabricanteId}</td>
                    </tr>
                `;
            });
        });
}

function adicionarVeiculo() {
    const modelo = document.getElementById("modelo").value;
    const placa = document.getElementById("placa").value;
    const cor = document.getElementById("cor").value;
    const ano = document.getElementById("ano").value;
    const quilometragem = document.getElementById("quilometragem").value;
    const preco = document.getElementById("preco").value;
    const fabricanteId = document.getElementById("idFabricante").value;

    if (!modelo || !placa || !cor || !ano || !quilometragem || !preco || !fabricanteId) {
        alert("Preencha todos os campos!");
        return;
    }

    const novoVeiculo = { modelo, placa, cor, ano, quilometragem, preco, fabricanteId };

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoVeiculo)
    })
    .then(() => {
        listarVeiculos();
        document.getElementById("modelo").value = "";
        document.getElementById("placa").value = "";
        document.getElementById("cor").value = "";
        document.getElementById("ano").value = "";
        document.getElementById("quilometragem").value = "";
        document.getElementById("preco").value = "";
        document.getElementById("idFabricante").value = "";
    });
}

// Função para deletar veículo
function deletarVeiculo() {
    const id = document.getElementById("deletarId").value;
    if (!id) {
        alert("Por favor, insira um ID válido.");
        return;
    }

    fetch(`${apiUrl}/${id}`, { method: "DELETE" })
        .then(() => {
            listarVeiculos();
            document.getElementById("deletarId").value = "";
        });
}

// Função para buscar veículos por fabricante
function buscarVeiculosPorFabricante() {
    const idFabricante = document.getElementById("buscarIdFabricante").value;
    if (!idFabricante) {
        alert("Por favor, insira um ID de fabricante válido.");
        return;
    }
    fetch(`${apiUrl}/by-manufacturer/${idFabricante}`)
    .then(res => {
        if (!res.ok) {
            console.error("Erro ao buscar veículos por fabricante:", res.statusText);
            return [];
        }
        return res.json();
    })
    .then(veiculos => {
        const tabela = document.querySelector("#tabelaVeiculos tbody");
        tabela.innerHTML = veiculos.map(v => `
            <tr>
                <td>${v.id}</td>
                <td>${v.modelo}</td>
                <td>${v.placa}</td>
                <td>${v.cor}</td>
                <td>${v.ano}</td>
                <td>${v.quilometragem}</td>
                <td>${v.preco}</td>
                <td>${v.fabricanteId}</td>
            </tr>
        `).join('');
    })
    .catch(err => console.error(err));
}

// Buscar por ID
function buscarVeiculos() {
    const id = document.getElementById("buscarID").value;
    if (!id) {
        alert("Por favor, insira um ID válido.");
        return;
    }

    fetch(`${apiUrl}/${id}`)
        .then(res => res.json())
        .then(veiculo => {
            const tabela = document.querySelector("#tabelaVeiculos tbody");
            tabela.innerHTML = "";
            tabela.innerHTML += `
                <tr>
                    <td>${veiculo.id}</td>
                    <td>${veiculo.modelo}</td>
                    <td>${veiculo.placa}</td>
                    <td>${veiculo.cor}</td>
                    <td>${veiculo.ano}</td>
                    <td>${veiculo.quilometragem}</td>
                    <td>${veiculo.preco}</td>
                    <td>${veiculo.fabricanteId}</td>
                </tr>
            `;
        });
}


// Editar Veículo 
async function editarVeiculo(event) {
    if (event) event.preventDefault(); 
    const id = document.getElementById("editarId").value;
    const modelo = document.getElementById("editarModelo").value;
    const placa = document.getElementById("editarPlaca").value;
    const cor = document.getElementById("editarCor").value;
    const ano = document.getElementById("editarAno").value;
    const quilometragem = document.getElementById("editarQuilometragem").value;
    const preco = document.getElementById("editarPreco").value;
    const fabricanteId = document.getElementById("editarIdFabricante").value; // corrigido

    const veiculoAtualizado = {
        id: Number(id),
        modelo: modelo,
        placa: placa,
        cor: cor,
        ano: Number(ano),
        quilometragem: Number(quilometragem),
        preco: Number(preco),
        fabricanteId: Number(fabricanteId)
    };

    try {
        const response = await fetch(`https://localhost:7243/api/Veiculo/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(veiculoAtualizado)
        });

        if (response.ok) {
            alert("Veículo atualizado com sucesso!");
            listarVeiculos();
            // Limpa os campos
            document.getElementById("editarId").value = "";
            document.getElementById("editarModelo").value = "";
            document.getElementById("editarPlaca").value = "";
            document.getElementById("editarCor").value = "";
            document.getElementById("editarAno").value = "";
            document.getElementById("editarQuilometragem").value = "";
            document.getElementById("editarPreco").value = "";
            document.getElementById("editarIdFabricante").value = "";
        } else {
            console.error("Erro ao atualizar veículo:", response.statusText);
        }
    } catch (error) {
        console.error("Erro ao atualizar veículo:", error);
    }
}
