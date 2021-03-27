import { IoBarChartOutline, IoEyeOutline } from 'react-icons/io5';

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
  const { title, subtitle, cardType, backColor } = props;
  const iconDispatcher: Dispatcher = {
    show: <IoEyeOutline />,
    info: null,
    create: <IoBarChartOutline />
  };

  const icon = iconDispatcher[cardType];

  return (
    <StyledCard
      onClick={props?.openModal}
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
