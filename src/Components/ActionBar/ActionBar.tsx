import {motion} from 'framer-motion';

const ActionBar = () => {
  return (
    <motion.div className="backdrop-blur-sm max-xl:hidden w-[97%] flex justify-between px-10 py-5"
    initial={{ opacity : 0 }} animate={{ opacity: 1, transition: { delay: 0.3 }}}
    >
        <div className="text-3xl font-bold">Dashboard</div>
        
        <div className="border-2 rounded-full p-2 font-bold">hello</div>
    </motion.div>
  ) 
}

export default ActionBar
