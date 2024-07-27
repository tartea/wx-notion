<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
    @select="handleSelect">
    <div class="flex-grow">
    </div>
    <el-menu-item index="/bookHome">
      <el-icon :size="30">
        <HomeFilled />
      </el-icon>
      首页</el-menu-item>
    <el-menu-item index="/setting">
      <el-icon :size="30">
        <Setting />
      </el-icon>设置
    </el-menu-item>
    <el-menu-item index="noRouter" disabled class="author-logo">
      <el-avatar :size="40" :src="userInfoRef.avatarUrl" />
    </el-menu-item>
  </el-menu>
  <router-view></router-view>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue';
import {
  Setting,
  HomeFilled,
  Position,
  Search
} from '@element-plus/icons-vue'
import { getUserInfo } from '../../http/userApi';
import { getUserVid, getChromeId, saveChromeActive, getChromeActive } from '../../utils/chrome_util'
import bus from '../../utils/event_bus'
import CryptoJS from "crypto-js";

import { useRouter } from 'vue-router';

const activeIndex = ref('bookHome')
const showActiveExtendsionType = ref('buy')
const activeCodeValue = ref('')
const secretCode = ref('')
const isShowActiveLabel = ref('')

const userInfoRef = reactive({
  avatarUrl: '',
  authorName: ''
})

const userVid = ref('')
const router = useRouter()

onMounted(async () => {
  //是否展示label
  isShowActiveLabel.value = await getChromeActive()

  // 获取用户ID
  userVid.value = await getUserVid()

  const userInfo = await getUserInfo(userVid.value)
  if (userInfo === undefined || userInfo.errCode != undefined) {
    router.push({ path: '/login', replace: true })
    return
  }
  userInfoRef.authorName = userInfo.name
  userInfoRef.avatarUrl = userInfo.avatar
  router.replace({ path: '/bookHome' });

})
const handleSelect = (routerPath) => {
  if (routerPath === 'noRouter') {
    return;
  }
  router.replace({ path: routerPath });
}

</script>
<style scoped>
.el-menu {
  width: 100%;
}

.flex-grow {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
}

.author-logo {
  opacity: 1;
  cursor: none;
}

.flex-grow-vip-text {
  display: flex;
  width: 30%;
  background-color: gray;
  padding: 10px 40px;
  border-radius: 35px;
  justify-content: space-between;
  opacity: 0.7;
  color: white;
}

.flex-grow-vip-btn {
  color: #f9e54d;
  cursor: pointer;
}

.vip-mone-text {
  font-weight: bold;
  font-size: 35px;
}

.vip-pro-title {
  color: rgb(180, 179, 179);
}

.vip-flex {
  display: flex;
  font-weight: bold;
  align-items: center;
  padding: 3px 10px;
}

.text-foreground {
  margin: 10px;
}

.vip-buy-btn {
  background-color: rgb(255, 200, 0);
  height: 37px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 21px;
  cursor: pointer;
}

.vip-buy-btn:hover {
  background-color: rgb(232, 204, 100);
}


.vip-active-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 37px;
  cursor: pointer;
}

.flex-line {
  margin-top: 10px
}

.vip-active-code {
  display: flex;
  justify-content: center;
}

.active_code_p {
  background-color: rgb(228, 228, 228);
}
</style>