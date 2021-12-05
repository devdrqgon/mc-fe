
import styled from 'styled-components'
import { AlignmentOptions, ContainerProps } from '.'




export const VContainer = styled.div<ContainerProps>`
  display: flex;
  justify-content: ${p => p.justifyContent ?  p.justifyContent :  AlignmentOptions.flexStart};
  align-items: ${p => p.alignItems ?  p.alignItems :  AlignmentOptions.flexStart};
  flex-direction: column;
  width: 100%;
  background-color: ${p => p.bg ?  p.bg :  'transparent'};
`
export default VContainer