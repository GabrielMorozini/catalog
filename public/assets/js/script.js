// 1. Função para carregar os dados do JSON e injetar no HTML
async function carregarDadosDoJson() {
    try {
        // Busca o arquivo subindo uma pasta a partir de 'pages' e entrando em 'db'
        const resposta = await fetch('../db/produtos.json');
        const categorias = await resposta.json();

        // ---- PARTE 1: INJETAR OS DESTAQUES ----
        const containerDestaques = document.getElementById('content-destaques');
        if (containerDestaques) {
            containerDestaques.innerHTML = ""; // Limpa o conteúdo estático
            
            const codigosDestaque = ["10333", "21042", "60141"];

            categorias.forEach(categoria => {
                categoria.produtos.forEach(produto => {
                    if (codigosDestaque.includes(produto.codigo)) {
                        const precoFormatado = produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                        
                        containerDestaques.innerHTML += `
                            <a href="#">
                                <article class="artigo">
                                    <img src="${produto.imagem}" alt="${produto.nome} - R$"><br>
                                    <small>${produto.nome}</small>
                                    <small>${precoFormatado}</small>
                                </article>
                            </a>
                        `;
                    }
                });
            });
        }

        // ---- PARTE 2: INJETAR O CATÁLOGO GERAL ----
        categorias.forEach(categoria => {
            const listaContainer = document.getElementById(`lista-${categoria.id}`);
            
            if (listaContainer) {
                listaContainer.innerHTML = ""; // Limpa os cards antigos do HTML

                categoria.produtos.forEach(produto => {
                    const precoFormatado = produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

                    listaContainer.innerHTML += `
                        <a href="#">
                            <article class="artigo">
                                <img src="${produto.imagem}" alt="${produto.nome} - R$"><br>
                                <small>${produto.nome}</small>
                                <small>${precoFormatado}</small>
                            </article>
                        </a>
                    `;
                });
            }
        });

    } catch (erro) {
        console.error("Erro ao carregar os dados dos produtos:", erro);
    }
}

// 2. Evento principal que roda assim que a página carrega
document.addEventListener("DOMContentLoaded", async () => {
    
    // Primeiro, esperamos o JSON preencher todo o HTML da página...
    await carregarDadosDoJson();

    // ...Só DEPOIS que o HTML existe, ativamos a tua lógica dos botões!
    const botoesVerMais = document.querySelectorAll('.catalogo .btn');

    botoesVerMais.forEach(botao => {
        botao.addEventListener('click', function() {
            const containerSets = this.closest('.sets');
            const lista = containerSets.querySelector('.lista-produtos');
            
            lista.classList.toggle('ativo');
            
            if (lista.classList.contains('ativo')) {
                this.textContent = 'Fechar';
            } else {
                this.textContent = 'Ver mais';
            }
        });
    });
});