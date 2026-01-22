import {
  Modal,
  Form,
  Input,
  Select,
  Slider,
  InputNumber,
  Row,
  Col,
} from "antd";
import { useDispatch } from "react-redux";
import { saveFavorite, editFavorite } from "../redux/favoritesSlice";
import { useEffect } from "react";

const QueryModal = ({ initialData, onClose }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue(initialData);
  }, [initialData, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      const data = { ...initialData, ...values };
      initialData.id
        ? dispatch(editFavorite({ id: initialData.id, data }))
        : dispatch(saveFavorite(data));
      onClose();
    });
  };

  return (
    <Modal
      title={initialData.id ? "Редактировать запрос" : "Сохранить запрос"}
      open={true}
      onOk={handleOk}
      onCancel={onClose}
      okText="Сохранить"
      cancelText="Отмена"
      width={400}
      centered
    >
      <Form form={form} layout="vertical">
        <Form.Item name="query" label="Запрос">
          <Input disabled={!initialData.id} />
        </Form.Item>
        <Form.Item
          name="title"
          label="Название"
          rules={[{ required: true, message: "Укажите название" }]}
        >
          <Input placeholder="Например: Мои котики" />
        </Form.Item>
        <Form.Item name="sortBy" label="Сортировка">
          <Select
            options={[
              { value: "relevance", label: "Релевантность" },
              { value: "date", label: "Дата" },
              { value: "viewCount", label: "Просмотры" },
            ]}
          />
        </Form.Item>
        <Form.Item label="Максимальное количество">
          <Row gutter={16} align="middle">
            <Col span={16}>
              <Form.Item name="maxResults" noStyle>
                <Slider min={1} max={50} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="maxResults" noStyle>
                <InputNumber min={1} max={50} className="w-100" />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default QueryModal;
