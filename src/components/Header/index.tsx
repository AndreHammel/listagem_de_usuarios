import { useSidebarDrawer } from "@/context/SidebarDrawerContext";
import { Flex, useBreakpointValue, Icon, IconButton } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { Logo } from "./logo";
import { NotificationNav } from "./NotificationsNav";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";


export function Header() {
  const { onOpen } = useSidebarDrawer()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
    <Flex
      as='header'
      w='100%'
      maxWidth={1480}
      h='5rem'
      mx='auto'
      mt='1rem'
      px='1.5rem'
      align='center'
    >
      { !isWideVersion && (
        <IconButton
          aria-label="Open navigation" 
          icon={<Icon as={RiMenuLine} />} 
          fontSize='24'
          variant='unstyled'
          onClick={onOpen}
          mr='2'
        >

        </IconButton>
      )}
      <Logo />
      { isWideVersion && <SearchBox />}
      <Flex align='center' ml='auto' >
        <NotificationNav />
        <Profile showProfileData={ isWideVersion }/>
      </Flex>
    </Flex>
  )
}