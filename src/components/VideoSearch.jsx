import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Space,
  Segmented,
  Alert,
} from "antd";
import {
  SearchOutlined,
  HeartOutlined,
  AppstoreOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import { searchVideos } from "../redux/videoSlice";
import QueryModal from "./QueryModal";

const { Text, Title } = Typography;

const VideoSearch = () => {
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saveData, setSaveData] = useState(null);

  const dispatch = useDispatch();
  const {
    list: videos,
    isLoading,
    error,
  } = useSelector((state) => state.videos);

  const handleSearch = () => {
    if (query.trim()) dispatch(searchVideos({ query }));
  };

  const handleSaveClick = () => {
    if (!query.trim()) return;
    setSaveData({ query, title: "", sortBy: "relevance", maxResults: 12 });
    setIsModalOpen(true);
  };

  return (
    <div className="w-100">
      <Title level={2}>Поиск видео</Title>
      <div className="search-bar-container">
        <Input
          size="large"
          placeholder="Что хотите посмотреть?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onPressEnter={handleSearch}
          suffix={
            <Button
              type="text"
              icon={<HeartOutlined />}
              onClick={handleSaveClick}
            />
          }
        />
        <Button
          type="primary"
          size="large"
          icon={<SearchOutlined />}
          onClick={handleSearch}
          loading={isLoading}
        >
          Найти
        </Button>
      </div>

      {error && (
        <Alert title={error} type="error" showIcon closable className="mb-20" />
      )}

      <div className="results-header">
        <Text type="secondary">Найдено: {videos.length}</Text>
        <Segmented
          options={[
            { value: "grid", icon: <AppstoreOutlined /> },
            { value: "list", icon: <BarsOutlined /> },
          ]}
          value={viewMode}
          onChange={setViewMode}
        />
      </div>

      <Row gutter={[16, 16]}>
        {videos.map((v) => (
          <Col key={v.id.videoId} span={viewMode === "grid" ? 6 : 24}>
            <Card
              hoverable
              styles={{ body: { padding: 12 } }}
              className={viewMode === "list" ? "video-card-list-wrapper" : ""}
              cover={
                <img
                  alt="thumb"
                  src={v.snippet.thumbnails.medium.url}
                  className={
                    viewMode === "grid"
                      ? "video-thumb-grid"
                      : "video-thumb-list"
                  }
                />
              }
            >
              <div className={viewMode === "list" ? "video-list-info" : ""}>
                <Card.Meta
                  title={v.snippet.title}
                  description={v.snippet.channelTitle}
                />
                <Button
                  type="link"
                  danger
                  href={`https://www.youtube.com{v.id.videoId}`}
                  target="_blank"
                  className="p-10-0"
                >
                  СМОТРЕТЬ
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {isModalOpen && (
        <QueryModal
          initialData={saveData}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
export default VideoSearch;
