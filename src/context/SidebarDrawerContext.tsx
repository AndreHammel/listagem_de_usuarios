import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface SidebarDrawerProviderProps {
  children: ReactNode;
}

type SidebarDrawerContextData = UseDisclosureReturn

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);


export function SidebarDrawerProvider({ children }: SidebarDrawerProviderProps) {
  const disclose = useDisclosure()
  const router = useRouter()

  useEffect(() => {
    disclose.onClose()
  }, [router.asPath, disclose])

  return (
    <SidebarDrawerContext.Provider value={disclose}>
      { children }
    </SidebarDrawerContext.Provider>
  )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext)