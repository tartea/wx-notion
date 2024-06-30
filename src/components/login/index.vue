
<template>
    <div class="wx-login">
        <div class="wx-header">
            <div class="wx-logo">
                <router-link to="/">
                    <img src="/logo/logo.svg" />
                </router-link>
            </div>
            <div class="wx-title">SyncChat</div>
            <div class="wx-remark">同步读书笔记</div>
        </div>
        <div class="wx-footer">
            <div class="wx-read-button" @click="goToWXRead()">
                    登陆微信读书网页端
            </div>

            <div class="wx-remark">使用 SyncChat, 请先完成微信读书登录</div>
        </div>
    </div>
</template>

<script setup>

const goToWXRead = ()=>{
    window.open("https://weread.qq.com/", "_blank");
}
</script>
<style scoped>
.wx-login {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 600px;
    width: 50%;
    justify-content: space-around;
}

.wx-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 200px;
    justify-content: space-around;
}

.wx-logo >a >img {
    width: 100px;
    height: 100px;
}

.wx-logo:hover {
    cursor: pointer;
}

.wx-header .wx-title {
    font-size: 30px;
    font-weight: bold;
}

.wx-remark {
    font-size: 12px;
    color: rgb(171, 168, 168);
}

.wx-footer {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 75px;
}

.wx-footer .wx-read-button {
    width: 80%;
    height: 40px;
    background-color: #f9e54d;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
}
.wx-footer .wx-read-button:hover{
    cursor: pointer;
}
</style>