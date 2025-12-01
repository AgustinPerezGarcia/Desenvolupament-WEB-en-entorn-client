class Poliza {
    constructor(gama, year, cobertura) {
        switch (parseInt(gama)) {
            case 1:
            this._gama = 5;
                break;
            case 2:
            this._gama = 15    
                break;
            case 3:
            this._gama = 30;    
                break;
        }

        this._year = year;

        if (cobertura === "Completo") {
            this._cobertura = 1;
        } else {
            this._cobertura = 0;
        }

        this._importe = 0;    
    }
    get gama(){
        return this._gama;
    }

    get year(){
        return this._year;
    }

    get cobertura(){
        return this._cobertura;
    }

    get importe(){
        return this._importe;
    }

    set importe(importe){
        this._importe = importe;
    }

    calcularSeguro() {
        const base = 300;

        const porcentajeGama = this._gama / 100;
        let total = base + base * porcentajeGama;

        const yearActual = new Date().getFullYear();
        const antiguedad = yearActual - this._year;
        total += total * (antiguedad * 0.03);

        const porcentajeCobertura = this._cobertura === 0 ? 0.3 : 0.5;
        total *= 1 + porcentajeCobertura;

        this._importe = Math.round(total);
        console.log(this._importe);

        return this._importe;
    }


    mostrarInfoHTML() {
        const modalElement = document.getElementById('modal');
        const modal = new bootstrap.Modal(modalElement, { backdrop: 'static', keyboard: false });

        const modalHeader = modalElement.querySelector('.modal-header');
        const modalBody = modalElement.querySelector('.modal-body');
        const modalFooter = modalElement.querySelector('.modal-footer');

        let tipo = "";

        switch (this._gama) {
            case 5:
            tipo = "Gama Baja";
                break;
            case 15:
            tipo = "Gama Media";    
                break;
            case 30:
            tipo = "Gama Alta";    
                break;
        }

        modalHeader.innerHTML = `<h1 class="header col">RESUMEN DE PÓLIZA</h1>`;
        modalBody.innerHTML = `
            <p class="font-bold">TIPO: ${tipo}</p>
            <p class="font-bold">AÑO: ${this._year}</p>
            <p class="font-bold">COBERTURA: ${this._cobertura === 0 ? "Básico":"Completo"}</p>
            <p class="font-bold">TOTAL: <strong>${this._importe} €</strong></p>
        `;

        modalFooter.innerHTML = '';
        const cerrarBtn = document.createElement('button');
        cerrarBtn.classList.add('btn', 'btn-primary', 'btn-raised', 'col');
        cerrarBtn.textContent = 'Cerrar';
        cerrarBtn.addEventListener('click', () => modal.hide());
        modalFooter.appendChild(cerrarBtn);

        modal.show();
}
}