
import styled from 'styled-components'
import { AlignmentOptions, ContainerProps } from '.'




export const VContainer = styled.div<ContainerProps>`
  display: flex;
  justify-content: ${p => p.justifyContent ?  p.justifyContent :  AlignmentOptions.flexStart};
  align-items: ${p => p.alignItems ?  p.alignItems :  AlignmentOptions.flexStart};
  flex-direction: column;
  background-color: ${p => p.bg ?  p.bg :  'transparent'};
  margin: 2px 0px;

`
export default VContainer