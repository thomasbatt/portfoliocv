<?php
class Errors
{
// ------------------------ Déclarer les propriétés-----------------------
	private $id;
	private $type;
	private $message;
	private $create_date;
	private $isNow;
	
// ------------------------Déclarer les méthodes--------------------------

	// --------------------Liste des getters------------------------------

	public function getId() {
		return $this->id;
	}

	public function getType() {
		return $this->type;
	}

	public function getMessage() {
		return $this->message;
	}

	public function getCreate_date() {
		return $this->create_date;
	}

	public function isNow() { // Un getter d'un booleen transforme le get en is
		$this->setNow();
		return $this->isNow;
	}



	// --------------------Liste des setters-------------------------------

	public function setType($type) {
		if (strlen($type) > 1 && strlen($type) < 31) {
			$this->type = $type;
		}
		else
			throw new Exception("Type d'erreur inconnue");
	}

	public function setMessage($message) {
		if (strlen($message) > 1 && strlen($message) < 1023) {
			$this->message = $message;
		}
		else
			throw new Exception("Message d'erreur incorrect");
	}

	// --------------------Liste des méthodes "autres"---------------------

	private function setNow()	{
		if ( time()- strtotime($this->getCreate_date()) < 3 && !empty($this->create_date)) {
			$this->isNow = true;
		}
		else
			$this->isNow = false;

	}

}

?>
