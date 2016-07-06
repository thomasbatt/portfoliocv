<?php
class MailManager
{
	// Déclarer les propriétés
	private $db;

	// Constructeur
	public function __construct(PDO $db)
	{
		$this->db = $db;
	}

	public function create($name, $email, $subject, $message)
	{
		$mail = new Mail();
		$mail->setName($name);
		$mail->setEmail($email);
		$mail->setSubject($subject);
		$mail->setMessage($message);

		$namet = $this->db->quote($mail->getName());
		$email = $this->db->quote($mail->getEmail());
		$subject = $this->db->quote($mail->getSubject());
		$message = $this->db->quote($mail->getMessage());
		// var_dump($mail);
		$query = "INSERT INTO mail (name, email, subject, message) VALUES('".$name."',".$email.",".$subject.",".$message.")";
		// var_dump($query);
		// exit;
		try
		{
			$res = $this->db->exec($query);
		}
		catch (Exception $e)
		{
			throw new Exception("Erreur interne");
		}
		return $mail;

	}

 	public function getAll($limit)
 	{
 		$limit = intval($limit);
 		$query = "SELECT * FROM mail ORDER BY create DESC LIMIT $limit ";
 		$res = $this->db->query($query);
 		try
		{
 			while ( $mail = $res->fetchObject("mail", [$this->db]) )
				$mails [] = $mail;
			return $mails;
		}
		catch (Exception $e)
		{
			throw new Exception("Erreur interne");
		}
 	}

}
?>