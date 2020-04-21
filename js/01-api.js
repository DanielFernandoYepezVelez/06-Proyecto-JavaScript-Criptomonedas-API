class API {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    async obtenerMonedasAPI() {
        /* URL */
        const url = `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${this.apiKey}`;

        /* FECTH API */
        const obtenerMonedasUrl = await fetch(url);

        /* FORMATO CONVERTIDO */
        const formatoMonedas = await obtenerMonedasUrl.json();

        /* RETURN SE MANDA ASI, POR QUE ES UN OBJETO JSON(). */
        return {
            formatoMonedas
        }
    }

    async obtenerValorConversion(criptomoneda, moneda) {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}&api_key=${this.apiKey}`;

        const urlConvertir = await fetch(url);
        const resultado = await urlConvertir.json();

        /* RETURN SE MANDA ASI, POR QUE ES UN OBJETO JSON(). */
        return {
            resultado
        }
    }
}