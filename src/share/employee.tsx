import { Button, Popconfirm, Row, Space, Table, message } from "antd";
import { useEffect, useState } from "react";
import { Employee } from "../types/types";
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { CreateNewUserComponent } from "./create-user";
import { deleteEmployee, getEmployees } from "../api/employee";
import dayjs from "dayjs";
import { UpdateUserComponent } from "./update-user";

export const EmployeesComponent = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isShowCreateUser, setShow] = useState(false);
  const [isUpdateUser, setShowUpdate] = useState(false);
  const userRole = localStorage.getItem("TKL_user_login_role");

  const handleDelete = async (id: number) => {
    await deleteEmployee(id);
    message.info("Đã xóa tài khoản");
    window.location.reload();
  };

  const columns = [
    {
      title: "Mã",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: Employee) => {
        return record?.gender === "Male" ? "Nam" : "Nữ";
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Ngày sinh",
      dataIndex: "birth",
      key: "birth",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: Employee) => {
        return dayjs(record?.birth).format("DD/MM/YYYY");
      },
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Hành động",
      key: "action",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: Employee) => (
        <Space size="middle" className="block justify-between gap-2 w-full">
          {record.role !== "Admin" && userRole == "Admin" && (
            <>
              <Button
                icon={<EditOutlined />}
                size="small"
                className="w-full"
                onClick={() => setShowUpdate(true)}
              >
                Chỉnh sửa
              </Button>
              <Button
                ghost
                type="primary"
                danger
                icon={<DeleteOutlined />}
                size="small"
                className="mt-2 w-full"
              >
                <Popconfirm
                  title="Bạn muốn xóa người dùng?"
                  onConfirm={() => handleDelete(record?.id || 0)}
                  cancelText="Không đồng ý"
                  okText="Đồng ý"
                >
                  <a>Delete</a>
                </Popconfirm>
              </Button>
            </>
          )}
          {isUpdateUser && (
            <UpdateUserComponent
              employee={record}
              open={isUpdateUser}
              onClose={() => setShowUpdate(false)}
            />
          )}
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const getUsers = async () => {
      const data = await getEmployees();
      setEmployees(data || []);
    };
    getUsers();
  }, []);

  return (
    <>
      <Row className="justify-start mb-8">
        <Button
          icon={<UserAddOutlined />}
          type="primary"
          onClick={() => setShow(true)}
        >
          Thêm nhân sự mới
        </Button>
      </Row>
      <Table
        showHeader={true}
        rowHoverable
        dataSource={employees}
        columns={columns}
        className="w-full overflow-auto"
      />
      {isShowCreateUser && (
        <CreateNewUserComponent
          open={isShowCreateUser}
          onClose={() => setShow(false)}
        />
      )}
    </>
  );
};
