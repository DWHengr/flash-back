import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from 'nestjs-config';
import * as CryptoJS from 'crypto-js';
import { VariableNameUtil } from '../../utils/variable.name.util';

@Injectable()
export class TranslateService {
  private axios;
  private readonly config;

  constructor(private readonly configService: ConfigService) {
    this.axios = axios.create();
    this.config = configService.get('xfyun');
  }

  getPostBody(text, from, to) {
    const digestObj = {
      common: {
        app_id: this.config.appid,
      },
      business: {
        from: from,
        to: to,
      },
      data: {
        text: CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text)),
      },
    };
    return digestObj;
  }

  getDigest(body) {
    return (
      'SHA-256=' +
      CryptoJS.enc.Base64.stringify(CryptoJS.SHA256(JSON.stringify(body)))
    );
  }

  getAuthStr(date, digest) {
    const signatureOrigin = `host: ${this.config.host}\ndate: ${date}\nPOST ${this.config.uri} HTTP/1.1\ndigest: ${digest}`;
    const signatureSha = CryptoJS.HmacSHA256(
      signatureOrigin,
      this.config.apiSecret,
    );
    const signature = CryptoJS.enc.Base64.stringify(signatureSha);
    const authorizationOrigin = `api_key="${this.config.apiKey}", algorithm="hmac-sha256", headers="host date request-line digest", signature="${signature}"`;
    return authorizationOrigin;
  }

  async xfyun(text, from, to) {
    const date = new Date().toUTCString();
    const body = this.getPostBody(text, from, to);
    const digest = this.getDigest(body);
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json,version=1.0',
      Host: this.config.host,
      Date: date,
      Digest: digest,
      Authorization: this.getAuthStr(date, digest),
    };
    const response = await this.axios.post(this.config.hostUrl, body, {
      headers,
    });
    return response.data;
  }

  async variableNames(variableName: string): Promise<Map<string, string>> {
    const translate = await this.xfyun(variableName, 'cn', 'en');
    const englishName: string = translate.data.result.trans_result.dst;
    const words = englishName.trim().split(/\s+/);
    const variableNameArr = new Map();
    variableNameArr.set(
      'LowerCamelCase',
      VariableNameUtil.toLowerCamelCase(words),
    );
    variableNameArr.set(
      'UpperCamelCase',
      VariableNameUtil.toUpperCamelCase(words),
    );
    variableNameArr.set(
      'LowerUnderline',
      VariableNameUtil.toLowerUnderline(words),
    );
    variableNameArr.set(
      'UpperUnderline',
      VariableNameUtil.toUpperUnderline(words),
    );
    return variableNameArr;
  }
}
