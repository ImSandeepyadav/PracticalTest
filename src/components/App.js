import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Modal, Form, Input } from "antd";
import {
  addUser,
  deleteUser,
  editUser,
  fetchUsers
} from "../actions/userActions";

const { Column } = Table;

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const isLoading = useSelector((state) => state.isLoading);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [editingUserId, setEditingUserId] = React.useState(null);

  const showModal = (userId) => {
    setEditingUserId(userId);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setIsModalVisible(false);
        if (editingUserId) {
          dispatch(editUser(editingUserId, values));
        } else {
          dispatch(addUser(values));
        }
        setEditingUserId(null);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUserId(null);
  };

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };

  return (
    <div>
      <Button type="primary" onClick={() => showModal(null)}>
        Add User
      </Button>
      <Table dataSource={users} loading={isLoading}>
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Phone" dataIndex="phone" key="phone" />
        <Column title="City" dataIndex="city" key="city" />
        <Column title="Zip Code" dataIndex="zipcode" key="zipcode" />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <div>
              <Button type="link" onClick={() => showModal(record.id)}>
                Edit
              </Button>
              <Button
                type="link"
                danger
                onClick={() => handleDelete(record.id)}
              >
                Delete
              </Button>
            </div>
          )}
        />
      </Table>
      <Modal
        title={editingUserId ? "Edit User" : "Add User"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="ID" name="id">
            <Input />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter an email" },
              { type: "email", message: "Please enter a valid email" }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please enter a phone number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Please enter a city" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Zip Code"
            name="zipcode"
            rules={[{ required: true, message: "Please enter a zip code" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
