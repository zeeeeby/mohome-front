import React, { Component } from "react";
import PhotoEditor from "./photo-editor";

import "./slider.css";
import { withApiService } from "../hoc";
import { ConfirmingForm } from "../forms";
import Modal from "../modal";

class Slider extends Component {
  state = {
    photos: [],
    currentItem: {},
    currentIndex: 0,
    currentName: ""
  };
  componentDidMount() {
    const { photos, currentName, index } = this.props.location.state;
    this.setState(
      {
        photos,
        currentIndex: index,
        currentName
      },
      this._updateSlide
    );

    window.addEventListener("keyup", this.handleArrowClick);
  }
  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleArrowClick);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { photos, currentName, index } = this.props.location.state;
    if (currentName !== prevState.currentName) {
      this.setState(
        {
          photos,
          currentIndex: index,
          currentName,
          isAllowClick: true
        },
        this._updateSlide
      );
    }
  }
  _updateSlide = () => {
    this.setState({ isLoading: true });
    const { getPhoto } = this.props;
    const { currentName } = this.state;
    getPhoto(currentName)
      .then(res => {
        console.log(res);
        this.setState({
          currentItem: res.data.response
        });
      })
      .catch(err => console.log(err))
      .finally(() => this.setState({ isLoading: false }));
  };
  handleArrowClick = e => {
    console.log(e);
    if (this.state.isAllowClick) {
      if (e.which === 37) this.goToPrevSlide();
      else if (e.which === 39) this.goToNextSlide();
    }
  };

  goToPrevSlide = () => {
    const { currentIndex, photos } = this.state;
    console.log(currentIndex);
    let newIndex = currentIndex;

    if (currentIndex === 0) newIndex = photos.length - 1;
    else newIndex--;
    this.setState({ isAllowClick: false });
    this.props.history.replace(`${photos[newIndex]}`, {
      modal: true,
      photos,
      index: newIndex,
      currentName: photos[newIndex]
    });
  };
  goToNextSlide = () => {
    const { currentIndex, photos } = this.state;
    let newIndex = currentIndex;

    if (currentIndex === photos.length - 1) newIndex = 0;
    else newIndex++;
    console.log(newIndex);
    this.setState({ isAllowClick: false });
    this.props.history.replace(`${photos[newIndex]}`, {
      modal: true,
      photos,
      index: newIndex,
      currentName: photos[newIndex]
    });
  };
  onPhotoDelete = name => {
    const { deletePhoto, history } = this.props;
    deletePhoto(name)
      .then(() => history.goBack())
      .catch(err => console.log(err));
  };
  render() {
    const { history } = this.props;
    const { currentIndex, photos, currentItem } = this.state;
    const description = currentItem ? currentItem.description : null;
    const created = currentItem ? currentItem.created : null;

    const name = photos[currentIndex];
    if (!this.state.isLoading) console.log(name);
    return (
      <div className={"slider-wrapper"}>
        <div onClick={history.goBack} className="slider-overlay " />
        <div
          className="slider-arrow slider-arrow__left"
          onClick={() => this.goToPrevSlide()}
        >
          <i className="zmdi zmdi-chevron-left" />
        </div>
        <div
          className="slider-arrow slider-arrow__right"
          onClick={this.goToNextSlide}
        >
          <i className="zmdi zmdi-chevron-right" />
        </div>
        <button className={"slider-close"} onClick={history.goBack}>
          <i className={"zmdi zmdi-close"} />
        </button>

        <img
          className={"slider"}
          src={
            currentItem
              ? `data:${currentItem.imageType};base64,${currentItem.image}`
              : null
          }
          alt=""
        />
        {description ? (
          <div className="slider-photo-description">
            <PhotoEditor
              className={"slide-edit-input"}
              photoName={name}
              description={description}
            />
          </div>
        ) : null}
        <div className="slider-photo-created">{beautifyDate(created)}</div>
        <div className="slider-photo-countOfPhoto">{`Photo ${currentIndex +
          1} of ${photos.length}`}</div>

        <Modal title={"Delete photo"}>
          <div className="slider-photo-delete">Delete</div>
          <ConfirmingForm
            body={<p>Are you sure you want to delete this photo?</p>}
            confirmText={"Delete photo"}
            onConfirm={() => this.onPhotoDelete(name)}
          />
        </Modal>
      </div>
    );
  }
}
function beautifyDate(date) {
  const d = new Date(date);
  return `${d.toLocaleDateString()} at ${d.toLocaleTimeString()}`;
}
const mapMethodToProps = service => {
  return {
    getPhoto: service.getPhoto,
    deletePhoto: service.deletePhoto
  };
};

export default withApiService(mapMethodToProps)(Slider);
