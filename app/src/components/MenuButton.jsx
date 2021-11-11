import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Button, Text } from '@chakra-ui/react'
import { DashboardContext } from '../providers/DashboardProvider'

const MenuButton = ({menuItem, omButtonClick}) => {
  const {setCurrentTab, currentTab} = useContext(DashboardContext)
  const borderBottom = currentTab === menuItem.key? '1px solid' : '0'
  const onItemClick = () => {
    setCurrentTab(menuItem.key);
    omButtonClick && omButtonClick();
  }

  return (
    <Button
      width='100%'
      variant='ghost'
      onClick={onItemClick}
      _focus={{
        border: '0',
      }}
    >
      <Text
        textAlign='left'
        width='100%'
        style={{
        borderBottom: borderBottom
      }}
      >
        {menuItem.label}
      </Text>
    </Button>
  )
}

MenuButton.propTypes = {
  menuItem: PropTypes.object.isRequired,
  omButtonClick: PropTypes.func,
}

export default MenuButton
