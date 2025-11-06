import config from '.';
import { IMail } from '../module/mail/mail.interface';

export const generateMailHTML = (mail: IMail) => {
  return `
  <html lang="en">
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color:#f2f2f2; margin:0; padding:20px;">
    <div style="max-width:650px; margin:auto; background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e8e8e8;">

      <!-- Header -->
      <div style="background-color:#150680; text-align:center; padding:30px 40px;">
        <img src="https://i.ibb.co/nX79Mrr/logo.png" alt="BITECH Logo" style="max-width:180px; height:auto; display:inline-block; margin-bottom:10px;" />
        <div style="color:#cccccc; font-size:16px; margin-top:8px; font-weight:300;">Professional IT Solutions</div>
      </div>

      <!-- Content -->
      <div style="padding:40px; color:#333333; line-height:1.7;">
        <div style="font-size:18px; color:#150680; margin-bottom:25px; font-weight:500;">
          Dear ${config.sender_name},
        </div>

        <div style="display:flex; align-items:center; gap:5px; flex-wrap:wrap;">
          <p style="font-weight:600; color:#150680; margin:0;">Subject:</p>
          <h3 style="text-decoration:underline; text-decoration-color:#150680; margin:0;">${mail.subject}</h3>
        </div>

        <div style="background:#f8f9fa; padding:25px; border-left:4px solid #150680; margin:25px 0;">
          <p style="font-size:16px; margin:0;">${mail.description}</p>
        </div>

        <!-- Contact Info -->
        <div style="background:#fff8f8; padding:20px; border-radius:10px; border:1px solid #ffeaea; margin:25px 0;">
          <div style="display:flex; align-items:center; margin:12px 0; font-size:15px;">
            <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" width="18" style="margin-right:12px;" alt="User Icon"/>
            <span>Name: <span style="color:#150680; font-weight:600;">${mail.name.firstName} ${mail.name.lastName}</span></span>
          </div>

          <div style="display:flex; align-items:center; margin:12px 0; font-size:15px;">
            <img src="https://cdn-icons-png.flaticon.com/512/561/561127.png" width="18" style="margin-right:12px;" alt="Email Icon"/>
            <span>Email: <a href="mailto:${config.sender_email}" style="color:#150680; text-decoration:none;">${mail.email}</a></span>
          </div>

          <div style="display:flex; align-items:center; margin:12px 0; font-size:15px;">
            <img src="https://cdn-icons-png.flaticon.com/512/597/597177.png" width="18" style="margin-right:12px;" alt="Phone Icon"/>
            <span>Phone: <span style="color:#150680; font-weight:600;">${config.sender_phone}</span></span>
          </div>
        </div>

        <!-- Button -->
        <div style="text-align:center; margin:35px 0 25px 0;">
          <a href="mailto:${mail.email}" style="display:inline-block; padding:14px 35px; background:#150680; color:#ffffff; border-radius:8px; text-decoration:none; font-weight:600; font-size:16px; box-shadow:0 4px 15px rgba(21,6,128,0.3);">
            Reply to Message
          </a>
        </div>

        <p style="text-align:center; color:#666; font-size:14px; margin-top:20px;">
          We typically respond within 1–2 business hours.
        </p>
      </div>

      <!-- Footer -->
      <div style="background:#150680; color:#fff; text-align:center; padding:30px 40px; font-size:14px;">
        <div style="display:flex; justify-content:center; align-items:center; gap:18px; flex-wrap:wrap;">
          <a href="https://bitech.com" style="text-decoration:none; display:flex; align-items:center; color:#fff; gap:5px;">
            <img src="https://cdn-icons-png.flaticon.com/512/535/535239.png" width="20" alt="Website Icon" />
            <span>Website</span>
          </a>

          <a href="https://linkedin.com/company/bitech" style="text-decoration:none; display:flex; align-items:center; color:#fff; gap:5px;">
            <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="20" alt="LinkedIn Icon" />
            <span>LinkedIn</span>
          </a>

          <a href="https://twitter.com/bitech" style="text-decoration:none; display:flex; align-items:center; color:#fff; gap:5px;">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" width="20" alt="Twitter Icon" />
            <span>Twitter</span>
          </a>

          <a href="https://facebook.com/bitech" style="text-decoration:none; display:flex; align-items:center; color:#fff; gap:5px;">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" width="20" alt="Facebook Icon" />
            <span>Facebook</span>
          </a>
        </div>

        <div style="margin-top:20px; padding-top:20px; border-top:1px solid #fafafa;">
          &copy; ${new Date().getFullYear()} <b>BITECH Technologies</b>. All rights reserved.<br/>
          <small>Innovating the future, one solution at a time.</small>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
};
