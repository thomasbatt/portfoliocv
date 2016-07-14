<?php
class Errors
{
// ------------------------ Déclarer les propriétés-----------------------
	private $id;
	private $type;
	private $position;
	private $message;
	private $create_date;
	private $isNow = true;
	private $isPosition = true;
	
// ------------------------Déclarer les méthodes--------------------------

	// --------------------Liste des getters------------------------------

	public function getId() {
		return $this->id;
	}

	public function getType() {
		return $this->type;
	}

	public function getPosition() {
		return $this->position;
	}

	public function getMessage() {
		return $this->message;
	}

	public function getCreate_date() {
		return $this->create_date;
	}

	public function isNow() { // Un getter d'un booleen transforme le get en is
		$this->setIsNow();
		return $this->isNow;
	}

	public function isPosition() {
		return $this->isPosition;
	}



	// --------------------Liste des setters-------------------------------

	public function setType($type) {
		if (strlen($type) > 1 && strlen($type) < 31) {
			$this->type = $type;
		}
		else
			throw new Exception("Type d'erreur inconnue");
	}

	public function setPosition($position) {
		if ($position > 0 && $position < 5) {
			$this->position = $position;
		}
		else
			throw new Exception("Position d'erreur impossible");
	}

	public function setMessage($message) {
		if (strlen($message) > 1 && strlen($message) < 1023) {
			$this->message = $message;
		}
		else
			throw new Exception("Message d'erreur incorrect");
	}

	// --------------------Liste des méthodes "autres"---------------------

	private function setIsNow()	{
		if ( time()- strtotime($this->getCreate_date()) > 3 && !empty($this->create_date) ) {
			$this->isNow = false;
		}
		else if ( empty($this->create_date) )
			throw new Exception("create_date Error abs");
	}

	public function setIsPosition($position){
		if ( $this->position != $position && !empty($this->position && $position != '0' ) ){
			$this->isPosition = false;
		}
		else if ( empty($this->position) )
			throw new Exception("position Error abs");
	}

}

?>
