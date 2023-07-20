import { FC } from 'react'
import UserItem from './UserItem'
import { IUser } from '../types/types'

interface IUsersList {
  users: IUser[]
  toggleUser: (id: number) => void
}

const UserList: FC<IUsersList> = ({ users, toggleUser }) => {
  return (
    <div className='user-list'>
      { users.map((user: IUser, index: number) => <UserItem 
          key={user.id} 
          user={user}
          number={index}
          toggleUser={toggleUser}
      />) }
    </div>
  )
}

export default UserList