<?php
if (isset($_POST['name'])) {
  // Retrieve form data
  $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['message'];

  // Build email message
  $to = 'dkrmentor@gmail.com'; // Replace with your email address
  $subject = 'New Contact Form Submission';
  $message_body = "Name: $name\n";
  $message_body .= "Email: $email\n";
  $message_body .= "Message:\n$message";

  // Set headers
  $headers = "From: $email\r\n";
  $headers .= "Reply-To: $email\r\n";

  // Send email
  if (mail($to, $subject, $message_body, $headers)) {
    // Email sent successfully
    header('Location: index.html?submitted=1');
    exit();
  } else {
    // Error sending email
    echo "Sorry, there was an error submitting your form. Please try again later.";
  }
}
?>

<!-- Add this section to display the success message -->
<?php
if (isset($_GET['submitted']) && $_GET['submitted'] == 1) {
  echo '<p style="color: green;">Form submitted successfully! Thank you for your submission.</p>';
}
?>
