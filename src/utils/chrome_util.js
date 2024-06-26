import bus from "./event_bus";

const VueEnv = process.env.VUE_APP_ENV;

/// 保存配置
export const saveNotionConfig = async (config) => {
  if (VueEnv != "TEST") {
    await chrome.storage.sync.set({ wx_notion_config: config });
  }
};

/// 获取配置
export const getNotionConfig = async () => {
  if (VueEnv === "TEST") {
    return [
      {
        pageSyncType: "page",
        pageTitle: "测试页面",
        pageSecret: "secret_zokubzVrZHqSS8Y5aO5TSx3JZlPXhzZiM0EAMjbABPM",
        pageId: "2eb0922b-6e48-4d13-8bba-ab01ae50adba",
        uuId: "23432234-2423-12",
      },
      {
        pageSyncType: "page",
        pageTitle: "测试页面1",
        pageSecret: "secret_zokubzVrZHqSS8Y5aO5TSx3JZlPXhzZiM0EAMjbABPM",
        pageId: "2eb0922b-6e48-4d13-8bba-ab01ae50adba",
        uuId: "23432234-2423-12",
      },
      {
        pageSyncType: "database",
        pageTitle: "测试页面1",
        pageSecret: "secret_zokubzVrZHqSS8Y5aO5TSx3JZlPXhzZiM0EAMjbABPM",
        pageId: "2eb0922b-6e48-4d13-8bba-ab01ae50adba",
        uuId: "23432234-2423-12",
      },
    ];
  } else {
    const storageConfig = await chrome.storage.sync.get("wx_notion_config");
    return storageConfig["wx_notion_config"];
  }
};

/// 从cookie中获取用户ID
export const getUserVid = async () => {
  if (VueEnv === "TEST") {
    return 50157;
  } else {
    const cookies = await chrome.cookies.getAll({ domain: "weread.qq.com" });
    if (cookies && cookies.length > 0) {
      for (const cookie of cookies) {
        if (cookie["name"] === "wr_vid") {
          return cookie["value"];
        }
      }
    }
    return null;
  }
};
/// 获取扩展的chrome id
export const getChromeId = () => chrome.runtime.id;

/// 保存同步次数
export const saveSyncCount = async (count) => {
  if (VueEnv != "TEST") {
    await chrome.storage.sync.set({ wx_notion_count: count });
    bus.emit("sync-count-event", { data: count });
  }
};
/// 获取同步次数
export const getSyncCount = async () => {
  if (VueEnv === "TEST") {
    return 9;
  } else {
    const storageConfig = await chrome.storage.sync.get("wx_notion_count");
    return storageConfig["wx_notion_count"] || 30;
  }
};
