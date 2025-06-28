// js/contacto.js

document.addEventListener('DOMContentLoaded', function() {
    // --- Inicialização do AOS - Animate On Scroll ---
    // É crucial que a biblioteca AOS (unpkg.com/aos@2.3.1/dist/aos.js)
    // esteja incluída no HTML da contacto.html ANTES deste script.
    AOS.init({
        once: true, // As animações só ocorrem uma vez ao rolar para baixo
        duration: 800, // Duração da animação em ms
        easing: 'ease-out-quad' // Curva de aceleração para a animação
    });


    // --- Lógica do formulário de contacto ---
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            // Limpa mensagens anteriores e mostra "A enviar..."
            formMessage.classList.remove('success', 'error', 'hidden');
            formMessage.textContent = 'A enviar mensagem...';
            formMessage.style.display = 'block'; // Garante que a mensagem é visível

            // Simula um envio assíncrono (como se estivesse a ir para um servidor)
            setTimeout(() => {
                // Simula sucesso ou falha aleatoriamente (para testes)
                const isSuccess = Math.random() > 0.3; // 70% de chance de sucesso

                if (isSuccess) {
                    formMessage.textContent = 'A sua mensagem foi enviada com sucesso! Responderemos em breve.';
                    formMessage.classList.add('success');
                    contactForm.reset(); // Limpa o formulário em caso de sucesso
                } else {
                    formMessage.textContent = 'Ocorreu um erro ao enviar a sua mensagem. Por favor, tente novamente mais tarde.';
                    formMessage.classList.add('error');
                }

                // Esconde a mensagem após 5 segundos
                setTimeout(() => {
                    formMessage.classList.add('hidden');
                }, 5000);
            }, 1500); // Simula 1.5 segundos de "processamento"
        });
    }

    // --- Lógica das FAQs expansíveis ---
    const faqToggles = document.querySelectorAll('.faq-toggle'); // Seleciona todos os botões de toggle

    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item'); // Encontra a "caixa" FAQ pai
            const answerContent = faqItem.querySelector('.faq-answer-content'); // Encontra o conteúdo da resposta
            const icon = this.querySelector('i'); // Encontra o ícone dentro do botão

            // Verifica o estado atual de expansão
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                // Se está expandido, vamos colapsar
                answerContent.style.maxHeight = '0'; // Define max-height para 0 para animar
                answerContent.style.opacity = '0';   // Torna transparente
                answerContent.style.paddingTop = '0'; // Remove o padding superior
                answerContent.classList.remove('active'); // Remove a classe 'active'
                icon.classList.remove('bi-dash-lg'); // Troca o ícone de '-' para '+'
                icon.classList.add('bi-plus-lg');
                this.setAttribute('aria-expanded', 'false'); // Atualiza atributo de acessibilidade
            } else {
                // Se está colapsado, vamos expandir

                // Opcional: Colapsar outros FAQs abertos
                // Isso garante que apenas um FAQ esteja aberto por vez.
                document.querySelectorAll('.faq-toggle[aria-expanded="true"]').forEach(otherToggle => {
                    if (otherToggle !== this) { // Não colapsa o FAQ que acabou de ser clicado
                        const otherFaqItem = otherToggle.closest('.faq-item');
                        const otherAnswerContent = otherFaqItem.querySelector('.faq-answer-content');
                        const otherIcon = otherToggle.querySelector('i');

                        otherAnswerContent.style.maxHeight = '0';
                        otherAnswerContent.style.opacity = '0';
                        otherAnswerContent.style.paddingTop = '0';
                        otherAnswerContent.classList.remove('active');
                        otherIcon.classList.remove('bi-dash-lg');
                        otherIcon.classList.add('bi-plus-lg');
                        otherToggle.setAttribute('aria-expanded', 'false');
                    }
                });

                // Agora, expandir o FAQ clicado
                answerContent.classList.add('active'); // Adiciona a classe 'active'
                // Define max-height para o scrollHeight (altura real do conteúdo)
                // Isso permite que a transição de max-height funcione suavemente.
                answerContent.style.maxHeight = answerContent.scrollHeight + 'px';
                answerContent.style.opacity = '1'; // Torna visível
                answerContent.style.paddingTop = 'var(--spacing-m)'; // Adiciona o padding superior
                icon.classList.remove('bi-plus-lg'); // Troca o ícone de '+' para '-'
                icon.classList.add('bi-dash-lg');
                this.setAttribute('aria-expanded', 'true'); // Atualiza atributo de acessibilidade
            }
        });
    });
});