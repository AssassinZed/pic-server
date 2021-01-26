// 一个简单的 Node.js 图片上传服务器

const express = require('express')

const multer = require('multer')
// 将上传过来的文件放到 uploads 文件夹中
const upload = multer({ dest: 'uploads/' })

const cors = require('cors')

const app = express()

app.get('/', (req, res) => {
  console.log('用户访问了路径：/')
  res.send('Hello from Node.js Server')
})

// 该句代码自行百度
app.options('/upload', cors())

// 图片上传
app.post('/upload', cors(), upload.single('xxx'), (req, res) => {
  // res.setHeader('Access-Control-Allow-Origin', '*') // 配置跨域，使用插件 cors 即可
  // 返回图片在服务器上的文件名
  res.send(req.file.filename)
})

// 获取图片
app.get('/pic/:id', cors(), (req, res) => {
  // 在服务器图片目录中返回需要的图片
  res.sendFile(
    `uploads/${req.params.id}`,
    {
      root: __dirname,
      headers: {
        'Content-Type': 'images/jpeg'
      }
    },
    (error) => {
      if (error) {
        res.status(404).send('Not Found')
      }
    }
  )
})

let port = process.env.port || 3000

app.listen(port, () => {
  console.log(`服务器在 ${port} 端口监听中，可通过如下路径访问 127.0.0.1:${port}`)
})
