import { NextPage } from 'next'
import React from 'react'
import { Checkbox, Box, Flex, Text, Menu, MenuButton, IconButton, MenuList, Spacer, MenuItem } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Rows from '../interfaces/rows'

type TaskProps = {
    id: string,
    isFinished: boolean,
    name: string,
    description: string | null,
    deadline: string | null,
    deadline_color: string | null,
    updateTasks: () => Promise<void>,
}

type TasksProps = {
    rows: Rows,
    updateTasks: () => Promise<void>,
}

const calcRemainingDate = (deadline: (string | null)) => {
    let str, color;
    dayjs.extend(relativeTime)
    if (typeof deadline === "string") {
        str = dayjs(deadline, "YYYY-M-D H:m").fromNow();
        if (dayjs().isAfter(dayjs(deadline, "YYYY-M-D H:m"))) {
            color = "red.500";
        } else {
            color = "gray";
        }
    } else {
        str = null;
        color = null;
    }
    return { "str": str, "color": color }
}

const Name = (isFinished: boolean, name: string) => {
    if (isFinished) {
        return (
            <Text
                as="del"
                color="gray"
                fontSize="2xl"
                fontWeight="600"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
            >
                {name}
            </Text>
        );
    } else {
        return (
            <Text
                fontSize="2xl"
                fontWeight="600"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
            >
                {name}
            </Text>
        );
    }
}

const Description = (description: (string | null)) => {
    if (typeof description === "string") {
        return (
            <Text
                color="gray"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
            >
                {description}
            </Text>
        );
    }

    return (<></>);
}

const Deadline = (deadline: (string | null), color: (string | null)) => {
    if (typeof deadline === "string" && typeof color === "string") {
        return (
            <Text color={color} fontWeight="semibold">{deadline}</Text>
        );
    }

    return (<></>);
}

const Task: NextPage<TaskProps> = (props) => {
    const deleteTask = async (id: string) => {
        await fetch("/api/task/" + id, {
            "method": "DELETE",
        })
        await props.updateTasks();
    }

    const checkTask = async (id: string, isFinished: boolean) => {
        const data = { "isFinished": isFinished, name: null, "description": null, "deadline": null };
        console.log(data);
        await fetch("/api/task/" + id, {
            "method": "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        })
        await props.updateTasks();
    }

    return (
        <Box boxShadow="base" rounded="md" px={3} py={2} mt={3}>
            <Flex alignItems="center" width="100%">
                <Checkbox
                    size="lg"
                    colorScheme="green"
                    mr={3}
                    defaultChecked={props.isFinished}
                    onChange={async () => { await checkTask(props.id, !props.isFinished) }}>
                </Checkbox>
                <Box minW={0}>
                    {Name(props.isFinished, props.name)}
                    {Description(props.description)}
                    {Deadline(props.deadline, props.deadline_color)}
                </Box>
                <Spacer />
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<ChevronDownIcon />}
                        variant="ghost"
                    />
                    <MenuList>
                        <MenuItem>Edit</MenuItem>
                        <MenuItem color="red" onClick={async () => { await deleteTask(props.id) }}>Delete</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Box>
    );
}

const Tasks: NextPage<TasksProps> = (props) => {
    dayjs.extend(relativeTime);
    return (
        <>
            {props.rows.map(x => {
                const { str, color } = calcRemainingDate(x['deadline']);
                return (
                    <Task
                        id={x['id']}
                        isFinished={x['isFinished']}
                        name={x['name']}
                        description={x['description']}
                        deadline={str}
                        deadline_color={color}
                        key={x['id']}
                        updateTasks={props.updateTasks}
                    ></Task>
                );
            })}
        </>
    );
}

export default Tasks;