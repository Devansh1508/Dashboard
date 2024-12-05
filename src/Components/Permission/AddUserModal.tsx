import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector,useDispatch } from "react-redux";
import { setIsVisible } from "../../redux/slices/formSlice";
import { Permission } from "./permission";

const AVAILABLE_PERMISSIONS: Permission[] = [
  "read",
  "create",
  "update",
  "delete",
  "admin",
];

interface FormData {
  name: string;
  permissions: Permission[];
}

interface AddUserModalProps {
  onAdd: (name: string, permissions: Permission[]) => void;
}

export function AddUserModal({ onAdd }: AddUserModalProps) {
    const isVisible = useSelector((state: { form: { isVisible: boolean } }) => state.form.isVisible);
    const dispatch=useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    onAdd(data.name.trim(), data.permissions);
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
              {AVAILABLE_PERMISSIONS.map((permission) => (
                <div key={permission} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={permission}
                    {...register("permissions")}
                    value={permission}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <label htmlFor={permission} className="text-gray-700">
                    {permission}
                  </label>
                </div>
              ))}
            </div>
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