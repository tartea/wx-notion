import axios from "axios";
import request from "./http";

const VueEnv = process.env.VUE_APP_ENV;

// 获取所有书籍
export async function getNotebooks() {
  const httpMethod = () => {
    return request({
      url: "/user/notebooks",
      method: "get",
    });
  };
  const localMethod = async () => {
    const response = await axios.get("json/notebooks.json");
    return response.data;
  };
  return changeRequestMethod(httpMethod, localMethod);
}
// 获取书籍详情
export async function getNotebookDetail(bookId) {
  const httpMethod = () => {
    return request({
      url: "/book/info?bookId=" + bookId,
      method: "get",
    });
  };
  const localMethod = async () => {
    const response = await axios.get("json/book_detail.json");
    return response.data;
  };
  return changeRequestMethod(httpMethod, localMethod);
}
// 获取书籍的划线
async function getBookmarklist(bookId) {
  const httpMethod = () => {
    return request({
      url: "/book/bookmarklist?bookId=" + bookId,
      method: "get",
    });
  };
  const localMethod = async () => {
    const response = await axios.get("json/bookmarklist.json");
    return response.data;
  };
  const bookmarklist = await changeRequestMethod(httpMethod, localMethod);

  const bookMarkInfo = {};

  if (bookmarklist) {
    // 书籍信息
    if (bookmarklist.book) {
      bookMarkInfo["bookTitle"] = bookmarklist.book.title || "";
      bookMarkInfo["bookAuthor"] = bookmarklist.book.author || "";
      bookMarkInfo["bookCover"] = bookmarklist.book.cover || "";
      bookMarkInfo["bookmarklistCount"] =
        bookmarklist.updated && bookmarklist.updated.length > 0
          ? bookmarklist.updated.length
          : 0;
    }
    // 笔记
    const children = {};
    if (bookmarklist.updated && bookmarklist.updated.length > 0) {
      for (let idea of bookmarklist.updated) {
        const dictKey = idea.chapterUid + "";
        if (children.hasOwnProperty(dictKey)) {
          children[dictKey]["children"].push({
            type: "quote",
            content: idea.markText,
            createTime: idea.createTime,
          });
        } else {
          children[dictKey] = {
            headerTitle: idea.chapterName || "",
            children: [
              {
                type: "quote",
                content: idea.markText,
                createTime: idea.createTime,
              },
            ],
          };
        }
      }
    }
    bookMarkInfo["children"] = children;
  }
  return bookMarkInfo;
}
// 获取书籍的想法
async function getReviewList(bookId) {
  const httpMethod = () => {
    return request({
      url:
        "/review/list?listType=11&mine=1&synckey=0&listMode=0&bookId=" + bookId,
      method: "get",
    });
  };
  const localMethod = async () => {
    const response = await axios.get("json/review_list.json");
    return response.data;
  };
  const reviewList = await changeRequestMethod(httpMethod, localMethod);

  const reviewInfo = {};
  let reviewCount = 0;
  if (reviewList && reviewList.reviews && reviewList.reviews.length > 0) {
    reviewCount = reviewList.reviews.length;
    for (let review of reviewList.reviews) {
      const reviewCard = review.review;

      const dictKey = reviewCard.chapterUid + "";
      if (reviewInfo.hasOwnProperty(dictKey)) {
        reviewInfo[dictKey]["children"].push({
          type: "quote",
          content: reviewCard.abstract,
          calloutContent: reviewCard.content,
          createTime: reviewCard.createTime,
        });
        reviewInfo[dictKey]["children"].push({
          type: "callout",
          content: reviewCard.content,
          createTime: reviewCard.createTime,
        });
      } else {
        reviewInfo[dictKey] = {
          headerTitle: reviewCard.chapterTitle,
          children: [
            {
              type: "quote",
              content: reviewCard.abstract,
              calloutContent: reviewCard.content,
              createTime: reviewCard.createTime,
            },
            {
              type: "callout",
              content: reviewCard.content,
              createTime: reviewCard.createTime,
            },
          ],
        };
      }
    }
  }
  return { children: reviewInfo, reviewCount: reviewCount };
}

export async function getAllChapter(bookId) {
  const bookMarkInfoList = await getBookmarklist(bookId);
  const reviewInfoList = await getReviewList(bookId);
  const keys = [
    ...Object.keys(bookMarkInfoList.children),
    ...Object.keys(reviewInfoList.children),
  ];

  const uniqueKeys = [...new Set(keys.sort((a, b) => a - b))];

  const chapterChildren = [];
  for (const key of uniqueKeys) {
    const markInfo = bookMarkInfoList.children[key] || {};
    const reviewInfo = reviewInfoList.children[key] || {};

    const childrenNotSort = [
      ...(markInfo["children"] || []),
      ...(reviewInfo["children"] || []),
    ];

    chapterChildren.push({
      headerTitle: markInfo["headerTitle"] || reviewInfo["headerTitle"] || "",
      children: childrenNotSort.sort((a, b) => {
        const aTime = a.createTime || 32472115200;
        const bTime = b.createTime || 32472115200;
        return aTime - bTime;
      }),
    });
  }
  return {
    bookTitle: bookMarkInfoList.bookTitle,
    bookAuthor: bookMarkInfoList.bookAuthor,
    bookCover: bookMarkInfoList.bookCover,
    bookmarklistCount: bookMarkInfoList.bookmarklistCount,
    reviewCount: reviewInfoList.reviewCount,
    chapterChildren: chapterChildren,
  };
}

function changeRequestMethod(httpMethod, localMethod) {
  if (VueEnv === "TEST") {
    return localMethod();
  } else {
    return httpMethod();
  }
}
