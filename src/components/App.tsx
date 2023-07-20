import { FC, useState, useEffect, useRef } from 'react'
import { IUser } from '../types/types'
import axios from 'axios'
import Observer from './Observer'
import UserList from './UserList'
import '../styles/App.css'

const App: FC = () => {
  const page = useRef<number>(1)
  const limit = useRef<number>(50)
  const totalPages = useRef<number>(0)
  const ref = useRef<HTMLDivElement>(null)
  
  const [ users, setUsers ] = useState<IUser[]>([])

  useEffect(() => {
    fetchUsers()

    const options: IntersectionObserverInit = {
      rootMargin: '0px',
      threshold: 1.0,
    }

    const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entries[0].isIntersecting && page.current <= totalPages.current) {
        loadMoreUsers()
      }
    }
    
    const observer = new IntersectionObserver(callback, options)

    ref.current && observer.observe(ref.current)
  }, [])

  const fetchUsers = async () => {
    const response = await axios.get<IUser[]>('http://localhost:5000/users', {
      params: {
        _limit: limit.current,
        _page: page.current,
      }
    })

    totalPages.current = Math.ceil(parseInt(response.headers['x-total-count']) / limit.current)
    setUsers(response.data)
  }

  const loadMoreUsers = async () => {
    page.current += 1
    
    const response = await axios.get<IUser[]>('http://localhost:5000/users', {
      params: {
        _limit: limit.current,
        _page: page.current,
      }
    })

    setUsers((prev: IUser[]) => [...prev, ...response.data])
  }

  const toggleUser = (id: number): void => {
    setUsers((prev: IUser[]) => prev.map((user: IUser) => ({
      ...user,
      isActive: user.id === id ? !user.isActive : user.isActive
    })))
  }
  
  return (
    <div className="App">
        { users && users.length > 0 ? <UserList 
            users={users}
            toggleUser={toggleUser}
          /> 
        : <div>Loading...</div>
      }
      <Observer ref={ref} />
    </div>
  )
}

export default App