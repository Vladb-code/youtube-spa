import { Button, Typography, Space, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const FavoriteItem = ({ item, onExecute, onEdit, onDelete }) => (
  <div className="fav-item">
    <div>
      <Text strong>{item.title}</Text>
      <br />
      <Text type="secondary">{`Запрос: "${item.query}" | Сортировка: ${item.sortBy} | Макс: ${item.maxResults}`}</Text>
    </div>
    <Space>
      <Button
        type="primary"
        ghost
        icon={<PlayCircleOutlined />}
        onClick={() => onExecute(item)}
      >
        Выполнить
      </Button>
      <Button icon={<EditOutlined />} onClick={() => onEdit(item)}>
        Правка
      </Button>
      <Popconfirm title="Удалить запрос?" onConfirm={() => onDelete(item.id)}>
        <Button danger icon={<DeleteOutlined />} />
      </Popconfirm>
    </Space>
  </div>
);

export default FavoriteItem;
