import { Flex, useColorModeValue, Stack, Heading, Box, FormControl, FormLabel, Input, Checkbox, Button, Text, InputGroup, InputRightElement } from '@chakra-ui/react';
import axios, { AxiosRequestConfig } from 'axios'
import logging from 'config/logging'
import React, { ChangeEvent } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
export default function Register() {
    const [username, setUsername] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const [uiErr, setUIErr] = React.useState<string>('')
    const [showPassword, setShowPassword] = React.useState(false);

    const history = useHistory()
    const registerClicked = async () => {
        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:8000/users/auth/register',
                data: {
                    username,
                    password
                },
            })

            if (response.status === 201) {
                //No need to move to login 
                history.push('/login')
            } else {
                setUIErr('Register failed!')
            }
        } catch (error) {
            alert((error as Error).message)

            logging.error("Regsiter", (error as Error).message, error)
        }
    }
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Create a new account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        {/* to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️ */}
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Username</FormLabel>
                            <Input onChange={(e: ChangeEvent<HTMLInputElement>) => { setUsername(e.target.value as unknown as string) }} type="text" />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input onChange={(e: ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value as unknown as string) }} type={showPassword ? 'text' : 'password'} />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() =>
                                            setShowPassword((showPassword) => !showPassword)
                                        }>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10}>
                            
                            <Button
                                onClick={registerClicked}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign up
                            </Button>
                            <Link to={"/login"}>
                                <Text fontSize={'lg'} color={'#2ad'}>
                                    Already a memeber? Sign in here!
                                </Text>
                            </Link>

                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}
