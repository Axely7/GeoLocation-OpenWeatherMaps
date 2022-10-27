import {
  inquirerMenu,
  leerInput,
  listarLugares,
  pausa,
} from "./helpers/inquirer.js";
import { Busquedas } from "./models/busquedas.js";
import * as dotenv from "dotenv";

dotenv.config();

// Para acceder a variables de entorno de node: process.env

// console.log(process.env);

const main = async () => {
  let opt;
  const busquedas = new Busquedas();

  do {
    // Imprimir el menu
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        // Mostrar mensaje
        const lugar = await leerInput("Ciudad: ");

        // Buscar los lugares
        const lugares = await busquedas.ciudad(lugar);
        const idSeleccionado = await listarLugares(lugares);
        const lugarSeleccionado = lugares.find((l) => l.id === idSeleccionado);

        // Seleccionar el lugar

        // Clima
        const clima = await busquedas.climaLugar(
          lugarSeleccionado.lat,
          lugarSeleccionado.lng
        );
        console.log(clima);
        // Mostrar Resultados:

        console.log("\nInformación de la ciudad\n".green);
        console.log("Ciudad: ", lugarSeleccionado.nombre);
        console.log("Lat: ", lugarSeleccionado.lat);
        console.log("Lng: ", lugarSeleccionado.lng);
        console.log("Temperatura: ");
        console.log("Mínima:");
        console.log("Máxima:");
        break;

      case 2:
        console.log("Opcion 2");
    }
    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
