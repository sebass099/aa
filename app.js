// Referencias a elementos del DOM
const loginContainer = document.getElementById('login-container');
const registerContainer = document.getElementById('register-container');
const appContainer = document.getElementById('app-container');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const notificacionesBtn = document.getElementById("notificaciones-btn");
const calendarioBtn = document.getElementById("calendario-btn");
const configBtn = document.getElementById("config-btn");
const notificacionesDiv = document.getElementById("notificaciones");
const calendarioDiv = document.getElementById("calendario");
const configuracionDiv = document.getElementById("configuracion");
const registerLink = document.getElementById('register-link');
const loginLink = document.getElementById('login-link');

// Navegación entre vistas
registerLink.addEventListener('click', () => {
  loginContainer.style.display = 'none';
  registerContainer.style.display = 'block';
});

loginLink.addEventListener('click', () => {
  registerContainer.style.display = 'none';
  loginContainer.style.display = 'block';
});

// Manejo de registro
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const role = document.getElementById('register-role').value;

  if (!role) {
    alert('Por favor, selecciona un rol.');
    return;
  }

  // Guardar usuario en Local Storage
  let users = JSON.parse(localStorage.getItem('users')) || [];
  const userExists = users.some((user) => user.email === email);

  if (userExists) {
    alert('Este correo ya está registrado.');
  } else {
    users.push({ email, password, role });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    registerContainer.style.display = 'none';
    loginContainer.style.display = 'block';
  }

  registerForm.reset();
});

// Manejo de inicio de sesión
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Verificar credenciales
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find((user) => user.email === email && user.password === password);

  if (user) {
    alert(`Inicio de sesión exitoso. Bienvenido, ${user.role === 'profesor' ? 'Profesor' : 'Estudiante'}.`);
    loginContainer.style.display = 'none';
    appContainer.style.display = 'block';

    // Mostrar interfaz según el rol
    if (user.role === 'profesor') {
      mostrarInterfazProfesor();
    } else {
      mostrarInterfazEstudiante();
    }
  } else {
    alert('Correo o contraseña incorrectos.');
  }

  loginForm.reset();
});

// Función para mostrar interfaz de profesores
function mostrarInterfazProfesor() {
  document.getElementById('notificaciones-btn').style.display = 'block';  // Botón visible para profesores
  document.getElementById('calendario-btn').style.display = 'block';
  document.getElementById('config-btn').style.display = 'block';

  document.getElementById('notificaciones').style.display = 'none';
  document.getElementById('calendario').style.display = 'none';
  document.getElementById('configuracion').style.display = 'none';

  // Mostrar formulario de falta para el profesor
  document.getElementById('form-falta').style.display = 'block';

  // Añadir el evento para enviar una notificación de falta
  const faltaForm = document.getElementById('falta-form');
  faltaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fechaFalta = document.getElementById('fecha-falta').value;
    const motivoFalta = document.getElementById('motivo-falta').value;

    // Crear una notificación
    const nuevaNotificacion = {
      fecha: fechaFalta,
      motivo: motivoFalta
    };

    // Guardar notificación en el localStorage
    let notificaciones = JSON.parse(localStorage.getItem('notificaciones')) || [];
    notificaciones.push(nuevaNotificacion);
    localStorage.setItem('notificaciones', JSON.stringify(notificaciones));

    alert('Notificación enviada exitosamente.');

    // Limpiar el formulario
    document.getElementById('fecha-falta').value = '';
    document.getElementById('motivo-falta').value = '';
  });
}

// Función para mostrar interfaz de estudiantes
function mostrarInterfazEstudiante() {
  document.getElementById('notificaciones-btn').style.display = 'none';
  document.getElementById('calendario-btn').style.display = 'block';
  document.getElementById('config-btn').style.display = 'none';

  document.getElementById('notificaciones').style.display = 'none';
  document.getElementById('calendario').style.display = 'block';
  document.getElementById('configuracion').style.display = 'none';

  // Mostrar las notificaciones de los estudiantes
  mostrarNotificacionesEstudiantes();
}

// Función para mostrar las notificaciones de los estudiantes
function mostrarNotificacionesEstudiantes() {
  const listaNotificaciones = document.getElementById('lista-notificaciones');
  listaNotificaciones.innerHTML = '';

  // Obtener las notificaciones desde localStorage
  const notificaciones = JSON.parse(localStorage.getItem('notificaciones')) || [];

  if (notificaciones.length === 0) {
    listaNotificaciones.innerHTML = '<li>No hay notificaciones aún.</li>';
  }

  notificaciones.forEach((notificacion) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${notificacion.fecha}</strong>: ${notificacion.motivo}`;
    listaNotificaciones.appendChild(li);
  });

  document.getElementById('notificaciones-estudiantes').style.display = 'block';
}

// Manejo del botón de notificaciones para el profesor
notificacionesBtn.addEventListener('click', () => {
  document.getElementById('notificaciones').style.display = 'block';
  document.getElementById('form-falta').style.display = 'none';
});

// Manejo del botón de calendario
calendarioBtn.addEventListener('click', () => {
  document.getElementById('notificaciones').style.display = 'none';
  document.getElementById('calendario').style.display = 'block';
  document.getElementById('configuracion').style.display = 'none';
});

// Manejo del botón de configuración
configBtn.addEventListener('click', () => {
  document.getElementById('notificaciones').style.display = 'none';
  document.getElementById('calendario').style.display = 'none';
  document.getElementById('configuracion').style.display = 'block';
});

