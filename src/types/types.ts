export enum Color {
  RED, 
  GREEN, 
  BLUE
}

export interface IUser {
  id: number
  color: Color
  name: string
  speed: number
  time: number
  isActive: boolean
}