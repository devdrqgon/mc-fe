import VContainer from 'components/ui/Layout/VContainer'
import React, { useRef } from 'react'
import InputTextField from './InputTextForm/InputTextField'
import Text from 'components/ui/typography/Text'
import HSpacer from 'components/ui/Layout/HSpacer'
import CardButton from '../Buttons/CardButtons'
import { type } from 'os'

export enum InputTypes {
    text = "text",
    password = "password"
}
interface Props {
    _label: string
    _type?: InputTypes
    _onChangeCallback(_newVal: string): void
}
const InputTextForm: React.FC<Props> = (props) => {
    const ref = useRef<HTMLInputElement>(null)
    const hanleValChange = () =>{
        props._onChangeCallback(ref.current!.value)
    }
    return (
        <VContainer>
            <Text>
                {props._label}
            </Text>
            <HSpacer _space={10} ></HSpacer>
            <InputTextField
                onChange={hanleValChange}
                ref={ref}
                type={props._type ? props._type : InputTypes.text} />
           
        </VContainer>
    )
}

export default InputTextForm
