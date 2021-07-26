import React, { Component } from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Modal, Avatar } from "antd";

import { ModalContainer } from "./style";
import { DragDrop } from "components/Form";
import { DragDropConstant } from "App/AppConstant";
import { connect } from "react-redux";
import { setProfile } from "redux/profile/actions";
import { Button } from "components/Form";
import { ButtonConstant } from "App/AppConstant";
import { removeUpload } from "redux/upload/actions";
import { DeleteOutlined } from "@ant-design/icons";
import { PhotoConstant } from "./constant";
const { confirm } = Modal;

class FormModal extends Component {
  async componentDidMount() {
    await this.props.removeUpload();
  }
  handleSubmit = async (remove) => {
    try {
      const { info, uploadLink } = this.props;
      if (info.userId > 0) {
        let data = info;
        data.userImg = remove === "delete" ? null : uploadLink;
        await this.props.setProfile(data);
        await this.props.removeUpload();
        this.props.onCancel();
      }
    } catch (error) {
      console.log(error);
    }
  };
  removePhoto = () => {
    try {
      confirm({
        title: PhotoConstant.header,
        icon: <QuestionCircleOutlined />,
        content: PhotoConstant.deleteMessage,
        okText: PhotoConstant.yes,
        okType: "danger",
        cancelText: PhotoConstant.no,
        getContainer: () => document.getElementById("photo-modal-form"),
        onOk: () => {
          this.handleSubmit("delete");
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { visible, onOk, onCancel, image, warning, uploadLink } = this.props;
    return (
      <ModalContainer>
        <div id="photo-modal-form">
          <Modal
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            footer={null}
            className="modalWrapper"
            title=""
            centered
            getContainer={() => document.getElementById("photo-modal-form")}
          >
            <div className="photoDiv">
              <b>{DragDropConstant.editPhoto}</b>
              <div className="imgDiv">
                {image == null ? (
                  <Avatar size="large" />
                ) : (
                  <>
                    <img
                      className="main-profile-img"
                      alt="profile"
                      src={image}
                    />
                    <span className="icon" onClick={this.removePhoto}>
                      <DeleteOutlined />
                    </span>
                  </>
                )}
              </div>
              <div className="dragDrop">
                <DragDrop text={DragDropConstant.dropText} image={true} />
              </div>
              {uploadLink && (
                <div className="btnDiv">
                  <Button onClick={this.handleSubmit}>
                    {ButtonConstant.Upload}
                  </Button>
                </div>
              )}
              <div className="btmDiv">{warning}</div>
            </div>
          </Modal>
        </div>
      </ModalContainer>
    );
  }
}
const mapStateToProps = (state) => ({
  uploadLink: state.upload.uploadLink,
});
const mapDispatchToProps = (dispatch) => ({
  setProfile: (payload) => dispatch(setProfile(payload)),
  removeUpload: () => dispatch(removeUpload()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormModal);
