import { Box, Flex, Image, LinkBox, Text } from '@chakra-ui/react'
import { useTypeColorModeValue } from 'config'
LinkBox

type Props = {
  href: string
  children: JSX.Element | string
  useDefaultStyle?: boolean
}

function ExternalLink({ href, children, useDefaultStyle = true }: Props) {
  const linkColor = useTypeColorModeValue('light.primary', 'dark.primary')
  return (
    <LinkBox>
      <Box as="a" href={href} target="_blank" rel="noopener noreferrer" _hover={{ opacity: 0.8 }}>
        <Flex justifyContent="center" alignItems="center" mt="6px">
          {useDefaultStyle ? (
            <Text fontFamily="Lexend" fontSize={14} fontWeight={400} color={linkColor}>
              {children}
            </Text>
          ) : (
            children
          )}
          <Image src="/assets/icons/link-share.svg" boxSize="12px" alt="share-link" ml="8px" />
        </Flex>
      </Box>
    </LinkBox>
  )
}

export default ExternalLink
