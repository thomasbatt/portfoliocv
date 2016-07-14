<?php
try{
	$errorManager = new ErrorsManager($db);
	$errors = $errorManager->getAll(1);
	$error = $errors[0];
	// echo "taggle";
	if (isset($pos))
		$error->setIsPosition($pos);

	if ( $error->isNow() && $error->isPosition() )
		require('views/error.phtml');

	// var_dump($error);
}
catch (Exception $e){
	$error = new Errors;
	$error->setType('Errors');
	$error->setMessage( $e->getMessage() );
	require('views/error.phtml');
}
?>