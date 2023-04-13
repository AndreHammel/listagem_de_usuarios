import { Input } from "@/components/Form";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'Mínimo 6 caracteres'),
  password_confirmation: yup.string().nullable().oneOf([
    null,
    yup.ref('password')
  ], "As senhas precisam ser iguais"),

})

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export default function CreateUser() {
  const { register, handleSubmit, formState:{ errors, isSubmitting }} = useForm({
    resolver: yupResolver(createUserFormSchema)
  })

  const handleCreaterUser: SubmitHandler<FieldValues> = async (values) => {
    await new Promise(resolver => setTimeout(resolver, 2000))
  }

  const emailError = errors?.email?.message 
  const nameError = errors?.name?.message 
  const passwordError = errors?.password?.message
  const passwordConfirmationError = errors?.password_confirmation?.message

  return(
    <Box>
      <Header />
      <Flex w='100%' my='1.5rem' maxWidth={1480} mx='auto' px='1.5rem'>
        <Sidebar />
        <Box
          as='form'
          flex='1'
          borderRadius={8}
          bg='gray.800'
          p={['6', '8']}
          onSubmit={handleSubmit(handleCreaterUser)}
        >
        <Heading size='lg' fontWeight='normal'>Criar usuário</Heading>
        <Divider my='1.5rem' borderColor='gray.700'/>

        <VStack spacing='8'>
          <SimpleGrid 
            minChildWidth='240px' 
            spacing={['6', '8']}
            w='100%'
          >
            <Input
              name='name'
              label='Nome
              completo'
              register={register} 
              error={nameError}
              />
            <Input
              name='email'
              type='email'
              label='E-mail'
              register={register} 
              error={emailError}

            />
          </SimpleGrid>
          <SimpleGrid 
            minChildWidth='240px' 
            spacing={['6', '8']}
            w='100%'
          >
            <Input
              name='password'
              type='password'
              label='Senha'
              register={register} 
              error={passwordError}
              />
            <Input
              name='password_confirmation'
              type='password'
              label='Confirmação da senha'
              register={register} 
              error={passwordConfirmationError}
              />
          </SimpleGrid>
        </VStack>

        <Flex
          mt='2rem'
          justify='flex-end'
        >
          <HStack spacing='1rem'>
            <Link href='/users' passHref>
              <Button colorScheme='whiteAlpha'>Cancelar</Button>
            </Link>
            <Button
              type='submit'
              colorScheme='pink'
              isLoading={isSubmitting}
            >
            Salvar</Button>
          </HStack>
        </Flex>
        </Box>
      </Flex>
    </Box>
  )
}