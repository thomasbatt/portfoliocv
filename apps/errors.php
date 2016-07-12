<?php
try{
	$errorManager = new ErrorsManager($db);
	$errors = $errorManager->getAll(1);
	$error = $errors[0];
	if ($errors[0]->isNow())
		require('views/errors.phtml');
}
catch (Exception $e){
	$error = new Errors;
	$error->setType('Errors');
	$error->setMessage( $e->getMessage() );
	require('views/errors.phtml');
}

?>