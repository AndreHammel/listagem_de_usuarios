import { FormControl, FormErrorMessage, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";
import { FieldError, FieldErrorsImpl, Merge} from 'react-hook-form'

interface InputProps extends ChakraInputProps{
  name: string;
  label?: string;
  register: any;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined | null;
}

export function Input({ name, label, register, error=null, ...rest }: InputProps) {
  return (
    <FormControl isInvalid={!!error}>
      { !!label && <FormLabel htmlFor={ name }>{ label }</FormLabel> }
      <ChakraInput
        id={ name }
        name={ name } 
        focusBorderColor="pink.500" 
        bg='gray.900'
        variant='filled'
        _hover={{
          bg: 'gray.900'
        }}
        size='lg'
        { ...register(name)}
        { ...rest }
      />
      { !!error && 
        (
          <FormErrorMessage>
            { String(error) }
          </FormErrorMessage>
        )
      }
    </FormControl>
  )
}