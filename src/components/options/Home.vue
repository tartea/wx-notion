<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
    @select="handleSelect">
    <div class="flex-grow">
      <div class="flex-grow-vip-text">剩余同步数：{{ syncCount }}/30
        <div class="flex-grow-vip-btn" @click="isShowVip = true">
          升级享无限同步
          <el-icon>
            <Position />
          </el-icon>
        </div>
      </div>
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
  <el-dialog v-model="isShowVip" title="专业版本授权" :close-on-press-escape="false" width="400" @close="closeDialog">
    <div v-if="isActiveExtendsion">
      <h2 class="vip-mone-text">¥ 8</h2>
      <div>
        <div class="vip-pro-title">专业版本特性：</div>
        <div>
          <div class="vip-flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
              fill="none">
              <mask x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="white"></rect>
              </mask>
              <g>
                <path
                  d="M6.975 16.7727C5.71853 16.7765 4.51277 16.2774 3.62656 15.3867C1.79141 13.5422 1.79141 10.5438 3.625 8.7008C4.51154 7.80887 5.71822 7.30893 6.97578 7.31252C8.24063 7.31252 9.42969 7.80471 10.3242 8.69846L12.8398 11.2141C13.1445 11.5083 13.2667 11.944 13.1594 12.3537C13.0522 12.7635 12.7322 13.0834 12.3225 13.1907C11.9127 13.2979 11.477 13.1757 11.1828 12.8711L8.66719 10.3563C7.7625 9.45158 6.18594 9.45236 5.28437 10.3555C4.35886 11.2907 4.35955 12.7969 5.28594 13.7313C6.18359 14.6289 7.7625 14.6328 8.66484 13.7289L8.97031 13.4235C9.26659 13.1275 9.69828 13.012 10.1028 13.1206C10.5072 13.2292 10.8231 13.5453 10.9313 13.9499C11.0395 14.3545 10.9236 14.7861 10.6273 15.0821L10.3227 15.3867C9.43664 16.2773 8.2312 16.7763 6.975 16.7727Z"
                  fill="#F9E44B"></path>
                <path
                  d="M17.0453 16.7727C15.7889 16.7762 14.5833 16.2772 13.6969 15.3868L11.1813 12.8711C10.8766 12.5769 10.7545 12.1412 10.8617 11.7315C10.969 11.3217 11.2889 11.0018 11.6986 10.8945C12.1084 10.7873 12.5441 10.9095 12.8383 11.2141L15.3539 13.7289C16.2578 14.6344 17.8344 14.6328 18.736 13.7297C19.6615 12.7945 19.6608 11.2883 18.7344 10.3539C17.8367 9.4555 16.2578 9.45316 15.3555 10.3563L15.05 10.6618C14.592 11.1193 13.8498 11.119 13.3922 10.661C12.9346 10.203 12.935 9.46074 13.393 9.00316L13.6977 8.69847C14.5838 7.80824 15.7893 7.30947 17.0453 7.31332C18.311 7.31332 19.5 7.8055 20.3938 8.69925C22.2289 10.5438 22.2289 13.5422 20.3953 15.3852C19.5087 16.2764 18.3025 16.776 17.0453 16.7727Z"
                  fill="#F9E44B"></path>
              </g>
            </svg>
            <div>获得无限同步笔记次数</div>
          </div>
          <div class="vip-flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
              fill="none">
              <mask x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="white"></rect>
              </mask>
              <g>
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M22.5 5.625C22.5 3.96815 21.1569 2.625 19.5 2.625H4.5C2.84315 2.625 1.5 3.96815 1.5 5.625V14.5312C1.5 16.1881 2.84315 17.5312 4.5 17.5312H19.5C21.1569 17.5312 22.5 16.1881 22.5 14.5312V5.625ZM4.5 4.5H19.5L19.5286 4.50036C20.1367 4.51553 20.625 5.01324 20.625 5.625V14.5312L20.6246 14.5598C20.6095 15.1679 20.1118 15.6562 19.5 15.6562H4.5L4.47141 15.6559C3.8633 15.6407 3.375 15.143 3.375 14.5312V5.625L3.37536 5.59641C3.39053 4.9883 3.88824 4.5 4.5 4.5Z"
                  fill="#F9E44B"></path>
                <mask id="path-3-inside-1_229_620" fill="white">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M17.25 12.2812C17.25 12.799 16.8303 13.2188 16.3125 13.2188H7.6875C7.16973 13.2188 6.75 12.799 6.75 12.2812C6.75 11.7635 7.16973 11.3438 7.6875 11.3438H16.3125C16.8303 11.3438 17.25 11.7635 17.25 12.2812Z">
                  </path>
                </mask>
                <path
                  d="M15.375 12.2812C15.375 11.7635 15.7947 11.3438 16.3125 11.3438V15.0938C17.8658 15.0938 19.125 13.8346 19.125 12.2812H15.375ZM16.3125 11.3438H7.6875V15.0938H16.3125V11.3438ZM7.6875 11.3438C8.20527 11.3438 8.625 11.7635 8.625 12.2812H4.875C4.875 13.8346 6.1342 15.0938 7.6875 15.0938V11.3438ZM8.625 12.2812C8.625 12.799 8.20527 13.2188 7.6875 13.2188V9.46875C6.1342 9.46875 4.875 10.7279 4.875 12.2812H8.625ZM7.6875 13.2188H16.3125V9.46875H7.6875V13.2188ZM16.3125 13.2188C15.7947 13.2188 15.375 12.799 15.375 12.2812H19.125C19.125 10.7279 17.8658 9.46875 16.3125 9.46875V13.2188Z"
                  fill="#F9E44B" mask="url(#path-3-inside-1_229_620)"></path>
                <mask id="path-5-inside-2_229_620" fill="white">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M17.25 7.875C17.25 8.39277 16.8303 8.8125 16.3125 8.8125H7.6875C7.16973 8.8125 6.75 8.39277 6.75 7.875C6.75 7.35723 7.16973 6.9375 7.6875 6.9375L16.3125 6.9375C16.8303 6.9375 17.25 7.35723 17.25 7.875Z">
                  </path>
                </mask>
                <path
                  d="M15.375 7.875C15.375 7.35723 15.7947 6.9375 16.3125 6.9375V10.6875C17.8658 10.6875 19.125 9.4283 19.125 7.875H15.375ZM16.3125 6.9375L7.6875 6.9375V10.6875H16.3125V6.9375ZM7.6875 6.9375C8.20527 6.9375 8.625 7.35723 8.625 7.875H4.875C4.875 9.4283 6.1342 10.6875 7.6875 10.6875V6.9375ZM8.625 7.875C8.625 8.39277 8.20527 8.8125 7.6875 8.8125V5.0625C6.1342 5.0625 4.875 6.3217 4.875 7.875H8.625ZM7.6875 8.8125H16.3125V5.0625L7.6875 5.0625V8.8125ZM16.3125 8.8125C15.7947 8.8125 15.375 8.39277 15.375 7.875H19.125C19.125 6.3217 17.8658 5.0625 16.3125 5.0625V8.8125Z"
                  fill="#F9E44B" mask="url(#path-5-inside-2_229_620)"></path>
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M7.3125 19.4062H16.6875C17.2053 19.4062 17.625 19.826 17.625 20.3438C17.625 20.8615 17.2053 21.2812 16.6875 21.2812H7.3125C6.79473 21.2812 6.375 20.8615 6.375 20.3438C6.375 19.826 6.79473 19.4062 7.3125 19.4062Z"
                  fill="#F9E44B"></path>
              </g>
            </svg>
            <div>可同时激活一台设备</div>
          </div>
        </div>
      </div>
      <div class="text-foreground">
        <div>购买需知：</div>
        <ol>
          <li>专业版本为一次性支付</li>
          <li>虚拟商品，购买后无法退款，请谨慎购买</li>
        </ol>
      </div>
      <div>
        <div class="vip-buy-btn">立即购买</div>
        <div class="vip-active-btn" @click="isActiveExtendsion = false">输入激活码</div>
      </div>
    </div>
    <div v-else>
      <div>
        <div>
          <div>
            <div>激活须知：</div>
            <ol>
              <li>激活码可激活一台设备</li>
            </ol>
          </div>
          <div>
            <div>
              <div class="vip-active-code">
                <el-input v-model="activeCode" style="width: 340px" size="large" placeholder="请输入激活码"
                  :prefix-icon="Search" />
              </div>
              <div class="vip-buy-btn flex-line">立即激活</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
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
import { getUserVid, getSyncCount } from '../../utils/chrome_util'
import bus from '../../utils/event_bus'
import { useRouter } from 'vue-router';

const activeIndex = ref('bookHome')
const isShowVip = ref(false)
const isActiveExtendsion = ref(true)
const activeCode = ref('')
const syncCount = ref(30)

const userInfoRef = reactive({
  avatarUrl: '',
  authorName: ''
})

const userVid = ref('')
const router = useRouter()



const handleEvent = ({ data }) => {
  syncCount.value = data
};

onMounted(async () => {

  // 监听可以同步的数量
  bus.on("sync-count-event", handleEvent);

  // 获取用户ID
  userVid.value = await getUserVid()
  syncCount.value = await getSyncCount()

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

const closeDialog = () => {
  isActiveExtendsion.value = true
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
</style>