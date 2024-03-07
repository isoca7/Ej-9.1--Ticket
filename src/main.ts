import './style.css'
import { calculaLineaTicket } from './LineaTicket'
import { calculaTotalTicket } from './TotalTicket'
import { calcularPorTipoIva } from './DesgloseIva'
import { LineaTicket, TicketFinal } from './Interfaces'
export const productos: LineaTicket[] = [
  {
    producto: {
      nombre: 'Legumbres',
      precio: 2,
      tipoIva: 'general',
    },
    cantidad: 2,
  },
  {
    producto: {
      nombre: 'Perfume',
      precio: 20,
      tipoIva: 'general',
    },
    cantidad: 3,
  },
  {
    producto: {
      nombre: 'Leche',
      precio: 1,
      tipoIva: 'superreducidoC',
    },
    cantidad: 6,
  },
  {
    producto: {
      nombre: 'Lasaña',
      precio: 5,
      tipoIva: 'superreducidoA',
    },
    cantidad: 1,
  },
]

const calcularTicketFinal = (): TicketFinal => {
  const resultadoTicketFinal: TicketFinal = {
    lineas: calculaLineaTicket(productos),
    total: calculaTotalTicket(),
    desgloseIva: calcularPorTipoIva(),
  }
  return resultadoTicketFinal
}

console.log(calcularTicketFinal())
