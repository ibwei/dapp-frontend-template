import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Text, keyframes } from '@chakra-ui/react'
import { TokenLogo } from 'components/Common'
import { CHAINIDS, CHAINS, getChainInfo, useTypeColorModeValue } from 'config'
import { useResponsive } from 'hooks/useResponsive'
import { useActiveWeb3React, useWeb3React } from 'hooks/useWeb3React'
import React from 'react'

const Twinkle = keyframes`
      0%{
        transform: scale(1);
      }
      50%{
        transform: scale(1.2);
      }
      100%{
        transform: scale(1);
      }
`

const NetworkSelector: React.FC = () => {
  const w100Color = useTypeColorModeValue('light.primary', 'dark.primary')
  const b200Color = useTypeColorModeValue('light.primary', 'dark.primary')
  const errorBgColor = 'rgba(246, 70, 93, 0.1)'
  const { isMobile } = useResponsive()

  const { chainId: currentChainId, chain } = useWeb3React()
  const { switchNetwork } = useActiveWeb3React()

  const currentChainInfo = getChainInfo(currentChainId)

  const handleSwitchNetwork = React.useCallback(
    async (chainId: CHAINIDS) => {
      await switchNetwork(chainId)
    },
    [switchNetwork]
  )

  const isWrongNetwork = React.useMemo(() => {
    if (chain && chain?.unsupported) {
      return true
    }
    return false
  }, [chain])

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            bgColor={isWrongNetwork ? errorBgColor : w100Color}
            as={Button}
            rightIcon={
              isOpen ? <ChevronUpIcon color={isWrongNetwork ? '#f00' : '#fff'} /> : <ChevronDownIcon color={isWrongNetwork ? '#f00' : '#fff'} />
            }>
            {!isWrongNetwork && (
              <Flex height="40px" justifyContent="space-between" alignItems="center" flexFlow="row nowrap">
                <TokenLogo src={`/assets/chains/${currentChainId}.svg`} width={20} height={20} alt="chain-logo" />
                {!isMobile && (
                  <Text fontWeight={400} fontSize="14px" ml="8px">
                    {currentChainInfo.name}
                  </Text>
                )}
              </Flex>
            )}
            {isWrongNetwork && (
              <Flex height="40px" justifyContent="space-between" alignItems="center" flexFlow="row nowrap">
                <Image src="/assets/icons/danger.svg" width="20px" height="20px" alt="wrong-logo" />
                {!isMobile && (
                  <Text fontWeight={400} color="short" fontSize="14px" ml="8px">
                    Wrong Network
                  </Text>
                )}
              </Flex>
            )}
          </MenuButton>
          <MenuList bgColor="b200" padding="0" paddingBottom="10px">
            {CHAINS.map((chain) => {
              return (
                <MenuItem
                  bgColor="b200"
                  key={chain.id}
                  onClick={() => handleSwitchNetwork(chain.id)}
                  _hover={{ background: w100Color }}
                  height="40px">
                  <Flex width="100%" pl="6px" fontWeight="400" justifyContent="space-between" alignItems="center">
                    <Flex justifyContent="flex-start" alignItems="center">
                      <TokenLogo src={`/assets/chains/${chain.id}.svg`} width={20} height={20} alt="chain-logo" />
                      <Text fontWeight={400} fontSize="14px" ml="8px">
                        {chain.name}
                      </Text>
                    </Flex>
                    {chain.id === currentChainId && !isWrongNetwork && (
                      <Box animation={`${Twinkle} 2s ease infinite`} width="8px" height="8px" bgColor="long" borderRadius="50%" />
                    )}
                  </Flex>
                </MenuItem>
              )
            })}
            <Box height="10px" bgColor={b200Color} />
          </MenuList>
        </>
      )}
    </Menu>
  )
}

export default React.memo(NetworkSelector)
