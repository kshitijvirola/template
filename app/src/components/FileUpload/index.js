import React, { Component } from "react";
import { Upload } from "antd";
import { connect } from "react-redux";

import { uploadData, uploadmsgData } from "redux/upload/actions";

class FileUpload extends Component {
  beforeUpload = async (file) => {
    try {
      const { message } = this.props;
      let formdata = new FormData();
      let ext = file.name.split(".");
      let newName = new Date().getTime();
      formdata.append("file", file, newName + "." + ext[ext.length - 1]);
      if (message) await this.props.uploadmsgData(formdata);
      else await this.props.uploadData(formdata);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { elements } = this.props;
    const props = { beforeUpload: this.beforeUpload };
    return (
      <Upload showUploadList={false} {...props}>
        {elements}
      </Upload>
    );
  }
}

const mapStateToProps = (state) => ({
  isUploaded: state.upload.isUploaded,
});
const mapDispatchToProps = (dispatch) => ({
  uploadmsgData: (payload) => dispatch(uploadmsgData(payload)),
  uploadData: (payload) => dispatch(uploadData(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);
