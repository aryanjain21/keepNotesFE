import React, { useEffect, useState } from 'react';
import './login.scss';
import ShowPassword from '../../assets/icons/open_eye.svg';
import HidePassword from '../../assets/icons/close_eye.svg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useUser } from '../../context/userContext';
import { signIn } from '../../services/api';
import { toast } from 'react-toastify';
import RingLoader from "react-spinners/RingLoader";

const Login = (props) => {

    const { signUp, setSignUp, handleRequestCloseFunc, setLoader, loader } = props;
    const { userDispatch } = useUser();
    const [showPassword, setShowPassword] = useState(false);

    const InitialValues = {
        email: '',
        password: ''
    }

    const ValidationSchema = yup.object({
        email: yup
            .string()
            .trim()
            .email('Please enter a valid email')
            .required('Please enter email'),
        password: yup
            .string()
            .trim()
            .required('Please enter password')
            .matches(
                /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                'Password must contain at least one number, one special character & length must be 6 to 16 character/digits.'
            )
    });

    useEffect(() => {
        document && document.getElementById('name').blur();
    }, []);

    const guestLogin = async () => {
        try {
            let login = { email: 'admin@gmail.com', password: 'admin@123' };
            setLoader(true);
            const res = await signIn(login);
            if (res.data.status === 200) {
                toast.success(res.data.message);
                setLoader(false);
                let user = res.data.data;
                localStorage.setItem('setUser', JSON.stringify({ firstName: user.firstName, lastName: user.lastName, email: user.email, token: user.token, view: 'List', screen: 'Notes' }));
                userDispatch({ type: 'SIGNIN', payload: user });
                handleRequestCloseFunc();
            }
        } catch (error) {
            setLoader(true);
            toast.error(error?.response?.data?.message);
        }
    }

    return (
        <div className='login_container'>
            <div className='title'>
                Sign In
            </div>
            <Formik
                initialValues={InitialValues}
                validationSchema={ValidationSchema}
                onSubmit={async (values) => {
                    try {
                        setLoader(true);
                        const res = await signIn(values);
                        if (res.data.status === 200) {
                            toast.success(res.data.message);
                            setLoader(false);
                            let user = res.data.data;
                            localStorage.setItem('setUser', JSON.stringify({ firstName: user.firstName, lastName: user.lastName, email: user.email, token: user.token, view: 'List', screen: 'Notes' }));
                            userDispatch({ type: 'SIGNIN', payload: user });
                            handleRequestCloseFunc();
                        }
                    } catch (error) {
                        setLoader(true);
                        toast.error(error?.response?.data?.message);
                    }
                }}>
                <Form className='control_area'>
                    <div className='form_control'>
                        <div className='label'>Email Id</div>
                        <div className='form_input'>
                            <Field id='name' type="text" name='email' placeholder='Eg:abc@gmail.com' />
                        </div>
                        <ErrorMessage className='error' name="email" component="div" />
                    </div>
                    <div className='form_control'>
                        <div className='label'>Password</div>
                        <div className='form_input'>
                            <Field type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' />
                            <div className='icon_area' onClick={() => setShowPassword(!showPassword)}>
                                <img src={showPassword ? ShowPassword : HidePassword} alt='eye' />
                            </div>
                        </div>
                        <ErrorMessage className='error' name="password" component="div" />
                    </div>
                    <div className='btn_area'>
                        <button type='submit'>Sign In</button>
                    </div>
                </Form>
            </Formik>
            <div className='guest_user'>
                Are you <span className='link' onClick={guestLogin}>Guest User</span> ?
            </div>
            <div className='sign_up_link'>Don’t have an Account yet ? <span className='link' onClick={() => setSignUp(!signUp)}>Sign Up</span></div>
            <RingLoader css={`position: fixed;
                                top: 0;
                                right: 0;
                                bottom: 0;
                                left: 0;
                                margin: auto;`}
                size={75} color={"#FFBF00"} loading={loader} speedMultiplier={1} />
        </div>
    );
}

export default Login;