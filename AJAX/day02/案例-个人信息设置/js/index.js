/**
 * 目标1：信息渲染
 *  1.1 获取用户的数据
 *  1.2 回显数据到标签上
 * */
axios({
    url: 'http://hmajax.itheima.net/api/settings',
    params: {
        creator: 'hp'
    }
}).then(res => {
    const userObj = res.data.data;
    console.log(userObj);
    Object.keys(userObj).forEach(key => {
        if (key === 'avatar') {
            document.querySelector(`.prew`).src = userObj[key];
        } else if (key === 'gender') {
            const radioList = document.querySelectorAll(`.gender`);
            radioList[userObj[key]].checked = true;
        } else {
            document.querySelector(`.${key}`).value = userObj[key];
        }
    })
})

document.querySelector('.upload').addEventListener('change', e => {
    const fs = new FormData();
    fs.append('img', e.target.files[0]);
    fs.append('creator', 'hp');
    axios({
        url: 'http://hmajax.itheima.net/api/avatar',
        method: 'PUT',
        data: fs
    }).then(res => {
        console.log(res);
        const imgUrl = res.data.data.avatar;
        document.querySelector(`.prew`).src = imgUrl;
    })
})



document.querySelector('.submit').addEventListener('click', e => {
    const userForm = document.querySelector('.user-form');
    const userObj = serialize(userForm, { hash: true, empty: true });
    userObj.creator = 'hp';
    userObj.gender = +userObj.gender;
    console.log(userObj);
    axios({
        url: 'http://hmajax.itheima.net/api/settings',
        method: 'PUT',
        data: userObj
    }).then(res => {
        console.log(res);
        const toastDom = document.querySelector('.my-toast');
        const toast = new bootstrap.Toast(toastDom);
        toast.show();
    })
})
