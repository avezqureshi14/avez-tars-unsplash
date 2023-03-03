import {
  LikeFilled,
  DownloadOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import { Avatar, Card, Modal, Button } from "antd";
import { useState, useEffect } from "react";
import { Tag } from "antd";
const { Meta } = Card;
const SearchComponent = () => {
  const [images, setImages] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchValue, setSearchValue] = useState('animals');
  
  const fectchImages = async (query) => {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=5&per_page=30&query=${query}&client_id=EWsfGMpc4aQkeWq1mpoNwIy4onlIU_vA4kiaHaJxpAA`
    );
    const data = await response.json();
    setImages(data.results);
  };
  
  useEffect(() => {
    fectchImages(searchValue);
  }, [searchValue]);
  

  const showModal = (image) => {
    setSelectedImage(image);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = selectedImage.links.download;
    link.download = "image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    try {
      // check if the Web Share API is supported
      if (!navigator.share) {
        throw new Error("Web Share API not supported");
      }
      // share the image using the Web Share API
      await navigator.share({
        title: "Check out this image",
        text: "I found this image on Unsplash",
        url: selectedImage.urls.full,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Search
        placeholder="Search images by description or alt description"
        onChange={(e) => setSearchValue(e.target.value)}
        style={{ marginBottom: 16 }}
        className='search-avez'
      />
      {images.map((currEle) => (
        <Card
          key={currEle.id}
          className="cardHover cardCss"
          style={{ width: 400, marginBottom: 20 }}
          cover={
            <img
              alt="example"
              src={currEle.urls.regular}
              style={{ objectFit: "cover", height: "100%" }}
            />
          }
          onClick={() => showModal(currEle)}
        >
          <div className="metaContent">
            <Meta
              avatar={<Avatar src={currEle.user.profile_image.small} />}
              title={
                <>
                  <p className="limited-text">{currEle.user.first_name}</p>
                </>
              }
              description={
                <>
                  <p
                    style={{ textTransform: "lowercase" }}
                    className="limited-text"
                  >
                    @{currEle.user.username}
                  </p>
                </>
              }
            />
            <div className="likeCount">
              <div className="likeNum">
                <h5>{currEle.likes}K</h5>
              </div>
              <div className="likeIcon">
                <LikeFilled />
              </div>
            </div>
          </div>
        </Card>
      ))}

      <Modal
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button
            key="download"
            className="greeBtn"
            icon={<DownloadOutlined />}
            onClick={handleDownload}
          >
            Download
          </Button>,
          <Button key="share" icon={<ShareAltOutlined />} onClick={handleShare}>
            Share
          </Button>,
        ]}
      >
        {selectedImage && (
          <Card
            className="modalCard"
            style={{ width: "100%" }}
            cover={<img alt="example" src={selectedImage.urls.regular} />}
          >
            <div className="headModal">
              <Meta
                avatar={<Avatar src={selectedImage.user.profile_image.small} />}
                title={
                  <>
                    <p className="limited-text">
                      {selectedImage.user.first_name}
                    </p>
                  </>
                }
                description={
                  <>
                    <p
                      style={{ textTransform: "lowercase" }}
                      className="limited-text"
                    >
                      @{selectedImage.user.username}
                    </p>
                  </>
                }
              />
              <div className="likeCountModal">
                <div className="likeNum">
                  <h5>{selectedImage.likes}K</h5>
                </div>
                <div className="likeIconModal">
                  <LikeFilled />
                </div>
              </div>
            </div>
            <div style={{ marginTop: "1rem" }}>
              <span style={{ marginRight: "1rem" }}>Tags:</span>
              <div style={{ margin: "1rem 0" }}>
                {selectedImage.tags.map((tag) => (
                  <Tag key={tag.title}>{tag.title}</Tag>
                ))}
              </div>
            </div>
          </Card>
        )}
      </Modal>
    </>
  );
};

export default SearchComponent;
