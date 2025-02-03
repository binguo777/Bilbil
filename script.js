

// 设置 cookie 的辅助函数
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// 获取 cookie 的辅助函数
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}


document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 简单的前端验证
    if (username === '') {
        alert('用户名不能为空');
        return;
    }
    if (password === '') {
        alert("密码不能为空");
        return;
    }

    try {
        const response = await fetch('http://192.168.0.107:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json();

        // 请求
        if (response.ok) {
            //检验接口是否成功
            if (data.code == 200) {
                alert("成功:" + data.message);
                setCookie('token', data.token, 7);
                window.location.href = '1.html';
            } else {
                alert("失败:" + data.message);
            }

        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('请求错误');
    }
});


document.getElementById('regForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const username = document.getElementById('rusername').value;
    const password = document.getElementById('rpassword').value;

    // 简单的前端验证
    if (username === '') {
        alert('用户名不能为空');
        return;
    }
    if (password === '') {
        alert("密码不能为空");
        return;
    }

    try {
        const response = await fetch('http://192.168.0.107:8000/reg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            setCookie('token', data.token, 7);
            // window.location.href = '/success';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('请求错误');
    }
});
// 新增检测登录状态的逻辑
document.getElementById('checkLoginStatus').addEventListener('click', async function () {
    const token = getCookie('token');
    if (!token) {
        alert('未登录，请先登录');
        return;
    }

    try {
        const response = await fetch('http://192.168.0.107:8000/islogin', {
            method: 'GET',
            headers: {
                // 因为是 GET 请求，不需要指定 Content - Type
                'Authorization': `Bearer ${token}`
            }
        });

        // 解析响应为 JSON 格式
        const data = await response.json();

        if (response.ok) {
            alert(data.message);
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('请求错误');
    }
});



