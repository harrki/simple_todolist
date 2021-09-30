import { GetServerSideProps, NextPage } from "next";
import { useForm } from "react-hook-form";
import {
    Flex,
    HStack,
    Text,
    Input,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from "@chakra-ui/react";
import dayjs from "dayjs";

type postTaskProps =
    (
        name: string,
        description: string,
        year: string,
        month: string,
        day: string,
        hours: string,
        minutes: string,
    ) => void;

type AddTaskProps = {
    onSubmit:() => Promise<void>
}

const postTask: postTaskProps = async (name, description, year, month, day, hours, minutes) => {
    const isNum = (str: string) => Number.isInteger(parseInt(str));
    let date = null;
    if (isNum(year) && isNum(month) && isNum(day)) {
        date = year + "-" + month + "-" + day;
        if (isNum(hours) && isNum(minutes)) {
            date += " " + hours + ":" + minutes;
        }
    }

    let data = {
        name: name,
        description: (typeof description === "string" && description != "") ? description : null,
        deadline: date,
    }

    await fetch("/api/task", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }
    })
};

const AddTask: NextPage<AddTaskProps> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm();

    const onSubmit = async (values: any) => {
        await postTask(values["name"], values["description"], values["year"], values["month"], values["day"], values["hours"], values["minutes"]);
        await props.onSubmit();
    }

    return (
        <>
            <Button colorScheme="teal" w="100%" my={3} onClick={onOpen}>ADD</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add my task</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <FormControl isRequired>
                                <FormLabel htmlFor="name">Task Name</FormLabel>
                                <Input placeholder="Task Name" {...register("name", { required: true })} />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Description</FormLabel>
                                <Input placeholder="Description" {...register("description")}></Input>
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Date</FormLabel>
                                <HStack spacing={4}>
                                    <NumberInput defaultValue={dayjs().year()}>
                                        <NumberInputField  {...register("year")} />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                    <Text>/</Text>
                                    <NumberInput max={12} min={1}>
                                        <NumberInputField  {...register("month", { min: 1, max: 12 })} />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                    <Text>/</Text>
                                    <NumberInput max={31} min={1}>
                                        <NumberInputField  {...register("day", { min: 1, max: 31 })} />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </HStack>
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Time</FormLabel>
                                <HStack spacing={4}>
                                    <NumberInput max={23} min={1}>
                                        <NumberInputField  {...register("hours", { min: 1, max: 24 })} />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                    <Text>:</Text>
                                    <NumberInput max={59} min={1}>
                                        <NumberInputField  {...register("minutes", { min: 1, max: 59 })} />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </HStack>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="teal" isLoading={isSubmitting} type="submit">Add</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
}

export default AddTask;