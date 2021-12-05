
import styled from 'styled-components'
import { ContainerProps, AlignmentOptions } from '.'


export const HContainer = styled.div<ContainerProps>`
  width: auto;
  display: flex;
  justify-content: ${p => p.justifyContent ? p.justifyContent : AlignmentOptions.flexStart};
  align-items: ${p => p.alignItems ? p.alignItems : AlignmentOptions.flexStart};
  background-color: ${p => p.bg ? p.bg : 'transparent'};
`
export default HContainer