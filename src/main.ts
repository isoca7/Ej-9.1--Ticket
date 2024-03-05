import './style.css'
type TipoIva =
  | 'general'
  | 'reducido'
  | 'superreducidoA'
  | 'superreducidoB'
  | 'superreducidoC'
  | 'sinIva'

interface Producto {
  nombre: string
  precio: number
  tipoIva: TipoIva
}
interface LineaTicket {
  producto: Producto
  cantidad: number
}
interface ResultadoLineaTicket {
  nombre: string
  cantidad: number
  precioSinIva: number
  tipoIva: TipoIva
  precioConIva: number
}
interface ResultadoTotalTicket {
  totalSinIva: number
  totalConIva: number
  totalIva: number
}

interface TotalPorTipoIva {
  tipoIva: TipoIva
  cuantia: number
}

interface TicketFinal {
  lineas: ResultadoLineaTicket[]
  total: ResultadoTotalTicket
  desgloseIva: TotalPorTipoIva[]
}

const productos: LineaTicket[] = [
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

const calculaPrecioSinIva = (precio: number, cantidad: number) => {
  return precio * cantidad
}

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


const calculaLineaTicket = (
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

const calculaTotalTicket = (): ResultadoTotalTicket => {
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

const calcularTicketFinal = (): TicketFinal => {
  const resultadoTicketFinal: TicketFinal = {
    lineas: calculaLineaTicket(productos),
    total: calculaTotalTicket(),
    desgloseIva: calcularPorTipoIva(),
  }
  return resultadoTicketFinal
}

const calcularPorTipoIva = () : TotalPorTipoIva[] => {
  const lineaTicket = calculaLineaTicket(productos)
  const tiposIva= crearListaDeIva(lineaTicket)
  const desgloseIva: TotalPorTipoIva[] = []
  
  tiposIva.forEach((tipoIva) => {
    const cuantia = lineaTicket.reduce((total, producto) => {
      if (producto.tipoIva === tipoIva) {
        const sumaIva = producto.precioConIva - producto.precioSinIva
        return (
          total + sumaIva
        )
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
const crearListaDeIva = (lineaTicket : ResultadoLineaTicket[]) => {
  const tiposIva: TipoIva[] = []
  lineaTicket.forEach((producto) => {
    if (!tiposIva.includes(producto.tipoIva)) {
      tiposIva.push(producto.tipoIva)
    }
  })
  return tiposIva
}
console.log(calcularTicketFinal())
