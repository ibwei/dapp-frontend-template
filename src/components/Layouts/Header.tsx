import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  Menu,
  Spacer,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'

import ConnectWalletButton from 'components/ConnectWallet/index'

import menuList from 'config/menu'
import { useResponsive } from 'hooks/useResponsive'
import React from 'react'
import { LinkComponent } from './LinkComponent'

interface Props {
  className?: string
}

export function Header(props: Props) {
  const navTextColor = useColorModeValue('n900', 'white')
  const className = props.className ?? ''
  const { isMobile } = useResponsive()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef<any>()

  // const languageChange = (language: UserLanguage) => {
  //   dispatch(updateUserLanguage({ userLanguage: language }))
  //   const { pathname, asPath, query } = router
  //   dispatch(updateUserLanguage({ userLanguage: language }))
  //   router.push({ pathname, query }, asPath, { locale: language })
  // }

  // const currentLanguage = React.useMemo(() => {
  //   for (let i = 0; i < allLanguages.length; i++) {
  //     if (allLanguages[i].code === i18n.language) {
  //       return allLanguages[i].language
  //     }
  //   }
  //   return 'English'
  // }, [i18n.language])

  return (
    <Flex
      as="header"
      className={className}
      bg="#000"
      pl={[0, 9]}
      // pr={6}
      height={'64px'}
      width="100%"
      alignItems="center"
      borderBottom={'1px solid #000'}>
      <Flex alignItems="center" gap={[0, 14]} ml={[4, 0]}>
        <LinkComponent href="/futures">
          <Image src={isMobile ? '/vercel.svg' : '/vercel.svg'} alt="logo" width={[27, 119]} height={27} />
        </LinkComponent>
        {!isMobile && (
          <>
            {/* <LinkComponent href="/">
              <Text color={navTextColor} fontSize="16px" ml={[0, 9]}>
                Home
              </Text>
            </LinkComponent> */}
            <Menu autoSelect={true}>
              {/* <MenuButton
                _active={{ background: 'transparent' }}
                _hover={{ background: 'transparent' }}
                as={Button}
                bgColor="transparent"
                color={navTextColor}
                fontSize="16px"
                ml={[0, 9]}
                fontWeight={400}
                rightIcon={<ChevronDownIcon />}>
                Earn
              </MenuButton> */}
              {/* <MenuList bgColor={bgColor}>
                <MenuItem padding="12px 24px" bgColor={bgColor} _hover={{ opacity: 0.6 }}>
                  <LinkComponent href="/earn">
                    <Text fontSize="16px" color={navTextColor}>
                      Overview
                    </Text>
                  </LinkComponent>
                </MenuItem>
                <MenuItem padding="12px 24px" bgColor={bgColor} _hover={{ opacity: 0.6 }}>
                  <LinkComponent href="/earn/liquidity">
                    <Text fontSize="16px" color={navTextColor}>
                      Liquidity
                    </Text>
                  </LinkComponent>
                </MenuItem>
              </MenuList> */}
            </Menu>
          </>
        )}
      </Flex>

      <Spacer />
      <Flex alignItems="center">
        {/* <Flex mr="16px">
          <NetworkSelector />
        </Flex> */}
        <Flex width={['auto', '160px']}>
          <ConnectWalletButton />
        </Flex>
        {isMobile && (
          <Flex ml="6px" mr="10px">
            <IconButton
              variant="link"
              colorScheme={navTextColor}
              aria-label="menu"
              fontSize="24px"
              icon={<HamburgerIcon />}
              onClick={() => onOpen()}
            />
            <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
              <DrawerOverlay />
              <DrawerContent bg="#0F0F0F">
                <DrawerCloseButton />
                {/* <DrawerHeader></DrawerHeader> */}
                <DrawerBody padding="40px 24px">
                  {menuList.map((menu, index) => {
                    if (!menu?.items) {
                      return (
                        <LinkComponent href={menu.href} key={index}>
                          <Text color={navTextColor} fontSize="16px" mt="10px" onClick={onClose}>
                            {menu.label}
                          </Text>
                        </LinkComponent>
                      )
                    }
                    return (
                      <React.Fragment key={index}>
                        <Text color={navTextColor} fontSize="16px" mt="10px">
                          {menu.label}
                        </Text>
                        <Flex flexFlow="column nowrap" justifyContent="flex-start" alignItems="flex-start" pl="20px" mt="5px" rowGap="5px">
                          {menu.items.map((subMenu, subIndex) => {
                            return (
                              <LinkComponent href={subMenu.href} key={subIndex}>
                                <Text fontSize="14px" fontWeight={300} onClick={onClose}>
                                  {subMenu.label}
                                </Text>
                              </LinkComponent>
                            )
                          })}
                        </Flex>
                      </React.Fragment>
                    )
                  })}
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Flex>
        )}
        {/* <ThemeSwitcher /> */}
        {/* <Popover placement="bottom" closeOnBlur={true} trigger="hover">
          <PopoverTrigger>
            <Text color={useColorModeValue(`gray.600`, `gray.400`)} cursor={'pointer'}>
              {currentLanguage}
            </Text>
          </PopoverTrigger>
          <PopoverContent bg={useColorModeValue('background', 'background')} width="120px" sx={{ outline: 'none' }}>
            {allLanguages.map((lng, index) => {
              return (
                <Text key={index} my="8px" mx="5px" cursor={'pointer'} onClick={() => languageChange(lng?.code as UserLanguage)}>
                  {lng.language}
                </Text>
              )
            })}
          </PopoverContent>
        </Popover> */}
      </Flex>
    </Flex>
  )
}
