// axios 公共配置
// 基地址
axios.defaults.baseURL = 'https://geek.itheima.net'

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// 响应拦截器
axios.interceptors.response.use(response => {
    return response.data;
}, error => {
    // 401 未授权
    console.dir(error);
    if (error?.response?.status === 401) {
        alert('身份过期，请重新登录')
        localStorage.clear()
        location.href = '../login/index.html'
    }
    return Promise.reject(error)
})
