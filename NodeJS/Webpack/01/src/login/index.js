import { checkPhone, checkCode } from '../utils/check.js';

import myAxios from '../utils/request.js';
import { myAlert } from '../utils/alert.js';


document.querySelector('.btn').addEventListener('click', async () => {
    
    const phone = document.querySelector('.login-form [name=mobile]').value;
    const code = document.querySelector('.login-form [name=code]').value;
    console.log(phone, code);
    if (!checkPhone(phone)) {
        myAlert(false, '手机号格式不正确');
        console.log('手机号格式不正确');
        return;
    }

    if (!checkCode(code)) {
        myAlert(false, '验证码格式不正确');
        console.log('验证码格式不正确');
        return;
    }

    console.log('验证成功');
    
    try {
        const res = await myAxios({
            url: '/v1_0/authorizations',
            method: 'POST',
            data: {
                mobile: phone,
                code: code
            }
        });
        console.log(res);
        myAlert(true, '验证成功');
        localStorage.setItem('token', res.data.token);
        location.href = '../content/index.html';
    } catch (error) {
        console.log(error);
        myAlert(false, error.response.data.message);
    }
})

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './index.less';

import imgObj from './assets/logo.png';
const theImg = document.createElement('img');
theImg.src = imgObj;
document.querySelector('.login-wrap').appendChild(theImg);

console.log('login');
if (process.env.NODE_ENV == 'production') {
    console.log = function() {};
}

console.log('开发环境');

import youAios from '@/utils/request.js';

console.log(youAios);
