import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import ReactTooltip from 'react-tooltip';

interface SavingsAccountOverviewProps {
    _totalSavings: number,
    _savingItems: SavingItem[]
}
export interface SavingItem {
    _label: string,
    _total: number,
}
interface SavingBucketData {
    _label: string,
    _total: number,
    _alreadyCollected: number,
    _percentage: number,
    _leftToPay: number
}
const percentage = (partialValue: number, totalValue: number) => {
    return (100 * partialValue) / totalValue;
}
const SavingsAccountOverview: React.FC<SavingsAccountOverviewProps> = ({ _totalSavings, _savingItems }) => {
    const [bucketTiles, setbucketTiles] = useState<undefined | SavingBucketData[]>(undefined)

    useEffect(() => {
        let _out: SavingBucketData[] = []
        let _remainingSavings = _totalSavings

        _savingItems.forEach(element => {
            //Can we already reach this goal 100% ? 
            if (_remainingSavings - element._total >= 0) {
                _out.push({
                    _alreadyCollected: element._total,
                    _label: element._label,
                    _percentage: 100,
                    _total: element._total,
                    _leftToPay: 0
                })
                _remainingSavings = _remainingSavings - element._total
            }
            else {
                _out.push({
                    _alreadyCollected: _remainingSavings,
                    _label: element._label,
                    _percentage: percentage(_remainingSavings, element._total),
                    _total: element._total,
                    _leftToPay: element._total - _remainingSavings
                })
                _remainingSavings = 0
            }
        })
        if (_remainingSavings > 0) {
            _out.push({
                _alreadyCollected: _remainingSavings,
                _label: "extra",
                _percentage: 100,
                _total: _remainingSavings,
                _leftToPay: 0
            })
        }
        setbucketTiles(_out)
    }, [])

    const getSum = (partialSum: number, a: SavingBucketData) => partialSum + a._leftToPay

    return (
        <>
            {bucketTiles === undefined ?
                <>
                    undef
                </>
                :
                <BucketContainer>
                    <div>
                        <BucketHeader style={{ color: 'red' }}>
                        € {bucketTiles.filter(b => b._percentage < 100).reduce(getSum, 0)}
                        </BucketHeader>
                        <BucketHeader style={{ color: 'green' }}>
                        € {_totalSavings}
                        </BucketHeader>
                    </div>
                    <Bucket>
                        {bucketTiles.map((e, i) => (
                            <NewBucketTile
                                key={i}
                                _alreadyCollected={e._alreadyCollected}
                                _total={e._total}
                                _label={e._label}
                                _percentage={e._percentage} />
                        ))}
                    </Bucket>
                </BucketContainer>
            }
        </>
    )
}

export default SavingsAccountOverview
const BucketHeader = styled.div`
    display: flex;
    border-top: 1px solid white;
    border-right: 1px solid white;
    padding: 5px 15px;
    border-left: 1px solid white;

`

interface Props {
    _percentage: number,
    _label: string,
    _total: number,
    _alreadyCollected: number
}
const NewBucketTile: React.FC<Props> = ({ _percentage, _label, _total, _alreadyCollected }) => {
    return (
        <Background>

            <Info _percentage={_percentage}>
                <Label>
                    <div>
                        {_label}
                    </div>
                    <div>
                        €{_total}
                    </div>
                    {_percentage < 100 ?
                        <>
                            <div>
                                €{(_total - _alreadyCollected).toFixed(0)}
                            </div>
                        </>
                        :
                        <>
                            <div>
                                100%
                            </div>
                        </>
                    }
                </Label>
            </Info>

        </Background>
    )
}


const Label = styled.div`
    padding: 1px;
    display: flex;
    justify-content: space-between;
    width: 180px;
    color: black;
`

const Background = styled.div`
  background:  #e5e5e5;
  height: 40px;
  width: 180px;
  border-radius: 4px;
  margin: 4px 0px;
  animation: fade-in linear 7s; //! Doesnt work
`
interface InfoProps {
    _percentage: number
}
const AnimationKeyframes = (y: any) => keyframes`
    0% {
      width: 0%; 
    }
    100% {
      width : ${y}%)
    }
`;
const Info = styled.div<InfoProps>`
  top: 0;
  left: 0;  
  height: 40px;
  animation: ${props => AnimationKeyframes(props._percentage)};
  width: ${(props) => props._percentage}%;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  background: #00b4d8;
  border-radius: 4px;
`
const TileText = styled.div`
top: 0;
left: 0; 
color: black;
`

const Bucket = styled.div`
    padding: 1px;
    width: 220px;
    height: 204px;
    display: flex;
    overflow-y: scroll;
	flex-direction: column-reverse;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: center;
	align-content: flex-start;
    border: 1px white solid;

`


const BucketContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;    
`
const OverviewContainer = styled.div`
display: flex;
flex-direction: column; 
`

const Row = styled.div`
    padding-left: 250px;
    padding-top: 40px;
    padding-bottom: 10px;
    border: 1px solid white;
    margin-top: 8px;
    margin-bottom: 8px;
`
const VContainer = styled.div`
display: flex;
flex-direction: column; 
`

const Text = styled.span`
margin-top: 2px;
margin-bottom: 2px;
`


{/* 
// <div style={{ color: 'black' }}>
// {` ${_total} €  ${_label}`}
// </div>
// <div style={{ color: 'black' }}>
// {_percentage.toFixed(0)}%
// </div>
// {_percentage === 100 ?
// <></> :
// <div style={{ color: 'black' }}>
//     {_alreadyCollected.toFixed(0)}€
// </div>
// } */}