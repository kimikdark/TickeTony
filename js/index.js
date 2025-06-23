document.addEventListener('DOMContentLoaded', function() {
    // Inicialização do AOS - Animate On Scroll
    AOS.init({
        once: true, // Animação só acontece uma vez ao scrollar para o elemento
        duration: 800, // Duração padrão da animação (em ms)
        easing: 'ease-out-quad' // Tipo de easing para a animação
    });

    // Script para o estado ativo da navbar
    const navLinks = document.querySelectorAll('.nav-link-item');
    const sections = document.querySelectorAll('main section[id]'); // Seleciona todas as secções com ID

    function highlightNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Ajuste o offset para quando a secção começa a ser visível na viewport
            // Ex: quando 30% da secção está visível
            const scrollOffset = window.innerHeight * 0.3; 
            if (window.scrollY >= sectionTop - scrollOffset) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.target === current) {
                link.classList.add('active');
            }
        });
    }

    // Adiciona event listeners para scroll e carregamento inicial
    window.addEventListener('scroll', highlightNavLink);
    window.addEventListener('load', highlightNavLink); // Para definir o ativo ao carregar a página
    
    // Garantir que ao clicar num link da navbar, o scroll é suave e o estado ativo é atualizado
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Previne o comportamento padrão se for um link de âncora interno
            if (this.hash !== '') {
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
            // Timeout para dar tempo ao scroll antes de recalcular o ativo
            // Ajustei o setTimeout para 0 ou um valor pequeno (ex: 50ms)
            // se o scroll suave for gerido pelo browser via scroll-behavior: smooth.
            // Se o scroll não for instantâneo (como com smooth), pode precisar de um pequeno delay.
            // No entanto, a detecção de scroll do Intersection Observer é mais robusta para isto.
            // Para este caso, um pequeno timeout deve bastar.
            setTimeout(highlightNavLink, 50); 
        });
    });
});