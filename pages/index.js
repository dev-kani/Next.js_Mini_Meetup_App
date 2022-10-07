import { MongoClient } from 'mongodb'
import MeetupList from '../components/meetups/MeetupList'

export default function HomePage(props) {
  return <MeetupList meetups={props.meetups} />
}

export async function getStaticProps() {
  // fetch data from api
  const client = await MongoClient.connect('mongodb+srv://next-js-mini-app-user:NSq-dfKO8-fSmC@next-js-mini-app.kqk4fof.mongodb.net/meetups?retryWrites=true&w=majority')
  const db = client.db()
  const meetupsCollection = db.collection('all-meetups')
  const meetups = await meetupsCollection.find().toArray()

  setTimeout(() => { client.close() }, 1500)

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    },
    revalidate: 1
  }
}


