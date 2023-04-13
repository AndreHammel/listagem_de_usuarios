import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
  return(
    <Flex align='center'>
      { showProfileData && (
        <Box mr='1rem' textAlign='right'>
          <Text>Joselito Silva</Text>
          <Text 
            color='gray.300' 
            fontSize='small'
          >
            joselito@gmail.com
          </Text>
        </Box>
      )}
      <Avatar size='md' name='joselito silva'/>
    </Flex>
  )
}