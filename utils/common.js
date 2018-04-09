export default class Common {
  constructor() {
    
  }

  /**
   * 获得元素上的绑定的值
   * @param {*Object} event 
   * @param {*String} key 
   */
  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  }
}