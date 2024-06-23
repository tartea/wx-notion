const VueEnv = process.env.VUE_APP_ENV;

/// 保存配置
export const saveChromeStorage = async (config) => {
  if (VueEnv != "TEST") {
    await chrome.storage.sync.set({ wx_notion_config: config });
  }
};

/// 获取配置
export const getChromeStorage = async () => {
  if (VueEnv === "TEST") {
    return [
      {
        pageTitle: "测试页面",
        pageSecret: "secret_zokubzVrZHqSS8Y5aO5TSx3JZlPXhzZiM0EAMjbABPM",
        pageId: "2eb0922b-6e48-4d13-8bba-ab01ae50adba",
        uuId: "23432234-2423-12",
      },
      {
        pageTitle: "测试页面1",
        pageSecret: "secret_zokubzVrZHqSS8Y5aO5TSx3JZlPXhzZiM0EAMjbABPM",
        pageId: "2eb0922b-6e48-4d13-8bba-ab01ae50adba",
        uuId: "23432234-2423-12",
      },
      {
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
