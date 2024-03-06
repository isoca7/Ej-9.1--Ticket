import { LineaTicket, ResultadoLineaTicket } from "./main"
const determinarTipoIva = (tipoIva: string): number => {
    switch (tipoIva) {
      case 'general':
        return 0.21
      case 'reducido':
        return 0.1
      case 'superreducidoA':
        return 0.05
      case 'superreducidoB':
        return 0.04
      case 'superreducidoC':
        return 0 // //
      case 'sinIva':
        return 0
      default:
        return 0
      // Si no se especifica un tipo de IVA conocido, se devuelve el precio sin cambios
    }
  }
const calculaIva = (tipoIva: string, precio: number, cantidad: number) => {
    const porcentajeIva = determinarTipoIva(tipoIva)
    const precioSinIva = precio * cantidad
    const sumaIva = precioSinIva * porcentajeIva
    return sumaIva
  }
  
  const calculaPrecioSinIva = (precio: number, cantidad: number) => {
    return precio * cantidad
  }
  
  
  const sumarIvaAlPrecio = (
    tipoIva: string,
    precio: number,
    cantidad: number
  ) => {
    const sumaIva = calculaIva(tipoIva, precio, cantidad)
    const precioSinIva = calculaPrecioSinIva(precio, cantidad)
    const precioFinal = precioSinIva + sumaIva
    return precioFinal
  }
  
  
 export const calculaLineaTicket = (
    productos: LineaTicket[]
  ): ResultadoLineaTicket[] => {
    let result: ResultadoLineaTicket[] = []
    productos.forEach((elemento) => {
      result.push({
        nombre: elemento.producto.nombre,
        cantidad: elemento.cantidad,
        precioSinIva: calculaPrecioSinIva(
          elemento.producto.precio,
          elemento.cantidad
        ),
        tipoIva: elemento.producto.tipoIva,
        precioConIva: sumarIvaAlPrecio(
          elemento.producto.tipoIva,
          elemento.producto.precio,
          elemento.cantidad
        ),
      })
    })
    return result
  }