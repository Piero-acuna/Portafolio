document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Lógica para deslizar Certificados ---
    const btnCertificados = document.getElementById('btn-certificados');
    const contenedorCertificados = document.getElementById('contenedor-certificados');
    const flechaCert = document.getElementById('flecha-cert');

    if(btnCertificados && contenedorCertificados) {
        btnCertificados.addEventListener('click', () => {
            // Verifica si está cerrado (max-height es 0 o no tiene valor)
            if (!contenedorCertificados.style.maxHeight || contenedorCertificados.style.maxHeight === '0px') {
                // Abre el contenedor (le da una altura gigante para que quepa todo fluidamente)
                contenedorCertificados.style.maxHeight = contenedorCertificados.scrollHeight + "px";
                btnCertificados.innerHTML = 'Ocultar Certificados <span id="flecha-cert">🔼</span>';
            } else {
                // Cierra el contenedor
                contenedorCertificados.style.maxHeight = '0px';
                btnCertificados.innerHTML = 'Mostrar Certificados <span id="flecha-cert">🔽</span>';
            }
        });
    }

    // --- 2. Scroll Reveal (Fade in al bajar) ---
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible-scroll');
                    entry.target.classList.remove('hidden-scroll');
                }, index * 100); 
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    scrollElements.forEach(el => {
        el.classList.add('hidden-scroll');
        observer.observe(el);
    });

    // --- 3. Animación Formulario ---
    const form = document.querySelector('form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalContent = btn.innerHTML;
            
            btn.innerHTML = 'Procesando... ⏳';
            btn.style.opacity = '0.8';
            btn.style.transform = 'scale(0.98)';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '¡Enviado con Éxito! ✅';
                btn.style.background = '#10b981'; 
                btn.style.color = '#fff';
                
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.style.background = '#00f2fe';
                    btn.style.color = '#000';
                    btn.style.transform = 'scale(1)';
                    btn.disabled = false;
                    form.reset();
                }, 3000);
            }, 1500);
        });
    }
});