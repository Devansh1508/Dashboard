import Button from "../common/Button";

const AddUser = () => {
    const onClick = () => {
        console.log('Add User clicked')
    };
  return (
    <div className="flex bg-secondary w-[100%] justify-between items-center px-5 py-5 border-2 border-[bg-primary] mt-8">
        <div><p className="text-3xl font-[outfit] font-bold">Team</p></div>
      <Button label="Add User" onClick={onClick} />
    </div>
  )
}

export default AddUser
