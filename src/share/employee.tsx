import { Button, Space, Table } from "antd";
import { useEffect, useState } from "react";
import adminAuthClient from "../utils/supabaseAdmin";
import { Profile } from "../types/types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "Mã nhân viên",
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
    dataIndex: "numberPhone",
    key: "numberPhone",
  },
  {
    title: "Hành động",
    key: "action",
    render: () => (
      <Space size="middle" className="flex justify-between">
        <Button icon={<EditOutlined />} size="small">
          Chỉnh sửa
        </Button>
        <Button
          ghost
          type="primary"
          danger
          icon={<DeleteOutlined />}
          size="small"
        >
          Xóa
        </Button>
      </Space>
    ),
  },
];

export const EmployeesComponent = () => {
  const [employees, setEmployees] = useState<Profile[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await adminAuthClient.listUsers();

      if (data.users) {
        const employeesData = data.users?.map((employee) => {
          return {
            id: employee.id || "",
            name: employee.user_metadata?.name || "",
            email: employee.email || "",
            numberPhone: employee.user_metadata?.phone || "",
          };
        });
        setEmployees(employeesData || []);
      }
    };
    getUsers();
  }, []);

  return (
    <Table
      dataSource={employees}
      columns={columns}
      className="w-full overflow-auto"
    />
  );
};
