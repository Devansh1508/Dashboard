import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector,useDispatch } from "react-redux";
import { addUserData } from "../../redux/slices/userSlice";
import { setIsVisible } from "../../redux/slices/formSlice";
import { UserPermission } from "./permission";

interface FormData {
  name: string;
  permission: string;
  active: boolean;
}

export function AddUserModal() {
    const isVisible = useSelector((state: { form: { isVisible: boolean } }) => state.form.isVisible);
    const roleList = useSelector((state:string[]) => state.role.roleList);
    const userData = useSelector((state: { user: { userData: UserPermission[] } }) => state.user.userData);
    const dispatch=useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    let temp=false;
    if(data.active==='true')temp=true;

    const newUser: UserPermission = {
      id: userData[userData.length-1].id + 1,
      name: data.name,
      role: data.permission,
      date: new Date().toISOString().split('T')[0],
      active:temp
  };

    dispatch(addUserData(newUser));
    reset();
  };

  return (
    <div className={`fixed ${isVisible?'':'hidden'} inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50`}>
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              User Name
            </label>

            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              type="text"
              id="name"
              placeholder="Enter user name"
              {...register("name", { required: true })}
            />
            {errors.name && <span className="text-red-500">This field is required</span>}
          </div>

          <div className="mb-4">
            <p className="block text-sm font-medium text-gray-700 mb-2">
              Permissions
            </p>
            <div className="space-y-3">
                    {roleList.map((role) => (
                      <div key={role.id} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={role.roleName}
                          {...register("permission", { required: true })}
                          value={role.roleName}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                        />
                        <label htmlFor={role.roleName} className="text-gray-700">
                          {role.roleName}
                        </label>
                      </div>
                    ))}
                    {errors.permission && <span className="text-red-500">This field is required</span>}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="active"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="active"
              {...register("active", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
            {errors.active && <span className="text-red-500">This field is required</span>}
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => dispatch(setIsVisible(false))}
            >
              Add User
            </button>

            <button
              type="button"
              onClick={()=>dispatch(setIsVisible(false))}
              className="w-full sm:w-auto px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}