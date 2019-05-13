import React, { Component } from "react";

import AlbumNavigation from "./album-navigation";
import { withApiService } from "../hoc";
import PhotoList from "./photo-list";

class AddPhotosPage extends Component {
  state = {
    previewPhoto: [],
    photos: []
  };
  _isMounted = false;
  componentDidMount() {
    this._isMounted = true;
    const { files } = this.props;
    console.log(files);
    if (files) this.onUpload(files);
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  onUpload = async files => {
    const { albumId, uploadPhoto } = this.props;
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();

      formData.append("Photo", files[i]);
      if (albumId) formData.append("AlbumId", albumId);
      await uploadPhoto(formData)
        .then(res => {
          if (this._isMounted)
            this.setState(prevState => {
              return {
                photos: [
                  ...prevState.photos,
                  { name: res.data.response.fileName }
                ]
              };
            });
        })
        .catch(err => console.log(err.response));
    }
  };

  render() {
    return (
      <div>
        <AlbumNavigation
          rightContent={
            <div className="add-photos-button">
              <i className="zmdi zmdi-camera-add zmdi-hc-lg" /> Add photos
              <label htmlFor={"imageDnd"} />
            </div>
          }
          onUpload={this.onUpload}
          breadCrumbs={this.props.breadCrumbs}
        />
        <PhotoList isEditing photos={this.state.photos} />
      </div>
    );
  }
}

const mapMethodToProps = service => {
  return {
    getPhoto: service.getPhoto,
    uploadPhoto: service.uploadPhoto
  };
};

export default withApiService(mapMethodToProps)(AddPhotosPage);
