import axios from "axios";

class Busquedas {
  historial = ["Tegucigalpa", "Madrid", "San José"];

  constructor() {}

  // getter
  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "es",
    };
  }

  // getter
  get paramsOpenWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      lang: "es",
      units: "metric",
    };
  }

  async ciudad(lugar = "") {
    try {
      // peticion http
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox,
      });
      const resp = await instance.get();
      // const resp = await axios.get(
      //   "https://api.mapbox.com/geocoding/v5/mapbox.places/madrid.json?proximity=ip&types=place%2Cpostcode%2Caddress&language=es&access_token=pk.eyJ1IjoiYXhlbHk3IiwiYSI6ImNsOW9hdWtjYzBmeTQzbnFwbXIyeTFra2MifQ.aPyAbIgTyfgqk8vSHOR3qg"
      // );
      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async climaLugar(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`,
        params: this.paramsOpenWeather,
      });
      const resp = await instance.get();
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  }
}

export { Busquedas };
