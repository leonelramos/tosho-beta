import React, { Children } from "react";
import { Box } from "@chakra-ui/layout";
import LibraryItem from "./LibraryItem";

export default function Library() {
    return (
        <LibraryContainer>
            <LibraryItem />
        </LibraryContainer>
    )
}

function LibraryContainer(props) {
    return (
        <Box>
            {props.children}
        </Box>
    )
}