import { Card } from '../../components/Card';
import { StyledHome, Menu } from './styles';

export function Home(): JSX.Element {
  return (
    <StyledHome>
      <Menu>
        <Card
          title="Create"
          subtitle="New chart"
          cardType="create"
          backColor="var(--shape)"
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
