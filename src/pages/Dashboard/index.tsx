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
import Utils from '../../utils/Utils';
import { StyledDashboard, MenuDash, Body } from './styles';

interface UseParamsPops {
  id: string;
}

export interface Points {
  id: number;
  value: number;
  time: number;
  freqAbsolute: number;
  freqRelative: number;
  detour: number;
}

export function Dashboard(): JSX.Element {
  const [infoModal, setInfoModal] = useState(false);
  // const [listXTime, setListXTime] = useState<number[]>([]);
  const [listYNumber, setListYNumber] = useState<number[]>([]);
  // const [listPoints, setListPoints] = useState<Points[]>([]);
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
    const { maximum, minimum, frequency, intervalS } = chart;

    setListYNumber(
      Utils.generateRandomList({ maximum, minimum, frequency, intervalS })
    );
    // setListXTime(Utils.generateTimestamp(frequency, intervalS));
    // setListPoints(Utils.createListPoints(listYNumber, listXTime));
  }, [id]);

  return (
    <StyledDashboard>
      <MenuDash>
        <Card
          title="View"
          subtitle="in graphic"
          cardType="graphic"
          backColor="var(--green)"
          loading={loading || undefined}
        />
        <Card
          title="Analyze"
          subtitle="the outputs"
          cardType="outputs"
          backColor="var(--shape)"
          openModal={handleOpenInfoModal}
          loading={loading || undefined}
        />
        <InfoModal
          chart={chart}
          isOpen={infoModal}
          onModalClose={handleCloseInfoModal}
          listYNumber={listYNumber}
        />
        <Card
          title="View"
          subtitle="in table"
          cardType="table"
          backColor="var(--green)"
          loading={loading || undefined}
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
