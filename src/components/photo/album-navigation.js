import React, { Component } from "react";
import DropArea from "../drop-area";
import { withRouter } from "react-router-dom";
import { withApiService } from "../hoc";
import CreateBreadCrumbs from "./creareBreadcrumbs";
import "./main.css";

class AlbumNavigation extends Component {

  render() {
    const { extraBtn, breadCrumbs } = this.props;
    return (
      <div className="albums-bar  left-right-bar">
        <DropArea
          id={"imageDnd"}
          title={"Upload photos"}
          onUpload={this.props.onUpload}
          accept={"image/*"}
        />

        <div className="albums-bar-left">
          <CreateBreadCrumbs breadCrumbs={breadCrumbs} />
        </div>
        <div className="albums-bar-right">
          {extraBtn}

          <div className="add-photos-button">
            <i className="zmdi zmdi-camera-add zmdi-hc-lg" /> Add photos
            <label htmlFor={"imageDnd"} />
          </div>
        </div>
      </div>
    );
  }
}

const mapMethodToProps = service => {
  return {
    uploadPhoto: service.uploadPhoto
  };
};

export default withApiService(mapMethodToProps)(withRouter(AlbumNavigation));
