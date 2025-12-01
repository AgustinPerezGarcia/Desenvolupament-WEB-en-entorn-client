//Acciones con la API de Json Server

//app.js
import { ponerClientes } from "./app.js";
import { mostrarError } from "./funciones.js";

export async function mostrarCliente() {
    try {
        const url = "http://localhost:4000/clientes";
        const tabla = document.querySelector('tbody');

        const resultado = await fetch(url);
        const texto = await resultado.json();

        ponerClientes(texto, tabla);

        tabla.addEventListener('click', e => {
            if (e.target.classList.contains('eliminar')) {
                e.preventDefault();
                const id = e.target.dataset.cliente;
                eliminarCliente(e, id);
            }
        });

    } catch (error) {
        console.log(error);
    }
}

async function eliminarCliente(e, id) {
    e.preventDefault();
    const confirmar = confirm("¿Seguro que quieres eliminar este cliente?");
    if (confirmar) {
        try {
            const url = `http://localhost:4000/clientes/${id}`;
            await fetch(url, { method: 'DELETE' });
            location.reload();
        } catch (error) {
            console.log(error);
        }
    }
}

//nuevocliente.js

export async function agregarCliente(cliente) {
    try {
        const url = "http://localhost:4000/clientes";

        await fetch(url,{
            method: 'POST',
            body: JSON.stringify(cliente),
            headers: {
                'Content-Type': 'application/json'
            } 
        });

        location.href = "index.html";

    } catch (error) {
        mostrarError('Fallo al conectar con la base de datos')
    }
}    

//editarClientes

export async function mostrarInfoCliente(id) {
    try {
        const url = `http://localhost:4000/clientes/${id}`;
        const resultado = await fetch(url);
        const cliente = await resultado.json();

        document.querySelector('#nombre').value = cliente.nombre;
        document.querySelector('#email').value = cliente.email;
        document.querySelector('#telefono').value = cliente.telefono;
        document.querySelector('#empresa').value = cliente.empresa;

    } catch (error) {
        console.log('Error al obtener cliente:', error);
    }
}

export async function actualizarCliente(e, idCliente) {
    e.preventDefault();

    const cliente = {
        nombre: document.querySelector('#nombre').value,
        email: document.querySelector('#email').value,
        telefono: document.querySelector('#telefono').value,
        empresa: document.querySelector('#empresa').value,
        id: idCliente
    };

    try {
        const url = `http://localhost:4000/clientes/${cliente.id}`;

        await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(cliente),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        location.href = 'index.html';
    } catch (error) {
        console.log('Error al actualizar cliente:', error);
    }
}