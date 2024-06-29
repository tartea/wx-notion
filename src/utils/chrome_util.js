import bus from "./event_bus";

/// 保存配置
export const saveNotionConfig = async (config) => {
  await chrome.storage.sync.set({ wx_notion_config: config });
};

/// 获取配置
export const getNotionConfig = async () => {
  const storageConfig = await chrome.storage.sync.get("wx_notion_config");
  return storageConfig["wx_notion_config"];
};

/// 从cookie中获取用户ID
export const getUserVid = async () => {
  const cookies = await chrome.cookies.getAll({ domain: "weread.qq.com" });
  if (cookies && cookies.length > 0) {
    for (const cookie of cookies) {
      if (cookie["name"] === "wr_vid") {
        return cookie["value"];
      }
    }
  }
  return null;
};
/// 获取扩展的chrome id
export const getChromeId = () => chrome.runtime.id;

/// 保存同步次数
export const saveSyncCount = async (dealCount) => {
  const syncCount = await getSyncCount();
  const remainCount = syncCount - dealCount;
  await chrome.storage.sync.set({ wx_notion_count: remainCount });
  bus.emit("sync-count-event", { data: remainCount });
};
/// 获取同步次数
export const getSyncCount = async () => {
  const storageConfig = await chrome.storage.sync.get("wx_notion_count");
  const count = storageConfig["wx_notion_count"];
  return count === undefined ? 30 : count;
};

/// 保存激活验证
export const saveChromeActive = async () => {
  await chrome.storage.sync.set({ chrome_active: "active" });
};

export const getChromeActive = async () => {
  const storageConfig = await chrome.storage.sync.get("chrome_active");
  return storageConfig["chrome_active"];
};

/// 判断是否可以同步
export const hasChromeActive = async (dealCount) => {
  const chromeActive = await getChromeActive();
  const syncCount = await getSyncCount();
  if ("active" === chromeActive) {
    return true;
  }
  if (syncCount <= 0) {
    return false;
  }
  if (syncCount - dealCount < 0) {
    return false;
  }
  return true;
};
