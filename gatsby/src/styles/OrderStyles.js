import styled from "styled-components";

const OrderStyles = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  fieldset {
    display: grid;
    gap: 1rem;
    grid-column: span 2;
    max-height: 600px;
    overflow: auto;

    align-content: start;
    &.order, &.menu {
      grid-column: span 1;
      height: 600px;
    }
  }
  .mapleSyrup {
    display: none;
  }
  /* @media (max-width: 900px) {
    fieldset.menu,
    fieldset.order {
      grid-column: span 2;
    }
  } */
`;

export default OrderStyles;