import React, { ReactElement, ReactNode, useEffect, useState } from "react"

const CentralPedidosPage = (): ReactElement => {
  const [pedidos, setPedidos] = useState([])
  const [pedidosRestaurante, setPedidosRestaurante] = useState([])
  const [pedido, setPedido] = useState(null)
  const [restaurantNamePatch, setRestaurantNamePatch] = useState("")
  const [restaurantName, setRestaurantName] = useState("")
  const [pratoName, setPratoName] = useState("")
  const [newId, setNewId] = useState("")
  const [newIdDelete, setNewIdDelete] = useState("")
  const [newQuantity, setNewQuantity] = useState(0)
  const [restaurantNameForUpdate, setRestaurantNameForUpdate] = useState("");
  const [pratoNameForUpdate, setPratoNameForUpdate] = useState("");
  const [newQuantityForUpdate, setNewQuantityForUpdate] = useState(0);
  const [idPedido, setIdPedido] = useState("");
  const [idPedidoPatch, setIdPedidoPatch] = useState("");
  


  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    buscarPedidoPorId()
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
const listaPedidosRestaurante = (pedidosRestaurante: any) : ReactNode => {
  const result : any = []
  if(pedidosRestaurante){
    pedidosRestaurante.forEach((pedido: any) => {
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

const buscarPedidoPorId = async () => {
  const id = idPedido
  await fetch(`http://localhost:4000/Pedidos/${id}`,{
    method: "GET"
  })
  .then((res) => res.json())
  .then((data) => {
    setPedido(data)
  })
    
}

const buscarPedidoPorRestaurante = async () => {
  const restaurante = restaurantName
  await fetch(`http://localhost:4000/pedidosRestaurante/${restaurante}`,{
    method: "GET"
  })
  .then((res) => res.json())
  .then((data) => {
    setPedidosRestaurante(data)
  })
    
}

const patch = async (idPedido: string, restaurantNamePatch: string) => {
  const id = idPedido
  const restaurante = restaurantNamePatch
  await fetch(`http://localhost:4000/PedidosPatch/${id}`,{
    method: "PATCH",
    headers: {
      "Content-Type":"application/json",
    },
    body: JSON.stringify({restaurante}),
  })
  .then((res) => res.json()) 
    .then((data) => {
      setPedido(data)
    })
  
}
    
const buscarPeloId = (pedidos: any, pedido: any): ReactNode => {
  let result: ReactNode = null;

  if (pedidos && pedido) {
    pedidos.forEach((p: any) => {
      if (p.id === pedido.id) {
        result = (
          <div>
            <h2>Pedido Encontrado:</h2>
            <h2 style={{ width: "300px", height: "150px", border: "1px solid black", borderRadius: "20px", display: "flex", flexDirection: "column" }}>
              <br />
              Restaurante: {pedido.restaurante}
              <br />
              Prato: {pedido.prato}
              <br />
              Quantidade: {pedido.quantidade}
            </h2>
          </div>
        );
      }
    });
  }

  return result;
};

const deletePedido = async () => {
  const id = newIdDelete

  await fetch(`http://localhost:4000/PedidosDelete/${id}`,{
    method: "DELETE"
  })
    .then((res) => res.json())
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
        <h1>Buscar Pedido por Id</h1>
          <input 
              type="text"
              value={idPedido}
              onChange={(e) => {setIdPedido(e.target.value)}} placeholder="Id do pedido" style={{padding: "5px", marginBottom: "5px", borderRadius: "7px", border: "1px solid black"}}/>
              
          <br />
          <button onClick={()=> {buscarPedidoPorId();}} style={{marginTop: "10px", padding:"5px", backgroundColor: "red", color: "white", fontSize:"18px", fontWeight: "bold", border: "1px solid rgb(136, 2, 2)", borderRadius:"5px" }}>Buscar</button>
          {buscarPeloId(pedidos, pedido)}
        </div>
        <div style={{ maxWidth: "300px" }}>{/* PATCH */}
          <h1>Alterar Restaurante "PATCH"</h1>
          <input
            type="text"
            value={idPedidoPatch}
            onChange={(e) => setIdPedidoPatch(e.target.value)}
            placeholder="Id do pedido"
            style={{ padding: "5px", marginBottom: "5px", borderRadius: "7px", border: "1px solid black" }}
          />
          <input
            type="text"
            value={restaurantNamePatch}
            onChange={(e) => setRestaurantNamePatch(e.target.value)}
            placeholder="Nome Restaurante"
            style={{ padding: "5px", marginBottom: "5px", borderRadius: "7px", border: "1px solid black" }}
          />
          <br />
          <button
            onClick={() => {
              patch(idPedidoPatch, restaurantNamePatch); alert("oi")
            }}
            style={{ marginTop: "10px", padding: "5px", backgroundColor: "red", color: "white", fontSize: "18px", fontWeight: "bold", border: "1px solid rgb(136, 2, 2)", borderRadius: "5px" }}
          >
            Alterar
          </button>
        </div>
        <div style={{ maxWidth: "300px" }}>{/* BUSCA POR RESTAURANTE */}
        <h1>Buscar Pedido por Restaurante</h1>
          <input 
              type="text"
              value={restaurantName}
              onChange={(e) => {setRestaurantName(e.target.value)}} placeholder="Nome restaurante" style={{padding: "5px", marginBottom: "5px", borderRadius: "7px", border: "1px solid black"}}/>
              
          <br />
          <button onClick={()=> {buscarPedidoPorRestaurante();}} style={{marginTop: "10px", padding:"5px", backgroundColor: "red", color: "white", fontSize:"18px", fontWeight: "bold", border: "1px solid rgb(136, 2, 2)", borderRadius:"5px" }}>Buscar</button>
          {listaPedidosRestaurante(pedidosRestaurante)}
        </div>
      </div>
    </React.Fragment>
  )
}

export default CentralPedidosPage
