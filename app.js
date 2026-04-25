/* ===========================
   ON VACATION – APP.JS (Multi-page version)
   Navigation & Interactions
   =========================== */

// ===== PAGE MAP =====
const PAGE_MAP = {
  p01: 'index.html',
  p02: 'servicios.html',
  p03: 'destinos.html',
  p04: 'tarifas.html',
  p05: 'login.html',
  p06: 'registro.html',
  p07: 'blog.html',
  p08: 'resultados.html',
  p09: 'detalle.html',
  p10: 'checkout-datos.html',
  p11: 'checkout-seleccion.html',
  p12: 'checkout-resumen.html',
  p13: 'checkout-pago.html',
  p14: 'confirmacion.html',
  p15: 'mis-reservas.html',
  p16: 'contacto.html',
  p17: 'recuperar-password.html',
  p18: 'detalle-reserva.html',
  p19: 'confirmar-cancelacion.html',
  p20: 'cancelacion-exitosa.html',
  p21: 'mensaje-enviado.html',
  p22: 'paquetes.html',
};

function showPage(id) {
  const file = PAGE_MAP[id];
  if (file) {
    window.location.href = file;
  }
}

// ===== TABS =====
function switchTab(tabId, btn) {
  const tabsContainer = btn.closest('.tabs');
  tabsContainer.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  const target = document.getElementById(tabId);
  if (target) target.classList.add('active');
}

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) {
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
});

// ===== MOBILE MENU =====
let menuOpen = false;
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  const navActions = document.querySelector('.nav-actions');
  menuOpen = !menuOpen;
  if (menuOpen) {
    navLinks.style.cssText = 'display:flex;flex-direction:column;position:fixed;top:72px;left:0;right:0;background:rgba(250,250,248,0.97);backdrop-filter:blur(12px);padding:1.5rem 2rem;gap:.5rem;z-index:999;border-bottom:1px solid #e8e4dc;';
    navActions.style.cssText = 'display:flex;position:fixed;top:auto;bottom:0;left:0;right:0;padding:1rem 2rem;background:#fafaf8;border-top:1px solid #e8e4dc;z-index:999;';
  } else {
    navLinks.style.cssText = '';
    navActions.style.cssText = '';
  }
}

// ===== AUTH FLOWS =====
function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-pass').value.trim();
  const err = document.getElementById('login-error');
  if (!email || !pass) {
    err.style.display = 'block';
    err.textContent = 'Por favor, completa todos los campos.';
    return;
  }
  err.style.display = 'none';
  showPage('p15');
}

function doRegister() {
  const nombre = document.getElementById('reg-nombre').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const pass = document.getElementById('reg-pass').value.trim();
  const pass2 = document.getElementById('reg-pass2').value.trim();
  const terms = document.getElementById('reg-terms').checked;
  const err = document.getElementById('reg-error');

  if (!nombre || !email || !pass || !pass2) {
    err.style.display = 'block';
    err.textContent = 'Por favor, completa todos los campos obligatorios.';
    return;
  }
  if (pass !== pass2) {
    err.style.display = 'block';
    err.textContent = 'Las contraseñas no coinciden.';
    return;
  }
  if (!terms) {
    err.style.display = 'block';
    err.textContent = 'Debes aceptar los términos y condiciones.';
    return;
  }
  err.style.display = 'none';
  showPage('p05');
}

function doLogout() {
  showPage('p01');
}

function doRecovery() {
  const email = document.getElementById('rec-email').value.trim();
  const err = document.getElementById('rec-error');
  const ok = document.getElementById('rec-ok');
  if (!email || !email.includes('@')) {
    err.style.display = 'block';
    ok.style.display = 'none';
    return;
  }
  err.style.display = 'none';
  ok.style.display = 'block';
}

// ===== PAYMENT =====
function selectPayMethod(btn, method) {
  document.querySelectorAll('.pay-method').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.pay-form').forEach(f => f.style.display = 'none');
  const form = document.getElementById('pay-' + method);
  if (form) form.style.display = 'block';
}

function doPago() {
  const err = document.getElementById('pago-error');
  if (Math.random() > 0.1) {
    err.style.display = 'none';
    showPage('p14');
  } else {
    err.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ===== ROOM SELECTION =====
function selectRoom(el) {
  document.querySelectorAll('.room-option').forEach(r => {
    r.classList.remove('selected');
    r.querySelector('.room-check').textContent = '○';
  });
  el.classList.add('selected');
  el.querySelector('.room-check').textContent = '✓';
}

// ===== FAQ TOGGLE =====
function toggleFAQ(el) {
  el.classList.toggle('open');
}

// ===== RANGE INPUT =====
document.addEventListener('DOMContentLoaded', () => {
  const range = document.querySelector('.range-input');
  const label = document.querySelector('.range-label');
  if (range && label) {
    range.addEventListener('input', () => {
      const val = parseInt(range.value).toLocaleString('es-CO');
      label.textContent = `Hasta $${val}`;
    });
  }
});

// ===== DOWNLOAD COMPROBANTE =====
function downloadComprobante() {
  const text = `
ON VACATION – COMPROBANTE DE RESERVA
=====================================
N° de Reserva:  #OV-2025-00847
Servicio:       Grand Hotel Cartagena – Suite Premium
Check-in:       15 de Febrero de 2025
Check-out:      17 de Febrero de 2025
Huéspedes:      2 personas
Habitación:     Suite Premium – Piso 10

DESGLOSE DE PAGOS
-----------------
Suite Premium (2 noches):  $1.360.000
Traslado aeropuerto:         $45.000
Bienvenida romántica:        $80.000
-----------------
TOTAL PAGADO:              $1.485.000

Estado: CONFIRMADO ✓
Forma de pago: Tarjeta de crédito

---
Gracias por elegir On Vacation.
Para soporte: soporte@onvacation.co
`;
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'comprobante-OV-2025-00847.txt';
  a.click();
  URL.revokeObjectURL(url);
}

// ===== FONT SIZE =====
let fontSize = 16;
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === '+') increaseFontSize();
  if (e.ctrlKey && e.key === '-') decreaseFontSize();
});
function increaseFontSize() {
  fontSize = Math.min(fontSize + 2, 24);
  document.documentElement.style.fontSize = fontSize + 'px';
}
function decreaseFontSize() {
  fontSize = Math.max(fontSize - 2, 12);
  document.documentElement.style.fontSize = fontSize + 'px';
}
