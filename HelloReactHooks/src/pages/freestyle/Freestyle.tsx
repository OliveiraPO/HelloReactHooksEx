import React, { ReactElement, ReactNode, useEffect, useState } from "react"

const displayPedidos = (pedidos: any) : ReactNode => {
  const result : any = []
  if(pedidos){
    pedidos.forEach((pedido: any) => {
      result.push(
       <h2 style={{ width: "200px", height: "200px", border: "1px solid black", borderRadius: "20px"}}>
        {pedido.restaurante}
        <br />
        {pedido.prato}
        </h2>
      )
    })
  }

  return result
}
/*op*/
const FreestylePage = (): ReactElement => {
  const [pedidos, setPedidos] = useState([])
  const [flavorName, setFlavorName] = useState("")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    await fetch("http://localhost:4000/Pedidos",
     { method: "GET" })
    .then((res) => res.json())
    .then((data) => {
      setPedidos(data)
    })
  }

  const submitData = async () => {

    const id = "4c9e265c-0471-4f07-92d5-2538a7416167"
    const restaurante = flavorName
    const prato = "raviole"
    const quantidade = 5

      await fetch(`http://localhost:4000/PedidosAtualiza/${id}?restaurante=${restaurante}&prato=${prato}&quantidade=${quantidade}`, {
        method: "PUT"
      })
        .then((res) => res.json())
        .then((data) => {
          fetchData()
        })
    }

  return (
    <React.Fragment>
      <h1>Título Legal</h1>
      {displayPedidos(pedidos)}

      <h1>{flavorName}</h1>
      <input 
        type="text"
        value={flavorName}
        onChange={(e) => {setFlavorName(e.target.value)}}/>
      <button onClick={()=> {submitData()}}>Clique em mim!</button>
    </React.Fragment>
  )
}

export default FreestylePage
