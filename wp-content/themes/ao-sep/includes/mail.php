<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

add_action( 'wp_ajax_send_form', 'send_form' );
add_action( 'wp_ajax_nopriv_send_form', 'send_form' );
function send_form() {

  $mail = connectSMTP();

  // Form data
  $name = isset($_POST["name"]) ? $_POST["name"] : '';
  $phone = isset($_POST["phone"]) ? $_POST["phone"] : '';

  $mail_from = get_field('mail-from', PAGE_HOME_ID);
  $mail->setFrom($mail_from, 'info@verd-m.ru');

  $mail->isHTML(true);
  $subject = "Вердиктум";
  $mail->Subject = $subject;
  
  $body = "";

  $mail_to = get_field('mail-to', PAGE_HOME_ID);
  if (!empty($mail_to)) {
    foreach ($mail_to as $email) {
      $mail->addAddress($email['email'], 'Вердиктум');
    }
  }

  if (!empty($name)) {
    $body .= "Имя: " . $name . "<br>";
  }

  if (!empty($phone)) {
    $body .= "Телефон: " . $phone . "<br>";
  }

  // Обработка загруженного файла (только один файл)
  if (!empty($_FILES['file']['name']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {

    $original_name = sanitize_file_name($_FILES['file']['name']);
    $tmp_name = $_FILES['file']['tmp_name'];

    // Прикрепляем файл напрямую к письму без сохранения на сервер
    $mail->addAttachment($tmp_name, $original_name);
  }

  $mail->Body = $body;

  try {
    $mail->send();
    wp_send_json_success([
      'message' => 'Заявка успешно отправлена'
    ]);
  } catch (Exception $e) {
    wp_send_json_error([
      // 'message' => 'Не удалось отправить заявку. Попробуйте позже.'
      'message' => $e->getMessage()
    ]);
  }

  wp_die();
}

function connectSMTP() {
  // PHPMailer options
  $mail = new PHPMailer(true);

  $mail->CharSet = 'UTF-8';

  $mail->SMTPDebug = SMTP::DEBUG_SERVER;
  $mail->isSMTP();
  $mail->SMTPAuth = true;
  $mail->SMTPDebug = 0;

  $mail->Host = 'ssl://smtp.mail.ru';
  $mail->Username = 'info@verd-m.ru';
  $mail->Password = 'MTadmULVeO5qmaqHKSXm';
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
  $mail->Port = 465;

  return $mail;
}