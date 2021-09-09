import { NextPage } from "next";
import { Checkbox, Box, CheckboxGroup } from "@chakra-ui/react"

type TaskProps = {
    text: string,
}

const Task: NextPage<TaskProps> = (props) => {
    return (
        <>
            <Box boxShadow="base" rounded="md" p={4} mt={3}>
                <Checkbox size="lg" colorScheme="green">
                    {props.text}
                </Checkbox>
            </Box>
        </>
    );
};

export default Task;