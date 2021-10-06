import React from 'react';
import { Box, Badge, Image } from '@chakra-ui/react';
import { BookModel } from 'src/shared/models/BookModel';
import CommonProps from 'CommonPropsAlias';

export interface BookProps extends CommonProps{
  book: BookModel,
  details: {
    enable: boolean,
    status: string,
    progress: number
  }
}

function render(url: string) {
  const newWindow = window.open(); 
  if(newWindow !== null) {
    newWindow['bookApi'].render(url); 
  }  
}

export default function LibraryBook(props: BookProps) {
  const book = props.book;
  const details = props.details;

  return (
    <Card>
      <Image onClick={() => { render(book.url) }} src={book.artUrl} />
      {details.enable && (
        <Details>
          <Status status={details.status} progress={details.progress} />
          <Info title={book.title} author={book.author} />
        </Details>
      )}
    </Card>
  );
}

function Card(props: CommonProps) {
  const styles = {
    mb: '15px',
    maxW: '20vmax',
    borderWidth: '1px',
    borderRadius: 'sm',
    overflow: 'hidden',
  };
  return <Box className="LibraryBook" { ...styles }>{ props.children }</Box>;
}

function Details(props: CommonProps) {
  return <Box p="2">{ props.children }</Box>;
}

interface StatusProps extends CommonProps {
  status?: string,
  progress?: number
}

function Status(props: StatusProps) {
  return (
    <Box d="flex" alignItems="baseline">
      <Badge borderRadius="full" px="2" colorScheme="teal">
        {props.status}
      </Badge>
      <Box
        color="gray.500"
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize="xs"
        textTransform="uppercase"
        ml="2"
      >
        {props.progress}% Done
      </Box>
    </Box>
  );
}

interface InfoProps extends CommonProps {
  title?: string,
  author?: string
}

function Info(props: InfoProps) {
  return (
    <>
      <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
        {props.title}
      </Box>

      <Box> {props.author} </Box>
    </>
  );
}
