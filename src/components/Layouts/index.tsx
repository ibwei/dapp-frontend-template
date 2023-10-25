import { Box, Container } from '@chakra-ui/react'
import { useAppResponsive } from 'hooks/useResponsive'
import { ReactNode } from 'react'
import { Header } from './Header'

interface Props {
  children: ReactNode
}

export function Layout(props: Props) {
  // init device info
  useAppResponsive()

  return (
    <Box margin="0 auto" minH="100vh" bg="#fff">
      <Header />
      <Container maxW="100vw" overflowX={'hidden'}>
        {props.children}
      </Container>
    </Box>
  )
}
