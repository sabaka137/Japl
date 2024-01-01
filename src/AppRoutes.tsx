import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Landing } from './pages/Landing/Landing'
import { Groups } from './pages/UserCollections/Groups'
import SelectedGroup from './pages/CollectionPage/SelectedGroup'
import CreateGroup from './pages/CreateCollection/CreateGroup'
import SelectedKanji from './pages/KanjiPage/SelectedKanji'
import Header from './pages/Header'
import GroupQuiz from './pages/CollectionQuiz/CollectionQuiz'
import TeacherRegistration from './pages/TeacherRegestration/TeacherRegistration'
import TeachersList from './pages/TeachersList/TeachersList'
import { LoginPage } from './pages/LoginPage/LoginPage'
import UserLessons from './pages/UserLessons/UserLessons'
import TeacherPage from './pages/TeacherPage/TeacherPage'
import { Settings } from './pages/Settings/Settings'
import { Messages } from './pages/Messages/Messages'
import VideoChat from './pages/VideoChat/VideoChat'
import FavoriteTeachers from './pages/FavoriteTeachers/FavoriteTeachers'
import { PrivateRoute } from './PrivateRoute'

type Props = {
    isAuthenticated: boolean
}

function AppRoutes({ isAuthenticated }: Props) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <Header />
            <div style={{ flex: 1 }}>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/settings"
                        element={
                            <PrivateRoute isAuthenticated={isAuthenticated}>
                                <Settings />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/messages"
                        element={
                            <PrivateRoute isAuthenticated={isAuthenticated}>
                                <Messages />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/favorite-teachers"
                        element={
                            <PrivateRoute isAuthenticated={isAuthenticated}>
                                <FavoriteTeachers />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/signup/teacher"
                        element={<TeacherRegistration />}
                    />

                    <Route
                        path="/lessons"
                        element={
                            <PrivateRoute isAuthenticated={isAuthenticated}>
                                <UserLessons />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/lesson/:teacherId/:studentId"
                        element={
                            <PrivateRoute isAuthenticated={isAuthenticated}>
                                <VideoChat />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/groups"
                        element={
                            <PrivateRoute isAuthenticated={isAuthenticated}>
                                <Groups />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/group/:id"
                        element={
                            <PrivateRoute isAuthenticated={isAuthenticated}>
                                <SelectedGroup />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/group/:id/quiz"
                        element={
                            <PrivateRoute isAuthenticated={isAuthenticated}>
                                <GroupQuiz />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/group/create/:type?/:id?"
                        element={
                            <PrivateRoute isAuthenticated={isAuthenticated}>
                                <CreateGroup />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/vocabulary/:kanji"
                        element={<SelectedKanji />}
                    />
                    <Route path="/teachers" element={<TeachersList />} />
                    <Route path="/teacher/:id" element={<TeacherPage />} />
                </Routes>
            </div>
        </div>
    )
}

export default AppRoutes
