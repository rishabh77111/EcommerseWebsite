const formatDate = (date: Date) => {
  return date.toLocaleString("en-US", {
    dateStyle: "short",
    timeStyle: "short",
  });
};

//* Generate new login detected email HTML
export const newLoginDetectedHtml = ({
  email,
  loginAt,
  userAgent,
  fullName,
}: {
  email: string;
  loginAt: Date;
  userAgent: string;
  fullName: string;
}) => {
  const html = `
    <h2>New Login Detected</h2>

    <p>Hello ${fullName},</p>

    <p>We detected a new login to your account.</p>

    <table>
      <tr>
        <td><strong>Email:</strong></td>
        <td>${email}</td>
      </tr>
      <tr>
        <td><strong>Login Time:</strong></td>
        <td>${formatDate(loginAt)}</td>
      </tr>
      <tr>
        <td><strong>Device:</strong></td>
        <td>${userAgent}</td>
      </tr>
    </table>

    <p>If this was you, no action is needed.</p>

    <p>If you don't recognize this login, please change your password immediately.</p>

    <p>Thanks,<br>Ecommerce Website Team</p>
  `;

  return html;
};


//* Generate account created email HTML
export const accountCreatedHtml = ({
  email,
  fullName,
  createdAt,
}: {
  email: string;
  fullName: string;
  createdAt: Date;
}) => {
  const html = `
    <h2>Welcome to Ecommerce Website!</h2>

    <p>Hello ${fullName},</p>

    <p>Your account has been created successfully.</p>

    <table>
      <tr>
        <td><strong>Name:</strong></td>
        <td>${fullName}</td>
      </tr>
      <tr>
        <td><strong>Email:</strong></td>
        <td>${email}</td>
      </tr>
      <tr>
        <td><strong>Account Created:</strong></td>
        <td>${formatDate(createdAt)}</td>
      </tr>
    </table>

    <p>You can now log in and start exploring our products.</p>

    <p>If you did not create this account, please contact our support team immediately.</p>

    <p>Thank you,<br>Ecommerce Website Team</p>
  `;

  return html;
};