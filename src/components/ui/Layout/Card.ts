import styled from 'styled-components'

/**
 *  @description
 *  a flex vertical div 
 */
const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center; 
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    padding: 15px;
    background-color: #FFFFFF;
    min-height: 200px;
    min-width: 400px;
    border-radius: 5px;
`
export default Card