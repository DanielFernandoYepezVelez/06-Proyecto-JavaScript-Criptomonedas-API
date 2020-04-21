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
        console.log(resultado[crypto][moneda]);
    }
}