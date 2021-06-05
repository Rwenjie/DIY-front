/**
 * 将category的叶子节点设置为undefined
 * @param data
 * @returns {*}
 */
export function getTreeData(data) {

  // 循环遍历json数据
  for (var i = 0; i < data.length; i++) {
    if (data[i].children.length < 1) {
      // children若为空数组，则将children设为undefined
      data[i].children = undefined;
    } else {
      // children若不为空数组，则继续 递归调用 本方法
      getTreeData(data[i].children);
    }
  }
  return data;
}

export function throttle(fn, threshhold = 100) {
  let timeout = null
  let start = new Date()
  return function() {
    let curr = new Date() - 0
    clearTimeout(timeout)
    if (curr - start >= threshhold) {
      fn.apply(this, arguments)
      start = curr
    } else {
      timeout = setTimeout(() => {
        fn.apply(this, arguments)
      }, threshhold)
    }
  }
}


export function normalizeData(dataList, renderLayer, level) {
  // console.log('dataList', dataList)
  dataList.forEach(item => {
    if (renderLayer === 1) {
      item.children = []
      return
    }

    if (level + 1 === renderLayer) {
      const subs = []

      ;(item.children || []).forEach(function addSub(item) {
        subs.push({ ...item, children: [] })
        ;(item.children || []).forEach(addSub)
      })

      subs.forEach((sub, index, array) => {
        const replyToUser = array.find(item => item.id === sub.parentID)

        if (replyToUser) {
          sub.replyToUser = replyToUser
          delete sub.replyToUser.replyToUser
        }
      })
      item.children = subs
      return
    }

    normalizeData(item.children || [], renderLayer, level + 1)
  })

  return dataList
}

export function dateFormat(createdDate) {
  if (!createdDate instanceof Date) {
    return
  }

  const isPositiveInteger = Date.now() - createdDate > 0 ? '前' : '后'

  const pastSeconds = Math.floor(Math.abs(Date.now() - createdDate) / 1000)

  switch (true) {
    case pastSeconds >= 3600 * 24 * 30:
      return createdDate.toLocaleString()

    case pastSeconds >= 3600 * 24:
      return Math.floor(pastSeconds / 3600 / 24) + '天以' + isPositiveInteger
    case pastSeconds >= 3600:
      return Math.floor(pastSeconds / 3600) + '小时以' + isPositiveInteger
    case pastSeconds >= 60:
      return Math.floor(pastSeconds / 60) + '分钟以' + isPositiveInteger

    case pastSeconds >= 0:
      return '刚刚'
  }
}

/*export function NumFormat (value) {
  if(!value) return '0.00';
  /!*原来用的是Number(value).toFixed(0)，这样取整时有问题，例如0.51取整之后为1，感谢Nils指正*!/
  /!*后来改成了 Number(value)|0,但是输入超过十一位就为负数了，具体见评论 *!/
  let intPart = Number(value) - Number(value)%1; //获取整数部分（这里是windy93的方法）
  let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断

  let floatPart = ".00"; //预定义小数部分
  let value2Array = value.toString().split(".");

  //=2表示数据有小数位
  if(value2Array.length == 2) {
    floatPart = value2Array[1].toString(); //拿到小数部分

    if(floatPart.length == 1) { //补0,实际上用不着
      return intPartFormat + "." + floatPart + '0';
    } else {
      return intPartFormat + "." + floatPart;
    }

  } else {
    return intPartFormat + floatPart;
  }
}*/
export function NumFormat(number, decimals, dec_point, thousands_sep) {
  decimals = 2; //这里默认设置保留两位小数，也可以注释这句采用传入的参数
  thousands_sep = '';
  /*
   * 参数说明：
   * number：要格式化的数字
   * decimals：保留几位小数
   * dec_point：小数点符号
   * thousands_sep：千分位符号
   * */
  console.log(number);
  number = (number + '').replace(/[^0-9+-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
      dec = (typeof dec_point === 'undefined') ? '.' : dec_point;
  var s = n.toString().split('.');
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  } else {
    s[1] = s[1].substring(0, prec); //小数点位数超出长度时截取前面的位数
  }
  return s.join(dec);
}


