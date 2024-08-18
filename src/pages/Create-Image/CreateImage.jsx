import React, { useEffect, useState } from "react";
import "./CreateImage.css";
import rocket from "@/assets/Images/create-image/fluent_rocket-24-filled.png";
import giff from "@/assets/Images/create-image/Spinner-1s-200px.gif";
import { saveAs } from "file-saver";
import toast from "react-hot-toast";
import axios from "axios";

import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { TbScanEye } from "react-icons/tb";
import { FaTrash } from "react-icons/fa6";
import { PiDownloadSimpleBold } from "react-icons/pi";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { deleteData, fetchData, postData } from "@/redux/slices/apiSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ImageHeader from "../../components/molecules/Create-Image/ImageHeader";

const CreateImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isNewImageLoaded, setNewImageLoaded] = useState(false);

  const handleShow = (imagePath) => {
    setSelectedImage(`https://srv475086.hstgr.cloud${imagePath}`);
    setShowModal(true);
  };

  const handleClose = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.api);
  const { post } = useSelector((state) => state.api);
  const { delete: deleteing } = useSelector((state) => state.api);
  const { loading: postLoading, error: postError } = post;
  const { loading: deleteLoading, error: deleteError } = deleteing;

  const [imagesList, setImagesList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    async function fetching() {
      const userImageFetched = await dispatch(
        fetchData({ endpoint: "v1/image-generator/images/" })
      );

      setImagesList(userImageFetched?.payload);
    }
    fetching();
  }, [dispatch]);

  const validationSchema = Yup.object({
    image: Yup.string().required("This field is required"),
  });

  const initialValues = {
    image: "",
  };

  //Generate Image
  const onSubmit = async (values) => {
    try {
      const newImage = await dispatch(
        postData({ endpoint: "v1/image-generator/create/", data: values.image })
      );


      // await axios.get(
      //   `https://srv475086.hstgr.cloud${newImage?.payload?.image_paths}`
      // );
      setNewImageLoaded(true);
      try {
        const response = await axios.get(
          `https://srv475086.hstgr.cloud${newImage?.payload?.image_paths}`
        );
      } catch (error) {}
      setNewImageLoaded(false);

      const newListOfImage = [...imagesList, newImage?.payload];
      // const newListOfImage = [...imagesList, imageDataUrl];
      toast.success("جاري تصميم الصورة");
      setImagesList((imagesList) => newListOfImage);
    } catch (error) {
      setNewImageLoaded(false);
      console.error("Error submitting form:", error);
    } finally {
      setNewImageLoaded(false);
    }
  };

  //DownLoad Image
  const handleDownLoadImage = async (image_path) => {
    try {
      const imageUrl = `https://srv475086.hstgr.cloud${image_path}`;

      saveAs(imageUrl, "downloaded_image.png");
    } catch (error) {
      console.error("Error downloading image:", error.message);
    }
  };
  const handleDeleteImage = async (id) => {
    try {
      const newListAfterDelete = imagesList.filter((image) => image.id !== id);

      setImagesList([...newListAfterDelete]);
      await dispatch(
        deleteData({
          endpoint: `v1/image-generator/images/${id}/remove/`,
        })
      );
      toast.success("تم حذف الصورة بنجاح ");
    } catch (error) {
      console.error("Error Deleting Image:", error);
    }
  };

  return (
    <div dir="rtl" className="py-3 mx-auto overflow-y-auto mainImageContainer">
      <ImageHeader />

      <div>
        <div className="images-container">
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form className="formik-container d-flex flex-column flex-sm-row">
                <Field
                  disabled={loading || postLoading}
                  className="formik-field px-4"
                  type="text"
                  id="image"
                  name="image"
                  placeholder="حول افكارك الى تصاميم ابداعية"
                />
                <button
                  disabled={loading || postLoading}
                  className="formin-button "
                  type="submit"
                >
                  <div>
                    <img
                      style={{ maxWidth: "25px", maxHeight: "25px" }}
                      src={rocket}
                    />
                  </div>
                  <div>إنشاء</div>
                </button>
              </Form>
            </Formik>
          </div>
          {postLoading && (
            <div className=" mt-4">
              <Loader />
            </div>
          )}
          {postError && <ErrorHandle />}
          {loading ? (
            <div className="container-spinner">
              <Loader />
            </div>
          ) : (
            <div className="row  mt-3 mx-1">
              {isNewImageLoaded && (
                <div className="main-container col-6 col-md-4 py-2 col-lg-3">
                  <img className={`images `} src={giff} />
                </div>
              )}

              {imagesList &&
                imagesList.length > 0 &&
                imagesList
                  ?.slice()
                  .reverse()
                  .map((image) => (
                    <div
                      key={image.id}
                      className="main-container col-6 col-md-4 py-2 col-lg-3"
                    >
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                        }}
                        className="image-container position-relative"
                      >
                        <img
                          className={`images `}
                          src={`https://srv475086.hstgr.cloud${image?.image_paths}`}
                        />

                        {/* Loading spinner */}

                        <div className="image-buttons ">
                          {/* Buttons */}
                          <div className="bg-blur-image" />
                          <button
                            onClick={() => handleDeleteImage(image?.id)}
                            style={{ fontSize: "20px" }}
                            className={`${
                              deleteLoading && "disabled"
                            } button-image`}
                          >
                            <FaTrash
                              style={{ fontSize: "25px" }}
                              className="  "
                            />
                          </button>

                          <button
                            onClick={() => handleShow(image?.image_paths)}
                            className=" button-image"
                          >
                            <TbScanEye style={{ fontSize: "30px" }} />
                          </button>

                          <button
                            onClick={() =>
                              handleDownLoadImage(image?.image_paths)
                            }
                            className="button-image"
                          >
                            <PiDownloadSimpleBold
                              style={{ fontSize: "30px" }}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>

      {/* Start Modal View Image */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Body>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              style={{ maxWidth: "100%", maxHeight: "100%", margin: "auto" }}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            أغلق
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End Modal View Image */}
    </div>
  );
};

export default CreateImage;

function Loader() {
  return (
    <div className="text-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

function ErrorHandle() {
  return (
    <div className=" d-flex justify-content-center mt-4">
      <button className=" text-white fw-bold  btn bg-danger">
        حدث خطأ اثناء التصميم
      </button>
    </div>
  );
}
