import { IoBarChartOutline, IoEyeOutline } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import { useCharts } from '../../hooks/useCharts';
import { StyledCard, TopLine, Text } from './styles';

interface Dispatcher {
  show: JSX.Element;
  info: null;
  create: JSX.Element;
}

interface CardProps {
  title: string;
  subtitle: string;
  cardType: keyof Dispatcher;
  backColor: string;
  openModal?: () => void;
}

export function Card(props: CardProps): JSX.Element {
  const { setEditChartId, charts } = useCharts();
  const { title, subtitle, cardType, backColor } = props;
  const history = useHistory();
  const iconDispatcher: Dispatcher = {
    show: <IoEyeOutline />,
    info: null,
    create: <IoBarChartOutline />
  };

  const icon = iconDispatcher[cardType];

  function handleClickCard(): void {
    if (cardType === 'create') {
      setEditChartId(0);
      props.openModal!();
      return;
    }

    history.push(`/chart/${charts[0].id}`);
  }

  return (
    <StyledCard
      onClick={handleClickCard}
      cardType={cardType}
      backColor={backColor}
    >
      <TopLine>
        <h2> {title} </h2>
        {icon}
      </TopLine>
      <Text cardType={cardType}> {subtitle} </Text>
    </StyledCard>
  );
}
