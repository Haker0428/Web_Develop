/**
 * 目标1：完成省市区下拉列表切换
 *  1.1 设置省份下拉菜单数据
 *  1.2 切换省份，设置城市下拉菜单数据，清空地区下拉菜单
 *  1.3 切换城市，设置地区下拉菜单数据
 */
axios({
    url: 'http://hmajax.itheima.net/api/province'
}).then(res => {
    const provinceList = res.data.list;
    const htmlStr = provinceList.map(item => `<option value="${item}">${item}</option>`).join('');
    document.querySelector('.province').innerHTML = `<option value="">省份</option>${htmlStr}`;
})

document.querySelector('.province').addEventListener('change', e => {
    const provinceValue = e.target.value;
    console.log(provinceValue);
    axios({
        url: 'http://hmajax.itheima.net/api/city',
        params: {
            pname: provinceValue
        }
    }).then(res => {
        const cityList = res.data.list;
        const htmlStr = cityList.map(item => `<option value="${item}">${item}</option>`).join('');
        document.querySelector('.city').innerHTML = `<option value="">城市</option>${htmlStr}`;
        document.querySelector('.area').innerHTML = '<option value="">地区</option>';
    })
})

document.querySelector('.city').addEventListener('change', e => {
    const cityValue = e.target.value;
    const provinceValue = document.querySelector('.province').value;
    console.log(cityValue);
    axios({
        url: 'http://hmajax.itheima.net/api/area',
        params: {
            pname: provinceValue,
            cname: cityValue
        }
    }).then(res => {
        const cityList = res.data.list;
        const htmlStr = cityList.map(item => `<option value="${item}">${item}</option>`).join('');
        document.querySelector('.area').innerHTML = `<option value="">地区</option>${htmlStr}`;
    })
})

document.querySelector('.submit').addEventListener('click', async () => {
    const form = document.querySelector('.info-form');
    const data = serialize(form, { hash: true , empty: true });
    console.log(data);
    try {
        const res = await axios({
            url: 'http://hmajax.itheima.net/api/feedback',
            method: 'POST',
            data: data
        })
        console.log(res);
        alert(res.data.message);
    } catch (err) {
        console.log(err);
        alert(err.response.data.message);
    }
    
})
