import { Button, Form, Input, InputNumber, Table, TableProps } from "antd";

interface DataType {
  key: string;
  name: string;
  birth: string;
  email: string;
  phone: number;
  address: string;
  gender: string;
}

export const EmployeeComponent = () => {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "STT",
      dataIndex: "key",
      rowScope: "row",
      width: 60,
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
    },
    {
      title: "Ngày Sinh",
      dataIndex: "birth",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: () => {
        return <Button>Chỉnh thông tin</Button>;
      },
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      birth: "12/01/2010",
      email: "0571-22098909",
      phone: 18889898989,
      address: "New York No. 1 Lake Park",
      gender: "Nam",
    },
    {
      key: "2",
      name: "Jim Green",
      email: "0571-22098333",
      phone: 18889898888,
      birth: "12/01/2010",
      address: "London No. 1 Lake Park",
      gender: "Nam",
    },
    {
      key: "3",
      name: "Joe Black",
      birth: "12/01/2010",
      email: "0575-22098909",
      phone: 18900010002,
      address: "Sydney No. 1 Lake Park",
      gender: "Nam",
    },
    {
      key: "4",
      name: "Jim Red",
      birth: "12/01/2010",
      email: "0575-22098909",
      phone: 18900010002,
      address: "London No. 2 Lake Park",
      gender: "Nam",
    },
    {
      key: "5",
      name: "Jake White",
      birth: "12/01/2010",
      email: "0575-22098909",
      phone: 18900010002,
      address: "Dublin No. 2 Lake Park",
      gender: "Nam",
    },
  ];

  interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: string;
    inputType: "number" | "text";
    record: DataType;
    index: number;
  }

  const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
    editing,
    dataIndex,
    title,
    inputType,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  return (
    <div className="h-[800px]">
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        columns={columns}
        dataSource={data}
        bordered
        // className=""
        pagination={{ pageSize: 50 }}
        scroll={{ y: 1240 }}
      />
    </div>
  );
};
