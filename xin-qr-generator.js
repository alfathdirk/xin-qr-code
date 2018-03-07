import { define, Component } from '@xinix/xin';
import QRCode from 'qrcode';

export class QrGenerator extends Component {
  get template () {
    return String(`
    <img src="[[imgSrc]]" alt="">
    `);
  }

  get props () {
    return Object.assign({}, super.props, {
      imgSrc: {
        type: String,
      },
      data: {
        type: String,
        observer: 'observeData(data)',
      },
    });
  }

  async observeData (data) {
    if (data) {
      let url = await QRCode.toDataURL(data);
      this.set('imgSrc', url);
      return;
    }
    this.set('imgSrc', '');
  }
}

define('xin-qr-generator', QrGenerator);
