<?php
if (!isset($pos))
	$pos = '0';
try{
	$errorManager = new ErrorsManager($db);
	$errors = $errorManager->getAll(1);
	$error = $errors[0];
	$error->setIsPosition($pos);

	if ( $error->isNow() && $error->isPosition() )
		require(URL_VIEWS.'components/error.min.phtml');
}
catch (Exception $e){
	$input_error['getAll'] = $e->getMessage() ;
}

if (isset($input_error))
	foreach($input_error as $index)
		echo " - ".$index;
?>