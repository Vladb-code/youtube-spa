import { Card, Button, Typography } from "antd";

const { Title, Text } = Typography;

const VideoCard = ({ video, viewMode }) => {
  const videoId = video.id?.videoId;
  if (!videoId) return null;

  const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;
  const isList = viewMode === "list";

  return (
    <Card
      hoverable
      styles={{ body: { padding: 12 } }}
      className={isList ? "video-card-list-wrapper" : ""}
      cover={
        <img
          alt="thumb"
          src={video.snippet.thumbnails.medium.url}
          className={isList ? "video-thumb-list" : "video-thumb-grid"}
        />
      }
    >
      <div className={isList ? "video-list-info" : ""}>
        <Card.Meta
          title={<Title level={5}>{video.snippet.title}</Title>}
          description={
            <Text type="secondary">{video.snippet.channelTitle}</Text>
          }
        />
        <Button
          type="link"
          danger
          href={videoUrl}
          target="_blank"
          className="p-10-0"
        >
          СМОТРЕТЬ
        </Button>
      </div>
    </Card>
  );
};

export default VideoCard;
