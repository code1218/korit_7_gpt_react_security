import { Box, Button, Card, CardContent, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, setAccessToken, setRefreshToken } from '../../api/config/axiosConfig';
import { useQueryClient } from '@tanstack/react-query';

/**
 * 로그인 요구사항
 * 각 필드가 공백인지만 체크(공백이면 아래 오류 메세지로 출력)
 * 로그인 버튼 클릭시 /api/auth/signin 요청 
 * -> 응답받은 AccessToken을 localstorage에 AccessToken이라는 키값으로 저장. 
 * Index페이지로 이동.
 * 계정이 없으신가요? 회원가입
 * 
 */

function SigninPage(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [ signinInput, setSigninInput ] = useState({
        username: "",
        password: "",
    });

    const [ errors, setErrors ] = useState({
        username: "",
        password: "",
    });

    const [ isSigninError, setSigninError ] = useState(false);

    const handleInputOnBlur = (e) => {
        const { name, value } = e.target;
        setErrors(prev => ({
            ...prev,
            [name]: !(value.trim()) ? `${name}을 입력하세요.` : "",
        }));
    }

    const handleSigninInputOnChange = (e) => {
        setSigninInput({
            ...signinInput,
            [e.target.name]: e.target.value,
        });
    }

    const handleSigninButtonOnClick = async () => {
        if(Object.entries(errors).filter(entry => !!entry[1]).length > 0) {
            return;
        }

        try {
            const response = await api.post("/api/auth/signin", signinInput);
            console.log(response.data)
            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            queryClient.invalidateQueries({queryKey: ["userQuery"]});
            navigate("/");
        } catch(error) {
            setSigninError(true);
        }
    }

    return (
        <Box mt={10}>
            <Container maxWidth={"xs"}>
                <Card variant='outlined'>
                    <CardContent>
                        <Typography variant='h4' textAlign={'center'}>로그인</Typography>
                        <Box display={"flex"} flexDirection={'column'} gap={2}>
                            <TextField type='text' label="username" name='username' 
                                onChange={handleSigninInputOnChange} value={signinInput.username}
                                onBlur={handleInputOnBlur}
                                error={!!errors.username}
                                helperText={errors.username} />
                            <TextField type='password' label="password" name='password' 
                                onChange={handleSigninInputOnChange} value={signinInput.password}
                                onBlur={handleInputOnBlur}
                                error={!!errors.password}
                                helperText={errors.password} />
                            {
                                isSigninError && 
                                <Typography variant='body2' textAlign={'center'} color='red'>
                                    사용자 정보를 다시 확인하세요.
                                </Typography>
                            }
                            
                            <Button variant='contained' onClick={handleSigninButtonOnClick}>로그인</Button>
                        </Box>
                        <Typography variant='h6' textAlign={'center'}>
                            계정이 없으신가요? <Link to={"/signup"}>회원가입</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}

export default SigninPage;