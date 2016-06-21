<?php
// PascalCase pour le nom des classes
// camelCase pour le nom des variables
class Mail
{
// ------------------------ Déclarer les propriétés-----------------------
	private $id;
	private $name;
	private $email;
	private $subject;
	private $message;
	private $entete;
	private $corps;
	
// ------------------------Déclarer les méthodes--------------------------

	// --------------------Liste des getters------------------------------

	public function getId() {
		return $this->id; // On récupère la propriété id_mail de $this
	}

	public function getName() {
		return $this->name;
	}

	public function getEmail(){
		return $this->email;
	}

	public function getSubject() {
		return $this->subject;
	}
	public function getEntete(){
		return $this->entete;
	}

	public function getCorps() {
		return $this->corps;
	}

	// --------------------Liste des setters-------------------------------
	public function setName($name) {
		if (strlen($name) > 1 && strlen($name) < 31) {
			$this->name = $name;
		}
		else
			throw new Exception("erreur name");
	}

	public function setEmail($email) {
		if (strlen($email) > 1 && strlen($email) < 31) {
			$this->email = $email;
		}
		else
			throw new Exception("erreur email");
	}
	public function setSubject($subject) {
		if (strlen($subject) > 1 && strlen($subject) < 31) {
			$this->subject = $subject;
		}
		else
			throw new Exception("erreur subject");
	}
	public function setMessage($message) {
		if (strlen($message) > 1 && strlen($message) < 1023) {
			$this->message = $message;
		}
		else
			throw new Exception("erreur message");
	}
	// --------------------Liste des méthodes "autres"---------------------

	public function setEntete()
	{
		if ($this->name != null && $this->email != null )
		{
			//Préparation de l'entête du mail:
			$this->entete  = "MIME-Version: 1.0\r\n";
			$this->entete .= "From: ".$this->name."<".$this->email.">\r\n";
			$this->entete .= 'Reply-To: '.$_POST['email']."\r\n";
			$this->entete .= 'Content-Type: text/plain; charset="iso-8859-1"';
			$this->entete .= "\r\nContent-Transfer-Encoding: 8bit\r\n";
			$this->entete .= 'X-Mailer:PHP/' . phpversion()."\r\n";
		}
		else
			throw new Exception("Impossible d'initialiser l'entete");
	}

	public function setCorps()
	{
		if ($this->name != null && $this->email != null && $this->subject != null && $this->message != null )
		{
			// préparation du corps du mail
			$this->corps  = "Message de : ".$this->name."\n";
			$this->corps .= "Adresse : ".$this->email."\n";
			$this->corps .= "Ses centres d'intérêts : ".$this->subject."\n\n\n";
			$this->corps .= $this->message;
		}
		else
			throw new Exception("Impossible d'initialiser le corps du message");
	}

	public function sendMail($destinataire)
	{
		if ( !mail( $destinataire,$this->subject,$this->corps,$this->entete ) )
			throw new Exception("Une erreur est survenue lors de l'envoi du mail");
	}

	// --------------------verifier password ?---------------------

}

// Tout ça n'a rien a foutre dans le fichier User.class.php, mais c'est plus pratique pour apprendre

// ------------------------------------------------------------------------
// --------------------On va INSTANCIER notre classe User------------------
// --------------------$user => objet--------------------------------------
// --------------------User => classe--------------------------------------
// --------------------Un objet est une instance d'une classe--------------
// ------------------------------------------------------------------------

// $user = new User();
// $user->setLogin("toto");
// $user->initPassword("password", "password");

// var_dump($user);


?>
