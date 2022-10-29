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

        // Seleccionar el lugar
        const idSeleccionado = await listarLugares(lugares);

        if (idSeleccionado === "0") continue;

        const lugarSeleccionado = lugares.find((l) => l.id === idSeleccionado);
        console.log(lugarSeleccionado.nombre);
        // Guardar en DB
        busquedas.agregarHistorial(lugarSeleccionado.nombre);

        // Clima
        const clima = await busquedas.climaLugar(
          lugarSeleccionado.lat,
          lugarSeleccionado.lng
        );

        // Mostrar Resultados:
        console.clear();
        console.log("\nInformación de la ciudad\n".green);
        console.log("Ciudad: ", lugarSeleccionado.nombre.green);
        console.log("Lat: ", lugarSeleccionado.lat);
        console.log("Lng: ", lugarSeleccionado.lng);
        console.log("Temperatura: ", clima.temp);
        console.log("Mínima:", clima.min);
        console.log("Máxima:", clima.max);
        console.log("Cómo está el clima", clima.desc.green);
        break;

      case 2:
        busquedas.historialCapitalizado.forEach((lugar, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx} ${lugar}`);
        });
        busquedas.leerDB();
    }
    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
