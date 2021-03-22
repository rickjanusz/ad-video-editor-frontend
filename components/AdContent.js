import styled from 'styled-components';

const ContentStyles = styled.div`
  border: 1px solid red;
`;

export default function AdContent() {
  return (
    <ContentStyles>
      <p>I'm Content</p>
    </ContentStyles>
  );
}
