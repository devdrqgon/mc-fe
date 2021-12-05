
import styled from 'styled-components'
export enum JustifyContentVariants {
  center = 'center',
  flexStart = 'flex-start',
  flexEnd = 'flex-end',
  spaceAround = 'space-around',
  spaceBetween= 'space-between'

}

interface ContainerProps {
  justify?: JustifyContentVariants
  bg?: string
}


export const HContainer = styled.div<ContainerProps>`
  display: flex;
  justify-content: ${p => p.justify ?  p.justify :  JustifyContentVariants.flexStart};
  width: 100%;
  background-color: ${p => p.bg ?  p.bg :  'transparent'};
`
export default HContainer