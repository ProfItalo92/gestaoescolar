const usuarioAtivo = localStorage.getItem('usuarioAtivo') || 'default';

// Cadastro de colégio, turma e aluno
document.getElementById('cadastro-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const colegio = document.getElementById('colegio').value;
  const turma = document.getElementById('turma').value;
  const aluno = document.getElementById('aluno').value;

  const chave = `cadastros_${usuarioAtivo}`;
  let dados = JSON.parse(localStorage.getItem(chave)) || [];

  dados.push({ colegio, turma, aluno });
  localStorage.setItem(chave, JSON.stringify(dados));
  alert("Cadastro realizado com sucesso!");
});

// Lançamento de chamada, conteúdo e notas
document.getElementById('lancamento-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const data = document.getElementById('data').value;
  const conteudo = document.getElementById('conteudo').value;
  const aluno = document.getElementById('alunoNota').value;
  const nota = document.getElementById('nota').value;
  const chamada = document.getElementById('chamada').value;

  const chaveLanc = `lancamentos_${usuarioAtivo}`;
  let lancamentos = JSON.parse(localStorage.getItem(chaveLanc)) || [];

  lancamentos.push({ data, conteudo, aluno, nota, chamada });
  localStorage.setItem(chaveLanc, JSON.stringify(lancamentos));
  alert("Lançamento feito com sucesso!");
});

// Carregar relatórios
window.onload = function () {
  const tabela = document.querySelector("#tabela-relatorio tbody");
  if (tabela) {
    const chaveLanc = `lancamentos_${usuarioAtivo}`;
    const lancamentos = JSON.parse(localStorage.getItem(chaveLanc)) || [];

    lancamentos.forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${item.data}</td><td>${item.aluno}</td><td>${item.chamada}</td><td>${item.nota}</td><td>${item.conteudo}</td>`;
      tabela.appendChild(tr);
    });
  }
};

// Exportar para CSV
function exportarCSV() {
  const chaveLanc = `lancamentos_${usuarioAtivo}`;
  const lancamentos = JSON.parse(localStorage.getItem(chaveLanc)) || [];

  let csv = "Data,Aluno,Chamada,Nota,Conteúdo\n";
  lancamentos.forEach(l => {
    csv += `${l.data},${l.aluno},${l.chamada},${l.nota},${l.conteudo}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "relatorio.csv";
  link.click();
}
