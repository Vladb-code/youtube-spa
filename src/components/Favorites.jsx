import { useSelector, useDispatch } from "react-redux";
import { Button, Typography, Space, Card, Popconfirm, Spin, Alert } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { deleteFavorite } from "../redux/favoritesSlice";
import { searchVideos } from "../redux/videoSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import QueryModal from "./QueryModal";

const { Title, Text } = Typography;

const Favorites = () => {
  const { items: favorites, isLoading } = useSelector(
    (state) => state.favorites,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editItem, setEditItem] = useState(null);

  return (
    <Card>
      <Title level={3}>Сохраненные запросы</Title>
      {isLoading ? (
        <div className="spin-container">
          <Spin size="large" />
        </div>
      ) : favorites.length === 0 ? (
        <Alert title="Сохраненных запросов пока нет" type="info" />
      ) : (
        <Space orientation="vertical" className="w-100">
          {favorites.map((item) => (
            <div key={item.id} className="fav-item">
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
                  onClick={() => {
                    dispatch(searchVideos(item));
                    navigate("/");
                  }}
                >
                  Выполнить
                </Button>
                <Button
                  icon={<EditOutlined />}
                  onClick={() => setEditItem(item)}
                >
                  Правка
                </Button>
                <Popconfirm
                  title="Удалить запрос?"
                  onConfirm={() => dispatch(deleteFavorite(item.id))}
                >
                  <Button danger icon={<DeleteOutlined />} />
                </Popconfirm>
              </Space>
            </div>
          ))}
        </Space>
      )}
      {editItem && (
        <QueryModal initialData={editItem} onClose={() => setEditItem(null)} />
      )}
    </Card>
  );
};
export default Favorites;
