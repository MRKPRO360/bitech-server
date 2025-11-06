import config from '.';
import { IMail } from '../module/mail/mail.interface';

export const generateMailHTML = (mail: IMail) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>${mail.subject}</title>
    <style>
      body {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        background-color: #f7f7f7;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        border: 1px solid #e0e0e0;
      }
      .header {
        background-color: #fb2c36;
        color: #ffffff;
        padding: 20px;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
      }
      .content {
        padding: 30px 25px;
        color: #333333;
        line-height: 1.6;
      }
      .content h2 {
        color: #111827;
        font-size: 20px;
        margin-bottom: 10px;
      }
      .content p {
        font-size: 16px;
        margin-bottom: 20px;
      }
      .footer {
        background-color: #f3f4f6;
        color: #6b7280;
        text-align: center;
        font-size: 14px;
        padding: 15px 20px;
      }
      .btn {
        display: inline-block;
        padding: 12px 25px;
        background-color: #fb2c36;
        color: #ffffff;
        border-radius: 8px;
        text-decoration: none;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        ${mail.subject}
      </div>
      <div class="content">
        <h2>Hello ${config.sender_name},</h2>
        <p>${mail.description}</p>
        <p>If you have any questions, feel free to reach out to us at <a href="mailto:${config.sender_email}">${config.sender_email}</a> or call ${config.sender_phone}.</p>
        <p style="text-align:center; color:#fff">
          <a href="mailto:${mail.email}" class="btn">Reply Now</a>
        </p>
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} BITECH. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;
};
