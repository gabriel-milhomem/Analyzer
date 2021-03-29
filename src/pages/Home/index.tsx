import { useState } from 'react';

import { Card } from '../../components/Card';
import { ChartModal } from '../../components/ChartModal';
import { ChartsTable } from '../../components/ChartsTable';
import { StyledHome, Menu } from './styles';

export function Home(): JSX.Element {
  const [chartModal, setChartModal] = useState(false);

  const handleOpenChartModal = (): void => setChartModal(true);
  const handleCloseChartModal = (): void => setChartModal(false);

  return (
    <StyledHome>
      <Menu>
        <Card
          title="Create"
          subtitle="New chart"
          footerText
          cardType="create"
          backColor="var(--shape)"
          openModal={handleOpenChartModal}
        />
        <ChartModal isOpen={chartModal} onModalClose={handleCloseChartModal} />
        <Card
          title="You can build, visualize, analyse"
          subtitle="With our graphic generator system"
          cardType="info"
          backColor="none"
        />
        <Card
          title="View"
          subtitle="Last chart"
          cardType="show"
          backColor="var(--green)"
        />
      </Menu>

      <ChartsTable openModal={handleOpenChartModal} />
    </StyledHome>
  );
}
