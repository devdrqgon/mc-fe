
export enum AlignmentOptions {
    center = 'center',
    flexStart = 'flex-start',
    flexEnd = 'flex-end',
    spaceAround = 'space-around',
    spaceBetween = 'space-between'

}


export interface ContainerProps {
    justifyContent?: AlignmentOptions
    alignItems?: AlignmentOptions
    bg?: string
    fullWidth?: boolean
}
