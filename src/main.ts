import './style.css'
import { calculaLineaTicket } from './LineaTicket'
import { calculaTotalTicket } from './TotalTicket'
import { calcularPorTipoIva } from './DesgloseIva'
import { TicketFinal, productos } from './Interfaces'


const calcularTicketFinal = (): TicketFinal => {
  const resultadoTicketFinal: TicketFinal = {
    lineas: calculaLineaTicket(productos),
    total: calculaTotalTicket(),
    desgloseIva: calcularPorTipoIva(),
  }
  return resultadoTicketFinal
}

console.log(calcularTicketFinal())
