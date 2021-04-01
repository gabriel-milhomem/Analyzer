import { useState } from 'react';
import Loader from 'react-loader-spinner';

import { Card } from '../../components/Card';
import { ChartModal } from '../../components/Modals';
import { Tables } from '../../components/Tables';
import { useCharts } from '../../hooks';
import { StyledHome, Menu, Body } from './styles';

export function Home(): JSX.Element {
  const { loading, refresh, charts } = useCharts();
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
      <Body>
        {loading && (
          <Loader type="ThreeDots" height={120} width={120} color="#5429cc" />
        )}
        {!loading && Boolean(refresh) && Boolean(charts.length) && (
          <Tables openModal={handleOpenChartModal} />
        )}
      </Body>
    </StyledHome>
  );
}
