import ActionBar from '../Components/ActionBar/ActionBar'
import Stats from '../Components/common/Stats'
import UserList from '../Components/userList/UserList'

const Home = () => {
  return (
    <div className='bg-primary w-[85vw] ml-[15vw]'>
      <ActionBar/>
      <div className='flex gap-5 mt-10'>
        <Stats category='Admin' totalUsers={100}/>
        <Stats category='Users' totalUsers={100}/>
        <Stats category='Active' totalUsers={100}/>
    </div>
    <UserList/>
    </div>
  )
}

export default Home
