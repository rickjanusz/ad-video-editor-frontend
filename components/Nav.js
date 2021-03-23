import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const NavStyles = styled.nav`
  background-color: red;
`;

export default function Nav() {
  return (
    <NavStyles>
      <ul>
        <li>
          <Link href="/">
            <a>Upload</a>
          </Link>
        </li>
        <li>
          <Link href="/crop">
            <a>Crop</a>
          </Link>
        </li>
      </ul>
    </NavStyles>
  );
}
