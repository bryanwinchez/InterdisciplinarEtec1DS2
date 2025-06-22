/*
 * NOME DO ARQUIVO: script.js
 * DESCRIÇÃO: Script principal e unificado para interatividade do site.
 * Inclui a lógica do cursor, menu mobile e a funcionalidade da
 * página de seleção de time favorito com feedback de cores.
 * VERSÃO: 2.1
 */

document.addEventListener("DOMContentLoaded", () => {

    /**
     * LÓGICA 1: CURSOR PERSONALIZADO
     */
    const cursor = document.querySelector(".cursor");
    if (cursor) {
        document.addEventListener("mousemove", (e) => {
            cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
        });
    }

    /**
     * LÓGICA 2: MENU HAMBÚRGUER (MOBILE)
     */
    const menuToggle = document.querySelector(".menu-toggle");
    const navContainer = document.querySelector(".nav-principal");

    if (menuToggle && navContainer) {
        menuToggle.addEventListener("click", () => {
            navContainer.classList.toggle("active");
        });
    }

    /**
     * LÓGICA 3: PÁGINA DE SELEÇÃO DE TIME FAVORITO
     */
    const timesContainer = document.getElementById('timesContainer');
    if (timesContainer) {
        let timeSelecionado = "";
        const imagens = timesContainer.querySelectorAll('img');
        const mensagemEl = document.getElementById('mensagem');
        const saveBtn = document.getElementById('saveFavTeamBtn');
        const timeFavoritoKey = "timeFavoritoMundial2025";

        const carregarTimeSalvo = () => {
            const timeSalvo = localStorage.getItem(timeFavoritoKey);
            if (timeSalvo) {
                mensagemEl.textContent = `Seu time favorito salvo é: ${timeSalvo}`;
                mensagemEl.className = ''; // Reseta para cor padrão
                timeSelecionado = timeSalvo;
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
                mensagemEl.className = ''; // Reseta para cor padrão
            });
        });

        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                if (timeSelecionado) {
                    localStorage.setItem(timeFavoritoKey, timeSelecionado);
                    mensagemEl.textContent = `Sucesso! Seu time (${timeSelecionado}) foi salvo.`;
                    // Aplica a classe de sucesso (verde)
                    mensagemEl.className = 'sucesso'; 
                } else {
                    mensagemEl.textContent = "Por favor, selecione um time para salvar.";
                    // Aplica a classe de erro (vermelho)
                    mensagemEl.className = 'erro';
                }
            });
        }

        carregarTimeSalvo();
    }
});