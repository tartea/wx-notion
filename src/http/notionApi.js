import request from "./http";

/***
 * 同步到notion
childrenContent = [
  {
    headerTitle:'',
    children:[
      {
        type:'quote',
        content:''
      }
    ]
  }

]
 */
export async function syncPage(
  page_id,
  secret_id,
  bookTitle,
  bookAuthor,
  bookCover,
  childrenContent
) {
  const children = [
    {
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [{ type: "text", text: { content: "作者：" + bookAuthor } }],
      },
    },
  ];
  for (const content of childrenContent) {
    const childrenContent = [];

    for (const child of content.children) {
      if (child.type === "quote") {
        childrenContent.push({
          object: "block",
          type: "quote",
          quote: {
            rich_text: [{ type: "text", text: { content: child.content } }],
          },
        });
      } else if (child.type === "callout") {
        childrenContent.push({
          object: "block",
          type: "callout",
          callout: {
            rich_text: [{ type: "text", text: { content: child.content } }],
          },
        });
      }
    }

    const blockContent = {
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [{ type: "text", text: { content: content.headerTitle } }],
        children: childrenContent,
      },
    };
    children.push(blockContent);
  }

  let pageIcon = {
    emoji: "🥬",
  };
  if (bookCover && bookCover.length > 0) {
    pageIcon = {
      type: "external",
      external: {
        url: bookCover,
      },
    };
  }

  const reqJson = {
    parent: { page_id: page_id },
    icon: pageIcon,
    properties: {
      title: {
        type: "title",
        title: [{ type: "text", text: { content: bookTitle } }],
      },
    },
    children: children,
  };

  const responseData = await request({
    baseURL: "https://api.notion.com",
    url: "/v1/pages",
    method: "POST",
    headers: {
      Authorization: "Bearer " + secret_id,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    data: reqJson,
  });
  return responseData.url;
}
/**
 * 搜索
 */
export async function searchNotion(filterType, secret_id) {
  return await request({
    baseURL: "https://api.notion.com",
    url: "/v1/search",
    method: "POST",
    headers: {
      Authorization: "Bearer " + secret_id,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    data: {
      filter: {
        value: filterType,
        property: "object",
      },
      sort: {
        direction: "descending",
        timestamp: "last_edited_time",
      },
    },
  });
}
