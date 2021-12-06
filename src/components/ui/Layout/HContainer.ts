
import styled from 'styled-components'
import { ContainerProps, AlignmentOptions } from '.'


export const HContainer = styled.div<ContainerProps>`
  display: flex;
  justify-content: ${p => p.justifyContent ? p.justifyContent : AlignmentOptions.flexStart};
  align-items: ${p => p.alignItems ? p.alignItems : AlignmentOptions.flexStart};
  background-color: ${p => p.bg ? p.bg : 'transparent'};
  padding: 20px 0px;

`
export default HContainer