
import Header from "./components/Header"
import Guitarra from "./components/Guitarra"
import { db } from "./data/db"
import { useEffect, useState } from "react"


function App() {

    const carritoInicial = () =>{
        const localStorageCarrito = localStorage.getItem('carrito')
        return (localStorageCarrito !== null) ? JSON.parse(localStorageCarrito) : []
    }

    const [data] = useState(db);
    const [carrito, setCarrito] = useState(carritoInicial);

    useEffect(()=>{
    localStorage.setItem('carrito', JSON.stringify(carrito))},[carrito])

    function agregarAlCarrito(articulo) {
        const articuloExiste = carrito.findIndex(element => articulo.id === element.id);
        if (articuloExiste >= 0) {
            const copiaCarrito = [...carrito];
            copiaCarrito[articuloExiste].cantidad++;
            setCarrito(copiaCarrito);
        } else {
            articulo.cantidad = 1;
            setCarrito(carrito => [...carrito, articulo]);
        }
    }

    function eliminarDelCarrito(id) {
        const nuevocarrito = () => carrito.filter(element => element.id !== id);
        setCarrito(nuevocarrito);
    }

    function cambiarCantidad(id, operar) {
        const articuloExiste = carrito.findIndex(element => id === element.id);
        if (articuloExiste >= 0) {
            const copiaCarrito = [...carrito];
            if (operar === 1) {
                copiaCarrito[articuloExiste].cantidad++;
                setCarrito(copiaCarrito);
            } else {
                if (copiaCarrito[articuloExiste].cantidad > 1) {
                    copiaCarrito[articuloExiste].cantidad--;
                    setCarrito(copiaCarrito);
                }
            }
        }
    }

    function eliminarCarrito() {
        setCarrito([])
    }

    return (
        <>
            <Header
                carrito={carrito}
                eliminarDelCarrito={eliminarDelCarrito}
                cambiarCantidad={cambiarCantidad}
                eliminarCarrito={eliminarCarrito}
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">

                    {data.map(element => (
                        <Guitarra
                            key={element.id}
                            guitarraObj={element}
                            agregarAlCarrito={agregarAlCarrito}
                        />
                    ))}

                </div>
            </main>


            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
                </div>
            </footer>
        </>
    )

}

export default App
