import React, { Component } from 'react';
import Searchbar from '../Searchbar';
import getApi from '../API/api';
import ImageGallery from '../ImageGallery';
import Modal from '../Modal';
import Button from '../Button';
import { ToastContainer, toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import s from './Render.module.css';


class Render extends Component {
  state = {
    pictures: [],
    name: "",
    page: 1,
    showModal: false,
    modalImage: "",
    status: "idle",
    error: "",
    loadMore: false,
  };

  requestImage(name,page) {
    const value = getApi(name, page)
    value.then((res) => {
      const pictures = res.data;
      if (pictures.total === 0) {
         this.setState({ loadMore: false });
          toast.error("Could not find images with that name");
      }
      page ? this.setState((prevState) => ({
         pictures: [...prevState.pictures, ...pictures.hits],
        page: prevState.page + 1,
        loadMore: true,
      })) :  this.setState((prevState) => ({
            pictures: pictures.hits,
            page: prevState.page + 1,
            status: "resolved",
            loadMore: true,
      }));
        if (res.data.hits.length < 12) {
        this.setState({ loadMore: false });
      }
    }).catch((error) => this.setState({ status: "rejected", error }));

  }

 componentDidUpdate(prevProps, prevState) {
    if (prevState.name !== this.state.name) {
      this.setState({ status: "pending" });
      this.requestImage(this.state.name)
   
    }
  }

  loadMore = () => {
    const { page, name } = this.state;
    this.requestImage(name, page)
    
  };
  toglleModal = (e) => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
    if (!this.state.showModal) {
      if (e) {
        this.filtredLIst(e.target.parentNode.id);
      }
    }
  };
  filtredLIst = (id) => {
    const { pictures } = this.state;
    let value = pictures.find((item) => item.id === Number(id));
    this.setState({ modalImage: value.largeImageURL });
  };
  findPicture = (pictureName) => {
    if (pictureName !== this.state.name) {
      this.setState({ name: pictureName, page: 1 });
    }
  };

  render() {
    const { pictures, status, modalImage, showModal, loadMore } = this.state;
    return (
      <div className={s.render}>
        <Searchbar onSubmit={this.findPicture}></Searchbar>
        <div>
          <div>
            {status === "idle" && <p>please enter name picture</p>}
            {status === "pending" && (
              <Oval
                height="100"
                width="100"
                color="grey"
                ariaLabel="loading"
              />
            )}
            {status === "resolved" && (
              <ImageGallery pictures={pictures} open={this.toglleModal} />
            )}
            {loadMore && <Button loag={this.loadMore} />}
            {showModal && <Modal src={modalImage} onClose={this.toglleModal} />}
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default Render;