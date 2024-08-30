let users = JSON.parse(localStorage.getItem('users')) || {}; // ローカルストレージからユーザー情報を取得
let currentUser = '';

function toggleMenu() {
    var menuItems = document.getElementById('menuItems');
    if (menuItems.style.display === 'block') {
        menuItems.style.display = 'none';
    } else {
        menuItems.style.display = 'block';
    }
}

function showScreen(screenId) {
    var screens = document.querySelectorAll('.screen');
    screens.forEach(function(screen) {
        screen.style.display = 'none';
    });
    document.getElementById(screenId).style.display = 'block';
}

function login() {
    const username = document.getElementById('usernameInput').value;
    const inputPassword = document.getElementById('passwordInput').value;

    if (inputPassword === '1111' && !users[username]) {
        // 初期ログインパスワードが正しい場合、かつユーザーが存在しない場合
        showScreen('newPassword');
        document.getElementById('newUsernameInput').value = username; // ユーザー名を引き継ぐ
    } else if (users[username] && users[username].password === inputPassword) {
        // ユーザーが存在し、パスワードが一致する場合
        currentUser = username;
        showScreen('top');
    } else {
        document.getElementById('loginMessage').textContent = 'ユーザー名またはパスワードが間違っています';
    }
}

function createPassword() {
    const newUsername = document.getElementById('newUsernameInput').value;
    const newPassword = document.getElementById('newPasswordInput').value;

    if (newPassword.length < 4 || newPassword.length >= 60) {
        document.getElementById('newPasswordMessage').textContent = 'パスワードは4桁以上60桁未満にしてください';
        return;
    }

    if (Object.keys(users).some(user => users[user].password === newPassword)) {
        document.getElementById('newPasswordMessage').textContent = 'すでにそのパスワードは使用されています';
        return;
    }

    // ユーザー名とパスワードを保存
    users[newUsername] = { password: newPassword, data: {} };
    localStorage.setItem('users', JSON.stringify(users));
    currentUser = newUsername;
    showScreen('top');
}
