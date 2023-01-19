/*class Producto {
    constructor(id, titulo, precio, imagen, categoria, cantidad) {
        this.id = id,
        this.titulo = titulo, 
        this.precio = precio, 
        this.imagen = imagen, 
        this.categoria = categoria
        this.cantidad = cantidad 
    }
}


//productos iluminacion
const iluminacion01 = new Producto ("iluminacion-01", "Bola disco led", 2350, "./assets/iluminacion/iluminacion-01.jpg", "iluminacion", 1); 
const iluminacion02 = new  Producto("iluminacion-02", "Faroles exteriores dobles", 13100, "./assets/iluminacion/iluminacion-02.png", "iluminacion", 1);
const iluminacion03 = new Producto("iluminacion-03", "Colgante de luces", 1300, "./assets/iluminacion/iluminacion-03.jpg", "iluminacion", 1);
const iluminacion04 = new Producto ("iluminacion-04", "Luz led de emergencia", 3200, "./assets/iluminacion/iluminacion-04.jpg", "iluminacion", 1);
const iluminacion05 = new Producto ("iluminacion-05", "Iluminaria fija exterior led", 3200, "./assets/iluminacion/iluminacion-05.jpg", "iluminacion", 1);
const iluminacion06 = new Producto("iluminacion-06", "Lámpara led dicroica", 2000, "./assets/iluminacion/iluminacion-06.jpg", "iluminacion", 1);
const iluminacion07= new Producto("iluminacion-07", "Lámpara led color", 1850, "./assets/iluminacion/iluminacion-07.jpg", "iluminacion", 1);

//productos materiales electricos 

const materialElectrico01 = new Producto("mat-electrico-01", "Alargue con USB", 3100, "./assets/materiales-electricos/01.png", "materiales-electricos", 1);
const materialElectrico02 = new Producto("mat-electrico-02", "Alargue con cuatro enchufes", 2500, "./assets/materiales-electricos/02.png", "materiales-electricos", 1);
const materialElectrico03 = new Producto("mat-electrico-03", "Alargue con seis enchufes", 2900, "./assets/materiales-electricos/03.png", "materiales-electricos", 1);
const materialElectrico04 = new Producto("mat-electrico-04", "Caja para interruptores con tapa", 1900, "./assets/materiales-electricos/04.png", "materiales-electricos", 1);
const materialElectrico05 = new Producto("mat-electrico-05", "Caja para interruptores sin tapa", 1500, "./assets/materiales-electricos/05.png", "materiales-electricos", 1);
const materialElectrico06 = new Producto("mat-electrico-06", "Tapa sies módulos oro", 1400, "./assets/materiales-electricos/06.png", "materiales-electricos", 1);

// productos equipamientos

const equipamiento01 = new Producto("equipamiento-01", "Cúter retráctil", 4000, "./assets/equipamiento/01.jpg", "equipamiento", 1);
const equipamiento02 = new Producto("equipamiento-02", "Destornillador buscapolos", 8000, "./assets/equipamiento/02.jpg", "equipamiento", 1);
const equipamiento03 = new Producto("equipamiento-03", "Destornillador Phillips", 10000, "./assets/equipamiento/03.jpg", "equipamiento", 1); 
const equipamiento04 = new Producto("equipamiento-04", "Destornillador plano", 10000, "./assets/equipamiento/04.jpg", "equipamiento", 1); 
const equipamiento05 = new Producto("equipamiento-05", "Pasacables profesional", 6500, "./assets/equipamiento/05.jpg", "equipamiento", 1);


// array de productos
const productos = [];


// tengo que crear el resto de los productos. 
productos.push(iluminacion01);
productos.push(iluminacion02);
productos.push(iluminacion03);
productos.push(iluminacion04);
productos.push(iluminacion05);
productos.push(iluminacion06);
productos.push(iluminacion07);
productos.push(materialElectrico01);
productos.push(materialElectrico02);
productos.push(materialElectrico03);
productos.push(materialElectrico04);
productos.push(materialElectrico05);
productos.push(materialElectrico06);
productos.push(equipamiento01);
productos.push(equipamiento02);
productos.push(equipamiento03);
productos.push(equipamiento04);
productos.push(equipamiento05);

*/



let productos = [];
const contenedorProductos = document.querySelector("#contenedor-productos");
const productosListado = "/json/productos.json"
const botonesMenu = document.querySelectorAll(".boton-menu");
let numeroCarrito = document.querySelector("#numero-carrito");

productos = fetch(productosListado)
    .then(response => response.json())
    .then(data => {
        productos = data;
        mostrarProductos(data)
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
