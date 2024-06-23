<template>
    <div class="content">
        <div class="wx-header">
            <button type="button" @click="goOptionHome()">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect opacity="0.01" width="20" height="20" transform="matrix(0 -1 -1 0 20 20)" fill="black"></rect>
                    <path
                        d="M11.9636 15.5237C12.2631 15.2241 12.2686 14.7418 11.9799 14.4357L11.9636 14.4188L8.13623 10.5915C7.83668 10.2919 7.83123 9.80966 8.11989 9.50347L8.13623 9.48664L11.9636 5.6593C12.2687 5.35421 12.2687 4.85955 11.9636 4.55445C11.664 4.2549 11.1817 4.24945 10.8755 4.53811L10.8587 4.55445L7.03137 8.38178C6.12523 9.28792 6.11617 10.7514 7.00419 11.6687L7.03137 11.6963L10.8587 15.5237C11.1638 15.8288 11.6585 15.8288 11.9636 15.5237Z"
                        fill="black"></path>
                </svg>
            </button>
        </div>
        <div class="wx-book-page">
            <div class="wx-book-cover">
                <el-image :src="bookDetailRef.bookCover">
                    <template #error>
                        <div class="image-slot">
                            <el-icon><icon-picture /></el-icon>
                        </div>
                    </template>
                </el-image>
            </div>
            <div class="wx-book-title">{{ bookDetailRef.bookTitle }}</div>
            <div class="wx-book-author">{{ bookDetailRef.bookAuthor }}</div>
        </div>
        <div class="wx-info">
            <div class="wx-info-header">
                <div class="wx-info-abstract">
                    <span class="wx-info-line">{{ bookDetailRef.bookmarklistCount }}</span> 条划线
                    <span class="wx-info-idea"> {{ bookDetailRef.reviewCount }}</span> 条想法
                </div>
                <div class="wx-all-sync" @click="dialogTableVisible = true">
                    <span>全部同步</span>
                </div>
            </div>
            <div class="wx-list">
                <DetailCard v-for="(item, index) in bookDetailRef.chapterChildren" :key="index" :chapterItem="item"
                    :bookTitle="bookDetailRef.bookTitle" :bookAuthor="bookDetailRef.bookAuthor"
                    :bookCover="bookDetailRef.bookCover">
                </DetailCard>
            </div>
        </div>
    </div>
    <el-dialog v-model="dialogTableVisible" title="同步" :close-on-press-escape="false" width="800">
        <sync-all :bookId="bookId"></sync-all>
    </el-dialog>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SyncAll from '../sync_notion/sync_all';
import { getAllChapter } from '../../http/bookApi';
import DetailCard from './chapter_card.vue';
const route = useRoute()
const router = useRouter()
const bookId = ref('')
const bookDetailRef = reactive({
    bookTitle: '',
    bookAuthor: '',
    bookCover: '',
    bookmarklistCount: 0,
    reviewCount: 0,
    chapterChildren: []

})
const dialogTableVisible = ref(false)

const goOptionHome = () => {
    router.go(-1)
}
onMounted(async () => {
    bookId.value = route.params.bookId


    const chapterInfo = await getAllChapter(bookId.value);
    bookDetailRef.bookTitle = chapterInfo.bookTitle
    bookDetailRef.bookAuthor = chapterInfo.bookAuthor
    bookDetailRef.bookCover = chapterInfo.bookCover
    bookDetailRef.bookmarklistCount = chapterInfo.bookmarklistCount
    bookDetailRef.reviewCount = chapterInfo.reviewCount
    bookDetailRef.chapterChildren = [...chapterInfo.chapterChildren]
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

.wx-book-page {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.wx-book-title {
    font-size: 17px;
    font-weight: bold;
}

.wx-book-author {
    font-size: 15px;
    color: gray;
}

.wx-info {
    margin-top: 25px;
}

.wx-info-header {
    display: flex;
    width: 98%;
    justify-content: space-between;
    padding: 10px;
}

.wx-info-abstract {
    font-size: 13px;
    color: rgb(144, 144, 144);
}

.wx-all-sync {
    background-color: #f9e54d;
    width: 80px;
    height: 35px;
    font-size: 12px;
    font-weight: bold;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.wx-all-sync:hover {
    cursor: pointer;
}

.wx-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 900px;
    margin-bottom: 30px;
}

.wx-margin-top {
    margin-top: 10px;
}



.el-image {
    width: 120px;
}

.image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--el-fill-color-light);
    color: var(--el-text-color-secondary);
    font-size: 30px;
}
</style>