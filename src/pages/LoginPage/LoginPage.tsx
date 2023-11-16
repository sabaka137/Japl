import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/hook'
import { AuthSliceAsyncActions } from '../../redux/reducers/AuthSlice'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
    ConfirmButton,
    LoginChangeType,
    LoginContainer,
    LoginErrorMessage,
    LoginSeparator,
    LoginType,
    OAuthButton,
    OauthButtonsContainer,
} from './style'
import { AiOutlineGoogle } from 'react-icons/ai'
import { ContentContainer } from '../../components/Common'
import { BsApple, BsFacebook } from 'react-icons/bs'
import { LoginInput } from '../../components/Input/LoginInput'
import { ButtonLoader } from '../../components/Loader/ButtonLoader'

type FormValues = {
    name: string
    password: string
    email: string
}
export const LoginPage = () => {
    const [login, setLogin] = useState(true)
    const [loginError, setLoginError] = useState(false)
    const [fetching, setFetching] = useState(false)
    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: {
            name: '',
            password: '',
            email: '',
        },
    })
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    //fix-type
    //fix-errors
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        if (login) {
            setFetching(true)
            dispatch(
                AuthSliceAsyncActions.Login({
                    email: data.email,
                    password: data.password,
                })
            ).then((res) => {
                const status = res.payload
                if (status == 200) {
                    navigate('/groups')
                } else {
                    setFetching(false)
                    setLoginError(true)
                }
            })
        } else {
            setFetching(true)
            dispatch(
                AuthSliceAsyncActions.Registration({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                })
            ).then((res) => {
                navigate('/groups')
            })
        }
    }
    useEffect(() => {
        reset({ name: '', password: '', email: '' })
    }, [login])
    return (
        <ContentContainer>
            <LoginContainer>
                {login ? (
                    <div>
                        <LoginType>Log in</LoginType>

                        <LoginChangeType onClick={() => setLogin(false)}>
                            Sign in as a student
                        </LoginChangeType>
                        <LoginChangeType
                            onClick={() => navigate('/signup/teacher')}
                        >
                            Sign in as a tutor
                        </LoginChangeType>

                        <OauthButtonsContainer>
                            <OAuthButton type="google">
                                <AiOutlineGoogle />
                                <div>Continue with Google</div>
                            </OAuthButton>
                            <OAuthButton type="facebook">
                                <BsFacebook />
                                <div>Continue with Facebook</div>
                            </OAuthButton>
                            <OAuthButton type="apple">
                                <BsApple />
                                <div>Continue with Apple</div>
                            </OAuthButton>
                        </OauthButtonsContainer>
                        <LoginSeparator>or</LoginSeparator>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {loginError && (
                                <LoginErrorMessage>
                                    Please enter the correct user name user name
                                    and password. Both fields may be case
                                    sensitive.
                                </LoginErrorMessage>
                            )}
                            <div>
                                <LoginInput
                                    label="E-mail"
                                    placeholder="Your e-mail address"
                                    errors={errors?.email}
                                    props={{
                                        ...register('email', {
                                            required: true,
                                            pattern: {
                                                value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                                                message:
                                                    'You have entered an incorrect e-mail address',
                                            },
                                        }),
                                    }}
                                />
                            </div>
                            <div>
                                <LoginInput
                                    label="Password"
                                    placeholder="Your password"
                                    errors={errors?.password}
                                    props={{
                                        ...register('password', {
                                            required: 'Required field',
                                            minLength: {
                                                value: 5,
                                                message:
                                                    'Password must be greater than 5 and less than 15 characters',
                                            },
                                            maxLength: {
                                                value: 15,
                                                message:
                                                    'The password must be greater than 5 and less than 15 characters long',
                                            },
                                        }),
                                    }}
                                />
                            </div>
                            <ConfirmButton disabled={fetching} type="submit">
                                {fetching ? <ButtonLoader /> : 'Log in'}
                            </ConfirmButton>
                        </form>
                    </div>
                ) : (
                    <div>
                        <LoginType>Sign in as a student</LoginType>

                        <LoginChangeType onClick={() => setLogin(true)}>
                            Already have an account?
                        </LoginChangeType>

                        <OauthButtonsContainer>
                            <OAuthButton type="google">
                                <AiOutlineGoogle />
                                <div>Signing up via Google</div>
                            </OAuthButton>
                            <OAuthButton type="facebook">
                                <BsFacebook />
                                <div>Signing up via Facebook</div>
                            </OAuthButton>
                        </OauthButtonsContainer>
                        <LoginSeparator>or</LoginSeparator>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <LoginInput
                                    label="Name"
                                    placeholder="Your name"
                                    errors={errors?.name}
                                    props={{
                                        ...register('name', {
                                            required: 'Required field',
                                            minLength: {
                                                value: 1,
                                                message:
                                                    'Пароль должен быть больше 5 и меньше 15 символов',
                                            },
                                            maxLength: {
                                                value: 15,
                                                message:
                                                    'Пароль должен быть быть больше 5 и меньше 15 символов',
                                            },
                                        }),
                                    }}
                                />
                            </div>
                            <div>
                                <LoginInput
                                    label="E-mail"
                                    placeholder="Your e-mail"
                                    errors={errors?.email}
                                    props={{
                                        ...register('email', {
                                            required: true,
                                            pattern: {
                                                value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                                                message:
                                                    'Вы ввели неправильный адрес электронной почты',
                                            },
                                        }),
                                    }}
                                />
                            </div>
                            <div>
                                <LoginInput
                                    label="Password"
                                    placeholder="Your password"
                                    errors={errors?.password}
                                    props={{
                                        ...register('password', {
                                            required: 'Обязательное поле',
                                            minLength: {
                                                value: 5,
                                                message:
                                                    'Password must be greater than 5 and less than 15 characters',
                                            },
                                            maxLength: {
                                                value: 15,
                                                message:
                                                    'The password must be greater than 5 and less than 15 characters long',
                                            },
                                        }),
                                    }}
                                />
                            </div>
                            <ConfirmButton type="submit">Sign up</ConfirmButton>
                        </form>
                    </div>
                )}
            </LoginContainer>
        </ContentContainer>
    )
}
