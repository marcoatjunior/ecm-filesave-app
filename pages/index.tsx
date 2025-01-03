import { Description } from '@/components/Home/Description';
import { Container, Main } from '@/components/Shared/Body';
import { Text } from '@/components/Shared/Text';
import type { NextPage } from 'next';
import React from 'react';
import { home } from '../resources/strings';

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <Main>
        <Container>
          <Description>
            <Text fontSize="24px">{home.bemVindo}</Text>
            <Text fontSize="20px">{home.descricao}</Text>
          </Description>
        </Container>
      </Main>
    </React.Fragment>
  );
};

export default Home;
