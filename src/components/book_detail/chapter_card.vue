<template>
    <div class="wx-card" v-for="(cardItem, index) in visibleItems" :key="index">
        <div>
            <div class="wx-card-abstract">
                {{ cardItem.content }}
            </div>
            <div class="wx-card-line card-space"></div>
            <div class="wx-card-content card-space">
                <div>
                    {{ cardItem.calloutContent || '' }}
                </div>
                <div>
                    <button type="button" class="wx-book-content-sync " @click="syncChapter(cardItem)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M8 3.875C8.82843 3.875 9.5 3.20343 9.5 2.375C9.5 1.54657 8.82843 0.875 8 0.875C7.17157 0.875 6.5 1.54657 6.5 2.375C6.5 3.20343 7.17157 3.875 8 3.875ZM5.83234 2.72826C5.63677 2.36312 5.18223 2.22565 4.81709 2.42122C4.62229 2.52556 4.43277 2.6394 4.2492 2.76229C3.88195 3.00815 3.53953 3.28953 3.22703 3.60203C2.64333 4.18573 2.17011 4.87183 1.83335 5.62635C1.64594 6.04623 1.5018 6.485 1.4037 6.93682C1.3529 7.17079 1.31452 7.40792 1.28882 7.64744C1.24462 8.05929 1.54266 8.42898 1.95451 8.47318C2.36636 8.51737 2.73606 8.21933 2.78025 7.80748C2.80025 7.62118 2.83008 7.43687 2.86955 7.2551C2.94571 6.90431 3.05759 6.56373 3.20311 6.23771C3.46491 5.65114 3.83318 5.11719 4.28769 4.66269C4.53109 4.41929 4.79776 4.20015 5.08365 4.00876C5.22645 3.91316 5.37384 3.82463 5.5253 3.74351L5.54225 3.73415C5.89466 3.53376 6.02485 3.08769 5.83234 2.72826ZM12.2677 12.6583C12.0138 12.331 11.5426 12.2716 11.2154 12.5255C11.0106 12.6844 10.7945 12.828 10.5687 12.9549C9.79101 13.3922 8.91329 13.625 8 13.625C7.08671 13.625 6.20899 13.3922 5.4313 12.9549C5.20551 12.828 4.98936 12.6844 4.78463 12.5255C4.45738 12.2716 3.98624 12.331 3.7323 12.6583C3.47837 12.9855 3.5378 13.4566 3.86505 13.7106C4.12808 13.9147 4.40587 14.0992 4.69616 14.2624C5.69688 14.8251 6.82752 15.125 8 15.125C9.17248 15.125 10.3031 14.8251 11.3038 14.2624C11.5941 14.0992 11.8719 13.9147 12.135 13.7106C12.4622 13.4566 12.5216 12.9855 12.2677 12.6583ZM10.1677 2.72826C10.3632 2.36312 10.8178 2.22565 11.1829 2.42122C11.3777 2.52556 11.5672 2.6394 11.7508 2.76229C12.1181 3.00815 12.4605 3.28953 12.773 3.60203C13.3567 4.18573 13.8299 4.87183 14.1667 5.62635C14.3541 6.04623 14.4982 6.485 14.5963 6.93682C14.6471 7.17079 14.6855 7.40792 14.7112 7.64744C14.7554 8.05929 14.4573 8.42898 14.0455 8.47318C13.6336 8.51737 13.2639 8.21933 13.2197 7.80748C13.1998 7.62118 13.1699 7.43687 13.1305 7.2551C13.0543 6.90431 12.9424 6.56373 12.7969 6.23771C12.5351 5.65114 12.1668 5.11719 11.7123 4.66269C11.4689 4.41929 11.2022 4.20015 10.9164 4.00876C10.7939 3.92682 10.6682 3.85007 10.5394 3.77872L10.4747 3.74351C10.1096 3.54794 9.97209 3.0934 10.1677 2.72826ZM15.125 10.6875C15.125 11.5159 14.4534 12.1875 13.625 12.1875C12.7966 12.1875 12.125 11.5159 12.125 10.6875C12.125 9.85907 12.7966 9.1875 13.625 9.1875C14.4534 9.1875 15.125 9.85907 15.125 10.6875ZM2.375 12.1875C3.20343 12.1875 3.875 11.5159 3.875 10.6875C3.875 9.85907 3.20343 9.1875 2.375 9.1875C1.54657 9.1875 0.875 9.85907 0.875 10.6875C0.875 11.5159 1.54657 12.1875 2.375 12.1875Z"
                                fill="black"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <el-dialog v-model="dialogTableVisible" title="同步" :close-on-press-escape="false" width="800">
        <SyncSingle :bookTitle="bookTitle" :bookAuthor="bookAuthor" :bookCover="bookCover"
            :clickCardItem='clickCardItem' :headerTitle='chapterItem.headerTitle'></SyncSingle>
    </el-dialog>
</template>
<script setup>
import { defineProps, ref, computed } from 'vue';
import SyncSingle from '../sync_notion/sync_single.vue'

const props = defineProps(['chapterItem', 'bookTitle', 'bookAuthor', 'bookCover'])

const dialogTableVisible = ref(false)
const clickCardItem = ref()


const syncChapter = (cardItem) => {
    dialogTableVisible.value = true
    clickCardItem.value = cardItem
}

const visibleItems = computed(() => {
    return props.chapterItem.children.filter(item => item.type === 'quote');
});

</script>
<style>
.wx-card {
    width: 98%;
    min-height: 50px;
    background-color: #f2f2ef;
    border-radius: 10px;
    opacity: 0.8;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 20px;
}

.wx-card-abstract {
    font-size: 12px;
}

.wx-card-line {
    width: 100%;
    height: 1px;
    background-color: rgb(208, 204, 204);
}

.card-space {
    margin-top: 10px;
}

.wx-card-content {
    display: flex;
    justify-content: space-between;
}

.wx-book-content-sync {
    border: none;
    display: block;
    background-color: rgb(207, 207, 207);
    border-radius: 9999px;
    height: 26px;
    width: 26px;
}

.wx-book-content-sync:hover {
    cursor: pointer;
}
</style>