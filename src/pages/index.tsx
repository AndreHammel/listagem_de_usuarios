import { Input } from "@/components/Form"
import { Button, Flex, Stack } from "@chakra-ui/react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
})

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  const handleSingIn: SubmitHandler<FieldValues> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(values)
    console.log(formState)
  }

  const errorEmail = formState.errors.email?.message 
  const errorPassword = formState.errors.password?.message

  return (
    <Flex
      w='100vw'
      h='100vh'
      align='center'
      justify='center'
    >
      <Flex
        as='form'
        w='100%'
        maxWidth={360}
        bg='gray.800'
        p="2rem"
        borderRadius='8px'
        flexDirection='column'
        onSubmit={handleSubmit(handleSingIn)}
      >
        <Stack spacing='1rem'>
          <Input 
            type='email' 
            name='email' 
            label='E-mail' 
            register={register}
            error={errorEmail}
          />
          <Input 
            type='password' 
            name='password' 
            label='Senha' 
            register={register}
            error={errorPassword}

          />
        </Stack>
        <Button 
          type='submit' 
          mt='1.5rem' 
          colorScheme='pink'
          size='lg'
          isLoading={formState.isSubmitting}
        >Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
