import styled from 'styled-components'

/**
 *  @description
 *  a flex vertical div 
 */
const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 15px;
    background: ${p => p.theme.colors.cardBackground};
    padding: 15px 15px 5px 17px;
    min-width: 300px;
    min-height: 300px;
    box-shadow: 0 12px 23px rgba(0, 0, 0, 0.23), 0 10px 10px rgba(0, 0, 0, 0.19);

    
 &:hover {
    box-shadow: 0 18px 33px rgba(0, 0, 0, 0.23), 0 30px 30px rgba(0, 0, 0, 0.19);
  }

`
export default Card