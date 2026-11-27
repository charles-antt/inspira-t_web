document.addEventListener('DOMContentLoaded', () => {
    // 1. USUARIOS DE PRUEBA CONFIGURADOS
    const USUARIOS = [
        {
            correo: 'aprendiente@inspirat.com',
            password: '123456',
            rol: 'aprendiente',
            nombre: 'María Aprendiente',
            destino: 'inicio_aprendiente.html'
        },
        {
            correo: 'instructor@inspirat.com',
            password: '123456',
            rol: 'instructor',
            nombre: 'Antonio Gómez',
            destino: 'inicio_instructor.html'
        }
    ];

    // Referencias del DOM
    const form = document.getElementById('login-form');
    const correoInput = document.getElementById('correo');
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.getElementById('toggle-password');
    const eyeIcon = document.getElementById('eye-icon');

    const correoWrapper = document.getElementById('correo-wrapper');
    const passwordWrapper = document.getElementById('password-wrapper');
    const correoError = document.getElementById('correo-error');
    const passwordError = document.getElementById('password-error');
    const loginAlert = document.getElementById('login-alert');

    // 2. MOSTRAR / OCULTAR CONTRASEÑA (OJITO)
    const svgOjoAbierto = `
        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      `;
    const svgOjoCerrado = `
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line x1="2" y1="2" x2="22" y2="22" />
      `;

    toggleBtn.addEventListener('click', () => {
        const esVisible = passwordInput.type === 'text';
        passwordInput.type = esVisible ? 'password' : 'text';
        eyeIcon.innerHTML = esVisible ? svgOjoAbierto : svgOjoCerrado;
        toggleBtn.setAttribute('aria-label', esVisible ? 'Mostrar contraseña' : 'Ocultar contraseña');
    });

    // 3. FUNCIONES DE VALIDACIÓN
    function mostrarError(wrapper, errorElement, mensaje) {
        wrapper.classList.add('input--error');
        errorElement.textContent = mensaje;
        errorElement.classList.add('visible');
    }

    function limpiarError(wrapper, errorElement) {
        wrapper.classList.remove('input--error');
        errorElement.textContent = '';
        errorElement.classList.remove('visible');
    }

    function validarCorreo() {
        const valor = correoInput.value.trim();
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!valor) {
            mostrarError(correoWrapper, correoError, 'Por favor, ingresa tu correo electrónico.');
            return false;
        }
        if (!regexEmail.test(valor)) {
            mostrarError(correoWrapper, correoError, 'Ingresa un formato de correo válido (ejemplo@dominio.com).');
            return false;
        }
        limpiarError(correoWrapper, correoError);
        return true;
    }

    function validarPassword() {
        const valor = passwordInput.value;

        if (!valor) {
            mostrarError(passwordWrapper, passwordError, 'Por favor, ingresa tu contraseña.');
            return false;
        }
        if (valor.length < 6) {
            mostrarError(passwordWrapper, passwordError, 'La contraseña debe tener al menos 6 caracteres.');
            return false;
        }
        limpiarError(passwordWrapper, passwordError);
        return true;
    }

    // Validar mientras el usuario escribe para limpiar errores rápidamente
    correoInput.addEventListener('input', () => {
        loginAlert.classList.remove('visible');
        if (correoWrapper.classList.contains('input--error')) validarCorreo();
    });

    passwordInput.addEventListener('input', () => {
        loginAlert.classList.remove('visible');
        if (passwordWrapper.classList.contains('input--error')) validarPassword();
    });

    // 4. ENVÍO DEL FORMULARIO Y AUTENTICACIÓN
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        loginAlert.classList.remove('visible');

        const correoValido = validarCorreo();
        const passwordValido = validarPassword();

        if (!correoValido || !passwordValido) {
            return;
        }

        const correoIngresado = correoInput.value.trim().toLowerCase();
        const passwordIngresado = passwordInput.value;

        // Buscar coincidencia en los usuarios creados
        const usuarioEncontrado = USUARIOS.find(
            u => u.correo.toLowerCase() === correoIngresado && u.password === passwordIngresado
        );

        if (usuarioEncontrado) {
            // Guardar sesión simulada por si tus páginas de inicio leen el rol o nombre
            localStorage.setItem('inspirat_usuario', JSON.stringify({
                correo: usuarioEncontrado.correo,
                rol: usuarioEncontrado.rol,
                nombre: usuarioEncontrado.nombre
            }));

            // Redirigir a la vista correspondiente
            window.location.href = usuarioEncontrado.destino;
        } else {
            loginAlert.textContent = 'Correo electrónico o contraseña incorrectos.';
            loginAlert.classList.add('visible');
            passwordInput.value = '';
            passwordInput.focus();
        }
    });
});

