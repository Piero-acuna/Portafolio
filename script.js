document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Lógica para deslizar Certificados ---
    const btnCertificados = document.getElementById('btn-certificados');
    const contenedorCertificados = document.getElementById('contenedor-certificados');
    const flechaCert = document.getElementById('flecha-cert');

    if(btnCertificados && contenedorCertificados) {
        btnCertificados.addEventListener('click', () => {
            if (!contenedorCertificados.style.maxHeight || contenedorCertificados.style.maxHeight === '0px') {
                contenedorCertificados.style.maxHeight = contenedorCertificados.scrollHeight + "px";
                btnCertificados.innerHTML = 'Ocultar Certificados <span id="flecha-cert">🔼</span>';
            } else {
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

    // --- 3. Animación y ENVÍO REAL DEL FORMULARIO ---
    const form = document.querySelector('form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página se recargue
            
            const btn = form.querySelector('button[type="submit"]');
            const originalContent = btn.innerHTML;
            
            // Capturamos los datos de los inputs usando sus IDs
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const mensaje = document.getElementById('mensaje').value;

            // Animación de carga
            btn.innerHTML = 'Procesando... ⏳';
            btn.style.opacity = '0.8';
            btn.style.transform = 'scale(0.98)';
            btn.disabled = true;

            // Hacemos la petición a FormSubmit
            fetch("https://formsubmit.co/ajax/llontopalessandro@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    Nombre: nombre,
                    Email: email,
                    Mensaje: mensaje
                })
            })
            .then(response => response.json())
            .then(data => {
                // Si se envía correctamente
                btn.innerHTML = '¡Enviado con Éxito! ✅';
                btn.style.background = '#10b981'; // Verde
                btn.style.color = '#fff';
                
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.style.background = '#00f2fe'; // Vuelve al color original
                    btn.style.color = '#000';
                    btn.style.transform = 'scale(1)';
                    btn.disabled = false;
                    form.reset(); // Limpia los campos
                }, 3000);
            })
            .catch(error => {
                // Si hay un error
                console.log(error);
                btn.innerHTML = 'Error al enviar ❌';
                btn.style.background = '#ef4444'; // Rojo
                btn.style.color = '#fff';
                
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.style.background = '#00f2fe';
                    btn.style.color = '#000';
                    btn.style.transform = 'scale(1)';
                    btn.disabled = false;
                }, 3000);
            });
        });
    }
});
