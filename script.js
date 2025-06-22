/*
 * NOME DO ARQUIVO: script.js
 * DESCRIÇÃO: Script principal e unificado para interatividade do site.
 * Esta versão contém a correção definitiva e simplificada para a funcionalidade
 * do rating de estrelas, garantindo que o clique funcione perfeitamente.
 * VERSÃO: 5.0 - FINAL E CORRIGIDA
 */

document.addEventListener("DOMContentLoaded", () => {

    // Inicializa cada módulo de forma independente para evitar que um erro afete os outros.
    iniciarCursor();
    iniciarMenuMobile();
    iniciarPaginaFavoritos();
    iniciarModalPesquisa();

});

/**
 * MÓDULO 1: CURSOR PERSONALIZADO
 */
function iniciarCursor() {
    try {
        const cursor = document.querySelector(".cursor");
        if (cursor) {
            document.addEventListener("mousemove", (e) => {
                cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
            });
        }
    } catch (error) {
        console.error("Erro no Cursor:", error);
    }
}

/**
 * MÓDULO 2: MENU HAMBÚRGUER (MOBILE)
 */
function iniciarMenuMobile() {
    try {
        const menuToggle = document.querySelector(".menu-toggle");
        const navContainer = document.querySelector(".nav-principal");
        if (menuToggle && navContainer) {
            menuToggle.addEventListener("click", () => {
                navContainer.classList.toggle("active");
            });
        }
    } catch (error) {
        console.error("Erro no Menu Mobile:", error);
    }
}

/**
 * MÓDULO 3: PÁGINA DE SELEÇÃO DE TIME FAVORITO
 */
function iniciarPaginaFavoritos() {
    try {
        const timesContainer = document.getElementById('timesContainer');
        if (!timesContainer) return; // Se não estiver na página de favoritos, não faz nada.

        let timeSelecionado = "";
        const imagens = timesContainer.querySelectorAll('img');
        const mensagemEl = document.getElementById('mensagem');
        const saveBtn = document.getElementById('saveFavTeamBtn');
        const timeFavoritoKey = "timeFavoritoMundial2025";

        const carregarTimeSalvo = () => {
            const timeSalvo = localStorage.getItem(timeFavoritoKey);
            if (timeSalvo) {
                mensagemEl.textContent = `Seu time favorito salvo é: ${timeSalvo}`;
                mensagemEl.className = '';
                timeSelecionado = timeSalvo;
                imagens.forEach(img => {
                    if (img.dataset.time === timeSalvo) img.classList.add("selecionado");
                });
            }
        };

        imagens.forEach(img => {
            img.addEventListener('click', () => {
                imagens.forEach(i => i.classList.remove("selecionado"));
                img.classList.add("selecionado");
                timeSelecionado = img.dataset.time;
                mensagemEl.textContent = `Você selecionou: ${timeSelecionado}`;
                mensagemEl.className = '';
            });
        });

        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                if (timeSelecionado) {
                    localStorage.setItem(timeFavoritoKey, timeSelecionado);
                    mensagemEl.textContent = `Sucesso! Seu time (${timeSelecionado}) foi salvo.`;
                    mensagemEl.className = 'sucesso';
                } else {
                    mensagemEl.textContent = "Por favor, selecione um time para salvar.";
                    mensagemEl.className = 'erro';
                }
            });
        }
        carregarTimeSalvo();

    } catch (error) {
        console.error("Erro na página de Favoritos:", error);
    }
}

/**
 * MÓDULO 4: MODAL DE PESQUISA (COM LÓGICA DE ESTRELAS CORRIGIDA)
 */
function iniciarModalPesquisa() {
    try {
        const modal = document.getElementById('pesquisaModal');
        if (!modal) return; // Se o modal não estiver na página, não faz nada.

        const abrirBtn = document.getElementById('abrirModalBtn');
        const fecharBtn = document.getElementById('fecharModalBtn');
        const form = document.getElementById('pesquisaForm');
        const estrelas = form.querySelectorAll('.rating-estrelas .fa-star');
        const avaliacaoInput = form.querySelector('#avaliacaoSiteInput');

        const abrirModal = () => modal.classList.add('visivel');
        const fecharModal = () => modal.classList.remove('visivel');

        abrirBtn.addEventListener('click', abrirModal);
        fecharBtn.addEventListener('click', fecharModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) fecharModal();
        });

        // LÓGICA DE ESTRELAS - SIMPLES E DIRETA
        estrelas.forEach(estrela => {
            estrela.addEventListener('click', () => {
                const valorClicado = parseInt(estrela.dataset.valor);
                avaliacaoInput.value = valorClicado;

                // Percorre todas as estrelas e atualiza a classe 'selecionada'
                estrelas.forEach(s => {
                    const valorDaEstrela = parseInt(s.dataset.valor);
                    if (valorDaEstrela <= valorClicado) {
                        s.classList.add('selecionada');
                    } else {
                        s.classList.remove('selecionada');
                    }
                });
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!avaliacaoInput.value || avaliacaoInput.value === "0") {
                alert("Por favor, selecione de 1 a 5 estrelas para avaliar.");
                return;
            }
            alert("Obrigado pela sua opinião!");
            fecharModal();
            form.reset();
            // Limpa a seleção visual das estrelas
            estrelas.forEach(s => s.classList.remove('selecionada'));
            avaliacaoInput.value = "";
        });

    } catch (error) {
        console.error("Erro no Modal de Pesquisa:", error);
    }
}

/*
 * NOME DO ARQUIVO: script.js
 * DESCRIÇÃO: Versão simplificada para funcionar com o FormSubmit,
 * que lida com o envio do formulário diretamente via HTML.
 * VERSÃO: 7.0
 */

document.addEventListener("DOMContentLoaded", () => {
    iniciarCursor();
    iniciarMenuMobile();
    iniciarPaginaFavoritos();
    iniciarModalPesquisa();
});

// Funções iniciarCursor(), iniciarMenuMobile(), iniciarPaginaFavoritos()...

function iniciarModalPesquisa() {
    try {
        const modal = document.getElementById('pesquisaModal');
        if (!modal) return;

        const abrirBtn = document.getElementById('abrirModalBtn');
        const fecharBtn = document.getElementById('fecharModalBtn');
        const form = document.getElementById('pesquisaForm');
        const estrelas = form.querySelectorAll('.rating-estrelas .fa-star');
        const avaliacaoInput = form.querySelector('#avaliacaoEstrelasInput');

        const abrirModal = () => modal.classList.add('visivel');
        const fecharModal = () => modal.classList.remove('visivel');

        abrirBtn.addEventListener('click', abrirModal);
        fecharBtn.addEventListener('click', fecharModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) fecharModal();
        });

        // Lógica de clique das estrelas
        estrelas.forEach(estrela => {
            estrela.addEventListener('click', () => {
                const valorClicado = parseInt(estrela.dataset.valor);
                avaliacaoInput.value = valorClicado;
                estrelas.forEach(s => {
                    s.classList.toggle('selecionada', parseInt(s.dataset.valor) <= valorClicado);
                });
            });
        });

        // Validação antes do envio (o envio em si é feito pelo HTML)
        form.addEventListener('submit', (e) => {
            if (!avaliacaoInput.value || avaliacaoInput.value === "0") {
                e.preventDefault(); // Impede o envio se não houver avaliação
                alert("Por favor, selecione de 1 a 5 estrelas para avaliar.");
            }
            // Se a validação passar, o formulário é enviado para o 'action' do FormSubmit.
        });

    } catch (error) {
        console.error("Erro no Modal de Pesquisa:", error);
    }
}
