import {
  IoBarChartOutline,
  IoEyeOutline,
  IoReaderOutline,
  IoPieChartOutline,
  IoListOutline
} from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import { useCharts } from '../../hooks';
import { error } from '../../libs/toast';
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
  loading?: boolean;
  setIsTable?: (toggle: boolean) => void;
}

export function Card(props: CardProps): JSX.Element {
  const { setEditChartId, charts } = useCharts();
  const { title, subtitle, cardType, backColor, loading } = props;

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
    switch (cardType) {
      case 'create':
        setEditChartId('');
        props.openModal!();
        break;
      case 'graphic':
        props.setIsTable!(false);
        break;
      case 'table':
        props.setIsTable!(true);
        break;
      case 'outputs':
        props.openModal!();
        break;
      default:
        if (charts[0]) {
          history.push(`/dashboard/${charts[0].id}`);
          break;
        }
        error('Selected chart does not exist');
        break;
    }
  }

  return (
    <StyledCard
      onClick={handleClickCard}
      cardType={cardType}
      backColor={backColor}
      loading={loading}
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
