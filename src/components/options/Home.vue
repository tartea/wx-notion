<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
    @select="handleSelect">
    <div class="flex-grow"></div>
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
  HomeFilled
} from '@element-plus/icons-vue'
import { getUserInfo } from '../../http/userApi';
import { getUserVid } from '../../utils/chrome_util'
import { useRouter } from 'vue-router';

const activeIndex = ref('bookHome')

const userInfoRef = reactive({
  avatarUrl: '',
  authorName: ''
})

const userVid = ref('')
const router = useRouter()

onMounted(async () => {
  // 获取用户ID
  userVid.value = await getUserVid()

  const userInfo = await getUserInfo(userVid.value)
  if (userInfo) {
    userInfoRef.authorName = userInfo.name
    userInfoRef.avatarUrl = userInfo.avatar
  }
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
}

.author-logo {
  opacity: 1;
  cursor: none;
}
</style>