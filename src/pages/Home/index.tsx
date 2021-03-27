import { useState } from 'react';

import { Card } from '../../components/Card';
import { ChartModal } from '../../components/ChartModal';
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
          cardType="create"
          backColor="var(--shape)"
          openModal={handleOpenChartModal}
        />
        <ChartModal
          isOpen={chartModal}
          onRequestClose={handleCloseChartModal}
        />
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
    </StyledHome>
  );
}
