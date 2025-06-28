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
                    logoImg.src = 'assets/logos/Logotipo_dark.png'; // Substitua pelo caminho da sua imagem dark
                    logoImg.alt = 'Logotipo TickeTony - Modo Escuro';
                }
            }
        }
        // Guarda a preferência no localStorage
        localStorage.setItem('theme', theme);
    }

    // Função para carregar o tema guardado ou definir o padrão
    function loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        // Se houver um tema guardado, usa-o. Caso contrário, verifica a preferência do sistema ou usa 'dark' como padrão
        if (savedTheme) {
            applyTheme(savedTheme);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            // Se o sistema preferir o modo claro
            applyTheme('light');
        } else {
            // Padrão para modo escuro
            applyTheme('dark');
        }
    }

    // Carrega o tema quando a página é carregada
    loadTheme();

    // Adiciona o event listener para o botão de alternar tema
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    // --- Script para o estado ativo da navbar (AQUI) ---
    const navLinks = document.querySelectorAll('.main-nav .nav-link-item');
    const sections = document.querySelectorAll('main section[id]');

    function highlightNavLink() {
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