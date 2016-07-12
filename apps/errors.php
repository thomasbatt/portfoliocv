<?php
$errorManager = new ErrorsManager($db);
$errors = $errorManager->getAll(1);
$error = $errors[0];

if ($errors[0]->isNow())
	require('views/errors.phtml');
?>