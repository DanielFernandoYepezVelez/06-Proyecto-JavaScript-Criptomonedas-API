/* Aqui Instancio Las Clases Para Que Esten Disponibles En Toda La Applicación */
const cotizador = new API('7e0b287f06a9a145cae5b0ccc3ff3ccbf75ba816c33efc02ccc4fa20378ec94e');
const ui = new Interfaz();

/* Accediendo Al DOM */
const formulario = document.getElementById('formulario');

/* Funcionalidad Para Obtener Los Datos Del Formulario */
const obtenerFormulario = (e) => {
    e.preventDefault();

    /* Leer Moneda Del Select */
    const monedaSelect = document.querySelector('#moneda');
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;

    /* Leer Criptomoneda Del Select */
    const monedaCriptoSelect = document.querySelector('#criptomoneda');
    const monedaCriptoSeleccionada = monedaCriptoSelect.options[monedaCriptoSelect.selectedIndex].value;

    if (monedaSeleccionada !== '' && monedaCriptoSeleccionada !== '') {
        cotizador.obtenerValorConversion(monedaCriptoSeleccionada, monedaSeleccionada)
            .then(data => ui.mostrarConversion(data.resultado.RAW, monedaSeleccionada, monedaCriptoSeleccionada));

    } else {
        console.log('Debes Selecccionar algo');
        ui.mostrarMensaje('Ambos Campos Son Obligatorios', 'alert bg-danger text-center');
    }
}

/* Eventos De Los Usuarios Y Del Sistema */
formulario.addEventListener('submit', obtenerFormulario);