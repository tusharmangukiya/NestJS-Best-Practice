import BaseCache from 'redis-best-practice'

import departmentCacheObj from './department_cache_obj';
const { Client } = require("pg")
const logger = require('js-logger')

class DepartmentCache extends BaseCache {
  public key: any;
  public query: any;
  // public cache: any;
  public config_cache_obj: any;
  constructor(departmentId: string) {
      super();
      this.key = departmentId;
      this.query = `select name,created_at from department where id='${departmentId}'`;
      this.config_cache_obj = null;
  }
  
  public populate(result: any) {
    console.log("Override parent class method.");
    console.log("======result==== :: \n", result);
    
    this.config_cache_obj = new departmentCacheObj(result)
  }
}

export default DepartmentCache;