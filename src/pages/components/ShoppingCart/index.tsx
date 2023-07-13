import { ShoppingCartContext } from "@/contexts"
import { CartPage, ContainerCart, ContainerInfo, ContainerItem, ContainerTotal, ImageContainer } from "./style"
import { useContext } from "react"

export function ShoppingCart() {
  const { cartList } = useContext(ShoppingCartContext)
  console.log(cartList)
  return (
      <ContainerCart> 
      {cartList.length > 0 && cartList.map((cartItem, index) =>{
        return (
        <ContainerItem key={index}>
          <ImageContainer>
            {/* <Image src={cartItem.imageUrl} width={520} height={480} alt=""/> */}
          </ImageContainer>
          <ContainerInfo>
            <h2>Camiseta Beyond the Limits</h2>
            <span>R$ 79,90</span>
            <button>Remover</button>
          </ContainerInfo>
        </ContainerItem>)
        })}
        <ContainerItem >
        <ImageContainer>
          {/* <Image src={cartItem.imageUrl} width={520} height={480} alt=""/> */}
        </ImageContainer>
        <ContainerInfo>
          <h2>Camiseta Beyond the Limits</h2>
          <span>R$ 79,90</span>
          <button>Remover</button>
        </ContainerInfo>
      </ContainerItem>
      <ContainerTotal>
        <div><span>Quantidade</span> <span>3 itens</span></div>
      </ContainerTotal>
      </ContainerCart>
  
  )
}



