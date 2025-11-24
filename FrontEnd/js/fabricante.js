const apiUrl = "https://localhost:7243/api/Fabricante";

// Carregar Fabricantes ao iniciar
document.addEventListener("DOMContentLoaded", listarFabricantes);

function listarFabricantes() {
  fetch(apiUrl)
    .then((res) => res.json())
    .then((fabricantes) => {
      const tabela = document.querySelector("#tabelaFabricantes tbody");
      tabela.innerHTML = "";

      fabricantes.forEach((fabricante) => {
        tabela.innerHTML += `
                    <tr>
                        <td>${fabricante.id}</td>
                        <td>${fabricante.nome}</td>
                        <td>${fabricante.origem}</td>
                    </tr>
                `;
      });
    });
}

function adicionarFabricante() {
  const nome = document.getElementById("nome").value;
  const origem = document.getElementById("origem").value;

  if (!nome || !origem) {
    alert("Preencha todos os campos!");
    return;
  }

  const novoFabricante = { nome, origem };

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novoFabricante),
  }).then(() => {
    listarFabricantes();
    document.getElementById("nome").value = "";
    document.getElementById("origem").value = "";
  });
}

// Função para deletar fabricante
function deletarFabricante() {
  const id = document.getElementById("deletarId").value;
  if (!id) {
    alert("Por favor, insira um ID válido.");
    return;
  }

  fetch(`${apiUrl}/${id}`, { method: "DELETE" }).then(() => {
    listarFabricantes();
    document.getElementById("deletarId").value = "";
  });
}

// Editar Fabricante
async function editarFabricante() {
  const id = document.getElementById("editarId").value;
  const nome = document.getElementById("editarNome").value;
  const origem = document.getElementById("editarOrigem").value;

  const fabricanteAtualizado = {
    id: Number(id),
    nome: nome,
    origem: origem,
  };

  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fabricanteAtualizado),
    });

    if (response.ok) {
      alert("Fabricante atualizado com sucesso!");
      listarFabricantes();
      document.getElementById("editarId").value = "";
      document.getElementById("editarNome").value = "";
      document.getElementById("editarOrigem").value = "";
    }
  } catch (error) {
    console.error("Erro ao atualizar o fabricante:", error);
  }
}

// Buscar por ID
function buscarFabricantePorId() {
    const id = document.getElementById("buscarId").value.trim();
    if (!id) return;

    fetch(`${apiUrl}/${id}`)
        .then(res => {
            if (!res.ok) {
                document.querySelector("#tabelaFabricantes tbody").innerHTML = `
                    <tr><td colspan="3">Nenhum fabricante encontrado com esse ID.</td></tr>`;
                return null;
            }
            return res.json();
        })
        .then(fabricante => {
            if (!fabricante) return;
            document.querySelector("#tabelaFabricantes tbody").innerHTML = `
                <tr>
                    <td>${fabricante.id}</td>
                    <td>${fabricante.nome}</td>
                    <td>${fabricante.origem}</td>
                </tr>
            `;
        })
        .catch(err => console.error("Erro ao buscar fabricante:", err));
}

// Buscar por Nome
function buscarFabricantePorNome() {
    const nome = document.getElementById("buscarNome").value.trim();
    if (!nome) return;

    fetch(`${apiUrl}/nome/${encodeURIComponent(nome)}`)
        .then(res => {
            if (!res.ok) {
                document.querySelector("#tabelaFabricantes tbody").innerHTML = `
                    <tr><td colspan="3">Nenhum fabricante encontrado com esse nome.</td></tr>`;
                return null;
            }
            return res.json();
        })
        .then(fabricantes => {
            if (!fabricantes || fabricantes.length === 0) return;

            document.querySelector("#tabelaFabricantes tbody").innerHTML = fabricantes.map(f => `
                <tr>
                    <td>${f.id}</td>
                    <td>${f.nome}</td>
                    <td>${f.origem}</td>
                </tr>
            `).join('');
        })
        .catch(err => console.error("Erro ao buscar fabricante:", err));
}

