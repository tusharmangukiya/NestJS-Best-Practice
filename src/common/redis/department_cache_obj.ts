/**
 * create department object which we need to store in database
 */
class departmentCacheObj {
  public name: string;
  public created_at: string;
  constructor(result: any) {
      this.name = result[0].name;
      this.created_at = result[0].created_at;
  }
}

export default departmentCacheObj;