import styled, { keyframes } from "styled-components";

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }
  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const Form = styled.div`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 700;
  label {
    display: block;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    outline: 0;
    border-width: 0 0 2px;
    border-radius: 5px;

    &:focus {
      outline: 0;
      border-color: ${props => props.theme.mainColor};
    }
    &.valid {
      border-color: ${props => props.theme.validGreen};
    }
    &.invalid {
      border-color: ${props => props.theme.invalidRed};
    }
  }

  fieldset {
    border: 0;
    padding: 0;
    &[disabled] {
      opacity: 0.5;
    }

    &[aria-busy="true"]::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
  button:disabled {
    background: ${props => props.theme.lightGrey};

    &:hover {
      cursor: not-allowed;
      box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
        0 1px 3px rgba(0, 0, 0, 0.08);
      transform: translateY(0px);
    }
  }
`;

export default Form;
