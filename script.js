/*
 * NOME DO ARQUIVO: script.js
 * DESCRIÇÃO: Script principal e unificado para interatividade do site.
 * VERSÃO: 8.0 - Unificada e Corrigida
 */

document.addEventListener("DOMContentLoaded", () => {
    // Inicializa cada módulo de forma independente após o carregamento do DOM.
    iniciarCursor();
    iniciarMenuMobile();
    iniciarPaginaFavoritos();
    iniciarModalPesquisa();
});

/**
 * MÓDULO 1: CURSOR PERSONALIZADO
 * Ativa um efeito de cursor que segue o mouse.
 * Ele é desativado em telas menores via CSS para melhor usabilidade.
 */
function iniciarCursor() {
    try {
        const cursor = document.querySelector(".cursor");
        if (cursor) {
            document.addEventListener("mousemove", (e) => {
                // Usa transform para uma animação mais suave.
                cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
            });
        }
    } catch (error) {
        console.error("Erro ao iniciar o cursor personalizado:", error);
    }
}

/**
 * MÓDULO 2: MENU HAMBÚRGUER (MOBILE)
 * Controla a exibição do menu de navegação em telas menores.
 */
function iniciarMenuMobile() {
    try {
        const menuToggle = document.querySelector(".menu-toggle");
        const navContainer = document.querySelector(".nav-principal");
        
        // Garante que ambos os elementos existem antes de adicionar o evento.
        if (menuToggle && navContainer) {
            menuToggle.addEventListener("click", () => {
                // Adiciona ou remove a classe 'active' para mostrar/ocultar o menu.
                // A estilização é controlada pelo CSS.
                navContainer.classList.toggle("active");
            });
        }
    } catch (error) {
        console.error("Erro ao iniciar o menu mobile:", error);
    }
}

/**
 * MÓDULO 3: PÁGINA DE SELEÇÃO DE TIME FAVORITO
 * Gerencia a seleção e o armazenamento do time favorito do usuário no localStorage.
 */
function iniciarPaginaFavoritos() {
    try {
        const timesContainer = document.getElementById('timesContainer');
        // Sai da função se não estiver na página de favoritos.
        if (!timesContainer) return;

        const imagens = timesContainer.querySelectorAll('img');
        const mensagemEl = document.getElementById('mensagem');
        const saveBtn = document.getElementById('saveFavTeamBtn');
        const timeFavoritoKey = "timeFavoritoMundial2025"; // Chave para o localStorage
        let timeSelecionado = "";

        // Função para carregar e exibir o time salvo anteriormente.
        const carregarTimeSalvo = () => {
            const timeSalvo = localStorage.getItem(timeFavoritoKey);
            if (timeSalvo) {
                timeSelecionado = timeSalvo;
                mensagemEl.textContent = `Seu time favorito salvo é: ${timeSalvo}`;
                imagens.forEach(img => {
                    if (img.dataset.time === timeSalvo) {
                        img.classList.add("selecionado");
                    }
                });
            }
        };

        // Adiciona evento de clique para cada imagem de time.
        imagens.forEach(img => {
            img.addEventListener('click', () => {
                imagens.forEach(i => i.classList.remove("selecionado")); // Remove a seleção anterior
                img.classList.add("selecionado"); // Adiciona a nova seleção
                timeSelecionado = img.dataset.time;
                mensagemEl.textContent = `Você selecionou: ${timeSelecionado}`;
                mensagemEl.className = ''; // Limpa classes de erro/sucesso
            });
        });
        
        // Adiciona evento de clique para o botão de salvar.
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

        // Carrega o time salvo ao iniciar a página.
        carregarTimeSalvo();

    } catch (error) {
        console.error("Erro na funcionalidade da página de Favoritos:", error);
    }
}

/**
 * MÓDULO 4: MODAL DE PESQUISA (PARA FORMSUBMIT)
 * Gerencia a abertura, fechamento e validação do formulário de pesquisa.
 */
function iniciarModalPesquisa() {
    try {
        const modal = document.getElementById('pesquisaModal');
        // Sai da função se o modal não existir na página atual.
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
        
        // Fecha o modal se o usuário clicar fora da área de conteúdo.
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                fecharModal();
            }
        });

        // Lógica para o clique nas estrelas de avaliação.
        estrelas.forEach(estrela => {
            estrela.addEventListener('click', () => {
                const valorClicado = parseInt(estrela.dataset.valor);
                avaliacaoInput.value = valorClicado; // Atualiza o input hidden com o valor

                // Atualiza a classe 'selecionada' para o feedback visual.
                estrelas.forEach(s => {
                    const valorDaEstrela = parseInt(s.dataset.valor);
                    s.classList.toggle('selecionada', valorDaEstrela <= valorClicado);
                });
            });
        });

        // Adiciona uma validação simples antes do formulário ser enviado pelo FormSubmit.
        form.addEventListener('submit', (e) => {
            // Verifica se o input de avaliação existe e se um valor foi selecionado.
            if (avaliacaoInput && (!avaliacaoInput.value || avaliacaoInput.value === "0")) {
                e.preventDefault(); // Impede o envio do formulário.
                alert("Por favor, selecione de 1 a 5 estrelas para avaliar.");
            }
            // Se a validação passar, o formulário será enviado para o 'action' definido no HTML.
        });

    } catch (error) {
        console.error("Erro na funcionalidade do Modal de Pesquisa:", error);
    }
}