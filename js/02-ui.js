class Interfaz {
    constructor() {
        this.init();
    }

    init() {
        this.construirSelect();
    }

    construirSelect() {
        /* Esta Disponible PorQue Esta Definido En La Parte Superior Del Archivo Principal */
        cotizador.obtenerMonedasAPI()
            .then(monedas => {

                /* Objeto Anidado O Super Objeto Retornado */
                console.log(monedas);

                /* Objeto Con La Respuesta De La API */
                console.log(monedas.formatoMonedas);

                /* Valor Obtenido De La API */
                console.log(monedas.formatoMonedas.Data);

                /* La API Me retorna Un Objeto, Y Yo No Se Como Recorrer Un Objeto, Pero Si Se Como Recorrer Un Array, Entonces Convierto Un Objeto A Un Array */
                const convertirObjeto = Object.entries(monedas.formatoMonedas.Data);

                /* Mostrando La Conversión De Objeto A Un Array */
                console.log(convertirObjeto);

                const fragmento = document.createDocumentFragment();
                const select = document.querySelector('#criptomoneda');

                /* Recorro El Objeto Convertido Con el Nuevo Iterador */
                for (const [key, value] of convertirObjeto) {
                    /*Del Valor Obtenido Del Objeto Convertido Debo Tomar El Symbol Como Value Del Select Y El Texto Para Renderizar Por Pantalla*/
                    const opcion = document.createElement('option');
                    opcion.value = value.Symbol;

                    opcion.appendChild(document.createTextNode(value.CoinName));
                    fragmento.appendChild(opcion);
                    select.appendChild(fragmento);
                }
            });
    }

    mostrarMensaje(mensaje, clases) {
        const div = document.createElement('div');

        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));

        /* Monstrar Mensaje */
        const divMensaje = document.querySelector('.mensajes');
        divMensaje.appendChild(div);

        /* Eliminar Mensaje */
        setTimeout(() => {
            document.querySelector('.mensajes div').remove();
        }, 3000);
    }

    mostrarConversion(resultado, moneda, crypto) {

        /* Ocultar El Resultado Anterior */
        const resultadoAnterior = document.querySelector('#resultado > div');

        if (resultadoAnterior) {
            resultadoAnterior.remove();
        }

        const datosMoneda = resultado[crypto][moneda];

        let price = datosMoneda.PRICE.toFixed(2);
        let porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(2);
        /* Se debe multiplicar por mil para que funcione la conversion De Un Formato De Fecha Tipo UNIX*/
        let actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('COL');

        let templateHTML = `
            <div class="card bg-warning" 
                <div class="card-body text-light">
                    <h2 class="card-title">Resultado:</h2>
                    <p>El Precio De ${datosMoneda.FROMSYMBOL} A Moneda ${datosMoneda.TOSYMBOL} Es De: ${price}</p>
                    <p>Variación Último Día: % ${porcentaje}</p>
                    <p>Ultima Actualización: ${actualizado}</p>
                </div>
            </div>
        `;

        this.mostrarOcultarSpinner('block');

        setTimeout(() => {
            document.querySelector('#resultado').innerHTML = templateHTML;
            this.mostrarOcultarSpinner('none');
        }, 3000);
    }

    mostrarOcultarSpinner(display) {
        const spinner = document.querySelector('.contenido-spinner');
        spinner.style.display = display;
    }
}