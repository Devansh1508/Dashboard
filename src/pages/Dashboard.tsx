import { useEffect, useState } from "react";
import ActionBar from "../Components/ActionBar/ActionBar";
import Stats from "../Components/common/Stats";
import Role from "../Components/role/Role";
import Button from "../Components/common/Button";
import AddRole from "../Components/role/AddRole";
import { useSelector, useDispatch } from "react-redux";
import { setIsVisible } from "../redux/slices/formSlice";
import { Permission } from "../Components/role/permission";
import { setRole } from "../redux/slices/roleSlice";

const Dashboard = () => {
  // const [roleList, setRoleList] = useState(roles);
  const [existingRole, setExistingRole] = useState();
  const isVisible = useSelector(
    (state: { form: { isVisible: boolean } }) => state.form.isVisible
  );
  const roleList=useSelector((state:string[]) => state.role.roleList);
  const dispatch = useDispatch();

  const deleteRole = (id: number) => {
    setRoleList(roleList.filter((role) => role.id !== id));
    const roleNames = roleList.map((role) => role.roleName);
    dispatch(setRole(roleNames));
  };

  useEffect(() => {
    console.log("form useEffect", isVisible);
  }, [roleList, isVisible]);

  return (
    <>
      <div className="bg-primary w-[85vw] h-[100vh] ml-[16vw]">
        <ActionBar />
        <div className="flex gap-5 w-[97%] my-10">
          <Stats
            category="Admin"
            totalUsers={100}
            iconBackgroundColor={"#2f98fd"}
          />
          <Stats
            category="Users"
            totalUsers={100}
            iconBackgroundColor={"#54daff"}
          />
          <Stats
            category="Active"
            totalUsers={100}
            iconBackgroundColor={"#fdbea0"}
          />
          <Stats
            category="Inactive"
            totalUsers={50}
            iconBackgroundColor={"#ff6b6b"}
          />
        </div>
        <div className="py-5 w-[96%] flex justify-end">
          <Button
            label="Add Role"
            onClick={() => dispatch(setIsVisible(true))}
          />
        </div>
        <div className="w-[96%] flex flex-wrap gap-2">
          {roleList.map((role) => (
            <Role
              key={role.id}
              id={role.id}
              roleName={role.roleName}
              description={role.description}
              permissions={role.permissions as Permission[]}
              existingRole={existingRole}
              setExistingRole={setExistingRole}
            />
          ))}
        </div>
      </div>
      <div
        className={`${
          isVisible ? "backdrop-blur-sm" : "hidden"
        } absolute top-0 z-10 flex w-[100vw] h-[100vh] justify-center items-center`}
      >
        <AddRole
          existingRole={existingRole}
        />
      </div>
    </>
  );
};

export default Dashboard;
