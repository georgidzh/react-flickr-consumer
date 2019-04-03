import db from './indexedDb';

class SettingsStorage {
  static put(setting) {
    return db.settings.put({
      key: setting.key,
      value: setting.value,
    });
  }

  static async get(settingKey) {
    const setting = await db.settings.get(settingKey);
    return setting;
  }

  static async findOrCreate(setting) {
    let storedSetting = await SettingsStorage.get(setting.key);
    if (storedSetting === undefined) {
      storedSetting = { key: setting.key, value: setting.defaultValue };
      await SettingsStorage.put(storedSetting);
    }
    return storedSetting;
  }
}

export default SettingsStorage;
