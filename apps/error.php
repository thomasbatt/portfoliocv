<?php
if(!isset($pos) && $error->isNow() ){
	echo "taggle";
	$pos='';
}
try{
	$errorManager = new ErrorsManager($db);
	$errors = $errorManager->getAll(1);
	$error = $errors[0];
	if ($error->isNow() && $error->getPosition() == $pos)
		require('views/error.phtml');

}
catch (Exception $e){
	$error = new Errors;
	$error->setType('Errors');
	$error->setMessage( $e->getMessage() );
	require('views/error.phtml');
}
?>