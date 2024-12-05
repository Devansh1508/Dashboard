import ActionBar from '../Components/ActionBar/ActionBar'
import Stats from '../Components/common/Stats'
import PermissionTable from '../Components/Permission/PermissionTable'

const Dashboard = () => {
  return (
    <div className='bg-primary w-[85vw] h-[100vh] ml-[16vw]'>
      <ActionBar/>
      <div className='flex gap-5 w-[97%] my-10'>
        <Stats category='Admin' totalUsers={100} iconBackgroundColor={'#2f98fd'}/>
        <Stats category='Users' totalUsers={100} iconBackgroundColor={'#54daff'}/>
        <Stats category='Active' totalUsers={100} iconBackgroundColor={'#fdbea0'}/>
        <Stats category='Inactive' totalUsers={50} iconBackgroundColor={'#ff6b6b'}/>
      </div>
      <PermissionTable/>
    </div>
  )
}

export default Dashboard
