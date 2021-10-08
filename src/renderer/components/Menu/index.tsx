import CommonProps from '@/renderer/scripts/common-props';
import React from 'react';
import { push as SideMenu } from 'react-burger-menu';
import burgerStyles from './styles/burgerStyles';
import AddFolder from '@/renderer/components/AddFolder';

export default function Menu(props: CommonProps) {
  return (
    <SideMenu
      disableOverlayClick
      pageWrapId={'page-wrap'}
      outerContainerId={'outer-container'}
      styles={burgerStyles}
    >
      <AddFolder />
      {props.children}
    </SideMenu>
  );
}
