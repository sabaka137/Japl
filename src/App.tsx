import AppRoutes from './AppRoutes'
import { useAppDispatch, useAppSelector } from './hooks/hook'
import { useEffect } from 'react'
import { GetUser } from './redux/reducers/UserSlice'
import { socket } from './context/SocketContext'

function App() {
    const dispatch = useAppDispatch()
    const User = useAppSelector((state) => state.user.User)
    const isLoad = useAppSelector((state) => state.user.isLoad)

    useEffect(() => {
        if (!User) {
            dispatch(GetUser()).then((res) => {
                if (res.payload !== null) {
                    socket.emit('add-user', res.payload._id)
                }
            })
        }
    }, [User])

    return <>{isLoad && <AppRoutes isAuthenticated={User !== null} />}</>
}

export default App
