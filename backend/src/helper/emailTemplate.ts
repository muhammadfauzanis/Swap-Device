export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Your Email</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verifikasi Email Anda</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
      <p>Hallo,</p>
      <p>
        Terima kasih telah membuat akun anda di sistem kami, Kode verifikasi
        Anda adalah:
      </p>
      <div style="text-align: center; margin: 30px 0">
        <span
          style="
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 5px;
            color: #000000;
          "
          >{verificationCode}</span
        >
      </div>
      <p>
        Enter this code on the verification page to complete your registration.
      </p>
      <p>Kode ini akan kedaluwarsa dalam 5 menit untuk alasan keamanan.</p>
      <p>
        Jika Anda tidak membuat akun dengan kami, silakan abaikan email ini.
      </p>
      <p>Hormat Kami,<br />Swap Device Team</p>
    </div>
    <div
      style="
        text-align: center;
        margin-top: 20px;
        color: #888;
        font-size: 0.8em;
      "
    >
      <p>This is an automated message, please do not reply to this email.</p>
    </div>
  </body>
</html>

`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Your Email</title>
  </head>
  <body
    style="
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    "
  >
    <div
      style="
        background: linear-gradient(to right, #000000, #666665);
        padding: 20px;
        text-align: center;
      "
    >
      <h1 style="color: white; margin: 0">Reset Password</h1>
    </div>
    <div
      style="
        background-color: #f9f9f9;
        padding: 20px;
        border-radius: 0 0 5px 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      "
    >
      <p>Hallo,</p>
      <p>
        Kami menerima permintaan untuk mengatur ulang kata sandi Anda. Jika Anda
        tidak membuat permintaan ini, harap abaikan email ini.
      </p>
      <p>Untuk mengatur ulang kata sandi, klik link di bawah ini:</p>
      <div style="text-align: center; margin: 30px 0">
        <a
          href="{resetURL}"
          style="
            background-color: #000000;
            color: white;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 120px;
            font-weight: bold;
          "
          >Reset Password</a
        >
      </div>
      <p>Kode ini akan kedaluwarsa dalam 5 menit untuk alasan keamanan.</p>
      <p>Hormat Kami,<br />Swap Device</p>
    </div>
    <div
      style="
        text-align: center;
        margin-top: 20px;
        color: #888;
        font-size: 0.8em;
      "
    >
      <p>This is an automated message, please do not reply to this email.</p>
    </div>
  </body>
</html>

`;
