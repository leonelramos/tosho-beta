import React, { useState } from "react";
import { Flex, Box } from "@chakra-ui/layout";
import LibraryBook from "./LibraryBook";

const testBookUrl = new URL("../../../testing-books/Wonder Tales.epub", import.meta.url)
//const testBookUrl = path.resolve("../../../testing-books/Wonder Tales.epub")

export default function Library(props) {
    const testBook = {
        title: "Dune",
        author: "Frank Herbert",
        url: testBookUrl,
        coverUrl: "https://images-na.ssl-images-amazon.com/images/I/A1u+2fY5yTL.jpg",
        coverAlt: "Dune by Frank Herbert"
    }

    console.log(testBook.url)

    const testDetails = {
        enable: true,
        status: "READING",
        progress: 65
    }

    return (
        <LibraryContainer>
            {
                [...Array(10)].map((_, key) => {
                    return <LibraryBook key={key} details={testDetails} book={testBook}/>
                })   
            }
        </LibraryContainer>
    )
}

function LibraryContainer(props) {
    return (<>
        <Flex 
            flexWrap="wrap"
            justifyContent="space-between"
            margin="15px"
            className="library-container"
        >
            {props.children}
        </Flex>
    </>)
}