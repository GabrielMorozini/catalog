document.querySelectorAll('.catalogo .btn').forEach(botao => {
    botao.addEventListener('click', function () {
        const catalogo = this.closest('.catalogo');
        const lista = catalogo.querySelector('.lista-produtos');
        const isAtivo = lista.classList.contains('ativo');

        lista.classList.toggle('ativo');
        catalogo.classList.toggle('aberto');
        this.textContent = isAtivo ? 'Ver mais' : 'Fechar';
    });
});