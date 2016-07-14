<?php
try{
	$errorManager = new ErrorsManager($db);
	$errors = $errorManager->getAll(1);
	$error = $errors[0];
	
	if (isset($pos))
		$error->setIsPosition($pos);

	if ( $error->isNow() && $error->isPosition() )
		require('views/error.phtml');
}
catch (Exception $e){
	$error = new Errors;
	$error->setType('Errors');
	$error->setMessage( $e->getMessage() );
	require('views/error.phtml');
}
?>