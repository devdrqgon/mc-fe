import styled from 'styled-components'
/**
 * @description: 
 *  display: flex;
   align-items: center;
   justify-content: center;
 */
const PageContainer = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   background: ${p => p.theme.colors.background};
`
export default PageContainer