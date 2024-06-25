<template>
    <div class="content">
        <div class="wx-setting-list">
            <SettingForm v-for="(config, index) in formSettingConfig" :key="index" :pageTitle="config.pageTitle"
                :pageSecret="config.pageSecret" :pageId="config.pageId" :uuId="config.uuId"
                :pageSyncType="config.pageSyncType" @updateConfig="updateConfig" @deleteConfig="deleteConfig">
            </SettingForm>
        </div>
        <div id="wx-add-config" @click="addConfigForm()">添加新配置</div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { getChromeStorage, saveChromeStorage } from '../../utils/chrome_util';
import { getUuId } from '../../utils/common';
import SettingForm from './setting_form';

const chromeSettingConfig = ref([])
const formSettingConfig = ref([])

// 添加配置表单
const addConfigForm = () => {
    if (chromeSettingConfig.value.length < formSettingConfig.value.length) {
        ElMessage({
            message: '请先保存配置，再添加新配置！',
            type: 'error',
        })
        return
    }
    formSettingConfig.value.push({
        pageSyncType: 'page',
        pageTitle: '',
        pageSecret: '',
        pageId: '',
        uuId: getUuId()
    })
}
const updateConfig = async (newConfig) => {
    const dataIndex = filterIndex(formSettingConfig, newConfig.uuId);
    if (dataIndex != -1) {
        formSettingConfig.value[dataIndex] = { ...newConfig };
    }

    // 判断是否存在
    const newChromeSettingConfig = chromeSettingConfig.value.filter(item => item.uuId != newConfig.uuId);
    newChromeSettingConfig.push({ ...newConfig })
    chromeSettingConfig.value = newChromeSettingConfig
    await saveChromeStorage(newChromeSettingConfig)
    ElMessage({
        message: '保存成功！',
        type: 'success',
    })
};
const deleteConfig = async (config) => {
    const dataIndex = filterIndex(formSettingConfig, config.uuId);
    if (dataIndex != -1) {
        formSettingConfig.value.splice(dataIndex, 1)
        console.log(formSettingConfig.value);
    }

    const chromeIndex = filterIndex(chromeSettingConfig, config.uuId);
    if (chromeIndex != -1) {
        const newChromeSettingConfig = chromeSettingConfig.value.filter(item => item.uuId != config.uuId);
        chromeSettingConfig.value = newChromeSettingConfig
        await saveChromeStorage(newChromeSettingConfig)
    }

    ElMessage({
        message: '删除成功！',
        type: 'success',
    })
};
/// 获取具体数据的位置
const filterIndex = (arr, uuId) => {
    const refArrValue = arr.value
    for (let index = 0; index < refArrValue.length; index++) {
        const config = refArrValue[index]
        if (config.uuId === uuId) {
            return index;
        }
    }
    return -1;
}


onMounted(async () => {
    const notionSettingConfig = await getChromeStorage()
    if (notionSettingConfig) {
        formSettingConfig.value = [...notionSettingConfig]
        chromeSettingConfig.value = [...notionSettingConfig]
    }
})



</script>

<style scoped>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.wx-header {
    margin-top: 100px;
    width: 800px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

#wx-add-config {
    margin-top: 30px;
    width: 400px;
    height: 40px;
    background-color: rgb(189, 189, 189);
    border-radius: 50px;
    opacity: 0.5;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px;
}
</style>
