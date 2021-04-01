import { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { useParams } from 'react-router-dom';

import { Card } from '../../components/Card';
import { InfoModal } from '../../components/Modals';
import { NotFoundError, UnauthorizedError } from '../../errors';
import { useLoading, useToken } from '../../hooks';
import { Chart } from '../../hooks/useCharts';
import { error } from '../../libs/toast';
import Server from '../../utils/Server';
import { StyledDashboard, MenuDash, Body } from './styles';

interface UseParamsPops {
  id: string;
}

// type Type = 'table' | 'graphic';

export function Dashboard(): JSX.Element {
  const [infoModal, setInfoModal] = useState(false);
  // const [type, setType] = useState<Type>('table');
  const [chart, setChart] = useState<Chart>({} as Chart);
  const [loading, setLoading] = useLoading();
  const { token } = useToken();

  const config = { headers: { Authorization: `Bearer ${token}` } };

  const handleOpenInfoModal = (): void => setInfoModal(true);
  const handleCloseInfoModal = (): void => setInfoModal(false);
  const { id } = useParams() as UseParamsPops;

  useEffect(() => {
    async function getChartById(id: string): Promise<void> {
      try {
        const data = await Server.getOneChart(id, config);

        setChart(data);
      } catch (err) {
        console.error(err);
        if (err instanceof NotFoundError) {
          error(err.message);
          return;
        }
        if (err instanceof UnauthorizedError) {
          error(err.message);
          return;
        }

        error('Internal server error');
      }
    }

    setLoading(getChartById(id));
  }, [id]);

  return (
    <StyledDashboard>
      <MenuDash>
        <Card
          title="View"
          subtitle="in graphic"
          cardType="graphic"
          backColor="var(--green)"
          loading={loading}
        />
        <Card
          title="Analyze"
          subtitle="the outputs"
          cardType="outputs"
          backColor="var(--shape)"
          openModal={handleOpenInfoModal}
          loading={loading}
        />
        <InfoModal
          chart={chart}
          isOpen={infoModal}
          onModalClose={handleCloseInfoModal}
        />
        <Card
          title="View"
          subtitle="in table"
          cardType="table"
          backColor="var(--green)"
          loading={loading}
        />
      </MenuDash>
      <Body>
        {loading && (
          <Loader type="ThreeDots" height={120} width={120} color="#5429cc" />
        )}
      </Body>
    </StyledDashboard>
  );
}
