import { Description } from '@/components/Home/Description';
import { Container, Display, Main } from '@/components/Shared/Body';
import { Text } from '@/components/Shared/Text';
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { home } from '../resources/strings';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Label } from 'semantic-ui-react';
import { Modal } from '@/components/Shared';
import { Reader } from '@/components/Home/Reader';

const Home: NextPage = () => {
  const router = useRouter();
  const [exibeModal, setExibeModal] = useState(false);
  const [isLido, setIsLido] = useState(false);

  useEffect(() => {
    if (isLido) {
      router.push('/captura');
      return;
    }
    setIsLido(false);
  }, [isLido, router]);

  return (
    <React.Fragment>
      <Main>
        <Container>
          <Description>
            <Text fontSize="24px">{home.bemVindo}</Text>
            <Text fontSize="20px">{home.descricao}</Text>
          </Description>

          <Display display="grid">
            <Label pointing="below" size="big">
              {home.toqueAbaixo}
            </Label>
            <Display
              style={{ cursor: 'pointer' }}
              onClick={() => setExibeModal(true)}
            >
              <Image
                style={{ border: '1px solid #e8e8e8', borderRadius: '5px' }}
                src="/qrcode.svg"
                alt="qrcode"
                width={250}
                height={250}
              />
            </Display>
          </Display>
        </Container>
      </Main>

      {exibeModal && (
        <Modal onClose={() => setExibeModal(false)}>
          <Reader onResult={() => setIsLido(true)} />
        </Modal>
      )}
    </React.Fragment>
  );
};

export default Home;
