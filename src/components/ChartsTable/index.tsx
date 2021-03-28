import { useState, useEffect } from 'react';
import { BsEye, BsPencil, BsTrash, BsTrash2 } from 'react-icons/bs';
import Loader from 'react-loader-spinner';

import { useLoading } from '../../hooks/useLoading';
import { error } from '../../libs/toast';
import api from '../../services/api';
import {
  Table,
  Head,
  Body,
  Container,
  Header,
  RightBox,
  DeleteButton
} from './styles';

interface ChartsTableProps {
  openModal: () => void;
}

interface Chart {
  id: number;
  title: string;
  points: number;
  updatedAt: string;
}

export function ChartsTable({ openModal }: ChartsTableProps): JSX.Element {
  const [charts, setCharts] = useState<Chart[]>([]);
  const [loading, setLoading] = useLoading();

  const getCharts = async (): Promise<void> => {
    try {
      const { data } = await api.get('/chart');
      console.log(data);
      setCharts([...data.charts]);
    } catch (err) {
      console.error(err);
      error(err.response.data.error);
    }
  };

  useEffect(() => {
    setLoading(getCharts());
  }, []);

  if (loading) {
    return (
      <Container>
        <Loader type="ThreeDots" height={120} width={120} color="#5429cc" />
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <h2> My Charts </h2>
        <RightBox>
          <h3> {charts.length} itens </h3>
          <DeleteButton type="button">
            <p> Delete all </p>
            <BsTrash2 />
          </DeleteButton>
        </RightBox>
      </Header>
      <Table>
        <Head>
          <th> Visualize </th>
          <th> Title </th>
          <th> Points </th>
          <th> Date </th>
          <th> Edit </th>
          <th> Delete </th>
        </Head>
        <Body>
          {charts.map(chart => {
            const { id, title, updatedAt, points } = chart;
            const date = new Date(updatedAt);
            return (
              <tr key={id}>
                <td>
                  <BsEye />
                </td>
                <td> {title} </td>
                <td> {points} </td>
                <td>{Intl.DateTimeFormat('pt-BR').format(date)}</td>
                <td>
                  <BsPencil onClick={() => openModal()} />
                </td>
                <td>
                  <BsTrash className="red-svg" />
                </td>
              </tr>
            );
          })}
        </Body>
      </Table>
    </Container>
  );
}
