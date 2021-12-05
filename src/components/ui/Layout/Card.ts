import styled from 'styled-components'

/**
 *  @description
 *  a flex vertical div 
 */
const Card = styled.div`
    display: flex;
    justify-content: flex-start; 
    align-items: flex-start;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    padding: 0px;
    min-height: 200px;
    max-width: 80%;
    border-radius: 5px;
    width: 100%;
`
export default Card