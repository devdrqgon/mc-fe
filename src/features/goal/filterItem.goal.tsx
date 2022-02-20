import React from 'react';
import styled from 'styled-components';
interface Props {
    isActive: boolean,
    name: string
}
const FilterItem: React.FC<Props> = ({ isActive, name }) => {
    if (isActive === true) {
        return <ActiveContainer>
            {name}
        </ActiveContainer>;
    }
    return <InactiveContainer>
        {name}
    </InactiveContainer>;
};

export default FilterItem;
const InactiveContainer = styled.div`
display: flex;
justify-content: center;
padding: 2px;
cursor: pointer;
background: ${p => p.theme.colors.background};
margin: 30px;
`;

const ActiveContainer = styled.div`
display: flex;
justify-content: center;
padding: 2px;
cursor: pointer;
background: #CBF3F0;
margin: 30px;
`;