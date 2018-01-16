import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import DropZone from 'react-dropzone';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      acceptedFiles: [],
      rejectedFiles: [],
      name: ''
    };
  }

  handleDrop(accepted, rejected) {
    this.setState({
      acceptedFiles: accepted,
      rejectedFiles: rejected
    });
  }

  handleOpenClick() {
    this.dropzone.open();
  }

  handleUpload() {
    let data = new FormData();

    data.append('product[name]', this.state.name);
    this.state.acceptedFiles.map( file => {
      data.append('product[images][]', file)
    });

    fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      mode: 'cors',
      body: data
    }).then(res => {
      console.log(res.json());
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    let prev = [];
    this.state.acceptedFiles.map( file => {
      prev.push(
        <div className="preview">
          <img key={file.name} src={file.preview} width="100" height="100" />
        </div>
      );
    });

    return (
      <section>
        <div className="uploadFile">
          <h1>Upload files</h1>
          <br className="clear" />

          <label>Name</label>
          <br className="clear" />
          <input type="text" name="name" value={this.state.name} onChange={e => this.setState({name: e.target.value})} />
          <br className="clear" />

          <DropZone
            ref={(node) => this.dropzone = node}
            accept={"image/jpg,image/jpeg,image/png,image/gif"}
            onDrop={(accepted, rejected) => this.handleDrop(accepted, rejected)}>
            Drop files here
          </DropZone>

          <button type="button" onClick={(e) => this.handleOpenClick(e)}>
            Open Dropzone
          </button>

          <button type="button" onClick={(e) => this.handleUpload(e)}>
            Upload
          </button>

          <div className="uploadFile">
            <h2>Accepted files...</h2>
            <ul>
              {this.state.acceptedFiles.map(file => <li key={file.name}>{file.name} - {file.size}</li>)}
            </ul>
          </div>

          <div className="uploadFile">
            <h2>Rejected files...</h2>
            <ul>
              {this.state.rejectedFiles.map(file => <li key={file.name}>{file.name} - {file.size}</li>)}
            </ul>
          </div>
          <br className="clear" />

          <div>
            <h2>Preview</h2>
            {prev}
            <br className="clear" />
          </div>
        </div>
      </section>
    );
  }
}

const App = (props) => (
  <Upload />
);

render(
  <App/>,
  document.getElementById('app_root')
);
