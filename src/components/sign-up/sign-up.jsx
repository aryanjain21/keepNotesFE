import React, { useState } from 'react';
import './sign-up.scss';
import ShowPassword from '../../assets/icons/open_eye.svg';
import HidePassword from '../../assets/icons/close_eye.svg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { signUp } from '../../services/api';
import { useUser } from '../../context/userContext';
import { toast } from 'react-toastify';

const SignUp = (props) => {

    const { setSignUp, handleRequestCloseFunc, setLoader } = props;

    const { userDispatch } = useUser();
    const [showPassword, setShowPassword] = useState(false);

    const InitialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    };

    const ValidationsSchema = yup.object({
        firstName: yup
            .string()
            .required('Please enter first name'),
        lastName: yup
            .string()
            .required('Please enter last name'),
        email: yup
            .string()
            .required('Please enter email')
            .email('Please enter a valid email'),
        password: yup
            .string()
            .required('Please enter password')
            .matches(
                /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                'Password must contain at least one number, one special character & length must be 6 to 16 character/digits.'
            )
    });

    return (
        <div className='sign_up_container'>
            <div className='title'>Sign Up</div>
            <Formik
                initialValues={InitialValues}
                validationSchema={ValidationsSchema}
                onSubmit={async (values) => {
                    try {
                        setLoader(true);
                        let res = await signUp(values);
                        if (res.data.status === 200) {
                            toast.success(res.data.message);
                            setLoader(false);
                            let user = res.data.data;
                            localStorage.setItem('setUser', JSON.stringify({ firstName: user.firstName, lastName: user.lastName, email: user.email, token: user.token, screen: 'Notes' }));
                            userDispatch({ type: 'SIGNUP', payload: user });
                            handleRequestCloseFunc();
                        }
                    } catch (error) {
                        setLoader(false);
                        toast.error(error.response && error.response.data && error.response.data.message && error.response.data.message);
                    }
                }}>
                <Form className='control_area'>
                    <div className='grid_structure'>
                        <div className='form_control'>
                            <div className='label'>First Name</div>
                            <div className='form_input'>
                                <Field type="text" name='firstName' placeholder='Eg:abc@gmail.com' />
                            </div>
                            <ErrorMessage className='error' name="firstName" component="div" />
                        </div>
                        <div className='form_control'>
                            <div className='label'>Last Name</div>
                            <div className='form_input'>
                                <Field type="text" name='lastName' placeholder='Eg:abc@gmail.com' />
                            </div>
                            <ErrorMessage className='error' name="lastName" component="div" />
                        </div>
                    </div>
                    <div className='grid_structure'>
                        <div className='form_control'>
                            <div className='label'>Email Id</div>
                            <div className='form_input'>
                                <Field type="text" name='email' placeholder='Eg:abc@gmail.com' />
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
                    </div>
                    <div className='btn_area'>
                        <button type='submit'>Sign Up</button>
                    </div>
                </Form>
            </Formik>
            <div className='sign_in_link'>Already have an Account? <span className='link' onClick={() => setSignUp(false)}>Sign In</span></div>
        </div>
    );
}

export default SignUp;