import { styled } from "..";

export const Container = styled('div',{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})


export const ShoppingCart = styled('button', {
  width: '3rem',
  height: '3rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  
  background: '$gray800',
  color: '$gray300',
  border: 'none',
  borderRadius: 4,
  '&>svg': {
    fill: 'red'
  },
  variants: {
    color : {
      active: {
        // color: '$gray300'
        '& > img': {
        }
      }
    }
  },

  "&:hover": {
    cursor: 'pointer',
    opacity: 0.8
  },

  '& > span' : {
    position: 'absolute',
    display: 'block',
    top: -12,
    right: -12,
    width: 30,
    height: 30,

    border: '4px solid $gray900',
    borderRadius: 15,
    fontWeight: 'bold',
    padding: '4px 0',
    background: '$green500',
    
    textAlign: 'center',
    fontSize: '0.875rem',
  },


})

export const CartPage = styled('div', {
  width: 480,
  minHeight: '100%',
  maxHeight: '100vh',
  position: 'absolute',
  top: 0,
  right: 0,
  background: '$gray800',
  variants: {
    opener : {
      open: {
        display:'block'
      },
      close: {
        display:"none"
      } 
    }
  },

  '& > div:first-child' : {
    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '23px',
    marginBottom: '10px',

    '& > button': {
      background: 'none',
      border: 'none',
      
      '&:hover': {
        cursor: 'pointer',
        opacity: 0.7
      }
    }
  } 
})

export const ContainerCart = styled('div', {
  width: 384,
  minHeight: '100%',
  height: 'calc(100vh - 120px)',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  overflowY: 'auto', 

  '& > div': {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  '& > p': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'calc(100vh - (100vh * 0.63))',
  }
})

export const ContainerItem = styled('div', {
  display: 'flex',
  gap: 20
})
export const ImageContainer = styled('div', {
  width: 102,
  height: 93,
  padding: '10px',
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
  flexDirection: 'column',
  gap: 20,
  
  '& > div': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:first-child': {
      fontSize: '1rem',
      color: '$gray100',
      '& > span': {
       
        fontSize: '1.125rem'
      }
    },
    '&:last-child': {
      fontSize: '1.125rem',
      color: '$gray100',
      '& > span': {
        fontWeight: 'bold',
        fontSize: '1.5rem'
      }
    },
    
  },
  '& > button': {
    background: '$green500',
    color: '$gray100',
    height: 69,
    width: '100%',
    border: 'none',
    borderRadius: 8,

    fontSize: '1.125rem',
    fontWeight: 'bold',
    '&:hover': {
      cursor: 'pointer',
      background: '$green300',
    }
  },
  button: { 
    marginTop: 'auto',
    backgroundColor: '$green500',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',
    
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },

    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
    }
  },
})