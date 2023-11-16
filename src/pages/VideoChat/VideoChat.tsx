import React, {
    VideoHTMLAttributes,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hook'
import Peer from 'simple-peer'

import { SocketContext } from '../../context/SocketContext'
import {
    ChangeViewModal,
    ChangeViewWrapper,
    DefaultScreenContent,
    LocalVideo,
    PDFSide,
    RemoteVideo,
} from './style'
import { useParams } from 'react-router-dom'
import CallSettings from './components/CallSettings'

type PropsType = VideoHTMLAttributes<HTMLVideoElement> & {
    srcObject: MediaStream
}
type Props = {}
function VideoChat({}: Props) {
    const [stream, setStream] = useState<any>()
    const [viewModal, setViewModal] = useState(false)
    const [call, setCall] = useState<any>()
    const [receivingCall, setReceivingCall] = useState(false)
    const [callStart, setCallStart] = useState(false)
    const [callEnded, setCallEnded] = useState(false)

    const [currentView, setCurrentView] = useState(1)
    const [file, setFile] = useState<any>(null)

    const User = useAppSelector((state) => state.user.User)
    const { teacherId, studentId } = useParams()
    const localVideo = useRef<any>()
    const remoteVideo = useRef<HTMLVideoElement>(null)
    const connectionRef = useRef<any>()
    const socket = useContext(SocketContext)
    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream)
                localVideo.current.srcObject = currentStream
            })

        socket.on('call-user', (data) => {
            console.log('звонок пришеa')
            setReceivingCall(true)
            setCall(data)
            
        })
        socket.on('changing-view', (view) => {
            setCurrentView(view)
        })

        socket.on('receive-file', (file) => {
            console.log(file)
            setFile(file)
        })

        socket.on('room-leave', (a) => {
            console.log('чел вышел')
            //  setCallEnded(true)
            setCallStart(false)
            connectionRef.current.destroy()
        })

        if (User !== null) {
            if (User._id === teacherId) {
                console.log('учитель перешел')
                socket.on('user-joined', () => {
                    console.log('ученик зашел')
                    setCallStart(true)
                })
                socket.emit('create-room', teacherId)
            } else {
                console.log('ученик перешел')

                socket.emit('join-room', teacherId)
            }
        }
    }, [User])

    function callUser() {
        console.log('иницирую звонок')
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        })
        // когда установил емитаю звонок
        peer.on('signal', (data) => {
            const toCall = studentId
            const fromCall = teacherId
            socket.emit('call-user', {
                userToCall: toCall,
                signalData: data,
                from: fromCall,
                name: 'test',
            })
        })
        peer.on('close', () => {
            console.log('peer closed')
            socket.off('callAccepted')
        })
        //получил видео которое можно засунуть в тег
        peer.on('stream', (stream) => {
            if (stream !== null && remoteVideo.current) {
                remoteVideo.current.srcObject = stream
            }
        })

        socket.on('callAccepted', (signal) => {
            console.log('звонок принят')
            peer.signal(signal)
        })

        connectionRef.current = peer
    }
    function answerCall() {
        setCallEnded(false)
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
        })
        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from })
        })

        peer.on('stream', (stream) => {
            console.log('answer', stream)
            if (remoteVideo.current) {
                remoteVideo.current.srcObject = stream
                
            }
        })
        peer.on('close', () => {
            console.log('peer closed')
            socket.off('callAccepted')
        })
        peer.signal(call.signal)
        connectionRef.current = peer
    }

    useEffect(() => {
        if (receivingCall) {
            answerCall()
        }
    }, [receivingCall])

    useEffect(() => {
        if (callStart) {
            callUser()
        }
    }, [callStart])

    function ChangeView(view: number) {
        setViewModal(false)
        socket.emit('change-view', {
            view,
            userId: studentId,
        })
        setCurrentView(view)
    }

    function LoadFile(e: any) {
        let file = e.target.files[0]

        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (e) {
            console.log(reader.result)
            setFile(reader.result)
            socket.emit('load-file', {
                file: reader.result,
                userId: studentId,
            })
        }
    }
    return (
        <div
            style={{
                width: '100%',
                height: window.innerHeight,
                background: '#f6f7fb',
                position: 'relative',
                display: 'flex',
            }}
        >
            <div style={{ fontSize: '4rem' }}>{currentView}</div>

            <DefaultScreenContent view={currentView}>
                <LocalVideo
                    isTeacherVideo={teacherId === User?._id}
                    view={currentView}
                >
                    <video autoPlay ref={localVideo} muted />
                </LocalVideo>
                {!callEnded && (
                    <RemoteVideo
                        isTeacherVideo={teacherId != User?._id}
                        view={currentView}
                    >
                        <video
                            autoPlay
                            ref={remoteVideo}
                            muted={teacherId !== User?._id}
                        />
                    </RemoteVideo>
                )}
            </DefaultScreenContent>
            {currentView === 2 && (
                <PDFSide>
                    {file === null ? (
                        teacherId === User?._id ? (
                            <div>
                                загрузите файл
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        LoadFile(e)
                                    }}
                                />
                            </div>
                        ) : (
                            <div>жди сучара</div>
                        )
                    ) : (
                        <div>
                            <img src={file} />
                        </div>
                    )}
                </PDFSide>
            )}
            <div onClick={()=>console.log(remoteVideo.current?.srcObject)}>123123</div>
            <CallSettings setViewModal={setViewModal} />
            {viewModal && (
                <ChangeViewWrapper>
                    <ChangeViewModal>
                        <span
                            style={{ color: 'white', fontSize: '2rem' }}
                            onClick={() => setViewModal(false)}
                        >
                            X
                        </span>
                        <div onClick={() => ChangeView(1)}>default view</div>
                        <div onClick={() => ChangeView(2)}>view2</div>
                    </ChangeViewModal>
                </ChangeViewWrapper>
            )}
        </div>
    )
}

export default VideoChat
