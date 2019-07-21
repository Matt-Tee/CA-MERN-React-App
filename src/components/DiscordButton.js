import React from 'react';
import { Columns, Section, Column } from 'bloomer'

const style = {
  background: '#7289DA',
  padding: '0 20px',
  lineHeight: '35px',
  color: '#fff',
  fontFamily: 'Helvetica, Arial, sans-sefir',
  fontSize: '20px',
  display: 'block',
  textDecoration: 'none',
  borderRadius: '3px',
}

function DiscordButton() {
  return (
    <Section>
      <Columns isCentered>
        <Column>
        </Column>
        <Column isOffset='1'>
          <button style={style}>Authorize Via Discord</button>
        </Column>
        <Column>
        </Column>
      </Columns>
    </Section>
  )
}

export default DiscordButton;
