
import { TotalPorTipoIva, ResultadoLineaTicket, TipoIva, productos } from './Interfaces'
import { calculaLineaTicket } from './LineaTicket'
export const calcularPorTipoIva = (): TotalPorTipoIva[] => {
  const lineaTicket = calculaLineaTicket(productos)
  const tiposIva = crearListaDeIva(lineaTicket)
  const desgloseIva: TotalPorTipoIva[] = []

  tiposIva.forEach((tipoIva) => {
    const cuantia = lineaTicket.reduce((total, producto) => {
      if (producto.tipoIva === tipoIva) {
        const sumaIva = producto.precioConIva - producto.precioSinIva
        return total + sumaIva
      }
      return total
    }, 0)
    desgloseIva.push({
      tipoIva,
      cuantia: +cuantia.toFixed(2),
    })
  })
  return desgloseIva
}
const crearListaDeIva = (lineaTicket: ResultadoLineaTicket[]) => {
  const tiposIva: TipoIva[] = []
  lineaTicket.forEach((producto) => {
    if (!tiposIva.includes(producto.tipoIva)) {
      tiposIva.push(producto.tipoIva)
    }
  })
  return tiposIva
}
