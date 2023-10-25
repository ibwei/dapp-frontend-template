import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Flex, Text } from '@chakra-ui/react'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useTypeColorModeValue } from 'config'
import { useResponsive } from 'hooks/useResponsive'
import { useWeb3React } from 'hooks/useWeb3React'
import React from 'react'

const ConnectWalletButton: React.FC = () => {
  const primaryColor = useTypeColorModeValue('light.primary', 'dark.primary')

  const modal = useWeb3Modal()
  const { account } = useWeb3React()
  const { isMobile } = useResponsive()

  const openWalletModal = async () => {
    modal.open()
  }

  const shortAccount = React.useMemo(() => `${account?.slice(0, isMobile ? 4 : 5)}....${account?.slice(isMobile ? -2 : -4)}`, [account, isMobile])

  return (
    <Flex width="100%" h="40px" alignItems="center">
      {account && (
        <Button rightIcon={<ChevronDownIcon ml="-5px" />} onClick={() => openWalletModal()}>
          <Text fontWeight={400} fontFamily="Lexend" fontSize="14px">
            {shortAccount}
          </Text>
        </Button>
      )}
      {!account && (
        <Button bgColor={primaryColor} onClick={() => openWalletModal()}>
          <Text fontWeight={[400, 500]} fontSize="14px">
            Connect Wallet
          </Text>
        </Button>
      )}
    </Flex>
  )
}

export default ConnectWalletButton
