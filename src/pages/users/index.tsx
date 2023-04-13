import { Header } from "@/components/Header";
import { Pagination } from "@/components/Pagination";
import { Sidebar } from "@/components/Sidebar";
import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, useBreakpointValue, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { useQuery } from 'react-query'

interface UserType {
  id: number,
  name: string,
  email: string,
  createdAt: string
}

export default function UserList() {
  const { data, isLoading, error } = useQuery('users', async () => {
    const response = await fetch('http://localhost:3000/v1/users')
    const data = await response.json()
    const users = data.users.map((user: UserType) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: new Date(user.createdAt).toLocaleDateString('pt-Br', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })
      }
    })
    return users
  })

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })


  return(
    <Box>
      <Header />
      <Flex w='100%' my='1.5rem' maxWidth={1480} mx='auto' px='1.5rem'>
        <Sidebar />
        <Box 
          flex='1'
          borderRadius={8}
          bg='gray.800'
          p='2rem'
        >
          <Flex
            mb='2rem'
            justify='space-between'
            alignContent='center'
          >
            <Heading size='lg' fontWeight='normal'>Usuários</Heading>
            <Link href='/users/create'>
              <Button
                size='sm'
                fontSize='sm'
                colorScheme='pink'
                leftIcon={<Icon as={RiAddLine} fontSize='20px'/>}
                >
                Criar novo
              </Button>
            </Link>
          </Flex>
          { isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme='whiteAlpha'>
                <Thead>
                  <Tr>
                    <Th px={['4', '4', '6']} color='gray.300' width='2rem'>
                      <Checkbox colorScheme='pink'/>
                    </Th>
                    <Th>Usuário</Th>
                    { isWideVersion && <Th>Data de cadastro</Th>}
                    { isWideVersion && <Th w='2rem'></Th> }
                  </Tr>
                </Thead>
                <Tbody>
                  { data.map((user: UserType) => (
                    <Tr key={user.id}>
                      <Td px={['4', '4', '6']}>
                        <Checkbox colorScheme='pink'/>
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight='bold'>{ user.name }</Text>
                          <Text fontSize='sm' color='gray.300'>{ user.email }</Text>
                        </Box>
                      </Td>
                      { isWideVersion && <Td>{ user.createdAt }</Td> }
                      { isWideVersion && (
                        <Td>
                            <Button
                              as='a'
                              size='sm'
                              fontSize='sm'
                              colorScheme='purple'
                              leftIcon={<Icon as={RiPencilLine} fontSize='16px'/>}
                            >
                            </Button>
                        </Td>
                      )}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Pagination />
            </>
          ) }
        </Box>
      </Flex>
    </Box>
  )
}