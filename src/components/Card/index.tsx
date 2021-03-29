import {
  IoBarChartOutline,
  IoEyeOutline,
  IoReaderOutline,
  IoPieChartOutline,
  IoListOutline
} from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import { useCharts } from '../../hooks/useCharts';
import { StyledCard, TopLine, Text, Footer } from './styles';

interface Dispatcher {
  show: JSX.Element;
  info: null;
  create: JSX.Element;
  outputs: JSX.Element;
  graphic: JSX.Element;
  table: JSX.Element;
}

interface CardProps {
  title: string;
  subtitle: string;
  cardType: keyof Dispatcher;
  backColor: string;
  openModal?: () => void;
  footerText?: boolean;
}

export function Card(props: CardProps): JSX.Element {
  const { setEditChartId, charts } = useCharts();
  const { title, subtitle, cardType, backColor } = props;

  const date = new Date(charts[0]?.updatedAt);
  const history = useHistory();
  const iconDispatcher: Dispatcher = {
    show: <IoEyeOutline />,
    info: null,
    create: <IoBarChartOutline />,
    outputs: <IoReaderOutline />,
    graphic: <IoPieChartOutline />,
    table: <IoListOutline />
  };

  const icon = iconDispatcher[cardType];

  function handleClickCard(): void {
    if (cardType === 'create') {
      setEditChartId('');
      props.openModal!();
      return;
    }

    history.push(`/dashboard/${charts[0]?.id}`);
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
      <Footer>
        {props.footerText && charts[0] && (
          <p>
            last updated on
            {` ${new Intl.DateTimeFormat('en-US', {
              month: 'long',
              day: 'numeric'
            }).format(date)}`}
          </p>
        )}
      </Footer>
    </StyledCard>
  );
}
