document.getElementById('login-btn').addEventListener('click', () => {
  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value.trim();
  loginUser(user, pass);
});
 
async function loginUser(username, password) {
  try {
    const response = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
 
    const data = await response.json();
 
    if (data.token) {
      alert('Inicio de sesión exitoso 🎮');
      localStorage.setItem('token', data.token);
      document.getElementById('login-container').style.display = 'none';
      document.getElementById('main-container').style.display = 'block';
      cargarProductos();
    } else {
      alert('Usuario o contraseña incorrectos ❌');
    }
  } catch (error) {
    alert('Error al conectar con la API 😥');
    console.error(error);
  }
}
 
document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('token');
  location.reload();
});

async function cargarProductos() {
  try {
    const respuesta = await fetch('https://fakestoreapi.com/products');
    const productos = await respuesta.json();
    renderizarProductos(productos);
  } catch (error) {
    console.error('Error cargando productos:', error);
  }
}
 
function renderizarProductos(productos) {
  const contenedor = document.getElementById('catalogo-productos');
  contenedor.innerHTML = '';
 
  productos.forEach(producto => {
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('producto');
 
    tarjeta.innerHTML = `
      <img src="${producto.image}" alt="${producto.title}">
      <h3>${producto.title}</h3>
      <p>$${producto.price.toFixed(2)}</p>
      <button class="btn-agregar">Añadir al carrito</button>
    `;
 
    tarjeta.querySelector('.btn-agregar').addEventListener('click', () => carrito.agregarItem(producto));
    contenedor.appendChild(tarjeta);
  });
}
 
const carrito = {
  items: [],
 
  agregarItem(producto) {
    const existente = this.items.find(i => i.id === producto.id);
    if (existente) existente.cantidad++;
    else this.items.push({ ...producto, cantidad: 1 });
    this.renderizar();
  },
 
  calcularTotal() {
    return this.items.reduce((t, i) => t + i.price * i.cantidad, 0);
  },
 
  renderizar() {
    const contenedor = document.getElementById('carrito-items');
    contenedor.innerHTML = '';
 
    if (this.items.length === 0) {
      contenedor.innerHTML = '<p>Carrito vacío 🛒</p>';
      document.getElementById('carrito-total').textContent = 'Total: $0.00';
      return;
    }
 
    this.items.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('item-carrito');
      div.innerHTML = `
        <span>${item.title}</span>
        <span>x${item.cantidad}</span>
        <span>$${(item.price * item.cantidad).toFixed(2)}</span>
      `;
      contenedor.appendChild(div);
    });
 
    document.getElementById('carrito-total').textContent = 
      `Total: $${this.calcularTotal().toFixed(2)}`;
  }
};
 
