import React from 'react';
import { Button } from '@chakra-ui/react';
import CommonProps from '@/renderer/scripts/common-props';
import { BsFolderPlus } from 'react-icons/bs';

export default function ImportFolder(props: CommonProps) {
  return (
    <>
      <Button
        leftIcon={<BsFolderPlus />}
        colorScheme='teal'
        variant='solid'
        alignSelf='center'
        onClick={async () => await importFolder()}
      >
        Import Folder
      </Button>
    </>
  );
}

async function importFolder() {
  const result = await window.systemApi.getDialogFolderUrl();
  if (result.canceled) {
    return;
  }
  const folderUrl = result.filePaths[0];
  window.postMessage(folderUrl);
}
