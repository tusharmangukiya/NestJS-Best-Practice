import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { FILE_NOT_FOUND } from 'message/error.messages';
import * as _ from 'lodash';
import * as path from 'path';

/**
 *
 * This class helps to get configuration data from specified file
 *
 * <p>
 * This can we use this object on all our project and files*
 * @author      GWL
 * @since       1.0
 */

export class AppConfig {
  public static readonly DEFAULT_FILE_NAME = 'application.yaml';
  private static readonly SEPARATOR = '-';
  private static readonly YAML_EXTENSION = '.yaml';
  private static readonly JSON_EXTENSION = '.json';
  private static readonly CHAR_ENCODED = 'utf-8';
  public propData: any;
  private static instance: AppConfig;

  /**
   * The AppConf's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  constructor() {}

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the AppConf class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
      AppConfig.instance.propData = this.loadData();
      console.log('New app config instance is created.');
    }
    return AppConfig.instance;
  }

  public static reload() {
    if (AppConfig.instance) {
      AppConfig.instance = null;
      AppConfig.getInstance();
      console.log('File reloaded.');
    }
  }

  /**
   * Get a configuration value (either custom configuration or process environment variable)
   * based on property path (you can use dot notation to traverse nested object, e.g. "database.host").
   * It returns a default value if the key does not exist.
   *
   * @param key contains key value of property
   * @returns value of config property
   */

  public static get(key: string) {
    try {
      const aConf = AppConfig.getInstance();
      let _value = _.get(aConf.propData, key, null);
      _value = _value ? _value : process.env[key];
      return _value;
    } catch (e) {
      throw e;
    }
  }

  /**
   * this method helps to get data from yaml, json,
   * @returns the loaded data from file
   */

  public static loadData() {
    try {
      let _loadData: any;
      const filePath = this.getFile();

      if (!fs.existsSync(filePath)) {
        throw new Error(FILE_NOT_FOUND);
      }

      const readFileData = fs.readFileSync(filePath, AppConfig.CHAR_ENCODED);
      if (this.isYamlFile(filePath)) {
        _loadData = yaml.load(readFileData) as Record<string, any>;
      } else if (this.isJSONFile(filePath)) {
        _loadData = JSON.parse(readFileData);
      } else {
        throw new Error('System support only .json and .yaml extension');
      }
      console.log('file data length', _loadData);
      return _loadData;
    } catch (e) {
      throw e;
    }
  }

  /**
   * this method helps to get get the with environment suffix
   * first get from env if is available then get default file
   * @returns filename with sufficient path
   */
  static getFile() {
    let fileWithSuffix = `${process.env.DIRECTORY_PATH}${this.envSuffix(
      process.env.FILENAME,
    )}`;
    if (!fs.existsSync(fileWithSuffix)) {
      fileWithSuffix = path.resolve(
        'resources',
        this.envSuffix(AppConfig.DEFAULT_FILE_NAME),
      );
    }
    console.log(`File name: ${fileWithSuffix}`);
    return fileWithSuffix;
  }

  /**
   * this method helps to get the file name with env variable,
   * @returns file name with env variable
   */

  static envSuffix(filePath: string) {
    const _split = filePath.split('.');
    const fileWithEnv = `${_split[0]}${AppConfig.SEPARATOR}${process.env.NODE_ENV}.${_split[1]}`;
    console.log('File with valid extension name', fileWithEnv);
    return fileWithEnv;
  }

  /**
   * this method helps to check yaml file or not,
   * @returns boolean if file is valid extension
   */

  static isYamlFile(filePath: string) {
    const ext = path.extname(filePath);
    if (ext.toLocaleLowerCase() === '.yaml') {
      return true;
    }
    return false;
  }

  /**
   * this method helps to check json file or not
   * @returns boolean if file is valid extension
   */

  static isJSONFile(filePath: string) {
    const ext = path.extname(filePath);
    if (ext.toLocaleLowerCase() === '.json') {
      return true;
    }
    return false;
  }
  /**
   * This method helps load file data with specified name
   *
   * @param fileName contains filename with string format
   * @returns loaded data from file
   */
  public static loadFile(fileName: string) {
    // Get document, or throw exception on error
    if (!fileName) {
      throw new Error(FILE_NOT_FOUND);
    }
    try {
      return yaml.load(
        fs.readFileSync(
          `${process.env.DIRECTORY_PATH}${fileName}`,
          AppConfig.CHAR_ENCODED,
        ),
      );
    } catch (e) {
      throw e;
    }
  }
}
