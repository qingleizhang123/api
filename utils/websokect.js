// utils/ws.js
const WebSocketApi = (wss, app) => {
  wss.on('connection', (ws, req) => {
    let { url } = req // url 的值是 /webrtc/$role/$uniId
    let { cusSender, cusReader } = app.context
    console.log(cusSender, cusReader, '111')
    if (!url.startsWith('/webrtc')) {
      return ws.clode() // 关闭 url 前缀不是 /webrtc 的连接
    }
    let [_, role, uniId] = url.slice(1).split('/')
    if(!uniId) {
      console.log('缺少参数')
      return ws.clode()
    }
    console.log('已连接客户端数量：', wss.clients.size)
    // 判断如果是发起端连接
    if (role == 'sender') {
      // 此时 uniId 就是 roomid
      ws.roomid = uniId
      let index = (cusReader = cusReader || []).findIndex(
        row => row.userid == ws.userid
      )
      // 判断是否已有该发送端，如果有则更新，没有则添加
      if (index >= 0) {
        cusSender[index] = ws
      } else {
        cusSender.push(ws)
      }
      app.context.cusSender = [...cusSender]
    }
    if (role == 'reader') {
      // 接收端连接
      ws.userid = uniId
      let index = (cusReader = cusReader || []).findIndex(
        row => row.userid == ws.userid
      )
      // ws.send('ccc' + index)
      if (index >= 0) {
        cusReader[index] = ws
      } else {
        cusReader.push(ws)
      }
      app.context.cusReader = [...cusReader]
    }
    ws.on('close', () => {
      if (role == 'sender') {
        // 清除发起端
        let index = app.context.cusSender.findIndex(row => row == ws)
        app.context.cusSender.splice(index, 1)
        // 解绑接收端
        if (app.context.cusReader && app.context.cusReader.length > 0) {
          app.context.cusReader
            .filter(row => row.roomid == ws.roomid)
            .forEach((row, ind) => {
              app.context.cusReader[ind].roomid = null
              row.send('leaveline')
            })
        }
      }
    })
    ws.on('close', () => {
      if (role == 'reader') {
        // 接收端关闭逻辑
        let index = app.context.cusReader.findIndex(row => row == ws)
        if (index >= 0) {
          app.context.cusReader.splice(index, 1)
        }
      }
    })
    ws.on('message', msg => {
      if (typeof msg != 'string') {
        msg = msg.toString()
        // return console.log('类型异常：', typeof msg)
      }
      let { cusSender, cusReader } = app.context;
      eventHandel(msg, ws, role, cusSender, cusReader);
    })
  })
}

const eventHandel = (message, ws, role, cusSender, cusReader) => {
  console.log('22222222');
  if (role == 'reader') {
    let arrval = message.split('|')
    let [type, roomid, val] = arrval;
    console.log(message, role, ws);
    if (type == 'join') {
      let seader = cusSender.find(row => row.roomid == roomid)
      if (seader) {
        seader.send(`${type}|${ws.userid}`)
      }
    }
    if (type == 'message') {
      let seader = cusSender.find(row => row.roomid == roomid)
      if (seader) {
        seader.send(`${type}|${message}`)
      }
    }
  }
  if (role == 'sender') {
    console.log('33333',message);
    let arrval = message.split('|')
    let [type, userid, val] = arrval
    // 注意：这里的 type, userid, val 都是通用值，不管传啥，都会原样传给 reader
    if (type == 'offer') {
      let reader = cusReader.find(row => row.userid == userid)
      if (reader) {
        reader.send(`${type}|${ws.roomid}|${val}`)
      }
    }
    if (type == 'message') {
      console.log(cusReader,userid);
      let reader = cusReader.find(row => row.userid == userid)
      console.log(reader);
      if (reader) {
        reader.send(`${type}|${message}`)
      }
    }
  }
}

module.exports = WebSocketApi