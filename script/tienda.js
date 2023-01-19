let productos = [];
const contenedorProductos = document.querySelector("#contenedor-productos");
const productosListado = "https://nicodelafuente.github.io/entrega-final-javascript/json/productos.json";
const botonesMenu = document.querySelectorAll(".boton-menu");
let numeroCarrito = document.querySelector("#numero-carrito");


fetch(productosListado)
    .then(response => response.json())
    .then(data => {
        productos = data;
        mostrarProductos(productos)
    })
    .catch(error => console.log(error));

console.log(productos)

function mostrarProductos (productosElegidos) {

    contenedorProductos.innerHTML = "";


    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("carta");
        div.innerHTML = `
                    <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="producto-abajo">
                    <p class="producto-titulo">${producto.titulo}</p>
                    <small class="producto-precio">${producto.precio}$</small>
                    <button class="producto-boton" id="${producto.id}">Agregar</button>
                     </div>
                `;
        contenedorProductos.append(div);
    })

    botonAgregarCarrito();

}




botonesMenu.forEach(boton =>{
    boton.addEventListener("click", (e) => {

        botonesMenu.forEach(boton => {
            boton.classList.remove("active");
        })
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productosCategorias = productos.find(producto => producto.categoria === e.currentTarget.id);
            titulo.innerText = productosCategorias.categoria.toUpperCase();

            const productosFiltrados = productos.filter(producto => producto.categoria === e.currentTarget.id);
            mostrarProductos(productosFiltrados);

        } else {
            titulo.innerHTML = "Todos los productos".toUpperCase();
            mostrarProductos(productos);
        }
    
    })

    
})

let arrayProductosEnCarrito
const arrayProductosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (arrayProductosEnCarritoLS) {
    arrayProductosEnCarrito = JSON.parse(arrayProductosEnCarritoLS);
    actualizarNumeroCarrito();
} else {
    arrayProductosEnCarrito = [];
}

function botonAgregarCarrito (){
    botonAgregar = document.querySelectorAll(".producto-boton");
    botonAgregar.forEach(boton => {
        boton.addEventListener("click", productoAgregarCarrito);
    })
};

function productoAgregarCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (arrayProductosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = arrayProductosEnCarrito.findIndex(producto => producto.id === idBoton);
        arrayProductosEnCarrito[index].cantidad++;
    } else { arrayProductosEnCarrito.push(productoAgregado)}

    //libreria
    Toastify({
        text: "Producto agregado",
        duration: 3000,
        destination: "./carrito.html",
        close: true,
        gravity: "bottom",
        style: {
            background: "#060e41",
        },
    }).showToast();

    actualizarNumeroCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(arrayProductosEnCarrito));
}

function actualizarNumeroCarrito () {
    let numerito = arrayProductosEnCarrito.reduce((acc, producto) =>  acc + producto.cantidad, 0)
    numeroCarrito.innerText = numerito;
}
