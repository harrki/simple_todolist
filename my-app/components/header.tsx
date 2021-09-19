import type { NextPage } from 'next'
import Head from 'next/head'
import { Box, Button, Flex, Spacer, Heading } from "@chakra-ui/react"

const Header: NextPage = () => {
    return (
        <>
            <Head>
                <title>Todolist</title>
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
                    rel="stylesheet"
                />
            </Head>

            <Box w="100%" p={3}>
                <Flex align="center">
                    <Heading fontSize="3xl" fontWeight={700}>Todolist</Heading>
                    <Spacer />
                    <Button colorScheme="teal" variant="outline" mr="4">
                        Login
                    </Button>
                    <Button colorScheme="teal" variant="solid">
                        Sign Up
                    </Button>
                </Flex>
            </Box>
        </>
    )
}

export default Header