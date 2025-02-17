import { Box, Button, Card, CardContent, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SignupPage(props) {
    const [ signupInput, setSignupInput ] = useState({
        username: "",
        password: "",
    });

    const handleSignupInputOnChange = (e) => {
        setSignupInput({
            ...signupInput,
            [e.target.name]: e.target.value,
        });
    }

    const handleSignupButtonOnClick = () => {
        console.log(signupInput);
    }

    return (
        <Box mt={10}>
            <Container maxWidth={"xs"}>
                <Card variant='outlined'>
                    <CardContent>
                        <Typography variant='h4' textAlign={'center'}>회원가입</Typography>
                        <Box display={"flex"} flexDirection={'column'} gap={2}>
                            <TextField type='text' label="username" name='username' onChange={handleSignupInputOnChange} value={signupInput.username} />
                            <TextField type='password' label="password" name='password' onChange={handleSignupInputOnChange} value={signupInput.password} />
                            <TextField type='text' label="name" name='name' onChange={handleSignupInputOnChange} value={signupInput.password} />
                            <TextField type='email' label="email" name='email' onChange={handleSignupInputOnChange} value={signupInput.password} />
                            <Button variant='contained' onClick={handleSignupButtonOnClick}>가입하기</Button>
                        </Box>
                        <Typography variant='h6' textAlign={'center'}>
                            이미 계정이 있나요? <Link>로그인</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}

export default SignupPage;