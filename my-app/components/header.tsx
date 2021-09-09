import { Container } from '@chakra-ui/layout'
import { Box } from "@chakra-ui/react"
import type { NextPage } from 'next'
import Head from 'next/head'

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
      <Box bg={"green.300"} w={"100%"} p={3} color={"white"} fontWeight={800} fontSize={"xl"}>
        Todolist
      </Box>
    </>
  )
}

export default Header