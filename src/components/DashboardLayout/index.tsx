import { FunctionComponent, useState } from "react";
import {
  Card,
  Sidebar,
  styled,
  H2,
  SubHeading3,
  Body1,
  Button
} from "@horizontal-org/shira-ui";
import { FiHome, FiHelpCircle, FiLogOut, FiPlus } from 'react-icons/fi';
interface Props {}

const defaultMenuItems = [
    {
      icon: <FiHome size={24} color="white" />,
      label: 'Dashboard',
      onClick: () => console.log('Dashboard clicked'),
    },
    {
      icon: <FiHelpCircle size={24} color="white" />,
      label: 'Support',
      onClick: () => console.log('Support clicked'),
    },
    {
      icon: <FiLogOut size={24} color="white" />,
      label: 'Log out',
      onClick: () => console.log('Log out clicked'),
    },
  ];

  const cardData = [
    {
      title: 'Short Title',
      lastModified: '2 days ago',
      isPublished: true,
    },
    {
      title: 'Medium Length Title That Fits Well',
      lastModified: '5 days ago',
      isPublished: false,
    },
    {
      title: 'Very Long Title That Should Truncate Because It Exceeds The Maximum Width Available',
      lastModified: '1 week ago',
      isPublished: true,
    },
    {
      title: 'Short Title',
      lastModified: '2 days ago',
      isPublished: true,
    },
    {
      title: 'Short Title',
      lastModified: '2 days ago',
      isPublished: true,
    },
    {
      title: 'Medium Length Title That Fits Well',
      lastModified: '5 days ago',
      isPublished: false,
    },
    {
      title: 'Very Long Title That Should Truncate Because It Exceeds The Maximum Width Available',
      lastModified: '1 week ago',
      isPublished: true,
    },
    {
      title: 'Short Title',
      lastModified: '2 days ago',
      isPublished: true,
    },
    {
      title: 'Very Long Title That Should Truncate Because It Exceeds The Maximum Width Available',
      lastModified: '1 week ago',
      isPublished: true,
    },
  ];
export const DashboardLayout: FunctionComponent<Props> = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSidebarCollapse = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };
  
  return (
    <Container>
      <Sidebar 
        menuItems={defaultMenuItems} 
        onCollapse={handleSidebarCollapse}
      
      />

      <MainContent $isCollapsed={isSidebarCollapsed}>
        <HeaderContainer>
          <SubHeading3 color="#52752C">Stitching Justice Collective</SubHeading3>
          <H2>Welcome to your dashboard </H2>
          <Body1>This is where you can manage quizzes. Quiz links are public, so remember to avoid sharing sensitive information in them.</Body1>
          <ButtonContainer>
            <Button
              type="primary"
              leftIcon={<FiPlus />}
              text="Create new quiz"
              color="#849D29"
            />
          </ButtonContainer>
        </HeaderContainer>

        <CardGrid>
          {cardData.map((card, index) => (
            <Card 
              title={card.title}
              lastModified={card.lastModified}
              isPublished={card.isPublished}
              onCopyUrl={() => {}}
              onTogglePublished={() => {}}
              onMenuClick={() => {}}
            />
          ))}
        </CardGrid>
      </MainContent>

    </Container>
  );
};



const Container = styled.div`
  position: relative;
  display: flex;
  background: ${props => props.theme.colors.light.paleGrey};

  min-height: 100vh;
  height: 100%;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: block;
  }
`;

const MainContent = styled.div<{ $isCollapsed: boolean }>`
  flex: 1;
  padding: 24px;
  margin-left: ${props => props.$isCollapsed ? '100px' : '300px'};
  transition: margin-left 0.3s ease;
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin-left: 80px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-left: 0;
  }
`;

const HeaderContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const CardGrid = styled.div`
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-start;
`


