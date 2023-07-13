import { styled } from "@/styles"

export const CartPage = styled('div', {
  width: 480,
  height: '100vh',
  position: 'absolute',
  top: 0,
  right: 0,
  background: '$gray800',
})

export const ContainerCart = styled('div', {
  width: 384,
  height: '100vh',
  margin: '0 auto'
})
export const ContainerItem = styled('div', {
  display: 'flex',
  gap: 20
})
export const ImageContainer = styled('div', {
  width: 102,
  height: 93,
  borderRadius: '8px',
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  }

})
export const ContainerInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '5px 0',

  '& > h2': {
    fontSize: 18
  },


  '& > span': {
    marginTop: 8,
    fontSize: 18
  },

  '& > button': {
    marginTop: 10,
    fontSize: 18,
    background: 'none',
    border: 'none',
    textAlign: 'left',
    
    color: '$green500',

    '&:hover': {
      color: '$green300',
      cursor: 'pointer'
    }
  }
  
})

export const ContainerTotal = styled('div', {
  display: 'flex',
  gap: 20
})