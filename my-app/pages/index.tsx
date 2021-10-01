import type { NextPage, GetServerSideProps } from 'next'
import { Container } from '@chakra-ui/layout'
import { Heading } from '@chakra-ui/react'
import getTasks from '../lib/getTasks'
import Rows from '../interfaces/rows'
import Header from '../components/Header'
import Tasks from '../components/Tasks'
import AddTask from '../components/AddTask'
import { useState } from 'react'

type HomeProps = {
  firstRows: Rows,
}

export const getServerSideProps: GetServerSideProps = async () => {
  const firstRows: Rows = await getTasks();
  return {
    props: {
      firstRows,
    },
  }
}

const Home: NextPage<HomeProps> = ({ firstRows }) => {
  const [rows,setRows] = useState(firstRows);

  const updateTasks = async ()=>{
    const res:any = await fetch("/api/task");
    const data = await res.json();
    setRows(data);
  }

  return (
    <>
      <Header />
      <Container maxW="container.md">
        <Heading as="h1" mt={10} size="2xl">Tasks</Heading>
        <Tasks rows={rows} updateTasks={updateTasks}/>
        <AddTask onSubmit={updateTasks} />
      </Container>
    </>
  )
}

export default Home
