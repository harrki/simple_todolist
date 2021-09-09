import { Container } from '@chakra-ui/layout'
import { Heading } from "@chakra-ui/react"
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/header'
import Task from '../components/task'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Todolist</title>
      </Head>
      <Header />
      <Container maxW={'container.md'}>
        <Heading as={"h1"} mt={10} size={"2xl"}>Tasks</Heading>
        <Task text={"test"}></Task>
        <Task text={"test1"}></Task>
      </Container>
    </>
  )
}

export default Home
