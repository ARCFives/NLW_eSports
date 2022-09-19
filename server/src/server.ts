import express from 'express'
import cors from 'cors'
import {PrismaClient} from '@prisma/client'
import { convertToStringHours } from './utils/convert-hour-minutes-string'
import { convertToStringMinutes } from './utils/convert-minutes-string'

const app =  express()
const prisma = new PrismaClient({
  log: ['query']
})
app.use(express.json())
app.use(cors())

app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    }
  })
  return res.json(games)
})

app.post('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id
  const body = req.body

  const ads = await prisma.aD.create({
    data:{
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart:  convertToStringHours(body.hourStart) ,
      hourEnd: convertToStringHours(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel
    }
  })

  return res.status(201).json(ads)
})

app.get('/games/:id/ads', async (req, res) => {
  const gameID = req.params.id
  const ads = await prisma.aD.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId: gameID,
    },
    orderBy: {
      createdAt: 'desc',
    }
  })

  return res.json(ads.map( ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertToStringMinutes(ad.hourStart),
      hourEnd: convertToStringMinutes(ad.hourEnd)
    }
  }))
})

app.get('/ads/:id/discord', async (req, res) => {
  const adsID = req.params.id
  const ads = await prisma.aD.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adsID,
    }
  })

  return res.json({
    discord: ads.discord,
  })
})

app.listen(8880)