//REGISTRO

document.addEventListener('DOMContentLoaded', () => {
    // 1. MOSTRAR / OCULTAR CONTRASEÑA (CON CAMBIO DE ÍCONO SVG)
    const svgOjoAbierto = `
        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/>
        <circle cx="12" cy="12" r="3"/>
      `;
    const svgOjoCerrado = `
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line x1="2" y1="2" x2="22" y2="22" />
      `;

    document.querySelectorAll('[data-toggle]').forEach(btn => {
        btn.addEventListener('click', () => {
            const campo = document.getElementById(btn.dataset.toggle);
            const svg = btn.querySelector('svg');
            const visible = campo.type === 'text';

            campo.type = visible ? 'password' : 'text';
            svg.innerHTML = visible ? svgOjoAbierto : svgOjoCerrado;
            btn.setAttribute('aria-label', visible ? 'Mostrar contraseña' : 'Ocultar contraseña');
        });
    });

    // 2. REFERENCIAS DEL FORMULARIO
    const form = document.getElementById('register-form');
    const regAlert = document.getElementById('reg-alert');
    const btnSubmit = document.getElementById('btn-submit');

    const campos = {
        nombre: {
            input: document.getElementById('nombre'),
            wrapper: document.getElementById('nombre-wrapper'),
            error: document.getElementById('nombre-error')
        },
        correo: {
            input: document.getElementById('correo'),
            wrapper: document.getElementById('correo-wrapper'),
            error: document.getElementById('correo-error')
        },
        usuario: {
            input: document.getElementById('usuario'),
            wrapper: document.getElementById('usuario-wrapper'),
            error: document.getElementById('usuario-error')
        },
        password: {
            input: document.getElementById('password'),
            wrapper: document.getElementById('password-wrapper'),
            error: document.getElementById('password-error')
        },
        password2: {
            input: document.getElementById('password2'),
            wrapper: document.getElementById('password2-wrapper'),
            error: document.getElementById('password2-error')
        }
    };

    // 3. FUNCIONES AUXILIARES DE ERROR
    function mostrarError(campoObj, mensaje) {
        campoObj.wrapper.classList.add('input--error');
        campoObj.error.textContent = mensaje;
        campoObj.error.classList.add('visible');
    }

    function limpiarError(campoObj) {
        campoObj.wrapper.classList.remove('input--error');
        campoObj.error.textContent = '';
        campoObj.error.classList.remove('visible');
    }

    // 4. VALIDACIONES INDIVIDUALES
    function validarNombre() {
        const valor = campos.nombre.input.value.trim();
        const regexNombre = /^[a-zA-ZÁÉÍÓÚáéíóúÑñÜü\s]+$/;

        if (!valor) {
            mostrarError(campos.nombre, 'Ingresa tu nombre completo.');
            return false;
        }
        if (valor.length < 3) {
            mostrarError(campos.nombre, 'El nombre debe tener al menos 3 caracteres.');
            return false;
        }
        if (!regexNombre.test(valor)) {
            mostrarError(campos.nombre, 'El nombre solo debe contener letras y espacios.');
            return false;
        }
        limpiarError(campos.nombre);
        return true;
    }

    function validarCorreo() {
        const valor = campos.correo.input.value.trim().toLowerCase();
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!valor) {
            mostrarError(campos.correo, 'Ingresa tu correo electrónico.');
            return false;
        }
        if (!regexEmail.test(valor)) {
            mostrarError(campos.correo, 'Ingresa un correo válido (ejemplo@dominio.com).');
            return false;
        }

        // Verificar si ya existe en usuarios base o registrados
        const correosBase = ['aprendiente@inspirat.com', 'instructor@inspirat.com'];
        const registrados = JSON.parse(localStorage.getItem('inspirat_usuarios_registrados') || '[]');
        const yaExiste = correosBase.includes(valor) || registrados.some(u => u.correo.toLowerCase() === valor);

        if (yaExiste) {
            mostrarError(campos.correo, 'Este correo electrónico ya está registrado.');
            return false;
        }

        limpiarError(campos.correo);
        return true;
    }

    function validarUsuario() {
        const valor = campos.usuario.input.value.trim();
        const regexUser = /^[a-zA-Z0-9._-]+$/;

        if (!valor) {
            mostrarError(campos.usuario, 'Ingresa un nombre de usuario.');
            return false;
        }
        if (valor.length < 3) {
            mostrarError(campos.usuario, 'Debe tener al menos 3 caracteres.');
            return false;
        }
        if (!regexUser.test(valor)) {
            mostrarError(campos.usuario, 'Solo se permiten letras, números, puntos y guiones (sin espacios).');
            return false;
        }
        limpiarError(campos.usuario);
        return true;
    }

    function validarPassword() {
        const valor = campos.password.input.value;

        if (!valor) {
            mostrarError(campos.password, 'Ingresa una contraseña.');
            return false;
        }
        if (valor.length < 6) {
            mostrarError(campos.password, 'La contraseña debe tener al menos 6 caracteres.');
            return false;
        }
        limpiarError(campos.password);
        return true;
    }

    function validarPassword2() {
        const pass1 = campos.password.input.value;
        const pass2 = campos.password2.input.value;

        if (!pass2) {
            mostrarError(campos.password2, 'Confirma tu contraseña.');
            return false;
        }
        if (pass1 !== pass2) {
            mostrarError(campos.password2, 'Las contraseñas no coinciden.');
            return false;
        }
        limpiarError(campos.password2);
        return true;
    }

    // Validación en tiempo real cuando ya se mostró un error
    campos.nombre.input.addEventListener('input', () => {
        if (campos.nombre.wrapper.classList.contains('input--error')) validarNombre();
    });
    campos.correo.input.addEventListener('input', () => {
        if (campos.correo.wrapper.classList.contains('input--error')) validarCorreo();
    });
    campos.usuario.input.addEventListener('input', () => {
        if (campos.usuario.wrapper.classList.contains('input--error')) validarUsuario();
    });
    campos.password.input.addEventListener('input', () => {
        if (campos.password.wrapper.classList.contains('input--error')) validarPassword();
        if (campos.password2.input.value) validarPassword2();
    });
    campos.password2.input.addEventListener('input', () => {
        if (campos.password2.wrapper.classList.contains('input--error')) validarPassword2();
    });

    // 5. ENVÍO DEL FORMULARIO Y SIMULACIÓN DE REGISTRO
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        regAlert.className = 'reg-alert';

        const esNombreValido = validarNombre();
        const esCorreoValido = validarCorreo();
        const esUsuarioValido = validarUsuario();
        const esPassValida = validarPassword();
        const esPass2Valida = validarPassword2();

        if (!esNombreValido || !esCorreoValido || !esUsuarioValido || !esPassValida || !esPass2Valida) {
            return;
        }

        // Obtener el rol seleccionado ("aprendiente" o "instructor")
        const rolSeleccionado = document.querySelector('input[name="tipo"]:checked').value;
        const paginaDestino = rolSeleccionado === 'instructor'
            ? 'inicio_instructor.html'
            : 'inicio_aprendiente.html';

        const nuevoUsuario = {
            nombre: campos.nombre.input.value.trim(),
            correo: campos.correo.input.value.trim().toLowerCase(),
            usuario: campos.usuario.input.value.trim(),
            password: campos.password.input.value,
            rol: rolSeleccionado,
            destino: paginaDestino
        };

        // Guardar en la lista de usuarios registrados (para poder usarlo en login)
        const registrados = JSON.parse(localStorage.getItem('inspirat_usuarios_registrados') || '[]');
        registrados.push(nuevoUsuario);
        localStorage.setItem('inspirat_usuarios_registrados', JSON.stringify(registrados));

        // Guardar la sesión actual
        localStorage.setItem('inspirat_usuario', JSON.stringify({
            nombre: nuevoUsuario.nombre,
            correo: nuevoUsuario.correo,
            usuario: nuevoUsuario.usuario,
            rol: nuevoUsuario.rol
        }));

        // Feedback visual y redirección
        btnSubmit.disabled = true;
        regAlert.textContent = `¡Cuenta de ${rolSeleccionado} creada con éxito! Redirigiendo...`;
        regAlert.classList.add('reg-alert--success', 'visible');

        setTimeout(() => {
            window.location.href = paginaDestino;
        }, 1200);
    });
});