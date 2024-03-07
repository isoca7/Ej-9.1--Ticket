import {ResultadoLineaTicket, ResultadoTotalTicket, productos } from './Interfaces'
import { calculaLineaTicket } from './LineaTicket'

export const calculaTotalTicket = (): ResultadoTotalTicket => {
  const lineasTicket = calculaLineaTicket(productos)
  const resultadoTotalSinIva = calculaTotalSinIva(lineasTicket)
  const resultadoTotalConIva = calculaTotalConIva(lineasTicket)
  const sumaIvaTotal = calcularSumaIvaTotal(
    resultadoTotalConIva,
    resultadoTotalSinIva
  )
  let TotalTicket: ResultadoTotalTicket = {
    totalConIva: resultadoTotalConIva,
    totalSinIva: resultadoTotalSinIva,
    totalIva: +sumaIvaTotal.toFixed(2),
  }
  return TotalTicket
}

const calculaTotalSinIva = (lineasTicket: ResultadoLineaTicket[]): number => {
  const totalSinIva = lineasTicket.reduce(
    (acc, linea) => acc + linea.precioSinIva,
    0
  )
  return totalSinIva
}

const calculaTotalConIva = (lineasTicket: ResultadoLineaTicket[]): number => {
  const totalConIva = lineasTicket.reduce(
    (acc, linea) => acc + linea.precioConIva,
    0
  )
  return totalConIva
}

const calcularSumaIvaTotal = (
  totalConIva: number,
  totalSinIva: number
): number => totalConIva - totalSinIva
