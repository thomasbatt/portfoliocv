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
				$mail->setName($_POST['name']);
				$mail->setEmail($_POST['email']);
				$mail->setSubject($_POST['subject']);
				$mail->setMessage($_POST['message']);
				$mail->setEntete();
				$mail->setCorps();
				$mail->sendMail('thomasbatt@gmail.com');

				// var_dump($mail);
				header('Location: sendmailsuccess');
				exit;
			}
			catch (Exception $e)
			{
				$error = $e->getMessage();
			}
		}
	}
	else
		$error = "Erreur interne (filou détecté !!!)";

}






?>