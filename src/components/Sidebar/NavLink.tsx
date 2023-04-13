import { Link as ChakraLink, Icon, Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { ElementType } from "react";
import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display='flex' alignContent="center" { ...rest}>
        <Icon as={icon} fontSize='20px'/>
        <Text ml='1rem' fontWeight='medium'>{ children }</Text>
      </ChakraLink>
    </ActiveLink>
  );
}