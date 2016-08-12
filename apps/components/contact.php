<?php
	$fields = ['name','email','subject','message'];
    $values = [];
    foreach($fields as $field){
        if (!isset($_SESSION[$field]))
        	$_SESSION[$field] = "";
    }
	require(URL_VIEWS.'components/contact.min.phtml');
?>