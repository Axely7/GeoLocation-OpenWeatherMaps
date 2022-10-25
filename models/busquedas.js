import axios from "axios";

class Busquedas {
  historial = ["Tegucigalpa", "Madrid", "San José"];

  constructor() {}

  // getter
  get paramsMapbox() {
    return {
      access_token:
        "pk.eyJ1IjoiYXhlbHk3IiwiYSI6ImNsOW9hdWtjYzBmeTQzbnFwbXIyeTFra2MifQ.aPyAbIgTyfgqk8vSHOR3qg",
      limit: 5,
      language: "es",
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
      console.log(resp.data);

      return [];
    } catch (error) {
      return [];
    }
  }
}

export { Busquedas };
