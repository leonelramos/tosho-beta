import React, { useState } from 'react';
import { Box, Badge, Image } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

export default function LibraryBook(props) {
  const [book, setBook] = useState(props.book);
  const { details } = props;

  return (
    <Card className="LibraryBook">
      <Image src={book.coverUrl} alt={book.coverAlt} />

      {details.enable
                && (
                <Details>
                  {/* <Status status={details.status} progress={details.progress} /> */}
                  <Info title={book.title} author={book.author} />
                </Details>
                )}
    </Card>
  );
}

function Card(props) {
  const styles = {
    mb: '15px',
    maxW: '20vmax',
    borderWidth: '1px',
    borderRadius: 'sm',
    overflow: 'hidden',
  };
  return (
    <Box {...styles}>
      {props.children}
    </Box>
  );
}

function Details(props) {
  return (
    <Box p="2">{props.children}</Box>
  );
}

function Status(props) {
  return (
    <Box d="flex" alignItems="baseline">
      <Badge borderRadius="full" px="2" colorScheme="teal">
        Reading
      </Badge>
      <Box
        color="gray.500"
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize="xs"
        textTransform="uppercase"
        ml="2"
      >
        {props.progress}
        % Done
      </Box>
    </Box>
  );
}

function Info(props) {
  return (
    <>
      <Box
        mt="1"
        fontWeight="semibold"
        as="h4"
        lineHeight="tight"
        isTruncated
      >
        {props.title}
      </Box>

      <Box>
        {' '}
        {props.author}
        {' '}
      </Box>
    </>
  );
}

function Ratings(props) {
  return (
    <Box d="flex" mt="2" alignItems="center">
      {Array(5).fill('').map((_, i) => (
        <StarIcon
          key={i}
          color={i < props.rating ? 'teal.500' : 'gray.300'}
        />
      ))}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {props.reviewCount}
        {' '}
        reviews
      </Box>
    </Box>
  );
}
