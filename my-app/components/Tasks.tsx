import { NextPage } from 'next'
import React from 'react'
import { Checkbox, Box, Flex, Text, Menu, MenuButton, IconButton, MenuList, Spacer, MenuItem } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Rows from '../interfaces/rows'

type TaskProps = {
    isFinished: boolean,
    name: string,
    description: string | null,
    deadline: string | null,
    deadline_color: string | null,
}

type TasksProps = {
    rows: Rows,
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

const Task: NextPage<TaskProps> = (props) => {
    return (
        <Box boxShadow="base" rounded="md" px={3} py={2} mt={3}>
            <Flex alignItems="center" width="100%">
                <Checkbox size="lg" colorScheme="green" mr={3} defaultChecked={props.isFinished}></Checkbox>
                <Box minW={0}>
                    <Text
                        fontSize="2xl"
                        fontWeight="600"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                    >
                        {props.name}
                    </Text>
                    {
                        (typeof props.description === "string") ?
                            <Text
                                color="gray"
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                            >
                                {props.description}
                            </Text>
                            : <></>
                    }
                    {
                        (typeof props.deadline === "string" && typeof props.deadline_color === "string") ?
                            <Text color={props.deadline_color} fontWeight="semibold">{props.deadline}</Text>
                            : <></>
                    }
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
                        <MenuItem color="red">Delete</MenuItem>
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
                        isFinished={x['isFinished']}
                        name={x['name']}
                        description={x['description']}
                        deadline={str}
                        deadline_color={color}
                        key={x['id']}
                    ></Task>
                );
            })}
        </>
    );
}

export default Tasks;