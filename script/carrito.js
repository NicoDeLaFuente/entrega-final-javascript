let arrayProductosEnCarrito = localStorage.getItem("productos-en-carrito");
arrayProductosEnCarrito = JSON.parse(arrayProductosEnCarrito);


const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const carritoEstaVacio = document.querySelector("#carrito-vacio");
let botonBorrar = document.querySelectorAll(".boton-borrar");
const botonVaciar = document.querySelector("#vaciar-carrito");
let totalCompra = document.querySelector("#total");
const botonComprar = document.querySelector("#boton-comprar");



function cargarProductosCarrito (){
    
    if(arrayProductosEnCarrito && arrayProductosEnCarrito.length > 0) {
        carritoEstaVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");

        contenedorCarritoProductos.innerHTML= "";
        
    arrayProductosEnCarrito.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("carrito-producto");
        div.innerHTML = `
                        <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                        <div class="carrito-producto-titulo">
                            <small>Nombre</small>
                            <h2>${producto.titulo}</h2>
                        </div>
                        <div class="carrito-producto-cantidad">
                            <small>Cantidad</small>
                            <p>${producto.cantidad}</p>
                        </div>
                        <div class="carrito-producto-precio">
                            <small>Precio</small>
                            <p>$${producto.precio}</p>
                        </div>
                        <div class="carrito-producto-subtotal">
                            <small>Subtotal</small>
                            <p>$${producto.precio * producto.cantidad}</p>
                        </div>
                        <button id = ${producto.id} class="boton-borrar"><i class="bi bi-trash3-fill"></i></button>
        `;
        contenedorCarritoProductos.append(div);
        });
    } else {
        carritoEstaVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");

        contenedorCarritoProductos.innerHTML= "";
    }

    
    botonEliminar();
    precioCompraTotal();
}

cargarProductosCarrito();


function botonEliminar() {
    botonBorrar = document.querySelectorAll(".boton-borrar");
    botonBorrar.forEach(boton => {
        boton.addEventListener("click", borrarProducto)
    })

    
}

function borrarProducto (e) {
        const idBoton = e.currentTarget.id;
        console.log(idBoton)
        const productoBorrado = arrayProductosEnCarrito.findIndex(producto => producto.id === idBoton);
        arrayProductosEnCarrito.splice(productoBorrado, 1);

        cargarProductosCarrito();
        localStorage.setItem("productos-en-carrito", JSON.stringify(arrayProductosEnCarrito));
        
}

botonVaciar.addEventListener("click", (botonVaciarCarrito))

function botonVaciarCarrito () {
    arrayProductosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(arrayProductosEnCarrito));
    cargarProductosCarrito();   
}

function precioCompraTotal () {
    const totalComprado = arrayProductosEnCarrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    totalCompra.innerText = "$" + totalComprado;
}

if(arrayProductosEnCarrito.length > 0) {
    botonComprar.addEventListener("click", () => {
        swal({
            title: "¡Felicitaciones!",
            text: "Has comprado los productos elegidos. Puedes pasar a retirar por la tienda pagando con cualquiera de los medios habilitados",
            icon: "success",
            button: "Entendido",
        })
    })
}
        
        










