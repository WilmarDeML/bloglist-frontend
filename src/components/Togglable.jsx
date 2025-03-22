import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from '../styles/global'

const Togglable = forwardRef(function Togglable({ buttonLabel, children }, ref) {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <TogglableContainer>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </TogglableContainer>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default Togglable

const TogglableContainer = styled.div`
  margin: 0 1em;
`