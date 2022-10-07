import { useRouter } from 'next/router'
import NewMeetupForm from '../components/meetups/NewMeetupForm'

const NewMeetupPage = () => {
  const router = useRouter()
  const addMeetupHandler = async (enterMeetupDate) => {
    const response = await fetch('/api/newMeetup', {
      method: 'POST',
      body: JSON.stringify(enterMeetupDate),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    router.push('/')
  }

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />

}
export default NewMeetupPage