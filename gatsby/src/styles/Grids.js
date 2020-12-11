import styled from "styled-components";

export const HompageGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(2, minmax(auto, 1fr));
  .tilt {
    display: inline-block;
  }
`;

export const ItemsGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr;
`;

export const ItemStyles = styled.div`
  text-align: center;
  position: relative;
  img {
    border: 1px solid #000;
    height: auto;
    font-size: 0;
  }
  p {
    top: 0;
    transform: rotate(-2deg) translateY(-10px);
    position: absolute;
    width: 100%;
    left: 0;
    margin: 0;
  }
  .mark {
    display: inline;
  }
  @keyframes shine {
    from {
      background-position: 200%;
    }
    to {
      background-position: -40px;
    }
  }
  img.loading {
    --shine: white;
    --background: var(--grey);
    background-image: linear-gradient(
      90deg, 
      var(--background) 0px, 
      var(--shine) 40px,
      var(--background) 80px
    );
    animation: shine 1s infinite linear;
  }

`;