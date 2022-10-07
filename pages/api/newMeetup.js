import { MongoClient } from 'mongodb'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body

    try {
      const client = await MongoClient.connect('mongodb+srv://next-js-mini-app-user:NSq-dfKO8-fSmC@next-js-mini-app.kqk4fof.mongodb.net/meetups?retryWrites=true&w=majority')
      const db = client.db()
      const meetupsCollection = db.collection('all-meetups')
      const result = meetupsCollection.insertOne(data)

      setTimeout(() => { client.close() }, 1500)

    } catch (error) {
      console.log(error)
    }

    res.status(201).json({ message: 'A Meetup created' })
  }
}
