import styled from "styled-components";

interface Props{
    _space?: number
}
const HSpacer = styled.div<Props>`
  padding: ${p => p._space ? `${p._space}px 0px`: '20px 0px'};

`

export default HSpacer