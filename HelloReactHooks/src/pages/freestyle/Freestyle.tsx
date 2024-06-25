import React, { ReactElement, ReactNode, useEffect, useState } from "react"

const FreestylePage = (): ReactElement => {
  const [pedidos, setPedidos] = useState([])
  const [restaurantName, setRestaurantName] = useState("")
  const [pratoName, setPratoName] = useState("")
  const [newId, setNewId] = useState("")
  const [newIdDelete, setNewIdDelete] = useState("")
  const [newQuantity, setNewQuantity] = useState(0)
  const [restaurantNameForUpdate, setRestaurantNameForUpdate] = useState("");
  const [pratoNameForUpdate, setPratoNameForUpdate] = useState("");
  const [newQuantityForUpdate, setNewQuantityForUpdate] = useState(0);
  const [idPedido, setIdPedido] = useState("");
  const [pedidoEncontrado, setPedidoEncontrado] = useState(null);

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
  
const alterarPedido = async () => {
  
    const id = newId
    const restaurante = restaurantName
    const prato = pratoName
    const quantidade = newQuantity
  
      await fetch(`http://localhost:4000/PedidosAtualiza/${id}?restaurante=${restaurante}&prato=${prato}&quantidade=${quantidade}`, {
        method: "PUT"
      })
        .then((res) => res.json())
        .then((data) => {
          fetchData()
        })
    }

const cadastraPedido = async () => {

  const restaurante = restaurantName
  const prato = pratoName
  const quantidade = newQuantity

    await fetch(`http://localhost:4000/Pedidos/?restaurante=${restaurante}&prato=${prato}&quantidade=${quantidade}`, {
      method: "POST"
    })
      .then((res) => res.json())
      .then((data) => {
        fetchData()
      })
  }

const listaPedidos = (pedidos: any) : ReactNode => {
  const result : any = []
  if(pedidos){
    pedidos.forEach((pedido: any) => {
      result.push(
       <h2 style={{ width: "300px", height: "150px", border: "1px solid black", borderRadius: "20px", display: "flex", flexDirection: "column" }}>
        <br />
        Restaurante: {pedido.restaurante}
        <br />
        Prato: {pedido.prato}
        <br />
        Quantidade: {pedido.quantidade}
        </h2>
      )
    })
  }

  return result
}

{/*const buscarPedidoPorId = async () => {
    const response = await fetch(`http://localhost:4000/Pedidos/${idPedido}`);
    if (response.ok) {
      return(
        <h2 style={{ width: "300px", height: "150px", border: "1px solid black", borderRadius: "20px", display: "flex", flexDirection: "column" }}>
         <br />
         Restaurante: {response.restaurante}
         <br />
         Prato: {pedido.prato}
         <br />
         Quantidade: {pedido.quantidade}
         </h2>
       )
    }
};
    
}*/}

const deletePedido = async () => {
  const id = newIdDelete

  await fetch(`http://localhost:4000/PedidosDelete/${id}`,{
    method: "DELETE"
  })
    .then((res) => res.json())
    .then((data) => {
      fetchData()
    })
}

  return (
    <React.Fragment>
      <div style={{display:"flex", flexWrap: "wrap", columnGap: "40px", width: "100%"}}>
        <div style={{ maxWidth: "300px" }}>{/*LISTAR*/}
          <h1>Lista de Pedidos</h1>
          {listaPedidos(pedidos)}
        </div>
        <div style={{ maxWidth: "300px" }}>{/*UPDATE*/}
          <h1>Alterar Pedido</h1>
          <input 
            type="text"
            value={newId}
            onChange={(e) => {setNewId(e.target.value)}} placeholder="Id Pedido" style={{padding: "5px", marginBottom: "5px", borderRadius: "7px", border: "1px solid black"}}/>
          <br />
          <input 
            type="text"
            value={restaurantNameForUpdate}
            onChange={(e) => {setRestaurantNameForUpdate(e.target.value)}} placeholder="Nome Restaurante" style={{padding: "5px", marginBottom: "5px", borderRadius: "7px", border: "1px solid black"}}/>
          <br />
          <input 
            type="text"
            value={pratoNameForUpdate}
            onChange={(e) => {setPratoNameForUpdate(e.target.value)}} placeholder="Nome do Prato" style={{padding: "5px", marginBottom: "5px", borderRadius: "7px", border: "1px solid black"}}/>
          <br />
          <input 
            type="number"
            onChange={(e) => {setNewQuantityForUpdate(parseInt(e.target.value))}} placeholder="Quantidade" style={{padding: "5px !important", marginBottom: "5px !importante", borderRadius: "7px", border: "1px solid black"}}
            value={newQuantityForUpdate}/>
          <br />
          <button onClick={()=> {alterarPedido()}} style={{marginTop: "10px", padding:"5px", backgroundColor: "red", color: "white", fontSize:"18px", fontWeight: "bold", border: "1px solid rgb(136, 2, 2)", borderRadius:"5px" }}>Alterar</button>
        </div>
        <div style={{ maxWidth: "300px" }}>{/*DELETE*/}
          <h1>Deletar Pedido</h1>
          <input 
            type="text"
            value={newIdDelete}
            onChange={(e) => {setNewIdDelete(e.target.value)}} placeholder="Id Pedido" style={{padding: "5px", marginBottom: "5px", borderRadius: "7px", border: "1px solid black"}}/>
            <button onClick={()=> {deletePedido()}} style={{marginTop: "10px", padding:"5px", backgroundColor: "red", color: "white", fontSize:"18px", fontWeight: "bold", border: "1px solid rgb(136, 2, 2)", borderRadius:"5px" }}>Deletar</button>
        </div>
        <div style={{ maxWidth: "300px" }}>{/*CADASTRO*/}
          <h1>Cadastrar Pedido</h1>
          <input 
            type="text"
            value={restaurantName}
            onChange={(e) => {setRestaurantName(e.target.value)}} placeholder="Nome Restaurante" style={{padding: "5px", marginBottom: "5px", borderRadius: "7px", border: "1px solid black"}}/>
          <br />
          <input 
            type="text"
            value={pratoName}
            onChange={(e) => {setPratoName(e.target.value)}} placeholder="Nome do Prato" style={{padding: "5px", marginBottom: "5px", borderRadius: "7px", border: "1px solid black"}}/>
          <br />
          <input 
            type="number"
            onChange={(e) => {setNewQuantity(parseInt(e.target.value))}} placeholder="Quantidade" style={{padding: "5px !important", marginBottom: "5px !importante", borderRadius: "7px", border: "1px solid black"}}
            value={newQuantity}/>
          <br />
          <button onClick={()=> {cadastraPedido()}} style={{marginTop: "10px", padding:"5px", backgroundColor: "red", color: "white", fontSize:"18px", fontWeight: "bold", border: "1px solid rgb(136, 2, 2)", borderRadius:"5px" }}>Cadastrar</button>
        </div>
        <div style={{ maxWidth: "300px" }}>{/* BUSCA POR ID */}
          
        </div>
      </div>
    </React.Fragment>
  )
}

export default FreestylePage
