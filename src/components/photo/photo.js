import React, { Component } from "react";
import "./photo.css";
import { withApiService } from "../hoc";
import placeholder from "../../img/camera_big.png";
import { CreateAlbumForm } from "../forms";
import Modal from "../modal";
class Photo extends Component {
  state = {
    album: [],
    isExpanded: false
  };
  onExpandToggle = () => {
    this.setState(state => {
      return { isExpanded: !state.isExpanded };
    });
  };

  componentDidMount() {
    this._updateAlbum();
  }
  _updateAlbum = () => {
    this.props.getAlbums().then(res => {
      this.setState({ album: res.data.response });
      console.log(this.state.album);
    });
  };
  render() {
    const { album, isExpanded } = this.state;
    return (
      <div className="photo-section-container container">
        <div className="albums-container">
          <div className="albums-bar  left-right-bar">
            <div className="albums-bar-left">
              <div className="albums-title">
                My albums <span className="albums-count">{album.length}</span>
              </div>
            </div>
            <div className="albums-bar-right">
              <Modal title={"New album"}>
                <div className="add-album-button">
                  <i className="zmdi zmdi-collection-folder-image zmdi-hc-lg" />{" "}
                  New album
                </div>
                <CreateAlbumForm onUpdateAlbum={this._updateAlbum} />
              </Modal>

              <div className="add-photos-button">
                <i className="zmdi zmdi-camera-add zmdi-hc-lg" /> Add photos
              </div>
            </div>
          </div>
          <div
            className={`albums-panel ${
              album.length > 4 ? "able-to-expanded" : ""
            }`}
          >
            {album.length > 0 ? (
              <div className="container">
                <div className="row">
                  {album.slice(0, 4).map(e => (
                    <PhotoItem
                      key={e.albumId}
                      title={e.name}
                      preview={e.coverPhotoPath}
                    />
                  ))}
                  {isExpanded
                    ? album
                        .slice(4)
                        .map(e => (
                          <PhotoItem
                            key={e.albumId}
                            title={e.name}
                            preview={e.coverPhotoPath}
                          />
                        ))
                    : null}
                </div>
              </div>
            ) : (
              <div className={"albums-panel-empty"}>
                <div>No albums found ...</div>
              </div>
            )}
          </div>
          {album.length > 4 ? (
            <div
              onClick={this.onExpandToggle}
              title={isExpanded ? "Hide" : "Expand"}
              className="album-expand-btn"
            >
              <span>
                {isExpanded ? (
                  <i className="zmdi zmdi-chevron-up" />
                ) : (
                  <i className="zmdi zmdi-chevron-down" />
                )}
              </span>
            </div>
          ) : null}
        </div>

        <div className="added-photos-container">
          <div className="added-photos-bar left-right-bar">
            <div className="added-photos-bar-left">
              <div className="added-photos-title">Added photos</div>
            </div>
          </div>
          <div className="added-photos-panel panel" />
        </div>
      </div>
    );
  }
}

const PhotoItem = ({ title, count, preview }) => {
  const style = {
    backgroundImage: `url(${preview ? preview : placeholder})`
  };
  return (
    <div className="album-photo col-3">
      <div
        style={style}
        className={`album-photo-item ${preview ? "" : "photos_album_no_cover"}`}
      >
        <div className={`album-info ${preview ? "" : "album-info-wo_shadow"}`}>
          <span
            title={title}
            className={`album-title ${preview ? "" : "album-title_black"}`}
          >
            {title}
          </span>
          <span className={"album-count"}>{count}</span>
        </div>
      </div>
    </div>
  );
};

const mapMethodToProps = service => {
  return {
    getAlbums: service.getAlbums
  };
};

export default withApiService(mapMethodToProps)(Photo);
