import React from 'react';
import { Header, Icon, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const HistoryHeader = () => (
  <div>
    <Header as='h2' icon textAlign='center'>
      <Icon name='history' circular />
      <Header.Content>History</Header.Content>
    </Header>
    {/* <Image
      centered
      size='large'
      src='/images/wireframe/centered-paragraph.png'
    /> */}
  </div>
)

export default HistoryHeader