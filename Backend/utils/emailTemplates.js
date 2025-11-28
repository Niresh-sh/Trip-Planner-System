export const bookingCreatedEmail = (user, booking) => `
  <h2>Your Booking is Confirmed!</h2>
  <p>Hi ${user.firstName},</p>
  <p>Your booking for <strong>${booking.destinationId?.title}</strong> has been created successfully.</p>
  <p>Total Cost: <strong>₹${booking.totalCost}</strong></p>
  <p>Payment Status: <strong>${booking.paymentStatus}</strong></p>
  <br/>
  <p>Thank you for booking with us!</p>
`;

export const bookingCancelledEmail = (user, booking) => `
  <h2>Your Booking Has Been Cancelled</h2>
  <p>Hi ${user.firstName},</p>
  <p>Your booking for <strong>${booking.destinationId?.title}</strong> has been cancelled.</p>
  <p><strong>No refund is applicable.</strong></p>
`;

export const bookingDeclinedEmail = (user, booking) => `
  <h2>Your Booking Has Been Declined</h2>
  <p>Hi ${user.firstName},</p>
  <p>Your booking for <strong>${booking.destinationId?.title}</strong> has been declined by the admin.</p>
  <p><strong>Your payment has been refunded.</strong></p>
`;

export const bookingApprovedEmail = (user, booking) => `
  <h2>Your Booking Has Been Approved</h2>
  <p>Hi ${user.firstName},</p>
  <p>Your booking for <strong>${booking.destinationId?.title}</strong> has been approved!</p>
`;
