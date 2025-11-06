import config from '.';
import { IUser } from '../module/user/user.interface';

export const generateResetPasswordHTML = (resetLink: string, user: IUser) => {
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
          Hello ${user.name.firstName},
        </div>

        <p style="margin-bottom:20px;">You recently requested to reset your password. Click the button below to reset it. <b>This link will expire in 10 minutes.</b></p>

        <!-- Button -->
        <div style="text-align:center; margin:30px 0;">
          <a href="${resetLink}" style="display:inline-block; padding:16px 35px; background:#150680; color:#fff; border-radius:8px; text-decoration:none; font-weight:600; font-size:16px; box-shadow:0 4px 15px rgba(21,6,128,0.3);">
            Reset Password
          </a>
        </div>

        <p style="margin-top:20px; color:#666; font-size:14px;">
          If you did not request a password reset, you can safely ignore this email.
        </p>

        <!-- Contact Info -->
        <div style="margin-top:30px; background:#f8f9fa; padding:20px; border-radius:8px; border-left:4px solid #150680;">
          <p style="margin:0; font-size:15px;">
            <b>Need Help?</b> Contact us at <a href="mailto:${config.sender_email}" style="color:#150680; text-decoration:none;">${config.sender_email}</a> or call <span style="color:#150680;">${config.sender_phone}</span>
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background:#150680; color:#fff; text-align:center; padding:30px 40px; font-size:14px;">
        <div style="display:flex; justify-content:center; align-items:center; gap:18px; flex-wrap:wrap; margin-bottom:15px;">
          <a href="https://bitech.com" style="text-decoration:none; display:flex; align-items:center; color:#fff; gap:5px;">
            <img src="https://cdn-icons-png.flaticon.com/512/535/535239.png" width="20" alt="Website Icon" />
            Website
          </a>
          <a href="https://linkedin.com/company/bitech" style="text-decoration:none; display:flex; align-items:center; color:#fff; gap:5px;">
            <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="20" alt="LinkedIn Icon" />
            LinkedIn
          </a>
          <a href="https://twitter.com/bitech" style="text-decoration:none; display:flex; align-items:center; color:#fff; gap:5px;">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" width="20" alt="Twitter Icon" />
            Twitter
          </a>
          <a href="https://facebook.com/bitech" style="text-decoration:none; display:flex; align-items:center; color:#fff; gap:5px;">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" width="20" alt="Facebook Icon" />
            Facebook
          </a>
        </div>
        <div style="margin-top:20px; border-top:1px solid #fafafa; padding-top:10px;">
          &copy; ${new Date().getFullYear()} <b>BITECH Technologies</b>. All rights reserved.
        </div>
      </div>

    </div>
  </body>
  </html>
  `;
};
