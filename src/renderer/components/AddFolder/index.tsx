import React from 'react';
import { Button } from '@chakra-ui/react';
import { AttachmentIcon } from '@chakra-ui/icons';
import CommonProps from '@/renderer/scripts/common-props';
import { BsFolderPlus } from 'react-icons/bs';

const channel = new BroadcastChannel('folder-added');

export default function AddFolder(props: CommonProps) {
  return (
    <>
      <Button
        leftIcon={<BsFolderPlus />}
        colorScheme='teal'
        variant='solid'
        alignSelf='center'
      >
        Add Folder
      </Button>
    </>
  );
}
