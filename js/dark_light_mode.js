document.addEventListener('DOMContentLoaded', function() {
    // --- Lógica de Dark/Light Mode (MOVIDA PARA CÁ) ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    // DECLARE logoImg AQUI, para que seja acessível em applyTheme
    const logoImg = document.querySelector('.main-nav .logo img');

    // Função para aplicar o tema (adiciona/remove a classe 'light-mode' e atualiza o ícone/aria-label)
    function applyTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light-mode');
            if (themeToggleBtn) { // Verifica se o botão existe antes de tentar manipulá-lo
                themeToggleBtn.querySelector('i').classList.remove('bi-moon-fill');
                themeToggleBtn.querySelector('i').classList.add('bi-sun-fill');
                themeToggleBtn.setAttribute('aria-label', 'Ativar tema escuro');

                // Lógica do logotipo para Light Mode
                if (logoImg) {
                    logoImg.src = 'assets/logos/Logotipo_light.png'; // Substitua pelo caminho da sua imagem light
                    logoImg.alt = 'Logotipo TickeTony - Modo Claro';
                }
            }
        } else { // Tema 'dark'
            body.classList.remove('light-mode');
            if (themeToggleBtn) { // Verifica se o botão existe
                themeToggleBtn.querySelector('i').classList.remove('bi-sun-fill');
                themeToggleBtn.querySelector('i').classList.add('bi-moon-fill');
                themeToggleBtn.setAttribute('aria-label', 'Ativar tema claro');

                // Lógica do logotipo para Dark Mode
                if (logoImg) {
                    logoImg.src = 'assets/logos/Logotipo_dark.png'; // Volta para a imagem dark
                    logoImg.alt = 'Logotipo TickeTony';
                }
            }
        }
    }

    // Carregar a preferência do utilizador ou usar a do sistema
    const savedTheme = localStorage.getItem('theme'); // 'dark' ou 'light'

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        applyTheme('light');
    } else {
        applyTheme('dark');
    }

    // Adicionar event listener ao botão de toggle
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            if (body.classList.contains('light-mode')) {
                applyTheme('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                applyTheme('light');
                localStorage.setItem('theme', 'light');
            }
        });
    }
    // --- Fim da Lógica de Dark/Light Mode ---


    // --- Inicialização do AOS - Animate On Scroll (APENAS AQUI) ---
    AOS.init({
        once: true,
        duration: 800,
        easing: 'ease-out-quad'
    });

    // --- Script para o estado ativo da navbar ---
    const navLinks = document.querySelectorAll('.nav-link-item');
    const sections = document.querySelectorAll('main section[id]');
    const isContactPage = body.classList.contains('contacto-page');


    function highlightNavLink() {
        if (isContactPage) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.href.includes('contacto.html')) {
                    link.classList.add('active');
                }
            });
            return; // Sai da função, pois não há scroll para secções na página de contacto
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const scrollOffset = window.innerHeight * 0.3;
            if (window.scrollY >= sectionTop - scrollOffset) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Verifica se o link é para uma seção da página principal
            if (link.dataset.target === current && !link.href.includes('contacto.html')) {
                link.classList.add('active');
            }
        });
    }

    // Adiciona event listeners para scroll e carregamento inicial
    window.addEventListener('scroll', highlightNavLink);
    window.addEventListener('load', highlightNavLink);

    // Garantir que ao clicar num link da navbar, o scroll é suave e o estado ativo é atualizado
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Se o link é para uma âncora na mesma página E não é o link de contacto
            if (this.hash !== '' && !this.href.includes('contacto.html')) {
                e.preventDefault();
                const targetId = this.getAttribute('data-target');
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
            // Pequeno delay para garantir que o scroll terminou antes de reavaliar o ativo
            setTimeout(highlightNavLink, 50);
        });
    });
});