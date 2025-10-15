document.addEventListener("DOMContentLoaded", añadirCarrito);

function añadirCarrito() {
    const botones = document.querySelectorAll(".agregar-carrito");

    botones.forEach((element) =>{
        element.addEventListener("click", (e) =>{
             e.preventDefault();
              console.log(e.target);
    });

    })
    
    console.log(botones);
}

