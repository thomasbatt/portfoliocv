<?php

// var_dump($_GET);
// var_dump($_POST);
// var_dump($_SESSION);
// exit;

if (isset($_POST['action']))
{
	$action = $_POST['action'];
	if ($action == 'send_mail')
	{
		if (isset( $_POST['name'],$_POST['email'],$_POST['subject'],$_POST['message'] ))
		{
			try
			{
		        $mail = new Mail();

				$fields = ['name','email','subject','message'];
		        foreach($fields as $field){
		            $setter = "set".ucfirst($field);
		            $mail->$setter($_POST[$field]);
		        }

				$MailManager = new MailManager($db);
				$mail = $MailManager->create($mail);

				$mail->setEntete();
				$mail->setCorps();
				$mail->sendMail(MAIL_ADMIN);

				if( $_POST['send_copy'] == '1'){
					$mail->sendMail( $mail->getEmail() );
				}

				// var_dump($mail);

				header('Location: sendmailsuccess');
				exit;
			}
			catch (Exception $e)
			{

				$error = $e->getMessage();
				// var_dump($e);
			}
		}
	}
	else
		$error = "Erreur interne (filou détecté !!!)";

}






?>