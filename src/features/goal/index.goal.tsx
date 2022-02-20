import styled from 'styled-components';
import Filters from './filters.goal';
import GoalSummary from './summary.goal';

const GoalCreator = () => {
    return <Container>
        <Filters />
        <GoalSummary />
    </Container>
};





const Container = styled.div`
background: red;
width: 100%;
display: flex;
min-width: 20vw;
padding: 15px;
`;
export default GoalCreator;
