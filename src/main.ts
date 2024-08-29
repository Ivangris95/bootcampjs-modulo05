interface Partida {
  puntuacion: number;
  mensaje: string;
}

const partida: Partida = {
  puntuacion: 0,
  mensaje: "",
};

const generarNumeroAleatorio = (): number => {
  return Math.floor(Math.random() * 11);
};

const generarNumeroCarta = (numeroAleatorio: number): number => {
  if (numeroAleatorio > 7) {
    return numeroAleatorio + 2;
  }
  if (numeroAleatorio === 0) {
    return numeroAleatorio + 1;
  }

  return numeroAleatorio;
};

const muestraPuntuacion = () => {
  const elementoPuntuacion = document.getElementById("puntuacion");

  if (elementoPuntuacion && elementoPuntuacion instanceof HTMLDivElement) {
    elementoPuntuacion.innerHTML = `Puntuación: ${partida.puntuacion}`;
  } else {
    console.error("muestraPuntuacion: No se a encontrado su ID");
  }
};

document.addEventListener("DOMContentLoaded", muestraPuntuacion);

const obtenerUrl = (carta: number): string => {
  switch (carta) {
    case 1:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg";
    case 2:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg";
    case 3:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg";
    case 4:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg";
    case 5:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg";
    case 6:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg";
    case 7:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg";
    case 10:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg";
    case 11:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg";
    case 12:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg";
    default:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
  }
};

const mostrarCarta = (urlCarta: string): void => {
  const carta = document.getElementById("carta");
  if (carta && carta instanceof HTMLImageElement) {
    carta.src = urlCarta;
  }
};

const obtenerPuntosCarta = (carta: number): number => {
  if (carta > 7) {
    return 0.5;
  }
  return carta;
};

const sumarPuntuacion = (puntosCarta: number) => {
  return partida.puntuacion + puntosCarta;
};

const actualizarPuntuacion = (nuevosPuntos: number) => {
  partida.puntuacion = nuevosPuntos;
};

const nuevaPartida = () => {
  const elementoReset = document.getElementById("reset");
  if (elementoReset && elementoReset instanceof HTMLButtonElement) {
    elementoReset.style.display = "flex";
    elementoReset.addEventListener("click", () => {
      location.reload();
    });
  }
};

const gameOver = () => {
  const elementoCarta = document.getElementById("dameCarta");
  const elementoPlantarse = document.getElementById("plantarse");
  if (
    elementoCarta &&
    elementoCarta instanceof HTMLButtonElement &&
    elementoPlantarse &&
    elementoPlantarse instanceof HTMLButtonElement
  ) {
    elementoCarta.disabled = true;
    elementoPlantarse.disabled = true;
  } else {
    console.error("elementoCarta: No se encontro el ID");
  }

  nuevaPartida();
};

const gestionarPartida = () => {
  if (partida.puntuacion === 7.5) {
    partida.mensaje = "¡¡ Lo has clavado !! Enhorabuenea 🎖️ ";
    gameOver();
  }

  if (partida.puntuacion > 7.5) {
    partida.mensaje = "GAME OVER 💀. Intentalo otra vez.";
    gameOver();
  }
  const elementoMensaje = document.getElementById("mensaje");
  if (elementoMensaje && elementoMensaje instanceof HTMLDivElement) {
    elementoMensaje.innerHTML = partida.mensaje;
  }
};

const queHabriaPasado = () => {
  const elementoHabriaPasado = document.getElementById("habriaPasado");

  if (
    elementoHabriaPasado &&
    elementoHabriaPasado instanceof HTMLButtonElement
  ) {
    elementoHabriaPasado.style.display = "inline-block";
  }
};

const mensajePlantarse = () => {
  const elementoCarta = document.getElementById("dameCarta");

  if (elementoCarta && elementoCarta instanceof HTMLButtonElement) {
    elementoCarta.disabled = true;

    if (partida.puntuacion < 4) {
      partida.mensaje = "Has sido muy conservador 🐔";
    } else if (partida.puntuacion === 5) {
      partida.mensaje = "Te ha entrado el cangelo 😰";
    } else if (partida.puntuacion === 7.5) {
      partida.mensaje = "¡¡ Lo has clavado !! Enhorabuenea 🎖️ ";
    } else {
      partida.mensaje = "Casi, casi 👍";
    }
    const elementoMensaje = document.getElementById("mensaje");
    if (elementoMensaje) {
      elementoMensaje.innerHTML = partida.mensaje;
    }
  }
};

const handlePlantarseClick = () => {
  queHabriaPasado();
  mensajePlantarse();
  nuevaPartida();
};

const manejarCartaNueva = (): number => {
  const numeroAleatorio = generarNumeroAleatorio();
  const carta = generarNumeroCarta(numeroAleatorio);
  const urlCarta = obtenerUrl(carta);
  mostrarCarta(urlCarta);
  return obtenerPuntosCarta(carta);
};

const manejarPuntuacion = (puntosCarta: number) => {
  const puntosSumados = sumarPuntuacion(puntosCarta);
  actualizarPuntuacion(puntosSumados);
  muestraPuntuacion();
  gestionarPartida();
};

const handleCompruebaClick = () => {
  const puntosCarta = manejarCartaNueva();
  manejarPuntuacion(puntosCarta);
};

const pedirCarta = document.getElementById("dameCarta");
if (pedirCarta) {
  pedirCarta.addEventListener("click", handleCompruebaClick);
}

const plantarse = document.getElementById("plantarse");
if (plantarse) {
  plantarse.addEventListener("click", handlePlantarseClick);
}

const prueba = document.getElementById("habriaPasado");
if (prueba) {
  prueba.addEventListener("click", handleCompruebaClick);
}
