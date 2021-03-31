import { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { useParams, useHistory } from 'react-router-dom';

import { Card } from '../../components/Card';
import { InfoModal } from '../../components/Modals';
import { useLoading, useUser } from '../../hooks';
import { Chart } from '../../hooks/useCharts';
import { error } from '../../libs/toast';
import api from '../../services/api';
import Utils from '../../utils/Utils';
import { StyledDashboard, MenuDash, Body } from './styles';

interface useParamsPops {
  id: string;
}

export function Dashboard(): JSX.Element {
  const [infoModal, setInfoModal] = useState(false);
  // const [listXTime, setListXTime] = useState<number[]>([]);
  const [listYNumber, setListYNumber] = useState<number[]>([]);
  const [chart, setChart] = useState<Chart>({} as Chart);
  const [loading, setLoading] = useLoading();
  const history = useHistory();
  const { token } = useUser();

  const config = { headers: { Authorization: `Bearer ${token}` } };

  const handleOpenInfoModal = (): void => setInfoModal(true);
  const handleCloseInfoModal = (): void => setInfoModal(false);
  const { id } = useParams() as useParamsPops;

  useEffect(() => {
    async function getChartById(id: string): Promise<void> {
      try {
        const { data } = await api.get(`/chart/${id}`, config);

        if (data) {
          const { maximum, minimum, frequency, intervalS } = data;
          setChart(data);
          setListYNumber(
            Utils.generateRandomList({ maximum, minimum, frequency, intervalS })
          );
          // setListXTime(Utils.generateTimestamp(frequency, intervalS));
        } else {
          history.push('/');
          error('Selected chart does not exist');
        }
      } catch (err) {
        console.error(err);
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
