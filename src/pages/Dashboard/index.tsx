import { useState } from 'react';

import { Card } from '../../components/Card';
import { InfoModal } from '../../components/Modals/InfoModal';
import { StyledDashboard, MenuDash } from './styles';

export function Dashboard(): JSX.Element {
  const [infoModal, setInfoModal] = useState(false);

  const handleOpenInfoModal = (): void => setInfoModal(true);
  const handleCloseInfoModal = (): void => setInfoModal(false);

  return (
    <StyledDashboard>
      <MenuDash>
        <Card
          title="View"
          subtitle="in graphic"
          cardType="graphic"
          backColor="var(--green)"
        />
        <Card
          title="Analyze"
          subtitle="the outputs"
          cardType="outputs"
          backColor="var(--shape)"
          openModal={handleOpenInfoModal}
        />
        <InfoModal isOpen={infoModal} onModalClose={handleCloseInfoModal} />
        <Card
          title="View"
          subtitle="in table"
          cardType="table"
          backColor="var(--green)"
        />
      </MenuDash>
    </StyledDashboard>
  );
}
