import type { NextPage, GetServerSideProps } from 'next'
import { Container } from '@chakra-ui/layout'
import { Heading } from '@chakra-ui/react'
import getTasks from '../lib/getTasks'
import Rows from '../interfaces/rows'
import Header from '../components/Header'
import Tasks from '../components/Tasks'
import AddTask from '../components/AddTask'

type HomeProps = {
  rows: Rows,
}

export const getServerSideProps: GetServerSideProps = async () => {
  const rows: Rows = await getTasks();
  return {
    props: {
      rows,
    },
  }
}

const Home: NextPage<HomeProps> = ({ rows }) => {
  return (
    <>
      <Header />
      <Container maxW="container.md">
        <Heading as="h1" mt={10} size="2xl">Tasks</Heading>
        <Tasks rows={rows} />
        <AddTask />
      </Container>
    </>
  )
}

export default Home
