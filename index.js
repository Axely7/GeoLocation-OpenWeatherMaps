import { inquirerMenu, leerInput, pausa } from "./helpers/inquirer.js";
import { Busquedas } from "./models/busquedas.js";

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
        await busquedas.ciudad(lugar);
        // Buscar los lugares

        // Seleccionar el lugar

        // Clima

        // Mostrar Resultados:

        console.log("\nInformación de la ciudad\n".green);
        console.log("Ciudad: ");
        console.log("Lat: ");
        console.log("Lng: ");
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
