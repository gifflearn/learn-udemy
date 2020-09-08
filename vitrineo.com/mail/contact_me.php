<?php

require_once('../vendor/autoload.php');

// Check for empty fields
if (empty($_POST['name']) ||
    empty($_POST['email']) ||
    empty($_POST['message']) ||
    !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    echo "No arguments Provided!";
    return false;
}

$name = $_POST['name'];
$email_address = $_POST['email'];
$message = $_POST['message'];

// Le champ poste est caché via le css, c'est pouvoir s'il est rempli par un robot ou non
$poste = $_POST['poste'];

if ($poste === "" OR $poste === null) {
    // Create the email and send the message
    $to = 'contact@logissimmo.com'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
    $email_subject = "Nouveau message Logissimmo:  $name";
    $email_body = "Nouveau message depuis le formulaire de logissimmo.com.\n\n" . "Détails:\n\nName: $name\n\nEmail: $email_address\n\nMessage:\n$message";
    $headers = "From: contact@logissimmo.com\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
    $headers .= "Reply-To: $email_address";
    
    //require_once 'lib/swift_required.php';
    
    // Create the Transport
    $transport = Swift_SmtpTransport::newInstance('smtp.example.org', 25)
      ->setUsername('your username')
      ->setPassword('your password')
      ;
    
    $mailer = Swift_Mailer::newInstance($transport);

    // Create the message
    $message = Swift_Message::newInstance()

      // Give the message a subject
      ->setSubject($email_subject)

      // Set the From address with an associative array
      ->setFrom(array($email_address => $name))

      // Set the To addresses with an associative array
      ->setTo(array($to))

      // Give it a body
      ->setBody($email_body)
      ;
    
    $mailer->send($message);
}

return true;
?>