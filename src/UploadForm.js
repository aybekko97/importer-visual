import React, { Component } from 'react';
import axios, { post } from 'axios';

const url = "http://localhost:5000/"

class UploadForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        file: null,
        code: null,
        message: null
      }
      this.onFormSubmit = this.onFormSubmit.bind(this)
      this.fileUpload = this.fileUpload.bind(this)
      this.onChange = this.onChange.bind(this)
      this.onDelete = this.onDelete.bind(this)
    }

    onFormSubmit(e){
      const { file } = this.state;
      this.setState({code: 0})
      e.preventDefault()
      this.fileUpload(file)
          .then(res => res.data)
          .then((response) => {
                      this.setState({
                          code: response.code,
                          message: response.message
                        });
                      if (this.state.code === 201)
                          setTimeout(window.location.reload(), 2000);
                    })
          .catch((error) => {
             console.log("Problem occured while uploading the file", error.message)
          });
    }

    fileUpload(file){
      const formData = new FormData();
      formData.append('file', file)
      const config = {
              headers: {
                  'content-type': 'multipart/form-data'
              }
          }
      return post(url+'import', formData, config)
    }

    onDelete(e) {
      axios.delete(url)
      .then(() => setTimeout(window.location.reload(), 1000))
      .catch((error) => {
         console.log("Problem occured when deleting the data", error.message)
      });
    }

    onChange(e) {
      this.setState({file:e.target.files[0]})
      let el = document.querySelector('.custom-file-label')
      if (e.target.files[0])
        el.innerHTML = e.target.files[0].name;
      else
        el.innerHTML = "Choose file";
    }

    render() {
      let msg;
      const { code, message } = this.state;
      if (code != null) {
        switch(code){
          case 0:
            msg = <div className="alert mt-5 alert-primary" role="alert">Loading...</div>;
            break;
          case 201:
            msg = <div className="alert mt-5 alert-success" role="alert">Success!</div>;
            break;
          default:
            msg = <div className="alert mt-5 alert-danger" role="alert">Something went wrong! <p>{message}</p></div>;
        }
      }

      return (
                <div>
                  <form className="row" onSubmit={this.onFormSubmit}>
                    <div className="custom-file col-6 ml-auto">
                      <input type="file" className="custom-file-input" id="customFile" onChange={this.onChange} />
                      <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                    </div>
                    <button type="submit" className="btn btn-primary mx-auto col-3">Upload</button>
                    <button type="button" className="btn btn-danger mr-auto col-2" onClick={this.onDelete}>Delete all</button>
                  </form>

                  {msg}
                </div>
            );
    }
}

export default UploadForm;
