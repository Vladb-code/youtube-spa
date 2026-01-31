import { useSelector, useDispatch } from "react-redux";
import { Typography, Space, Card, Spin, Alert } from "antd";

import { deleteFavorite } from "../redux/favoritesSlice";
import { searchVideos } from "../redux/videoSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import QueryModal from "./QueryModal";
import { selectFavorites, selectFavoritesLoading } from "../redux/selectors";
import FavoriteItem from "./FavoriteItem";

const { Title } = Typography;

const Favorites = () => {
  const favorites = useSelector(selectFavorites);
  const isLoading = useSelector(selectFavoritesLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editItem, setEditItem] = useState(null);

  const handleExecute = (item) => {
    dispatch(searchVideos(item));
    navigate("/");
  };
  const handleDelete = (id) => dispatch(deleteFavorite(id));
  const handleEdit = (item) => setEditItem(item);

  return (
    <Card>
      <Title level={3}>Сохраненные запросы</Title>

      {isLoading ? (
        <div className="spin-container">
          <Spin size="large" />
        </div>
      ) : favorites.length === 0 ? (
        <Alert
          description="Сохраненных запросов пока нет"
          type="info"
          showIcon
        />
      ) : (
        <Space vertical className="w-100">
          {favorites.map((item) => (
            <FavoriteItem
              key={item.id}
              item={item}
              onExecute={handleExecute}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
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
