import { Planta } from "./planta";

export const plantasDemo: Planta[] = [
  {
    id: 1,
    created_at: 1700000000000,
    nombre: "Planta Solar Norte",
    ubicacion: {
      latitud: 24.0203,
      longitud: -104.6576
    },
    capacidad: 150,
    usuario: "admin",
    foto: "img/instaladores/instalador1.png"
  },
  {
    id: 2,
    created_at: 1700500000000,
    nombre: "Planta Eólica Costa",
    ubicacion: {
      latitud: 19.4326,
      longitud: -99.1332
    },
    capacidad: 300,
    usuario: "img/instaladores/instalador2.png"
  },
  {
    id: 3,
    created_at: 1701000000000,
    nombre: "Planta Hidroeléctrica Sur",
    ubicacion: {
      latitud: -33.4489,
      longitud: -70.6693
    },
    capacidad: 500,
    usuario: "supervisor",
    foto: "img/instaladores/instalador3.png"
  }
];
