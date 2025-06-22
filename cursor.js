document.addEventListener("DOMContentLoaded", function() {
    const cursor = document.querySelector(".cursor");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLista = document.querySelector(".lista nav");

    // Efeito de seguir o cursor
    document.addEventListener("mousemove", (e) => {
        let x = e.clientX;
        let y = e.clientY;

        cursor.style.top = y + "px";
        cursor.style.left = x + "px";
    });

    // Lógica para o menu hambúrguer
    if (menuToggle && navLista) {
        menuToggle.addEventListener("click", () => {
            navLista.classList.toggle("active"); // Alterna a classe 'active'
        });

        // Fechar o menu ao clicar em um link (opcional, se quiser navegação com fechamento automático)
        const navLinks = navLista.querySelectorAll("a");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                // Verificar se é uma tela mobile antes de fechar automaticamente
                if (window.innerWidth <= 768) { // Mesma breakpoint do CSS
                    navLista.classList.remove("active"); // Remove a classe 'active'
                }
            });
        });

        // Fechar o menu se a tela for redimensionada para desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLista.classList.remove('active');
            }
        });
    }
});