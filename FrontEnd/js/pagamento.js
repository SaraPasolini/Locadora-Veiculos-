const apiUrl = "https://localhost:7243/api/Pagamento";

// Listar todos os pagamentos
document.addEventListener("DOMContentLoaded", listarPagamentos);

function listarPagamentos() {
  fetch(apiUrl)
    .then((res) => res.json())
    .then((pagamentos) => {
      const tabela = document.querySelector("#tabelaPagamentos tbody");
      tabela.innerHTML = "";
      pagamentos.forEach((p) => {
        tabela.innerHTML += `
                    <tr>
                        <td>${p.id}</td>
                        <td>${p.aluguelId}</td>
                        <td>${p.dataPagamento}</td>
                        <td>${p.valor}</td>
                        <td>${p.metodo}</td>
                    </tr>
                `;
      });
    })
    .catch((err) => console.error("Erro ao listar pagamentos:", err));
}

// Adicionar pagamento
function adicionarPagamento() {
  const novoPagamento = {
    aluguelId: parseInt(document.getElementById("aluguelId").value),
    dataPagamento: document.getElementById("dataPagamento").value,
    valor: parseFloat(document.getElementById("valor").value),
    metodo: document.getElementById("metodoPagamento").value, // CORRIGIDO
  };

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novoPagamento),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Erro ao cadastrar pagamento.");
      return res.json();
    })
    .then(() => {
      listarPagamentos();
      ["aluguelId", "dataPagamento", "valor", "metodoPagamento"].forEach(
        (id) => (document.getElementById(id).value = "")
      );
    })
    .catch((err) => console.error(err));
}


// Deletar pagamento
function deletarPagamento() {
  const id = document.getElementById("deletarId").value;
  if (!id) return alert("Insira um ID válido");

  fetch(`${apiUrl}/${id}`, { method: "DELETE" })
    .then((res) => {
      if (!res.ok) throw new Error("Erro ao deletar pagamento");
      listarPagamentos();
      document.getElementById("deletarId").value = "";
    })
    .catch((err) => console.error(err));
}

// Buscar por ID do Pagamento
function buscarPagamentoPorID() {
  const id = document.getElementById("buscarPagamentoID").value;
  if (!id) return;

  fetch(`${apiUrl}/${id}`)
    .then((res) => {
      if (!res.ok) throw new Error("Pagamento não encontrado");
      return res.json();
    })
    .then((a) => {
      const tabela = document.querySelector("#tabelaPagamentos tbody");
      tabela.innerHTML = `
                <tr>
                    <td>${a.id}</td>
                    <td>${a.aluguelId}</td>
                    <td>${a.dataPagamento}</td>
                    <td>${a.valor}</td>
                    <td>${a.metodo}</td>
                </tr>
            `;
    })
    .catch((err) => console.error(err));
}

// Editar pagamento
function editarPagamento() {
  const id = document.getElementById("editarId").value;

  const pagamentoAtualizado = {
  id: parseInt(id),
  aluguelId: parseInt(document.getElementById("editarAluguelId").value),
  dataPagamento: document.getElementById("editarDataPagamento").value,
  valor: parseFloat(document.getElementById("editarValor").value),
  metodo: document.getElementById("editarMetodoPagamento").value // ← AQUI
};


  fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pagamentoAtualizado),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Erro ao atualizar pagamento");
      alert("Pagamento atualizado com sucesso!");
      listarPagamentos();

      // Limpar campos
      [
        "editarId",
        "editarAluguelId",
        "editarDataPagamento",
        "editarValor",
        "editarMetodoPagamento",
      ].forEach((campo) => (document.getElementById(campo).value = ""));
    })
    .catch((err) => console.error(err));
}
