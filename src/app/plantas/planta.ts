export interface Planta {
    id: number,
    created_at: number,
    nombre: string,
    ubicacion: {latitud: number, longitud: number},
    capacidad: number,
    usuario: string,
    foto?: string,
    favorite?: boolean
}
