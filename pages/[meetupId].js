import { MongoClient, ObjectId } from 'mongodb'
import MeetupDetail from "../components/meetups/MeetupDetail"

const MeetupDetails = props => {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  )
}

export async function getStaticPaths() {
  const client = await MongoClient.connect('mongodb+srv://next-js-mini-app-user:NSq-dfKO8-fSmC@next-js-mini-app.kqk4fof.mongodb.net/meetups?retryWrites=true&w=majority')
  const db = client.db()
  const meetupsCollection = db.collection('all-meetups')

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray()

  setTimeout(() => { client.close() }, 1500)

  return {
    fallback: true,
    paths: meetups.map(meetup => ({
      params: { meetupId: meetup._id.toString() }
    }))
  }
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId
  const client = await MongoClient.connect('mongodb+srv://next-js-mini-app-user:NSq-dfKO8-fSmC@next-js-mini-app.kqk4fof.mongodb.net/meetups?retryWrites=true&w=majority')
  const db = client.db()
  const meetupsCollection = db.collection('all-meetups')

  const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) })

  setTimeout(() => { client.close() }, 1500)

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description
      }
    }
  }
}

export default MeetupDetails