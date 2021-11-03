const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express()

mongoose.connect('',//enter link to mongoDB either localhost or atlas 
{
  useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
  const shortUrls = await ShortUrl.find()
  res.render('index', { shortUrls: shortUrls })
})

app.post('/shortUrls', async (req, res) => {
  await ShortUrl.create({ longUrl: req.body.longUrl })

  res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ uid: req.params.shortUrl})
  if (shortUrl == null) return res.sendStatus(404)

  shortUrl.clicks ++
  shortUrl.save()

  res.redirect(shortUrl.longUrl);
})

app.listen(process.env.PORT || 5000);
