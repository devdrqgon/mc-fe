import styled from "styled-components";
import FilterItem from "./filterItem.goal";

const Filters = () => {
    return <Container>
        <FilterItem
            name={"Survive"}
            isActive={true}
        />
        <FilterItem
            name={"Survive"}
            isActive={false}
        />
        <FilterItem
            name={"Survive"}
            isActive={false}
        />
    </Container>
};
export default Filters
const Container = styled.div`
background: green;
width: 30%;
display: flex;
flex-direction: column;
padding: 15px;
`;