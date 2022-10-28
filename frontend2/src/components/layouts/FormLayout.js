import { Box, Heading, Stack } from "@chakra-ui/react";
import BaseLayout from "./BaseLayout";

const FormLayout = (props) => {
  return (
    <BaseLayout>
      <Stack mt="150" spacing="5">
        <Heading textAlign="center" color="#ffffff">
          {props.title}
        </Heading>
        <Box p="8" bg="#ffffff" rounded="lg" boxShadow="lg">
          {props.form}
        </Box>
      </Stack>
    </BaseLayout>
  );
};

export default FormLayout;
