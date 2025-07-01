/*
 * NOME DO ARQUIVO: script.js
 * DESCRIÇÃO: Script principal e unificado para interatividade do site.
 * VERSÃO: 10.0 - Adicionado módulo de segurança anti-inspeção.
 */

document.addEventListener("DOMContentLoaded", () => {
    // Inicializa cada módulo de forma independente após o carregamento do DOM.
    iniciarCursor();
    iniciarMenuMobile();
    iniciarPaginaFavoritos();
    iniciarModalPesquisa();
    iniciarFlipCards();
    iniciarProtecaoAntiInspecao(); // Adiciona o novo módulo de segurança
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
        
        if (menuToggle && navContainer) {
            menuToggle.addEventListener("click", () => {
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
        if (!timesContainer) return;

        const imagens = timesContainer.querySelectorAll('img');
        const mensagemEl = document.getElementById('mensagem');
        const saveBtn = document.getElementById('saveFavTeamBtn');
        const timeFavoritoKey = "timeFavoritoMundial2025";
        let timeSelecionado = "";

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

    } catch (error)
        {
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
            if (e.target === modal) {
                fecharModal();
            }
        });

        estrelas.forEach(estrela => {
            estrela.addEventListener('click', () => {
                const valorClicado = parseInt(estrela.dataset.valor);
                avaliacaoInput.value = valorClicado;
                estrelas.forEach(s => {
                    const valorDaEstrela = parseInt(s.dataset.valor);
                    s.classList.toggle('selecionada', valorDaEstrela <= valorClicado);
                });
            });
        });

        form.addEventListener('submit', (e) => {
            if (avaliacaoInput && (!avaliacaoInput.value || avaliacaoInput.value === "0")) {
                e.preventDefault();
                alert("Por favor, selecione de 1 a 5 estrelas para avaliar.");
            }
        });

    } catch (error) {
        console.error("Erro na funcionalidade do Modal de Pesquisa:", error);
    }
}

/**
 * MÓDULO 5: FLIP DE CARDS (DESKTOP E MOBILE)
 * Adiciona a funcionalidade de virar os cards de times ao clicar.
 */
function iniciarFlipCards() {
    try {
        // Seleciona tanto os cards dos times quanto os dos jogadores
        const cards = document.querySelectorAll('.team-card, .player-card');
        if (!cards.length) return;

        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Previne que o clique em um link dentro do card (como "Ver Detalhes")
                // cause a propagação e vire o card novamente.
                if (e.target.closest('a')) {
                    return;
                }
                card.classList.toggle('is-flipped');
            });
        });
    } catch (error) {
        console.error("Erro ao iniciar a funcionalidade de flip dos cards:", error);
    }
}

/**
 * MÓDULO 6: PROTEÇÃO ANTI-INSPEÇÃO
 * Dificulta a inspeção do código-fonte por usuários.
 */
function iniciarProtecaoAntiInspecao() {
    try {
        // 1. Bloqueio de Clique Direito
        document.addEventListener('contextmenu', e => e.preventDefault());

        // 2. Bloqueio de Atalhos do Teclado
        document.addEventListener('keydown', e => {
            // Bloqueia F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
            if (e.keyCode === 123 || 
               (e.ctrlKey && e.shiftKey && (e.keyCode === 'I'.charCodeAt(0) || e.keyCode === 'J'.charCodeAt(0))) || 
               (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))) {
                e.preventDefault();
            }
        });

        // 3. Detecção de Ferramentas de Desenvolvedor (Debugger)
        // Esta técnica é mais agressiva e pode não funcionar em todos os navegadores.
        (function() {
            function detectDevTools() {
                const threshold = 160;
                const devtools = function() {};
                devtools.toString = function() {
                    const width = window.outerWidth - window.innerWidth > threshold;
                    const height = window.outerHeight - window.innerHeight > threshold;
                    if (width || height) {
                        // Tenta travar o debugger
                        while (true) {}
                    }
                    return false;
                };
                // Verifica periodicamente se o debugger está ativo
                setInterval(function() {
                    try {
                        (function() {
                            return false;
                        }['constructor']('debugger')());
                    } catch (e) {}
                }, 500);
            }
            detectDevTools();
        })();

    } catch (error) {
        console.error("Erro ao iniciar a proteção anti-inspeção:", error);
    }
}
