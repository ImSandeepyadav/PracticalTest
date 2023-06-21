import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Modal, Form, Input } from "antd";
import {
  fetchUsers,
  addUser,
  deleteUser,
  updateUser,
  clearUser
} from "../actions/userActions";

const UserTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAdd = () => {
    form.validateFields().then((values) => {
      dispatch(addUser(values));
      form.resetFields();
      setVisible(false);
    });
  };

  const handleEdit = (record) => {
    dispatch(updateUser(record));
  };

  const handleDelete = (record) => {
    dispatch(deleteUser(record.id));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "City with Zip Code",
      dataIndex: "address",
      key: "address",
      render: (address) => `${address.city} - ${address.zipcode}`
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <span>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </span>
      )
    }
  ];

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Add User
      </Button>
      <Modal
        title="Add User"
        visible={visible}
        onCancel={() => {
          setVisible(false);
          form.resetFields();
          dispatch(clearUser());
        }}
        onOk={handleAdd}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter an email" },
              { type: "email", message: "Invalid email address" }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: "Please enter a phone number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["address", "city"]}
            label="City"
            rules={[{ required: true, message: "Please enter a city" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["address", "zipcode"]}
            label="Zip Code"
            rules={[{ required: true, message: "Please enter a zip code" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={users} rowKey="id" />
    </div>
  );
};

export default UserTable;
