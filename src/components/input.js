import React, { Component } from 'react';
import styled from 'styled-components';
import InputMask from 'react-text-mask';

import FormGroup from './formGroup';
import InputButton from './inputButton';

const StyledInputMask = styled(InputMask)`
  display: flex;
  flex-grow: 1;
  font-family: 'Open Sans';
  padding: 0.5rem 18% 0.5rem 1rem;
  width: 100%;
  color: ${props => props.theme.main};
  border-radius: 8px;
  border: 1px solid ${props => props.theme.main};
  outline: none;
  font-size: 1.5rem;
`;

const MASK_ENTRY_AMOUNT = 4;
const MASK_AMOUNT_PER_ENTRY = 8;

const createMask = () => {
  const rule = /[a-z|0-9]/;
  const mask = [];

  for (let x = 0; x < MASK_ENTRY_AMOUNT; x++) {
    for (let y = 0; y < MASK_AMOUNT_PER_ENTRY; y++) mask.push(rule);
    if (x < MASK_ENTRY_AMOUNT - 1) mask.push('-');
  }

  return mask;
};

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mask: createMask(),
      valid: false
    };
  }

  onChange = ({ target: { value } }) => {
    const rule = /[a-z|0-9]{8}/g;
    const match = value.match(rule);
    const valid = match !== null ? match.length === 4 : false;
    this.setState({
      valid
    });
  };

  render() {
    return (
      <FormGroup>
        <StyledInputMask
          mask={this.state.mask}
          onChange={this.onChange}
          guide
          showMask
        />
        <InputButton disabled={!this.state.valid}>Copy</InputButton>
      </FormGroup>
    );
  }
}