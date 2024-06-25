<template>
    <div class="content">
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
import { useRoute } from 'vue-router';
import SyncAll from '../sync_notion/sync_all';
import { getAllChapter } from '../../http/bookApi';
import DetailCard from './chapter_card.vue';
const route = useRoute()
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
    margin-top: 20px;
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