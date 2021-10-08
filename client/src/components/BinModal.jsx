import React from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

function exampleReducer(state, action) {
  switch (action.type) {
    case 'close':
      return { open: false }
    case 'open':
      return { open: true, size: action.size }
    default:
      throw new Error('Unsupported action...')
  }
}

const BinModal = () => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  })
  const { open, size } = state;

  return (
    <div>
      <Button onClick={() => dispatch({ type: 'open', size: 'fullscreen' })}>Mini</Button>

      <div>
        <Modal style={{ height: 200 }} size={size} open={open}>
          <Modal.Header>Plastic waste bin</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to send a request for pick up</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative >
              No
            </Button>
            <Button positive>
              Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </div>

    </div>
  )
}

export default BinModal